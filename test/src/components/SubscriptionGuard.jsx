import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SubscriptionGuard = ({ children }) => {
    const { user } = useAuth();
    const location = useLocation();

    // Check if user has an active subscription
    const hasActiveSubscription = user?.subscription?.status === 'active';

    if (!hasActiveSubscription) {
        // Redirect to packages page if no active subscription
        return <Navigate to="/packages" state={{ from: location.pathname }} replace />;
    }

    return children;
};

export default SubscriptionGuard;