let mysql = require("mysql2");

let conexion = mysql.createConnection({
    host: "localhost",
    database: "prueba",
    user: "root",
    password: "5485Roma"
});

conexion.connect(function(error){
    if(error){
        throw error;
    } else {
        console.log("Conexion exitosa");
    }
});

conexion.end();