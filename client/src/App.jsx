import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import AuthProvider from './Providers/AuthProvider';
import Root from './Components/Root/Root';
import Home from './Components/Home/Home';
import Events from './Components/Events/Events';
import EventDetails from './Components/EventDetails/EventDetails';
import EventRegistration from './Components/EventRegistration/EventRegistration';
import Payment from './Components/Payment/Payment';
import About from './Components/About/About';
import Contact from './Components/Contact/Contact';
import Login from './Components/Login/Login';
import Registration from './Components/Registration/Registration';
import UserDashboard from './Components/Dashboard/UserDashboard';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import AdminRoute from './Components/PrivateRoute/AdminRoute';

import AdminDashboard from './Components/Admin/AdminDashboard';
import ManageEvents from './Components/Admin/ManageEvents';
import AddEvent from './Components/Admin/AddEvent';
import UpdateEvent from './Components/Admin/UpdateEvent';
import ManageRegistrations from './Components/Admin/ManageRegistrations';
import QRScanner from './Components/Admin/QRScanner';
import PaymentSettings from './Components/Admin/PaymentSettings';
import ContactMessages from './Components/Admin/ContactMessages';

import Clubs from './Components/Clubs/Clubs';
import ClubDetail from './Components/Clubs/ClubDetail';
import API_URL from './config';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/events',
        element: <Events />,
        loader: () => fetch(`${API_URL}/events`).catch(() => null)
      },
      {
        path: '/events/:id',
        element: <EventDetails />,
        loader: ({ params }) => fetch(`${API_URL}/events/${params.id}`).catch(() => null)
      },
      {
        path: '/register-event/:id',
        element: <PrivateRoute><EventRegistration /></PrivateRoute>
      },
      {
        path: '/payment/:registrationId',
        element: <PrivateRoute><Payment /></PrivateRoute>
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/clubs',
        element: <Clubs />
      },
      {
        path: '/clubs/:clubId',
        element: <ClubDetail />
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Registration />
      },
      {
        path: '/dashboard',
        element: <PrivateRoute><UserDashboard /></PrivateRoute>
      },
      {
        path: '/admin',
        element: <AdminRoute><AdminDashboard /></AdminRoute>
      },
      {
        path: '/admin/events',
        element: <AdminRoute><ManageEvents /></AdminRoute>
      },
      {
        path: '/admin/add-event',
        element: <AdminRoute><AddEvent /></AdminRoute>
      },
      {
        path: '/admin/update-event/:id',
        element: <AdminRoute><UpdateEvent /></AdminRoute>,
        loader: ({ params }) => fetch(`${API_URL}/events/${params.id}`).catch(() => null)
      },
      {
        path: '/admin/registrations',
        element: <AdminRoute><ManageRegistrations /></AdminRoute>
      },
      {
        path: '/admin/qr-scanner',
        element: <AdminRoute><QRScanner /></AdminRoute>
      },
      {
        path: '/admin/payments',
        element: <AdminRoute><PaymentSettings /></AdminRoute>
      },
      {
        path: '/admin/messages',
        element: <AdminRoute><ContactMessages /></AdminRoute>
      }
    ]
  }
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
