
const { DataTypes } = require("sequelize");
const sequelize = require("../loaders/sequelize");


const User = sequelize.define('users',{

    email: {
        type: DataTypes.STRING(50),
        allowNull: false,        
        unique: true
    },
    password:{
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    enable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }

},{
    timestamps: false
});


module.exports = User;




