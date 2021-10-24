
import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';

export const UpdateModal = ({dataRequired, reducerCrud}) => {

    const [formData, setFormData] = useState({
        id: "",
        type: "",
        description: "",
        amount: "",
        date: ""
    });
    const [error, setError] = useState("")
    const modalUpdate = document.querySelector("#modal1");
    const sombraModal = document.querySelector(".modal-backdrop");
    const bodyxd = document.body
    useEffect(() => {
        setFormData(dataRequired)
    }, [dataRequired]);     
    

    const handleUpdate = (e)=>{
        e.preventDefault();
        if(formData.description.length < 3){
            return setError("La descripcion debe ser de al menos 3 caracteres")
        };
        if(formData.amount === ""){
            return setError("Ingrese el monto")
        };
        
        const updateData = async()=>{
            const response = await axios({
                method: "put",
                url: `http://localhost:3001/api/v1/transactions/${formData.id}`,
                data: {
                    description: formData.description,
                    amount: formData.amount
                }
            })
        };
        updateData();
        reducerCrud({
            type: "update",            
            payload: formData
        });
        setError("");        
        modalUpdate.setAttribute("style", "display:none")
        modalUpdate.setAttribute("class", "modal fade")
        modalUpdate.setAttribute("aria-hidden", "true")
        modalUpdate.removeAttribute("role")
        modalUpdate.removeAttribute("aria-modal")
        sombraModal.remove();
        bodyxd.setAttribute("class", "")
        bodyxd.setAttribute("style", "")
    }

    return (         
        <div className="modal fade" id="modal1" tabIndex="-1" aria-hidden="true" aria-labelledby="label-modal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5>Modificar registro</h5>
                    </div>
                    <div className="modal-body">
                        
                        <form onSubmit={handleUpdate}>
                            <div className="row">                          
                                <div className="col-12 mb-2">
                                    <input 
                                        type="text"
                                        placeholder="Ingrese la descripción" 
                                        name="description" 
                                        autoComplete="off" 
                                        className="form-control"
                                        value={formData.description} 
                                        onChange={e=>setFormData({...formData, description:e.target.value})}
                                    />
                                </div>
                                <div className="col-12 mb-2">
                                    <input 
                                        type="number" 
                                        placeholder="Ingrese el monto ($)" 
                                        name="amount"
                                        autoComplete="off" 
                                        className="form-control"
                                        value={formData.amount}
                                        onChange={e=>setFormData({...formData, amount: e.target.value})}
                                    />
                                </div>
                                <div className="col-12 d-flex justify-content-center">
                                    <button type="submit" className="btn btn-primary" onClick={handleUpdate} id="updateBtn">Aceptar</button>
                                    <button type="button" className="btn btn-light" data-bs-dismiss="modal">Cancelar</button>
                                </div>
                            </div>                                              
                        </form>                       
                    </div>
                    <div className="modal-footer">
                    { (error!="") ? (<div className="error alert alert-danger m-auto animate__animated animate__fadeIn">{error}</div>) : "" }                   
                    </div>

                </div>
            </div>
        </div>
    )
}




