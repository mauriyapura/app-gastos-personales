import React, {useState, useEffect, useContext} from 'react';
import { reqLogin } from '../helpers/reqLogin';

import { AuthContext } from '../auth/AuthContext';
import { types } from '../types/types';

export const LoginForm = ({history}) => {

    const {dispatch} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [details, setDetails] = useState({
        email:"",
        password:""
    });    

    const submitHandler = async(e)=>{
        e.preventDefault();     
        setLoading(true);     
        const url = 'http://localhost:3001/api/v1/users/login';        
        const infoLogin = await reqLogin(url, details);               
        const lastPath = localStorage.getItem("lastPath") || "/" ;        
        if(infoLogin.success === true){
            dispatch({
                type: types.login,
                payload: {
                    email: infoLogin.email,
                    user_id: infoLogin.user_id
                }
            });
            history.replace(lastPath);    
            setLoading(false);      
        }else{            
            setError(infoLogin.message);
            setLoading(false); 
        }               
    }   

    return (
        <div className='row justify-content-center'>

            <div className="containerPrincipal col-sm-4 ">
                <form className="containerSecundario" onSubmit={submitHandler}>
                    <h3>INICIAR SESIÓN</h3>
                    <div className="form-group " >
                        <label>Email: </label>
                        <br />
                        <input
                            type="text"
                            className="form-control" 
                            name="email"
                            value={details.email}
                            onChange={e=>setDetails({...details, email:e.target.value})} 
                        />
                        
                        <label>Contraseña: </label>
                        <br />
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={details.password}
                            onChange={e=>setDetails({...details, password:e.target.value})}
                            autoComplete="off" 
                        />
                        
                        { (error!="") ? (<div className="error alert alert-danger mt-3 mb-0 animate__animated animate__fadeIn">{error}</div>) : "" }                    
                        <input type="submit" value="Login" className="btn btn-primary mt-3" disabled={loading}/>
                    </div>
                </form>
            </div>

        </div>
    )
}

