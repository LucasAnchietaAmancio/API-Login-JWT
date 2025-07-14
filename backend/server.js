const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const PORT = 3003;
const conn = require('./banco/db.js');

const app = express();
const SECRET = 'OASJDOASDINASOINPOASJCPASMP'; // Em produção irei usar process.env.JWT_SECRET

app.use(cors());
app.use(express.json());


app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Rota de verificação do token
app.get('/user', (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ erro: true, mensagem: 'Token inexistente' });
  }

  jwt.verify(token, SECRET, (err, decode) => {
    if (err) {
      const message = err.name === 'TokenExpiredError' 
        ? 'Token expirado' 
        : 'Token inválido';
      return res.status(401).json({ erro: true, mensagem: message });
    }
    res.status(200).json(decode);
  });
});

// Rota de login
app.post('/user', (req, res) => {
  const { email, senha } = req.body.data || {};

  if (!email || !senha) {
    return res.status(400).json({ erro: true, mensagem: 'Email e senha são obrigatórios' });
  }

  const query = 'SELECT * FROM users WHERE email = ?';
  
  conn.query(query, [email], (err, result) => {
    if (err) {
      return res.status(500).json({ erro: true, mensagem: 'Erro no servidor' });
    }

    if (result.length === 0) {
      return res.status(401).json({ erro: true, mensagem: 'Email não cadastrado' });
    }

    const user = result[0];
    
    // ATENÇÃO: Em produçã irei usar bcrypt para verificar senhas!
    if (user.email === email && user.senha === senha) {
      const token = jwt.sign(
        { id: user.idUser, email: user.email },
        SECRET,
        { expiresIn: '1h' }
      );
      return res.json({ success: true, mensagem: 'Login realizado', token });
    }

    res.status(401).json({ erro: true, mensagem: 'Credenciais inválidas' });
  });
});

// Rota de cadastro
app.post('/user/create', (req, res) => {
  const { nome, email, senha } = req.body || {};

  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: true, mensagem: 'Todos os campos são obrigatórios' });
  }

  const checkEmailQuery = 'SELECT email FROM users WHERE email = ?';
  const insertQuery = 'INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)';

  conn.query(checkEmailQuery, [email], (err, result) => {
    if (err) {
      return res.status(500).json({ erro: true, mensagem: 'Erro no servidor' });
    }

    if (result.length > 0) {
      return res.status(400).json({ erro: true, mensagem: 'Email já cadastrado' });
    }

    conn.query(insertQuery, [nome, email, senha], (err) => {
      if (err) {
        return res.status(500).json({ erro: true, mensagem: 'Erro ao cadastrar' });
      }
      res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});