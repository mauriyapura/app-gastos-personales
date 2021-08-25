const express = require("express");
const User = require("../models/users");

const getUsuarios = async(req,res) => {

    const usuarios = await User.findAll();    // Igual que mongoose pero sequelize devuelve promesa
    res.json({
        msg: 'getusuarios'
    })

}








