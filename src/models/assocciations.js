
const usuario = require("./users");
const operacion = require("./transaction");

usuario.hasMany(operacion);
operacion.belongsTo(usuario);









