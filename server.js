const express = require('express');
const aplicacion = express();
const usuariosRegistrados = require('./login/login');

aplicacion.use(express.json());

aplicacion.get('/login',(req,res) => {
    res.json(usuariosRegistrados);
})

aplicacion.get('/login/:usuario', (req,res) => {
    const usuario = req.params.usuario;
   
    res.json(usuario)
})

aplicacion.post('/login',(req,res) => {
    const nuevoUsuario = {
        usuario: req.body.usuario,
        password: req.body.password
    }

    const logeado = usuariosRegistrados.find(us => (us.usuario === nuevoUsuario.usuario && (us.password === nuevoUsuario.password)));

    if(logeado){
        res.status(200).json({
            exito: 'El usuario ha sido logeado correctamente'
        })
    } else {
        res.status(404).json({
            error: 'El usuario o password es incorrecto'
        })
    }

})

aplicacion.listen(3000,()=>{
    console.log('Servidor en funcionamiento');
})
