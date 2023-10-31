const express = require('express');
const routerMatematicas = express.Router();
const { matematicas } = require('../cursos/cursos.js').infoCursos;

// GET
routerMatematicas.get('/', (req, res) => {
    res.send(matematicas);
})

routerMatematicas.get('/:theme', (req, res) => {
    const theme = req.params.theme;
    const results = matematicas.filter(cursos => cursos.tema === theme);

    if (results.length === 0) {
        res.send((404), `No curses of ${theme} were found`);
    } else {
        res.send(results);
    }
})


module.exports = routerMatematicas;