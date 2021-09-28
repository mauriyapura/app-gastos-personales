
import React, { useContext } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route    
} from "react-router-dom";

import { AuthContext } from '../auth/AuthContext';
import Home from '../components/Home';
import { LoginScreen } from '../components/LoginScreen';

import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {

    const {user} = useContext(AuthContext);


    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute exact path="/login" isAuthenticated={user.logged} component={LoginScreen} />
                    <PrivateRoute path="/" isAuthenticated={user.logged} component={Home} />                                      
                </Switch>
            </div>
        </Router>
    )
}


