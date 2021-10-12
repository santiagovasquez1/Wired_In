require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { bdConnection } = require('./database/config');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
//Servidor
const app = express();

//configuar cors
app.use(cors());

//Lectura y parseo del body
app.use(morgan('dev'));
app.use(express.json());

//Conexion a bd
bdConnection();

//Carpeta con la info de la apirest
// app.use(express.static('public'));

//Rutas
app.use('/api/usuarios', require('./routes/usuario.routes'));
app.use('/api/login', require('./routes/auth.route'));
app.use('/api/ventas', require('./routes/ventas'));
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.PORT, () => {
	console.log('Servidor corriendo en el puerto ' + process.env.PORT);
});
