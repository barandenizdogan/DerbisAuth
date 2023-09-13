const mongoose = require('mongoose');


const AuthSchema = new mongoose.Schema(
    {
        musteri_no: {
            type: String
        },
        adminusername: {
            type: String
        },
        adminpassword: {
            type: String
        },
        derbistoken: {
            type: String
        }

    }
)
 
module.exports = mongoose.model('auth', AuthSchema);