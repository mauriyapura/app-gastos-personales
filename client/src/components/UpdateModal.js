import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const UpdateModal = ({dataRequired, reducerCrud, saldoState}) => {

    const [formData, setFormData] = useState({
        id: "",
        type: "",
        description: "",
        amount: "",
        date: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); 
    
    useEffect(() => {
        setFormData(dataRequired)
    }, [dataRequired]); 
    
    const handleUpdate = async(e)=>{
        e.preventDefault();
        setLoading(true);
        if(formData.description.length < 3){
            return setError("La descripcion debe ser de al menos 3 caracteres")
        };
        if(formData.amount === ""){
            return setError("Ingrese el monto")
        };        
        
        const response = await axios({
            method: "put",
            url: `http://localhost:3001/api/v1/transactions/${formData.id}`,
            data: {
                description: formData.description,
                amount: formData.amount
            }
        });        
        
        reducerCrud({
            type: "update",            
            payload: formData
        });
        let originalAmount = dataRequired.amount
        let currentAmount = +formData.amount
        let difference = currentAmount - originalAmount;        
        saldoState(prev=> dataRequired.type === "Ingreso" ? prev + difference : prev - difference);

        setError("");        

        let myModalEl = document.getElementById('modal1');
        let modal = bootstrap.Modal.getInstance(myModalEl);
        modal.hide();
        setLoading(false);       
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
                                    <button type="submit" className="btn btn-primary" onClick={handleUpdate} id="updateBtn" disabled={loading}>Aceptar</button>
                                    <button type="button" className="btn btn-light" data-bs-dismiss="modal" disabled={loading}>Cancelar</button>
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
