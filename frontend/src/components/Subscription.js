import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { subscribeToPlanAction, subscriptionSuccessAction, subscriptionFailureAction } from '../actions/subscription';
import { useApiSubscriptionService } from '../hooks/useApiSubscriptionService'; 
import { useApiUploadService } from '../hooks/useApiUploadService';

const Subscription = () => {
    const location = useLocation();

    const initialPlanId = location.state?.selectedPlanId || null;
    const [selectedPlan, setSelectedPlan] = useState(initialPlanId);

    const [subscription, setSubscription] = useState([]);

    const dispatch = useDispatch();
    const subscriptionReceived = useSelector(state => state.subscription);
    const { isLoading, error, fetchSubscriptionPlans, subscribeToPlan } = useApiSubscriptionService();

    const { getSubscriptionsTypes, axiosConfig } = useApiUploadService(); 

    useEffect(() => {
        const loadPlans = async () => {
            const plans = await fetchSubscriptionPlans();
            // Handle the fetched plans here
        };
        loadPlans();
        fetchSubscriptionDetails();
    }, [fetchSubscriptionPlans]);

    const fetchSubscriptionDetails = async () => {
        try {
            const subscriptionList = await getSubscriptionsTypes();
            setSubscription(Array.isArray(subscriptionList) ? subscriptionList : []); 
        } catch (error) {
            setSubscription([]); 
        }
    };

    const handleSubscribe = async () => {
        if (selectedPlan) {
            dispatch(subscribeToPlanAction(selectedPlan));
            try {
                const subscriptionConfirmation = await subscribeToPlan(selectedPlan.id);
                if (subscriptionConfirmation) {
                    dispatch(subscriptionSuccessAction(subscriptionConfirmation));
                }
            } catch (error) {
                dispatch(subscriptionFailureAction(error));
            }
        }
    };

    const selectPlanHandler = (id) => {
        setSelectedPlan(id);
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); 
    
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/stripe/create-checkout-session`, {}, axiosConfig());
            window.location.href = response.data.url;
        } catch (error) {
            console.error('Error creating checkout session:', error);
        }
    };

    return (
        <div className="container-fluid">
            <div className="subscription-plans mt-4">
            <h2 className="text-center alert alert-danger mt-2">Your chosen {selectedPlan} subscription plan</h2>
            <div className="row align-items-center">
                {Array.isArray(subscription) && subscription
                    .filter(subscription_type => selectedPlan === subscription_type.id)
                    .map(filteredSubscription => (
                        <div key={filteredSubscription.id} className="col-md-4 mb-4">
                            <div 
                                className={`card text-center ${selectedPlan === filteredSubscription.id ? 'border-primary' : ''}`}
                                onClick={() => selectPlanHandler(filteredSubscription.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                <h4 className="card-header">{filteredSubscription.subscription_type}</h4>
                                <div className="card-body">
                                    <h5 className="card-title">{filteredSubscription.price}</h5>
                                    <p className="card-text">{filteredSubscription.features}</p>
                                    <p className="card-text">{filteredSubscription.available}</p>
                                    <p className="card-text">{filteredSubscription.cancel}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
                <div className="d-flex justify-content-center w-100">
                    <form onSubmit={handleSubmit} className="mt-2">
                        <button type="submit" className="btn btn-primary">Proceed to Checkout</button>
                    </form>
                </div>
            </div>
            <h2 className="text-center alert alert-info">Subscription Plans</h2>
            <div className="row">
                {Array.isArray(subscription) && subscription.map(subscription_type => (
                    <div key={subscription_type.id} className="col-md-4 mb-4">
                        <div 
                            className={`card text-center ${selectedPlan === subscription_type.id ? 'border-primary' : ''}`}
                            onClick={() => selectPlanHandler(subscription_type.id)}
                            style={{ cursor: 'pointer' }}
                        >
                            <h3 className="card-header">{subscription_type.subscription_type}<b></b></h3>
                            <div className="card-body">
                                <h5 className="card-title">{subscription_type.price}</h5>
                                <p className="card-text">{subscription_type.features}</p>
                                <p className="card-text">{subscription_type.available}</p>
                                <p className="card-text">{subscription_type.cancel}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            </div>
        </div>
    );
};

export default Subscription;
