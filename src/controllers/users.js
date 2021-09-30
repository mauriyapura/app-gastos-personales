const express = require("express");
const User = require("../models/users");
const bcrypt = require("bcrypt");



const getUser = async(req,res) => {

    const {email, password} = req.query;
    console.log("email es: ", email);
    const queryPassword = await bcrypt.hash(password, 10);
    const user = await User.findOne({
        where: {
            email: email,
            password: queryPassword
        }
    }); 

    if(user){
        res.json(user); 
    }else{
        return res.status(404).json({
            msg: `Email o contraseña incorrecta`
        });
    }    
}


const postUser = async(req, res ) => {

    const {email, password} = req.body;
    
    try {
        const newUser = new User({email, password});        
        await newUser.save();
        //res.json( newUser );
        res.json({success:true})
        
    } catch (error) {
        console.error(error);
        res.status(404)
        res.json({
            success: false,
            msg: 'Hable con el administrador'
        })        
    }
}

const updateUser = async(req, res)=>{

    const { id } = req;
    const {body} = req;

    try {

        const user = await User.findByPk(id);
        if( user){
            await user.update(body);
            res.json(user);
        }else{
            return res.status(404).json({
                msg: `No existe un usuario con el id ${id}`
            });
        }
        
    } catch (error) {
        console.error(error);
        res.status(500)
        res.json({
            msg: 'Hable con el administrador'
        })
    }
}


const deleteUser = async(req, res)=>{

    const { id } = req.params;       
    const user = await User.findByPk(id)

    if( user ){
        await user.destroy();
        res.json({
            msg: `Usuario con id ${id} eliminado!`
        });
    }else{
        return res.status(404).json({
            msg: `No existe un usuario con el id ` + id
        });
    }        
    
}



module.exports = {    
    getUser,
    postUser,
    updateUser,
    deleteUser
} 




