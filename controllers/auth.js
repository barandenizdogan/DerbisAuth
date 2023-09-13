const Auth = require('../models/auth.js');
const Users = require('../models/users.js');

const adminregister = async(req,res) => {
    try {
        const {musteri_no, adminusername, adminpassword} = req.body
        const pass = await Auth.findOne({adminpassword})
        const admin = await Auth.findOne({adminusername})
        if(pass){
            return res.status(500).json({message: "Bu parola zaten bulunmakta."})
        }
        if(admin){
            return res.status(500).json({message: "Bu kullanıcı adı zaten bulunmakta."})
        }
        if(adminpassword.length < 6){
            return res.status(500).json({message: "Parola 6 karakterdern uzun olmalıdır."})
        }

        const newAdmin = await Auth.create({"musteri_no":musteri_no,"adminusername":adminusername,"adminpassword":adminpassword,"derbistoken":""})

        res.status(201).json({
            status: "OK",
            newAdmin
        })
    } catch (error) {
        return res.status(500).json({message: error.message})

    }
}


const adminlogin = async (req,res) => {
    try {
        const{adminpassword} = req.params;
        const adminuser = await Auth.findOne({adminpassword})
        if(!adminuser){
            return res.status(500).json({message: "Parola kayıtlı değil."})
        }
        res.status(200).json({
            status: "OK",
            adminuser        
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const register = async(req,res) => {
    try {
        const {musteri_no} = req.params;
        const {username,password} = req.body
        const admin = await Auth.findOne({musteri_no})    
        const user = await Users.findOne({username})
        const pass = await Users.findOne({password})

        if(!admin){
            return res.status(500).json({message: "Müşteri kayıtlı değil."})
        }
        if(user){
            return res.status(500).json({message: "Bu kullanıcı adı zaten bulunmakta."})
        }
        if(pass){
            return res.status(500).json({message: "Bu parola zaten bulunmakta."})
        }
        if(password.length < 6){
            return res.status(500).json({message: "Parola 6 karakterdern uzun olmalıdır."})
        }

        const newUser = await Users.create({"createdby":musteri_no,"username":username,"password":password,"okudum":"0"})
        res.status(201).json({
            status: "OK",
            newUser
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


const login = async (req,res) => {
    try {
        const{username} = req.params;
        const{password} = req.params;
        const user = await Users.findOne({"username":username, "password":password})
        if(!user){
            return res.status(500).json({message: "Kullanıcı kayıtlı değil."})
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
        const {musteri_no} = req.params
        const foundUser = await Auth.find({"musteri_no":musteri_no})
        res.status(200).json({
            status: "OK",
            foundUser
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const findUser_all = async(req,res) => {
    try {
        const {musteri_no} = req.params
        const foundUsers = await Users.find({"createdby":musteri_no})
        res.status(200).json({
            status: "OK",
            foundUsers
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const findUser = async(req,res) => {
    try {
        const {musteri_no} = req.params
        const{username} = req.params;
        const foundUser = await Users.findOne({"createdby":musteri_no,"username":username})
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
        const {musteri_no} = req.params
        const {username} = req.params;
        const user = await Users.findOne({"createdby":musteri_no,"username":username})
        if (user){
            const updatedUser = await Users.findOneAndUpdate({"createdby":adminusername,"username":username}, req.body, {new: true})
            res.status(200).json({
                status: "OK",
                updatedUser 
            })
        }
    }catch (error){
        return res.status(500).json({message: error.message})
    }

}

const addToken = async(req,res) => {
    try {
        const {musteri_no} = req.params;
        const user = await Auth.findOne({"musteri_no":musteri_no})
        if (user){
            const updatedUser = await Auth.findOneAndUpdate({"musteri_no":musteri_no}, req.body, {new: true})
            res.status(200).json({
                status: "OK",
                updatedUser
            })
        }
    }catch (error){
        return res.status(500).json({message: error.message})
    }
}

const deleteUser = async(req,res) => {
    try {
        const {musteri_no} = req.params
        const {username} = req.params;
        await Users.findOneAndDelete({"createdby":musteri_no,"username":username})
        res.status(201).json({
            message: "Silme işlemi başarılı."
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const deleteAdminwithUsers = async(req,res) => {
    try {
        const{musteri_no} = req.params
        await Users.findOneAndDelete({"createdby":musteri_no})
        res.status(201).json({
            message: "kullanıcılar başarıyla silindi."
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const deleteAdmin = async(req,res) => {
    try {
        const {musteri_no} = req.params
        await Auth.findOneAndDelete({"musteri_no":musteri_no})
        res.status(201).json({
            message: "Silme işlemi başarılı."
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const addDerbisPassword = async(req,res) => {
    try {
        const {musteri_no} = req.params;
        const {username} = req.params;
        const updatedUser = await Users.findOneAndUpdate({"createdby":musteri_no,"username":username},req.body,{new: true})
        res.status(200).json({
            status: "OK",
            updatedUser
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

module.exports = {register, login, showUsers, findUser, deleteUser, addDerbisPassword, adminregister, adminlogin, updateUser, deleteAdmin, addToken}