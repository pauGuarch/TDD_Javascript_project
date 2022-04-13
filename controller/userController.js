import userModel from '../models/userModel.js'

const register = (req, res)=>{
    if(req.body.username && req.body.password){
        return userModel.createUser(req);
    }else{
        return {error: 1};
    }
}
const login = (req, res)=>{
    const loginresp = userModel.login(req);
    if(loginresp.login){
        return loginresp;
    }else{
        res.send(400);
    }
}

const update = (req, res)=>{
        const User =  userModel.update(req);
        if(User.update){
            res.send(User);
        }else{
            res.send(400);
        }
}
const remove = (req , res)=>{
    const User = userModel.remove(req, res);
    if(User.active=="false"){
        res.send(User);
    }else if (User.active=="true"){
        res.send(User);
    }else{
        res.send(400);
    }
}

export default {
    register,
    login, 
    update,
    remove
};