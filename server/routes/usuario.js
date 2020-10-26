const express = require('express');

const _ = require('underscore');

const Usuario = require('../models/usuario');


const app = express();

function convertir(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function calculate_age(dob) {
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

app.get('/user', (req, res) => {

    Usuario.find()
        .exec((err, usuarios) => {
            if (err) {

                return res.status(400).json({
                    ok: false,
                    err
                });
            }


            res.json({
                ok: true,
                usuarios
            });



        });
});

app.get('/user/:id', (req, res) => {

    let id = req.params.id;
    Usuario.findById(id, (err, usuarioDB) => {
        if (err) {

            return res.status(400).json({
                ok: false,
                err
            });
        }


        res.json({
            usuarioDB
        });
    })

})


app.post('/user', (req, res) => {

    let body = req.body;

    let birthad = new Date(body.date);

    let ageR = calculate_age(birthad);


    let usuario = new Usuario({
        name: convertir(body.name),
        lastName: convertir(body.lastName),
        age: ageR,
        sport: convertir(body.sport),
        date: body.date
    });

    usuario.save((err, usuarioDB) => {

        if (err) {

            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB,
        });
    });

});

app.put('/user/:id', (req, res) => {

    let body = req.body;

    let birthad = new Date(body.date);

    let ageR = calculate_age(birthad);
    let id = req.params.id;

    let usuario = new Usuario({
        name: convertir(body.name),
        lastName: convertir(body.lastName),
        age: ageR,
        sport: convertir(body.sport),
        date: body.date
    });

    Usuario.findByIdAndDelete(id, (err, usuarioBorrado) => {

        if (err) {

            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!usuarioBorrado) {

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        };
    })
    usuario.save((err, usuarioDB) => {

        if (err) {

            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB,
        });
    });


});

app.delete('/user/:id', (req, res) => {

    let id = req.params.id;

    Usuario.findByIdAndDelete(id, (err, usuarioBorrado) => {

        if (err) {

            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!usuarioBorrado) {

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        };


        res.json({
            ok: true,
            usuario: usuarioBorrado
        });

    });

});



module.exports = app;