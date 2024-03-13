const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://silenceisbeautyofsoul:tvtKGTkDS8LxVkdo@database3.qhmcpvo.mongodb.net/')
const db = mongoose.connection;

db.on('error',console.error.bind(console, 'connection error'));
db.once('open',function() {
    console.log('Connected to MongoDB');
//EL ESQUEMA DICE: "ESTO ES LO QUE HAY EN LA BASE DE DATOS, PERO NO A NIVEL DE DATOS SINO A NIVEL DE ESTRUCTURA"
    userSchema = mongoose.Schema({
        nombres: String,
        apellidos: String
    })
    const User = mongoose.model('User', userSchema);

    const app = express();
    app.use(express.json());

// Lee el parámetro de consulta "limit" o establece un valor predeterminado de 100 si no se proporciona

// ACTIVIDAD MARZO 8

// 1. Listado de todos los usuarios
    app.get('/api/users', async (req, res) => {
        const users = await User.find(); // Limita la cantidad de documentos devueltos por la consulta
        res.json(users); // Envia los usuarios encontrados como respuesta

        // let limit = parseInt(req.query.limit); // Obtiene el valor del parámetro limit de la URL
        // if (!limit || limit <= 0) {
        //     limit = 10; // Establece un límite predeterminado si no se proporciona un valor válido
        // }
        // console.log(limit);
    });


// 2. Listado de todos los usuarios limitanto a 10 resultados
    app.get('/api/users/limit', async (req, res) => {
        const users = await User.find().limit(10); // Limita la cantidad de documentos devueltos por la consulta
        res.json(users); // Envia los usuarios encontrados como respuesta
    });


    // CREATE SCHEMA companies


    companiesSchema = mongoose.Schema({
        nombre: String,
    })
    const Company = mongoose.model('Company', companiesSchema);

// 3. Listado de todas las empresas.
    app.get('/api/companies', async (req, res) => {
        const companies = await Company.find(); // Limita la cantidad de documentos devueltos por la consulta
        res.json(companies); // Envia los usuarios encontrados como respuesta
    });


// 4. Listado de usuarios que sean de la empresa id 5.
    app.get('/api/users/companies/5', async (req, res) => {
        const users = await User.find( {empresa_id: 5} ); 
        res.json(users); 
    });

// 5. Listado de usuarios que sean de Bangladesh.
    app.get('/api/users/country/Bangladesh', async (req, res) => {
        const users = await User.find( {pais: "Bangladesh"} );
        res.json(users); // Envia las empresas encontradas como respuesta
    });

// 6. Listado de empresas de la ciudad Bangladesh. 
    app.get('/api/companies/city/Bangladesh', async (req, res) => {
        const companies = await Company.find( {ciudad: "Bangladesh"} );
        res.json(companies); // Envia las empresas encontradas como respuesta
    });


    app.listen(3000, function() {
        console.log("server listening on port 3000(server arriba");
    });

});