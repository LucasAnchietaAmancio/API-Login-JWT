const mysql = require('mysql2');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'sys_api',
});

conn.connect((err) => {
  if (err) {
    console.log('Erro ao se conectar ao banco de dados:', err);
  } else {
    console.log('Conexão com o banco de dados realizada com sucesso!');
  }
});

module.exports = conn;
