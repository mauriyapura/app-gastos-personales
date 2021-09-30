import React, { useContext } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';

export const Navbar = () => {

    const {user: {email, logged}, dispatch} = useContext(AuthContext);    
    const history = useHistory();    

    const handleLogout = ()=>{

        history.replace("/login");
        dispatch({
            type: types.logout
        });
    }
    const handleSignIn = ()=>{

        history.replace("/signin");
        dispatch({
            type: types.signin
        })
        console.log("Entrando a Sign In")
    }
    const handleLogin = ()=>{

        history.replace("/login");       
        
    }


    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">            
            <div className="ms-4 title">
                APLICACION DE GASTOS
            </div>                                  

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                <ul className="navbar-nav ms-auto me-4">           
                                        
                    { 
                        (logged)
                            ? ( 
                                <>
                                <span className="nav-item nav-link text-info">{email}</span>
                                <button className="nav-item nav-link btn" onClick={handleLogout}>Logout</button>
                                </>
                              ) 
                            : ( 
                                <>
                                <button className="nav-item nav-link btn" onClick={handleLogin}>LogIn</button>
                                <button className="nav-item nav-link btn" onClick={handleSignIn}>SignIn</button>
                                </>
                              ) 
                    }                 
                    
                </ul>
            </div>
        </nav>
    )
}

