require('dotenv').config();
const express = require('express');
const cors = require('cors');

//Servidor
const app = express();

//configuar cors
app.use(cors());

//Lectura y parseo del body
app.use(express.json());
app.get('/', (req, res) => {
    body = {
        ok: true,
        msg: "Hola mundo"
    }
    res.json(body);
});

app.listen(process.env.PORT, () => {
    console.log("Servidor corriendo en el puerto " + process.env.PORT);
});