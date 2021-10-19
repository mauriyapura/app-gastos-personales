const { DataTypes } = require("sequelize");
const sequelize = require("../loaders/sequelize/index");

const Transaction = sequelize.define('transactions',{

    type: {
        type: DataTypes.STRING(50),
        allowNull: false,        
    },
    description: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }  

},{
    timestamps: false
});


module.exports = Transaction;

