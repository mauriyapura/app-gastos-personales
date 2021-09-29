import React, {useState, useEffect, useContext} from 'react';
import { useHistory } from 'react-router';
import { reqLogin } from '../helpers/requestAjax';

import { AuthContext } from '../auth/AuthContext';
import { types } from '../types/types';

export const LoginForm = ({history}) => {

    const {dispatch} = useContext(AuthContext);

    const [details, setDetails] = useState({
        email:"",
        password:""
    });  
    //let history = useHistory();
    let error = "";

    const submitHandler = async(e)=>{
        e.preventDefault();     
        const url = 'http://localhost:3001/api/v1/users/login';        
        const infoLogin = await reqLogin(url, details);       
        const lastPath = localStorage.getItem("lastPath") || "/" ;        
             
        if(infoLogin){
            dispatch({
                type: types.login,
                payload: {
                    email: infoLogin.data.email
                }
            });
            history.replace(lastPath);      
            console.log(infoLogin.data)
        }else{
            error = `Error de login`
        }
               
    }

    return (
        <div className="containerPrincipal col-lg-3">
            <form className="containerSecundario" onSubmit={submitHandler}>
                <div className="form-group " >
                    <label>Email Address: </label>
                    <br />
                    <input
                        type="text"
                        className="form-control" 
                        name="email"
                        value={details.email}
                        onChange={e=>setDetails({...details, email:e.target.value})} 
                    />
                    <br />
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
                    <br />
                    <input type="submit" value="Login" className="btn btn-primary"/>
                    { (error!="") ? (<div className="error alert alert-danger">{error}</div>) : "" }                    
                </div>
            </form>
      </div>
    )
}

