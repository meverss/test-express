const express = require('express');
const routerProgramacion = express.Router();
const { programacion } = require('../cursos/cursos.js').infoCursos;

// GET
routerProgramacion.get('/', (req, res) => {
    res.send(programacion);
})

// Routing with parameters

routerProgramacion.get('/:language', (req, res) => {
    const language = req.params.language;
    const results = infoCursos.programacion.filter(cursos => cursos.lenguaje === language);

    function orderResults(order, param, value) {
        const query = `req.query.${param}`;
        const patternAsc = `b.${value} - a.${value}`;
        const patternDesc = `a.${value} - b.${value}`;

        switch (order) {
            case "desc":
                if (eval(query) === value) {
                    return res.send(JSON.stringify(results.sort((a, b) => eval(patternAsc))));
                }
            case "asc":
                if (query === value) {
                    return res.send(JSON.stringify(results.sort((a, b) => eval(patternDesc))));
                }
            default:
                res.send(JSON.stringify(results));
        }
    }

    if (results.length === 0) {
        res.send((404), `No curses of ${language} were found`);
    }

    orderResults('asc', 'order', 'vistas');

})

routerProgramacion.get('/:language/:level', (req, res) => {
    const language = req.params.language;
    const level = req.params.level;
    const results = infoCursos.programacion.filter(cursos => cursos.lenguaje === language && cursos.nivel === level);

    if (results.length === 0) {
        res.send((404), `No curses of ${language} level ${level} were found.`);
    } else {
        res.send(JSON.stringify(results));
    }
})

// POST
routerProgramacion.post('/', (req, res) => {
    let newCourse = req.body;
    console.log('New POST request');
    programacion.push(newCourse);
    res.send(programacion);
});

// PUT
routerProgramacion.put('/:id', (req, res) => {
    const updatedCourse = req.body;
    const id = req.params.id;
    const index = programacion.findIndex(curso => curso.id == id);

    if (index >= 0) {
        programacion[index] = updatedCourse;
    }

    res.send(programacion);

})

// PATCH
routerProgramacion.patch('/:id', (req, res) => {
    const updatedValue = req.body;
    const id = req.params.id;
    const index = programacion.findIndex(curso => curso.id == id);

    if (index >= 0) {
        const infoToModify = programacion[index];
        Object.assign(infoToModify, updatedValue);
    }

    res.send(programacion);

})

// DELETE
routerProgramacion.delete('/:id', (req, res) => {
    const id = req.params.id;
    const index = programacion.findIndex(curso => curso.id == id);

    if (index >= 0) {
        programacion.splice(index, 1)
    };

    res.send(programacion);

})

module.exports = routerProgramacion;