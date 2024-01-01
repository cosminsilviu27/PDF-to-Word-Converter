// useApiSubscriptionService.js
import { useState, useCallback } from 'react';
import axios from 'axios';

export const useApiSubscriptionService = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchSubscriptionPlans = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get('/api/subscription-plans');
            setIsLoading(false);
            return response.data; // Assuming the API returns an array of plans
        } catch (err) {
            setError(err);
            setIsLoading(false);
            return null;
        }
    }, []);

    const subscribeToPlan = useCallback(async (planId) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.post('/api/subscribe', { planId });
            setIsLoading(false);
            return response.data; // Assuming the API returns subscription confirmation
        } catch (err) {
            setError(err);
            setIsLoading(false);
            return null;
        }
    }, []);

    // You can add more functions as needed, for example, to change or cancel a plan

    return { isLoading, error, fetchSubscriptionPlans, subscribeToPlan };
};
