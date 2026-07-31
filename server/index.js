require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const dbName = process.env.DB_NAME || "unievent";
const client = new MongoClient(uri);

const db = client.db(dbName);
const usersCollection = db.collection("users");
const eventsCollection = db.collection("events");
const registrationsCollection = db.collection("registrations");
const paymentsCollection = db.collection("payments");
const contactsCollection = db.collection("contacts");
const settingsCollection = db.collection("settings");

async function seedDatabase() {
    try {
        await client.connect();
        console.log("Connected to MongoDB successfully!");

        const settingsCount = await settingsCollection.countDocuments();
        if (settingsCount === 0) {
            await settingsCollection.insertOne({
                bkashNumber: "01711223344",
                nagadNumber: "01999887766",
                lastUpdated: new Date()
            });
        }

        const eventsCount = await eventsCollection.countDocuments();
        if (eventsCount === 0) {
            const now = new Date();
            const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
            const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
            const nextMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

            await eventsCollection.insertMany([
                {
                    name: "National Tech Seminar 2026",
                    description: "Join leading industry experts discussing the future of Artificial Intelligence, cloud computing, and advanced engineering practices.",
                    date: nextWeek.toISOString().split('T')[0],
                    time: "10:00 AM",
                    venue: "Auditorium 1, IT Building",
                    category: "Seminar",
                    price: "150",
                    seatsTotal: 100,
                    seatsBooked: 45,
                    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800"
                },
                {
                    name: "React & Next.js Hands-on Workshop",
                    description: "Learn how to build real-world, high-performance web applications using Vite, TailwindCSS, and serverless architectures.",
                    date: tomorrow.toISOString().split('T')[0],
                    time: "02:00 PM",
                    venue: "Lab 305, CSE Building",
                    category: "Workshop",
                    price: "0",
                    seatsTotal: 40,
                    seatsBooked: 12,
                    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800"
                },
                {
                    name: "Inter-Department Cricket Tournament",
                    description: "The annual sports championship. Come cheer for your department in this thrilling campus competition.",
                    date: nextMonth.toISOString().split('T')[0],
                    time: "09:00 AM",
                    venue: "Central Playground",
                    category: "Sports",
                    price: "50",
                    seatsTotal: 200,
                    seatsBooked: 198,
                    image: "https://images.unsplash.com/photo-1593341606579-7f97d27b7ec3?w=800"
                }
            ]);
            console.log("Seeded default database events.");
        } else {

            await eventsCollection.updateMany(
                { image: "https://images.unsplash.com/photo-1531415080290-bc9b8998063a?w=800" },
                { $set: { image: "https://images.unsplash.com/photo-1593341606579-7f97d27b7ec3?w=800" } }
            );
        }
    } catch (err) {
        console.error("MongoDB connection/seeding error:", err);
    }
}
seedDatabase();

        app.post('/users', async (req, res) => {
            const user = req.body;
            if (!user.email) {
                return res.status(400).send({ message: 'Email is required', insertedId: null });
            }
            user.email = user.email.toLowerCase();
            const query = { email: user.email };
            const existingUser = await usersCollection.findOne(query);

            if (existingUser) {

                const updateFields = {};
                if (user.name && !existingUser.name) updateFields.name = user.name;
                if (user.phone && !existingUser.phone) updateFields.phone = user.phone;
                if (user.roll && !existingUser.roll) updateFields.roll = user.roll;
                if (user.department && !existingUser.department) updateFields.department = user.department;
                if (user.college && !existingUser.college) updateFields.college = user.college;
                if (user.uid && !existingUser.uid) updateFields.uid = user.uid;

                if (Object.keys(updateFields).length > 0) {
                    await usersCollection.updateOne(query, { $set: updateFields });
                    return res.send({ message: 'User profile details updated', insertedId: null });
                }
                return res.send({ message: 'User already exists', insertedId: null });
            }

            user.role = user.role || 'student';

            const result = await usersCollection.insertOne(user);
            res.send(result);
        });

        app.get('/users', async (req, res) => {
            const result = await usersCollection.find().toArray();
            res.send(result);
        });

        app.get('/users/admin/:email', async (req, res) => {
            const email = req.params.email.toLowerCase();
            const user = await usersCollection.findOne({ email });

            const isAdmin = user && user.role === 'admin';

            res.send({ admin: !!isAdmin });
        });

        app.patch('/users/admin/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: { role: 'admin' }
            };
            const result = await usersCollection.updateOne(filter, updateDoc);
            res.send(result);
        });

        app.get('/users/:email', async (req, res) => {
            const email = decodeURIComponent(req.params.email).toLowerCase();
            const user = await usersCollection.findOne({ email });
            res.send(user || {});
        });

        app.put('/users/:email', async (req, res) => {
            const email = decodeURIComponent(req.params.email).toLowerCase();
            const { name, phone, roll, department } = req.body;
            const filter = { email };
            const updateDoc = {
                $set: { name, phone, roll, department }
            };
            const result = await usersCollection.updateOne(filter, updateDoc, { upsert: false });
            res.send(result);
        });

        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await usersCollection.deleteOne(query);
            res.send(result);
        });

        app.get('/events', async (req, res) => {
            const result = await eventsCollection.find().toArray();
            res.send(result);
        });

        app.get('/events/:id', async (req, res) => {
            const id = req.params.id;
            if (!ObjectId.isValid(id)) {
                return res.status(400).send({ message: "Invalid Event ID format" });
            }
            const query = { _id: new ObjectId(id) };
            const result = await eventsCollection.findOne(query);
            if (!result) {
                return res.status(404).send({ message: "Event not found" });
            }
            res.send(result);
        });

        app.post('/events', async (req, res) => {
            const event = req.body;
            event.seatsBooked = parseInt(event.seatsBooked || 0);
            event.seatsTotal = parseInt(event.seatsTotal || 50);
            const result = await eventsCollection.insertOne(event);
            res.send(result);
        });

        app.put('/events/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const updatedEvent = req.body;
            const updateDoc = {
                $set: {
                    name: updatedEvent.name,
                    description: updatedEvent.description,
                    date: updatedEvent.date,
                    time: updatedEvent.time,
                    venue: updatedEvent.venue,
                    category: updatedEvent.category,
                    price: updatedEvent.price,
                    seatsTotal: parseInt(updatedEvent.seatsTotal),
                    image: updatedEvent.image
                }
            };
            const result = await eventsCollection.updateOne(filter, updateDoc);
            res.send(result);
        });

        app.delete('/events/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await eventsCollection.deleteOne(query);
            res.send(result);
        });

        app.get('/registrations', async (req, res) => {
            const registrations = await registrationsCollection.find().sort({ registrationDate: -1 }).toArray();

            const enriched = [];
            for (const reg of registrations) {
                let eventName = reg.eventName || reg.eventTitle || null;
                if (!eventName && ObjectId.isValid(reg.eventId)) {
                    try {
                        const event = await eventsCollection.findOne({ _id: new ObjectId(reg.eventId) });
                        if (event) eventName = event.name || event.title;
                    } catch (e) { }
                }

                let paymentDetails = {};
                try {
                    const regIdStr = reg._id.toString();
                    const payment = await paymentsCollection.findOne({ registrationId: regIdStr });
                    if (payment) {
                        paymentDetails = {
                            transactionId: payment.transactionId,
                            senderNumber: payment.senderNumber,
                            paymentMethod: payment.method,
                        };
                    }
                } catch (e) { }

                enriched.push({
                    ...reg,
                    eventName: eventName || 'Unknown Event',
                    ...paymentDetails
                });
            }
            res.send(enriched);
        });

        app.get('/registrations/user/:email', async (req, res) => {
            const email = decodeURIComponent(req.params.email).toLowerCase();
            const registrations = await registrationsCollection.find({
                $or: [{ email }, { userEmail: email }]
            }).toArray();

            const enriched = [];
            for (const reg of registrations) {
                let eventInfo = {};
                try {
                    if (ObjectId.isValid(reg.eventId)) {
                        eventInfo = await eventsCollection.findOne({ _id: new ObjectId(reg.eventId) }) || {};
                    }
                } catch (e) { }
                enriched.push({ ...reg, event: eventInfo });
            }

            res.send(enriched);
        });

        app.get('/registrations/event/:eventId', async (req, res) => {
            const eventId = req.params.eventId;
            const query = { eventId };
            const result = await registrationsCollection.find(query).toArray();
            res.send(result);
        });

        app.get('/registrations/:id', async (req, res) => {
            const id = req.params.id;
            if (!ObjectId.isValid(id)) {
                return res.status(400).send({ message: "Invalid registration ID" });
            }
            const registration = await registrationsCollection.findOne({ _id: new ObjectId(id) });
            res.send(registration);
        });

        app.post('/registrations', async (req, res) => {
            const reg = req.body;
            let email = reg.email || reg.userEmail;

            if (!email) {
                return res.status(400).send({ message: "Email is required for registration." });
            }

            email = email.toLowerCase();
            reg.email = email;
            reg.userEmail = email;

            const query = { eventId: reg.eventId, email: email };
            const existing = await registrationsCollection.findOne(query);
            if (existing) {
                return res.status(400).send({ message: "You have already registered for this event." });
            }

            const eventId = reg.eventId;
            if (ObjectId.isValid(eventId)) {
                const event = await eventsCollection.findOne({ _id: new ObjectId(eventId) });
                if (event) {
                    if (event.seatsBooked >= event.seatsTotal) {
                        return res.status(400).send({ message: "Event is fully booked." });
                    }
                    await eventsCollection.updateOne(
                        { _id: new ObjectId(eventId) },
                        { $inc: { seatsBooked: 1 } }
                    );
                }
            }

            reg.registrationDate = new Date();

            reg.paymentStatus = parseFloat(reg.price || 0) === 0 ? "Paid" : "Pending";

            const result = await registrationsCollection.insertOne(reg);
            res.send(result);
        });

        app.post('/registrations/verify', async (req, res) => {
            const { registrationId } = req.body;

            if (!ObjectId.isValid(registrationId)) {
                return res.status(400).send({ success: false, message: "Invalid Registration Code format" });
            }

            const reg = await registrationsCollection.findOne({ _id: new ObjectId(registrationId) });
            if (!reg) {
                return res.status(404).send({ success: false, message: "Ticket not found / Invalid pass" });
            }

            let event = null;
            if (ObjectId.isValid(reg.eventId)) {
                event = await eventsCollection.findOne({ _id: new ObjectId(reg.eventId) });
            }

            res.send({
                success: true,
                message: "Ticket Verified successfully!",
                registration: reg,
                event
            });
        });

        app.patch('/registrations/payment/:id', async (req, res) => {
            const id = req.params.id;
            const { status } = req.body;

            if (!ObjectId.isValid(id)) {
                return res.status(400).send({ message: "Invalid registration ID" });
            }

            const filter = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: { paymentStatus: status }
            };
            const result = await registrationsCollection.updateOne(filter, updateDoc);
            res.send(result);
        });

        app.post('/payments', async (req, res) => {
            const payment = req.body;
            payment.submittedAt = new Date();
            const result = await paymentsCollection.insertOne(payment);

            if (ObjectId.isValid(payment.registrationId)) {
                await registrationsCollection.updateOne(
                    { _id: new ObjectId(payment.registrationId) },
                    { $set: { paymentStatus: "Pending Verification", txId: payment.txId } }
                );
            }

            res.send(result);
        });

        app.get('/payments', async (req, res) => {
            const result = await paymentsCollection.find().toArray();
            res.send(result);
        });

        app.get('/settings', async (req, res) => {
            const settings = await settingsCollection.findOne();
            res.send(settings);
        });

        app.put('/settings', async (req, res) => {
            const { bkashNumber, nagadNumber } = req.body;
            const settings = await settingsCollection.findOne();

            let result;
            if (settings) {
                result = await settingsCollection.updateOne(
                    { _id: settings._id },
                    { $set: { bkashNumber, nagadNumber, lastUpdated: new Date() } }
                );
            } else {
                result = await settingsCollection.insertOne({
                    bkashNumber,
                    nagadNumber,
                    lastUpdated: new Date()
                });
            }
            res.send(result);
        });

        app.post('/contacts', async (req, res) => {
            const msg = req.body;
            msg.submittedAt = new Date();
            const result = await contactsCollection.insertOne(msg);
            res.send(result);
        });

        app.get('/contacts', async (req, res) => {
            const result = await contactsCollection.find().toArray();
            res.send(result);
        });

        app.delete('/contacts/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await contactsCollection.deleteOne(query);
            res.send(result);
        });

        app.get('/stats', async (req, res) => {
            const totalEvents = await eventsCollection.countDocuments();
            const totalRegistrations = await registrationsCollection.countDocuments();
            const totalUsers = await usersCollection.countDocuments();

            const pendingPayments = await registrationsCollection.countDocuments({
                paymentStatus: "Pending Verification"
            });

            res.send({
                totalEvents,
                totalRegistrations,
                totalUsers,
                pendingPayments
            });
        });

app.get('/', (req, res) => {
    res.send({ message: "UniEvent API is running!" });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
