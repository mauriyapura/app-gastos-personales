import React, { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { crudReducer } from './reducers/crudReducer';

import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';

const Home = () => {     
    
    const {user: {user_id}, dispatchContext} = useContext(AuthContext);   
    
    const [idd, setIdd] = useState(0);
    
    const [data, setData] = useState({
        id: new Date().getTime(),
        type: "",
        fecha: (new Date).toLocaleDateString('en-GB'),
        description: "",
        amount: "",        
    });       

    const [registros, dispatch] = useReducer(crudReducer, []);
     
    //let idBackend = 0;
    
    useEffect(() => {
        const getData = async () => {
            const response = await axios(`http://localhost:3001/api/v1/transactions/${user_id}`);
            console.log(response.data, "clg del useEffect1")    

            response.data.forEach((element, i) => {
                dispatch({
                    type: "add",
                    payload: element
                })
                setIdd(element.id + 1) ;     
                console.log(element, "clg del useEffect2")
            });
        }        
        getData()
    },[])   
    
    const handleAdd = (e)=>{
        e.preventDefault();
        console.log("operacion agregada");
        console.log(data);
        setData({...data, id: idd + 1})

        const postData = async () => {
            const response = await axios({
                method: 'post',
                url: "http://localhost:3001/api/v1/transactions",
                data: {
                    type: data.type,
                    description: data.description,
                    amount: data.amount,
                    userId: user_id
                }
            });
            console.log(response.data, "clg del useEffect1")    
        }
        postData();
        setIdd(idd + 1);
        dispatch({
            type: "add",
            payload: {...data, id: idd}
        })       
    }

    const handleDelete = (idDelete)=>{
        
        const deleteData = async()=>{
            const reponse = await axios({
                method: "delete",
                url: `http://localhost:3001/api/v1/transactions/${idDelete}`
            })
        }
        deleteData();
        dispatch({
            type: "delete",
            payload: idDelete
        })
    }
    

    return (
        <div>
            <div>            
                <h3>DASHBOARD</h3>
            </div>
            <div className="container-fluid row" >
                
                <div className="col-8 me-2">
                    <div className="row ">
                        <div className="col border border-dark text-center">
                            Tipo
                        </div>
                        <div className="col border border-dark text-center">
                            Fecha
                        </div>  
                        <div className="col-5 border border-dark text-center">
                            Concepto
                        </div>  
                        <div className="col border border-dark text-center">
                            Monto
                        </div> 
                        <div className="col-3 border border-dark text-center">
                            Actualizar o Eliminar
                        </div>                        
                    </div>
                    {                       
                        registros.map((registro)=>(
                            <div className="row" key={registro.id}>
                            <div className="col border border-dark text-center">
                                    {registro.type}
                                </div>
                                <div className="col border border-dark text-center">
                                    {registro.fecha}
                                </div>  
                                <div className="col-5 border border-dark text-center">
                                    <p>{registro.description}</p>
                                </div>  
                                <div className="col border border-dark text-center">
                                    {registro.amount}
                                </div> 
                                <div className="col-3 border border-dark text-center">
                                    <button className="btn btn-info m-1" >Modificar</button>
                                    <button className="btn btn-danger m-1" onClick={()=>handleDelete(registro.id)}>Eliminar</button>
                                </div>
                            </div>
                        ))                        
                    }                                       
                </div>

                <div className="col ms-2 border border-primary">
                    <h3>Agregar Ingreso o Egreso</h3>
                    <div>
                        <form onSubmit={handleAdd}>
                            <input type="radio" id="ing" name="ingreso-egreso" value="Ingreso" onChange={e=> setData({...data, type: e.target.value})}/>
                            <label htmlFor="ing" className="ms-2 me-2">INGRESO</label>
                            <input type="radio" id="egr" name="ingreso-egreso" value="Egreso" onChange={e=> setData({...data, type: e.target.value})}/>
                            <label htmlFor="egr" className="ms-2 me-2">EGRESO</label>
                            <br />                            
                            <input 
                                type="text"
                                placeholder="Ingrese el concepto de la operación" 
                                name="description" 
                                autoComplete="off" 
                                className="form-control mb-2"
                                value={data.concepto} 
                                onChange={e=>setData({...data, description:e.target.value})}
                            />
                            <input 
                                type="number" 
                                placeholder="Ingrese el monto ($) de la operación" 
                                name="amount"
                                autoComplete="off" 
                                className="form-control mb-2"
                                value={data.monto}
                                onChange={e=>setData({...data, amount: e.target.value})}
                            />
                            <button type="submit" className="btn btn-primary mb-2">
                                Agregar
                            </button>
                               

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home

