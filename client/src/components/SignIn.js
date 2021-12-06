import React, { useEffect, useRef, useState } from 'react';
import { reqSignIn } from '../helpers/reqSignIn';

export const SignIn = ({history}) => {

    const [loading, setLoading] = useState(false);
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
        setLoading(true);
        const url = 'http://localhost:3001/api/v1/users';  
        if(password.length < 4 ){
            setLoading(false);
            return setError("Las contraseñas deben ser de al menos 4 caracteres");
        }
        if(password === confirmPassword){
            setLoading(false);
            console.log("Contraseñas sí coinciden");                        
        }else{
            setLoading(false);
            console.log("Contraseñas no coinciden")
            return setError("Las contraseñas no coinciden");
        }

        const infoSignIn = await reqSignIn(url, email, password, setProblem);
        if(infoSignIn.success === true){
            setLoading(false);            
            history.replace("/login");            
            window.alert("Usted se ha registrado correctamente");
        }else{
            setLoading(false);
            console.log("error al registrarse")
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
                    <input type="submit" value="Login" className="btn btn-primary mt-3" disabled={loading}/>
                </div>
            </form>
      </div>
    )
}
