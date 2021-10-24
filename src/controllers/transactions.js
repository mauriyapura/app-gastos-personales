const express = require("express");
const Transaction = require("../models/transaction");
const User = require("../models/users");

require("../models/assocciations");

const getTransactions = async(req,res)=>{    

    const { id } = req.params;   

    const transactions = await Transaction.findAll({
        where:{
            userId: id            
        }             
    })   
    
    res.json(transactions)       
}

const postTransaction = async(req, res ) => {

    const {body} = req;
    // Es necesario el middleware de validacion de post para que no se cree el usuario si tiene el mismo email.
    try {
        const transaction = new Transaction(body);
        await transaction.save();
        res.json( transaction )

        
    } catch (error) {
        console.error(error);
        res.status(500)
        res.json({
            msg: 'Error al registrar la operación'
        })        
    }
}

const updateTransaction = async(req, res)=>{

    const { id } = req.params;
    const {body} = req;

    try {
        const transaction = await Transaction.findByPk(id);
        if( transaction){
            await transaction.update(body);
            res.json( transaction );
        }else{
            return res.status(404).json({
                msg: `No existe una operación con el id ${id}`
            });
        }        
    } catch (error) {
        console.error(error);
        res.status(500)
        res.json({
            msg: 'Error al actualizar la operación'
        })
    }
}

const deleteTransaction = async(req, res)=>{

    const { id } = req.params;       
    const transaction = await Transaction.findByPk(id)

    if( transaction ){
        await transaction.destroy();
        res.json({
            msg: `La operación con id ${id} eliminado!`
        });
    }else{
        return res.status(404).json({
            msg: `No existe una operación con el id ` + id
        });
    }        
} 

module.exports={
    getTransactions,
    postTransaction,
    updateTransaction,
    deleteTransaction
}