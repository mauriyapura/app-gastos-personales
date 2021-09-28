import React, {useState, useEffect} from 'react';
import axios from "axios";
import { useHistory } from 'react-router';

const LoginForm = ({Login, error}) => {

    const [details, setDetails] = useState({
        email:"",
        password:""
    });  
    let history = useHistory();

    const submitHandler = async(e)=>{
        e.preventDefault();        
        
        const reqData = await axios({
            method: 'post',
            url: 'http://localhost:3001/api/v1/users/login',
            data: details,
            responseType: 'json'
        })            
            .catch(err=>console.log("falló login"))        
        
        if(!reqData){
            Login(reqData)
            history.push("/") 
        }else{
            Login(reqData.data)
            history.push("/"); 
        }         
    }

    return (
        <div className="containerPrincipal col-lg-4">
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
                    />
                    <br />
                    <input type="submit" value="Login" className="btn btn-primary"/>
                    { (error!="") ? (<div className="error alert alert-danger">{error}</div>) : "" }                    
                </div>
            </form>
      </div>
    )
}

export default LoginForm
