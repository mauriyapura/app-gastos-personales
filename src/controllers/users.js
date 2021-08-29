const express = require("express");
const User = require("../models/users");



const getUser = async(req,res) => {

    const {email, password} = req.query;
    console.log("email es: ", email)
    const user = await User.findOne({
        where: {
            email: email,
            password: password
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

    const {body} = req;
    // Es necesario el middleware de validacion de post para que no se cree el usuario si tiene el mismo email.
    try {
        const user = new User(body);
        await user.save();
        res.json( user )

        
    } catch (error) {
        console.error(error);
        res.status(404)
        res.json({
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




