const mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema(
    {
        createdby: {
            type: String
        },
        username: {
            type: String
        },
        password: {
            type: String
        },
        derbisusername: {
            type: String
        },
        derbispassword: {
            type: String
        },
        derbisparola: {
            type: String
        },
        okudum: {
            type : String
        }
    }
)
 
module.exports = mongoose.model('users', AuthSchema);