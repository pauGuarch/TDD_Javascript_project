
class userModel{
    createUser(req){
       return {username: req.body.username,
                password: req.body.password
        };
    }
    login(req, res){
        if (req.body.username && req.body.password){
            return {username: req.username, 
                password: req.password,
                login: "true"
            }
        }else if(req.body.username || req.body.password){
            return {login: "false"}
        }else{
            return 0;
        }
    }
    update(req, res){
        if (req.body.newpassword){
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0');
            let yyyy = today.getFullYear();
            today = mm + '/' + dd + '/' + yyyy;
            return {update: today}
        }else{
            return {error: "true"}
        }  
    }
    remove(req, res){
        if (req.body.deleteuser=="true"){
            return {active: "false"}
        }else if (req.body.deleteuser==0){
            return {active: "true"}
        }else{
            return 0;
        }
    }
}

export default new userModel();