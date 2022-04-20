import React, { useContext, useEffect, useReducer, useState } from 'react';
import { crudReducer } from './reducers/crudReducer';
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';
import { UpdateModal } from './UpdateModal';

const Home = () => {     
    
    const {user: {user_id}, dispatchContext} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [checking, setChecking] = useState(true);
    const [error, setError] = useState("");  
    const [saldo, setSaldo] = useState(0);    
    const [counterId, setCounterId] = useState(0);    
    const [data, setData] = useState({
        id: new Date().getTime(),
        type: "",
        date: (new Date).toLocaleDateString('en-GB'),
        description: "",
        amount: "",        
    });       
    const [selectedRow, setSelectedRow] = useState({
        id: "",
        type: "",
        description: "",
        amount: "",
        date: ""
    })
    const [registros, dispatch] = useReducer(crudReducer, []);
        
    useEffect(() => {
        const getData = async () => {
            const response = await axios(`http://localhost:3001/api/v1/transactions/${user_id}`);            
            response.data.forEach((element, i) => {
                dispatch({
                    type: "add",
                    payload: {...element, date: element.date.split('-').reverse().join('/')}
                })                
                setSaldo(prev => element.type == "Ingreso" ? prev + element.amount : prev - element.amount);                                            
                setCounterId(element.id + 1); 
                setChecking(false);

            });
        }        
        getData();        
    },[])   
    
    const handleAdd = (e)=>{
        e.preventDefault();
        setLoading(true);
        if(data.type === ""){
            setLoading(false);
            return setError("Selecciona si es ingreso o egreso")
        };
        if(data.description.length < 3){
            setLoading(false);
            return setError("La descripcion debe ser de al menos 3 caracteres")
        };
        if(data.amount === ""){
            setLoading(false);
            return setError("Ingrese el monto")
        }; 
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
        }
        let amountNumber = +data.amount;
        setSaldo(prev => data.type == "Ingreso" ? prev + amountNumber : prev - amountNumber);                                      
        postData();
        setCounterId(counterId + 1);
        dispatch({
            type: "add",
            payload: {...data, id: counterId}
        });
        setLoading(false);        
    }

    const handleDelete = async(idDelete, tipo, monto)=>{        
        
        const reponse = await axios({
            method: "delete",
            url: `http://localhost:3001/api/v1/transactions/${idDelete}`
        });        
               
        dispatch({
            type: "delete",
            payload: idDelete
        });
        setSaldo(prev => tipo == "Ingreso" ? prev - monto : prev + monto);                                 
    }    

    return (
        <div>                   
            <div className="container-fluid row d-flex justify-content-between" >                
                { (checking===true) ? (<span className="mb-2"><b>Cargando registros...</b></span>) : "" }
                <div className="col-12 order-2 order-md-1 col-md-8 mt-2 ">                    
                    <div className="table-responsive">
                        <table className="table table-striped table-hover table-sm ">
                            <caption>Saldo: ${saldo}</caption>
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
                                    <tr key={registro.id}>
                                        <td className="align-middle">{registro.type}</td>
                                        <td className="align-middle">{registro.date}</td>
                                        <td className="align-middle">{registro.description}</td>
                                        <td className="align-middle">{registro.amount}</td>
                                        <td>
                                            <button className="btn btn-info m-1" onClick={()=>setSelectedRow(registro)} data-bs-toggle="modal" data-bs-target="#modal1">Modificar</button>
                                            <button className="btn btn-danger m-1" onClick={()=>handleDelete(registro.id, registro.type, registro.amount)}>Eliminar</button>
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
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    Agregar
                                </button>
                            </div>
                            { (error!="") ? (<div className="error alert alert-danger m-auto animate__animated animate__fadeIn">{error}</div>) : "" }             
                        </div>                                              
                    </form>                    
                </div>
            </div>
            <UpdateModal dataRequired={selectedRow} reducerCrud={dispatch} saldoState={setSaldo}/>
        </div>
    )
}
export default Home