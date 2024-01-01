import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Activate from './containers/Activate';
import Subscription from './components/Subscription';
import UploadFile from './components/UploadFile';

import { Provider } from 'react-redux';
import store from './store';

import Layout from './hocs/Layout';

const App = () => (
    <Provider store={store}>
        <Router>
            <Layout>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/signup' component={Signup} />
                    <Route exact path='/activate/:uid/:token' component={Activate} />
                    <Route exact path='/subscription' component={Subscription} />
                    <Route exact path='/pdf-to-word' component={UploadFile} />
                </Switch>
            </Layout>
        </Router>
    </Provider>
);

export default App;