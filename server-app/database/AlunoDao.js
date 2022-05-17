function AlunoDao(connection){
    this._connection = connection;
    this.createTable();
}

AlunoDao.prototype.createTable =  function(Callback){
    var query = `CREATE TABLE IF NOT EXISTS alunos (
                    id INTEGER AUTO_INCREMENT PRIMARY KEY, 
                    name VARCHAR(80)  NOT NULL, 
                    email VARCHAR(80)  NOT NULL, 
                    ra INTEGER  NOT NULL, 
                    cpf VARCHAR(11) NOT NULL , 
                    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    UNIQUE (ra)
                )`
     this._connection.query(query, Callback);
}

AlunoDao.prototype.save =  function( aluno, callback){
    this._connection.query('INSERT INTO alunos SET ? ', aluno,  callback);
}

AlunoDao.prototype.update =  function(id, aluno, callback){
    this._connection.query(`UPDATE alunos SET ? WHERE id = ${id}`, aluno, callback);
}

AlunoDao.prototype.list = function(callback){
    this._connection.query('select * from alunos ORDER BY name ASC', callback);
}

AlunoDao.prototype.searchAll = function(query, callback){
    this._connection.query(`select * from alunos 
                            WHERE name LIKE '%${query}%' 
                            OR email LIKE '%${query}%' 
                            OR cpf LIKE '%${query}%'
                            OR ra LIKE '%${query}%' 
                            ORDER BY name ASC`, callback);
}

AlunoDao.prototype.bayId = function(id, callback){
    this._connection.query('select * from alunos where id = ?', [id], function (erro, result) {});
}

AlunoDao.prototype.where = function(column_name, condition, value, callback){
    this._connection.query(`select * from alunos where ${column_name} ${condition} '${value}' ORDER BY ${column_name} ASC`, callback);
}

AlunoDao.prototype.remove = function(id, callback){
    this._connection.query(`DELETE FROM alunos WHERE id = ?`,id, callback);
}

module.exports = function() {
    return AlunoDao;
}