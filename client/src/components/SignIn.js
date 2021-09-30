import React, { useEffect, useRef, useState } from 'react';
import { reqSignIn } from '../helpers/reqSignIn';

export const SignIn = ({history}) => {

    const [problem, setProblem] = useState(null);
    const [error, setError] = useState("");
    const [data, setData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });
    
    const {email, password, confirmPassword} = data;

    const firstUpdate = useRef(true);
    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        } 
        console.log(problem)
        setError(problem)
        
    },[problem]);   

    const submitHandler = async(e)=>{
        e.preventDefault();
        const url = 'http://localhost:3001/api/v1/users';  
        if(password.length < 4 ){
            return setError("Las contraseñas deben ser de al menos 4 caracteres");
        }
        if(password === confirmPassword){
            console.log("Contraseñas sí coinciden");                        
        }else{
            console.log("Contraseñas no coinciden")
            return setError("Las contraseñas no coinciden");
        }

        const infoSignIn = await reqSignIn(url, email, password, setProblem);
        if(infoSignIn.success === true){
            console.log("Usted se ha registrado correctamente");
            console.log(infoSignIn)
            history.replace("/login");            
        }else{
            console.log("ni idea xq vino x aqui")
        }          
        
    }

    return (
        <div className="containerPrincipal col-lg-3">
            <h3>Crear una cuenta</h3>
            
            <form className="containerSecundario" onSubmit={submitHandler}>
                <div className="form-group " >
                    <label>Email: </label>
                    <br />
                    <input
                        type="text"
                        className="form-control" 
                        name="email"
                        value={data.email}
                        onChange={e=>setData({...data, email:e.target.value})} 
                    />                   
                    
                    <label>Contraseña: </label>
                    <br />
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={data.password}
                        onChange={e=>setData({...data, password:e.target.value})}
                        autoComplete="off" 
                    />
                    <label>Confirmar Contraseña: </label>
                    <br />
                    <input
                        type="password"
                        className="form-control"
                        name="confirmPassword"
                        value={data.confirmPassword}
                        onChange={e=>setData({...data, confirmPassword:e.target.value})}
                        autoComplete="off" 
                    />
                    
                    { (error!="") ? (<div className="error alert alert-danger mt-3 mb-0 animate__animated animate__fadeIn">{error}</div>) : "" }                    
                    <input type="submit" value="Login" className="btn btn-primary mt-3"/>
                </div>
            </form>
      </div>
    )
}
