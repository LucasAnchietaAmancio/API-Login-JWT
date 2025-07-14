import {
  Box,
  Typography,
  InputLabel,
  TextField,
  Button,
  Link,
  Alert,
  Fade,
  InputAdornment,
  IconButton
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


function Cadastro() {
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [openCharacter, setOpenCharacter] = useState(false);
  const [openUpper, setOpenUpper] = useState(false);
  const [openNumber, setOpenNumber] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [Password, setPassword] = useState(false);

  const navigate = useNavigate();

  // Validação da senha (mantido igual)
  useEffect(() => {
    const temCaracterEspecial = /[^a-zA-Z0-9]/.test(senha);
    const temLetraMaiuscula = /[A-Z]/.test(senha);
    const temNumero = /[0-9]/.test(senha);

    setOpenCharacter(temCaracterEspecial);
    setOpenUpper(temLetraMaiuscula);
    setOpenNumber(temNumero);
  }, [senha]);

  // Correção: limpeza do timeout
  useEffect(() => {
    let errorTimer;
    let successTimer;
    
    if (error) {
      errorTimer = setTimeout(() => setError(false), 3000);
    }
    if (success) {
      successTimer = setTimeout(() => setSuccess(false), 3000);
    }
    
    return () => {
      clearTimeout(errorTimer);
      clearTimeout(successTimer);
    };
  }, [error, success]);

  const TogglePassword = () => {
    setPassword(prev => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validação mantida igual
    if (!(openCharacter && openNumber && openUpper)) {
      setError(true);
      setMessage('Senha não condiz com as especificações');
      return;
    }

    try {
      const res = await axios.post('http://localhost:3003/user/create', { 
        nome, 
        email, 
        senha 
      });
      
      if (res.status === 201) {
        setSuccess(true);
        setMessage(res.data.mensagem || 'Cadastro realizado com sucesso!');

        setNome('');
        setEmail('');
        setSenha('');

        setTimeout(() => navigate('/'), 3000);
      }
    } catch (err) {
      setError(true);
      setMessage(err.response?.data?.mensagem || 'Erro ao cadastrar usuário');
    }
  };


  const ShowAlert = ({ type }) => (
    <Fade in={type === 'error' ? error : success} timeout={500}>
      <Box
        sx={{
          position: 'fixed',
          top: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9999,
          width: 'fit-content',
          maxWidth: '90%',
        }}
      >
        <Alert severity={type} variant="filled">
          {message}
        </Alert>
      </Box>
    </Fade>
  );

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2f2f2",
      }}
    >
      {error && <ShowAlert type="error" />}
      {success && <ShowAlert type="success" />}

      <Box
        component="form"
        sx={{
          minHeight: 400,
          minWidth: 400,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "white",
        }}
        onSubmit={handleSubmit}
        autoComplete="on"
      >
        {/* Restante do seu JSX permanece EXATAMENTE IGUAL */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: 2,
            borderRadius: 1,
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            Cadastro
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box>
            <InputLabel htmlFor="name">Nome</InputLabel>
            <TextField
              id="nome"
              name="name"
              placeholder="Digite seu nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              fullWidth
              required
              autoComplete="name"
            />
          </Box>

          <Box>
            <InputLabel htmlFor="email">Email</InputLabel>
            <TextField
              id="email"
              name="email"
              placeholder="Digite seu email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              autoComplete="email"
            />
          </Box>

          <Box>
            <InputLabel htmlFor="password">Senha</InputLabel>
            <TextField
              id="password"
              name="password"
              placeholder="Digite sua senha"
              type={Password ? "text" : "password"}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              fullWidth
              required
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton 
                      onClick={TogglePassword} 
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {Password ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Box>
              <Typography sx={{ pt: '5px', color: openCharacter ? '#5ec985' : '#cccccc' }}>
                • Caracter especial
              </Typography>
              <Typography sx={{ pt: '5px', color: openUpper ? '#5ec985' : '#cccccc' }}>
                • Letra maiúscula
              </Typography>
              <Typography sx={{ pt: '5px', color: openNumber ? '#5ec985' : '#cccccc' }}>
                • Número
              </Typography>
            </Box>
          </Box>

          <Button
            type="submit"
            variant="contained"
            sx={{ marginTop: 2 }}
            fullWidth
          >
            Cadastrar
          </Button>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            Já tem uma conta?{" "}
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate('/')}
            >
              Entrar
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Cadastro;