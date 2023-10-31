const express = require('express');
const app = express();
const PORT = process.env.port || 8080;
const { infoCursos } = require('./cursos/cursos');

//Routers

const routerProgramacion = require('./routers/programacion.js');
app.use('/api/cursos/programacion', routerProgramacion);

const routerMatematicas = require('./routers/matematicas.js');
app.use('/api/cursos/matematicas', routerMatematicas);

// Middleware                                   (Code that runs after every request and before every response)
routerProgramacion.use(express.json());         //To be able to proccess request's body in JSON format
routerMatematicas.use(express.json());

// Main Routing
app.get('/', (req, res) => {
    res.header('Cache-Control', 'max-age=7776000');
    res.header('Pragma', 'no-cache');
    res.header('Expires', '-1');

    res.send('My first Express Server.');
})

app.get('/api/cursos', (req, res) => {
    res.json(infoCursos);       // Method .json sends info in JSON format.
});

// Server
app.listen(PORT, () => {
    console.log(`Server listenning on port ${PORT}...`);
})