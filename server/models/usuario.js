const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es necesario']
    },

    lastName: {
        type: String,
        required: [true, 'El apellido es necesario']
    },

    age: {
        type: Number,
        required: [true, 'La edad es necesaria']
    },

    sport: {
        type: String,
        required: [true, 'El deporte es necesario']
    },

    date: {
        type: Date,
        required: false

    }



});


module.exports = mongoose.model('Usuario', usuarioSchema);