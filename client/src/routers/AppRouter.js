import React, { useContext } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route    
} from "react-router-dom";

import { AuthContext } from '../auth/AuthContext';
import Home from '../components/Home';
import { LoginForm } from '../components/Login';
import { SignIn } from '../components/SignIn';

import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { Navbar } from '../components/ui/NavBar';

export const AppRouter = () => {

    const {user} = useContext(AuthContext);


    return (
        <Router>
            <Navbar />

            <div className="m-3">
                <Switch>
                    <PublicRoute exact path="/login" isAuthenticated={user.logged} component={LoginForm} />
                    <PublicRoute exact path="/signin" isAuthenticated={user.logged} component={SignIn} />
                    <PrivateRoute path="/" isAuthenticated={user.logged} component={Home} />                                      
                </Switch>
            </div>
        </Router>
    )
}


