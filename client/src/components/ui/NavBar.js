import React, { useContext } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';

export const Navbar = () => {

    const {user: {email, logged, user_id}, dispatch} = useContext(AuthContext);    
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
            <div className="container">           
                
                <a href="#" className="navbar-brand">APP DE GASTOS</a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#menu"
                    aria-controls="menu"
                    aria-expanded="false"
                    aria-label="Mostrar / Ocultar Menu"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>                                  

                <div className="collapse navbar-collapse" id="menu">
                    <ul className="navbar-nav ms-auto me-4 mb-2">           
                                        
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
            </div>            
        </nav>
    )
}

