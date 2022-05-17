require('dotenv/config');

class AlunosController {
    async register(app, req, res){

        if( !(req.name && req.cpf && req.ra && isValidadeEmail(req.email)) ){
            return  {
                status : "fail",
                data   : {
                    'msg' : 'form invalid',
                    data:{
                        name: req.name,
                        cpf: req.cpf,
                        ra: req.ra,
                        email: isValidadeEmail(req.email),
                    }
                }
            }
        }

        var aluno = {
            name: req.name,
            cpf: req.cpf,
            ra: req.ra,
            email: req.email,
        }

        var db = app.database.connectionFactory(erro =>{
            if(erro){
                return  {
                    status : "fail",
                    data   : {
                        'msg' : 'Unexpected Error',
                    }
                }
            }
        });
        var AlunoDao = new app.database.AlunoDao(db, erro =>{
            if(erro){
                return  {
                    status : "fail",
                    data   : {
                        'msg' : 'Unexpected Error',
                    }
                }
            }
        });

        AlunoDao.save(aluno, function (erro, result) {
            if (erro){
                return res.send({
                    status : "fail",
                    data   : {
                        'msg' : erro.sqlMessage,
                        'code' : erro.code
                    }
                    
                })
            }
            else{
                return res.send({
                    status : "ok",
                    data   : {
                        'msg' : 'Registered successfully'
                    }
                })
            }
        });
    }

    async update(app, req,  res, aluno_id,){

        if( !(req.name && req.cpf && req.ra && isValidadeEmail(req.email)) ){
            return  {
                status : "fail",
                data   : {
                    'msg' : 'form invalid',
                    data:{
                        name: req.name,
                        cpf: req.cpf,
                        ra: req.ra,
                        email: isValidadeEmail(req.email),
                    }
                }
            }
        }

        var db = app.database.connectionFactory(erro =>{
            if(erro){
                return  {
                    status : "fail",
                    data   : {
                        'msg' : 'Unexpected Error',
                    }
                }
            }
        });
        var AlunoDao = new app.database.AlunoDao(db, erro =>{
            if(erro){
                return  {
                    status : "fail",
                    data   : {
                        'msg' : 'Unexpected Error',
                    }
                }
            }
        });

        var aluno = {
            name: req.name,
            cpf: req.cpf,
            ra: req.ra,
            email: req.cpf,
        }
        
        AlunoDao.update(aluno_id, aluno, function (erro, result) {

            if (erro) {
                if (erro.kind === "not_found") {
                  return res.status(404).send({
                    status : "fail",
                    data :{
                        msg: `Not found student with id ${aluno_id}.`
                    }
                  });
                } 
                
                else {
                  return res.status(500).send({
                    status : "fail",
                    data :{
                        msg: "Error updating student with id " + aluno_id
                    }
                  });
                }
            } 
              
            else {
                if (result.affectedRows == 0){
                    return res.status(404).send({
                        status : "fail",
                        data :{
                            msg: `Not found student with id ${aluno_id}.`
                        }
                    });
                }

                return res.send({
                    status : "ok",
                    data   : {
                        'msg' : 'Update successfully',
                    }
                })
                
            };
        });
    }

    async delete(app, res, aluno_id){
        var db = app.database.connectionFactory(erro =>{
            if(erro){
                return  {
                    status : "fail",
                    data   : {
                        'msg' : 'Unexpected Error',
                    }
                }
            }
        });
        var AlunoDao = new app.database.AlunoDao(db, erro =>{
            if(erro){
                return  {
                    status : "fail",
                    data   : {
                        'msg' : 'Unexpected Error',
                    }
                }
            }
        });

        AlunoDao.remove(aluno_id, function (erro, result) {
            if (erro) {
                if (erro.kind === "not_found") {
                    res.status(404).send({
                    message: `Not found aluno with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                    message: "Could not delete Aluno with id " + req.params.id
                    });
                }
            }            
            else {
                if (result.affectedRows == 0){
                    return res.status(404).send({
                        status : "fail",
                        data :{
                            msg: `Not found Aluno with id ${aluno_id}.`
                        }
                    });
                }
                else{
                    return res.send({
                        status : "ok",
                        data   : {
                            'msg' : 'successfully removed',
                        }
                    })
                }
                
            };
        });


    }

    async list(app, res){
        var db = app.database.connectionFactory(erro =>{
            if(erro){
                return  {
                    status : "fail",
                    data   : {
                        'msg' : 'Unexpected Error',
                    }
                }
            }
        });
        var AlunoDao = new app.database.AlunoDao(db, erro =>{
            if(erro){
                return  {
                    status : "fail",
                    data   : {
                        'msg' : 'Unexpected Error',
                    }
                }
            }
        });

        AlunoDao.list(function (erro, result) {
            if (erro) {
                return  {
                    status : "fail",
                    data   : {
                        'msg' : 'Unexpected Error',
                    }
                }
            }            
            else {
                return res.send({
                    status : "ok",
                    data   : {
                        'students' : result,
                    }
                })
            };
        });
        
        
    }

    async search(app, res , query){
        var db = app.database.connectionFactory(erro =>{
            if(erro){
                return  {
                    status : "fail",
                    data   : {
                        'msg' : 'Unexpected Error',
                    }
                }
            }
        });
        var AlunoDao = new app.database.AlunoDao(db, erro =>{
            if(erro){
                return  {
                    status : "fail",
                    data   : {
                        'msg' : 'Unexpected Error',
                    }
                }
            }
        });
        
        if(query != '@')
            AlunoDao.searchAll(query, function (erro, result) {
            if (erro) {
                return  {
                    status : "fail",
                    data   : {
                        'msg' : 'Unexpected Error',
                    }
                }
            }            
            else {
                return res.send({
                    status : "ok",
                    data   : {
                        'students' : result,
                    }
                })
            };
        });

        else{
            await this.list(app, res);
        }
        
        
    }

    
}

module.exports = new AlunosController();

async function isValidadeEmail (email){
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};