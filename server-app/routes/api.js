const AlunoController = require("../controllers/AlunoController");

module.exports = function(app){

    app.post('/api/alunos/register', async(req, res) =>{
        const response = await AlunoController.register(app, req.body, res)
    });

    app.post('/api/alunos/:id/edite', async(req, res) =>{
        const response = await AlunoController.update(app, req.body, res, req.params.id)
    });

    app.get('/api/alunos/:id/delete', async(req, res) =>{
        const response = await AlunoController.delete(app, res, req.params.id)
    });

    app.get('/api/alunos/index', async(req, res) =>{
        const response = await AlunoController.list(app, res)
    });

    app.get('/api/alunos/search/:query', async(req, res) =>{
        const response = await AlunoController.search(app, res, req.params.query)
    });

}