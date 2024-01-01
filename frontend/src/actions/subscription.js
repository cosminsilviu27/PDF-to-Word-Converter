// Action Types
import {
    SUBSCRIBE_TYPE,
    SUBSCRIPTION_SUCCESS,
    SUBSCRIPTION_FAILURE
} from './types';
// Action Creators

// This action could be dispatched to start the subscription process
export const subscribeToPlanAction = (plan) => ({
    type: SUBSCRIBE_TYPE,
    payload: plan
});

// This action could be dispatched on successful subscription
export const subscriptionSuccessAction = (confirmation) => ({
    type: SUBSCRIPTION_SUCCESS,
    payload: confirmation
});

// This action could be dispatched on subscription failure
export const subscriptionFailureAction = (error) => ({
    type: SUBSCRIPTION_FAILURE,
    payload: error
});

// More actions can be added as needed for other subscription-related functionalities
