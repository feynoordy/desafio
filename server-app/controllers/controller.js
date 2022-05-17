
require('dotenv/config');

module.exports = function(app){

    app.post('/getDailyGeneralReports', async(req, res) =>{
        
                
        var response = {
            status : "ok",
            data   : {
                'msg' : 'Relatório salvo no banco de dado com sucesso'
            }
        }
        return res.status(400).send(response);
    });

}

