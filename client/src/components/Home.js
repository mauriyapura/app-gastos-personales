import React, { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { crudReducer } from './reducers/crudReducer';
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';

const Home = () => {     
    
    const {user: {user_id}, dispatchContext} = useContext(AuthContext);   
    
    const [counterId, setCounterId] = useState(0);    
    const [data, setData] = useState({
        id: new Date().getTime(),
        type: "",
        date: (new Date).toLocaleDateString('en-GB'),
        description: "",
        amount: "",        
    });       

    const [registros, dispatch] = useReducer(crudReducer, []);    
    
    useEffect(() => {
        const getData = async () => {
            const response = await axios(`http://localhost:3001/api/v1/transactions/${user_id}`);
            //console.log(response.data, "clg del useEffect1")    

            response.data.forEach((element, i) => {
                dispatch({
                    type: "add",
                    payload: {...element, date: element.date.split('-').reverse().join('/')}
                })
                setCounterId(element.id + 1) ;     
                console.log(element, "clg del useEffect2")
            });
        }        
        getData()
    },[])   
    
    const handleAdd = (e)=>{
        e.preventDefault();
        //console.log("operacion agregada");
        //console.log(data);
        setData({...data, id: counterId + 1})

        const postData = async () => {
            const response = await axios({
                method: 'post',
                url: "http://localhost:3001/api/v1/transactions",
                data: {
                    type: data.type,
                    description: data.description,
                    amount: data.amount,
                    userId: user_id,
                    date: (data.date).split('/').reverse().join('-')
                }
            });
            //console.log(response.data, "clg del useEffect1")    
        }
        postData();
        setCounterId(counterId + 1);
        dispatch({
            type: "add",
            payload: {...data, id: counterId}
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
            <div className="container-fluid row d-flex justify-content-between" >
                
                <div className="col-12 order-2 order-md-1 col-md-8 mt-2 ">
                    
                    <div className="table-responsive">
                    <table className="table table-striped table-hover table-sm table-bordered">
                        <caption>Lista de operaciones guardadas</caption>
                        <thead>
                            <tr className="table-primary">                            
                                <th>Tipo</th>
                                <th>Fecha</th>
                                <th>Concepto</th>
                                <th>Monto</th>                            
                                <th>Opciones</th>            
                            </tr>
                        </thead>
                        <tbody>                              
                            {
                                registros.map((registro)=>(                                    
                                    <tr className="table" key={registro.id}>
                                        <td className="align-middle">{registro.type}</td>
                                        <td className="align-middle">{registro.date}</td>
                                        <td className="align-middle">{registro.description}</td>
                                        <td className="align-middle">{registro.amount}</td>
                                        <td>
                                            <button className="btn btn-info m-1" >Modificar</button>
                                            <button className="btn btn-danger m-1" onClick={()=>handleDelete(registro.id)}>Eliminar</button>
                                        </td>
                                    </tr>                                 
                                ))
                            }
                        </tbody>
                    </table>
                    </div>                                                          
                </div>
                
                <div className="col-12 order-1 order-md-2 col-md-4 mt-2 formulario">
                    <h3 className="d-flex justify-content-center">Agregar Ingreso o Egreso</h3>                    
                    <form onSubmit={handleAdd}>
                        <div className="row">
                            <div className="col-12 mb-2 d-flex justify-content-center align-items-center">                               
                                <input type="radio" className="ms-2 me-2" id="ing" name="ingreso-egreso" value="Ingreso" onChange={e=> setData({...data, type: e.target.value})}/>
                                <label htmlFor="ing" className="form-check-label">INGRESO</label>                            
                                <input type="radio" className="ms-2 me-2" id="egr" name="ingreso-egreso" value="Egreso" onChange={e=> setData({...data, type: e.target.value})}/>
                                <label htmlFor="egr" className="form-check-label">EGRESO</label>   
                            </div>
                            <div className="col-12 mb-2">
                                <input 
                                    type="text"
                                    placeholder="Ingrese la descripción" 
                                    name="description" 
                                    autoComplete="off" 
                                    className="form-control"
                                    value={data.concepto} 
                                    onChange={e=>setData({...data, description:e.target.value})}
                                />
                            </div>
                            <div className="col-12 mb-2">
                                <input 
                                    type="number" 
                                    placeholder="Ingrese el monto ($)" 
                                    name="amount"
                                    autoComplete="off" 
                                    className="form-control"
                                    value={data.monto}
                                    onChange={e=>setData({...data, amount: e.target.value})}
                                />
                            </div>
                            <div className="col-12 mb-2 d-flex justify-content-center">
                                <button type="submit" className="btn btn-primary">
                                    Agregar
                                </button>
                            </div>
                        </div>                                              
                    </form>                    
                </div>
            </div>
        </div>
    )
}

export default Home