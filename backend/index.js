require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { bdConnection } = require('./database/config');
//Servidor
const app = express();

//configuar cors
app.use(cors());

//Lectura y parseo del body
app.use(morgan('dev'));
app.use(express.json());

//Conexion a bd
bdConnection();

//
app.use(express.static('public'));

app.listen(process.env.PORT, () => {
    console.log("Servidor corriendo en el puerto " + process.env.PORT);
});