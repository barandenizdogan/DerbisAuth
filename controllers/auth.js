const Auth = require('../models/auth.js');

const register = async(req,res) => {
    try {
        const {username,password,derbistoken} = req.body
        const pass = await Auth.findOne({password})
        const user = await Auth.findOne({username})
        if(pass){
            return res.status(500).json({message: "Bu parola zaten bulunmakta."})
        }
        if(user){
            return res.status(500).json({message: "Bu kullanıcı adı zaten bulunmakta."})
        }
        if(password.length < 6){
            return res.status(500).json({message: "Parola 6 karakterdern uzun olmalıdır."})
        }

        const newUser = await Auth.create({username,password,derbistoken})


        res.status(201).json({
            status: "OK",
            newUser
        })
    } catch (error) {
        return res.status(500).json({message: error.message})

    }
}

const addDerbisPassword = async(req,res) => {
    try {
        const {username} = req.params;
        const updatedUser = await Auth.findOneAndUpdate({username},req.body,{new: true})
        res.status(200).json({
            status: "OK",
            updatedUser
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


const login = async (req,res) => {
    try {
        const{password} = req.params;
        const user = await Auth.findOne({password})
        if(!user){
            return res.status(500).json({message: "Parola kayıtlı değil."})
        }
        res.status(200).json({
            status: "OK",
            user        
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const showUsers = async(req,res) =>{
    try {
        const allUsers = await Auth.find()
        res.status(200).json({
            status: "OK",
            allUsers
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const findUser = async(req,res) => {
    try {
        const{username} = req.params;
        const foundUser = await Auth.findOne({username})
        res.status(200).json({
            status: "OK",
            foundUser
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
const updateUser = async(req,res) => {
    try {
        const {username} = req.params;
        const updatedUser = await Auth.findOneAndUpdate({username}, req.body, {new: true})
        res.status(200).json({
            status: "OK",
            updatedUser 
        })
    }catch (error){
        return res.status(500).json({message: error.message})
    }

}

const deleteUser = async(req,res) => {
    try {
        const {username} = req.params;
        await Auth.findOneAndDelete({username})
        res.status(201).json({
            message: "Silme işlemi başarılı."
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

module.exports = {register, login, showUsers, findUser, updateUser, deleteUser, addDerbisPassword}