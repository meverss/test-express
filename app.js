const express = require('express');
const app = express();
const PORT = process.env.port || 8080;

const { infoCursos } = require('./cursos');

// Routing
app.get('/', (req, res) => {
    res.send('My first Express Server. Cursos ')
})

app.get('/api/cursos', (req, res) => {
    res.send(JSON.stringify(infoCursos));
})

app.get('/api/cursos/programacion', (req, res) => {
    res.send(JSON.stringify(infoCursos.programacion));
})

app.get('/api/cursos/matematicas', (req, res) => {
    res.send(JSON.stringify(infoCursos.matematicas));
})

// Routing with parameters
app.get('/api/cursos/programacion/:language', (req, res) => {
    const language = req.params.language;
    const results = infoCursos.programacion.filter(cursos => cursos.lenguaje === language);

    if (results.length === 0) {
        res.send((404), `No curses of ${language} were found`);
    } else {
        res.send(JSON.stringify(results));
    }
})

app.get('/api/cursos/matematicas/:theme', (req, res) => {
    const theme = req.params.theme;
    const results = infoCursos.matematicas.filter(cursos => cursos.tema === theme);

    if (results.length === 0) {
        res.send((404), `No curses of ${theme} were found`);
    } else {
        res.send(JSON.stringify(results));
    }
})

app.get('/api/cursos/programacion/:language/:level', (req, res) => {
    const language = req.params.language;
    const level = req.params.level;
    const results = infoCursos.programacion.filter(cursos => cursos.lenguaje === language && cursos.nivel === level);

    if (results.length === 0) {
        res.send((404), `No curses of ${language} level ${level} were found.`);
    } else {
        res.send(JSON.stringify(results));
    }
})


// Server
app.listen(PORT, () => {
    console.log(`Server listenning on port ${PORT}...`);
})