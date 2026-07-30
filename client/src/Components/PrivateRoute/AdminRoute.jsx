import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { Navigate } from 'react-router';
import API_URL from '../../config';

const AdminRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext)
    const [isAdmin, setIsAdmin] = useState(false)
    const [adminLoading, setAdminLoading] = useState(true)

    useEffect(() => {
        if (user) {
            fetch(`${API_URL}/users/admin/${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setIsAdmin(data.admin)
                    setAdminLoading(false)
                })
                .catch(() => {
                    setIsAdmin(false)
                    setAdminLoading(false)
                })
        } else {
            setAdminLoading(false)
        }
    }, [user])

    if (loading || adminLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        )
    }

    if (user && isAdmin) {
        return children
    }

    return <Navigate to="/" />
};

export default AdminRoute;
