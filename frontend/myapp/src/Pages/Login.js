import {
  Box,
  Typography,
  InputLabel,
  TextField,
  Button,
  Link,
  Alert,
  InputAdornment,
  IconButton,
  Fade,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  // Verificação do token com limpeza de timeout
  useEffect(() => {
    const tokenStorage = localStorage.getItem('@token');
    
    if (!tokenStorage) return;

    const verifyToken = async () => {
      try {
        const res = await axios.get('http://localhost:3003/user', { 
          headers: { 'authorization': tokenStorage } 
        });
        
        if (res.status === 200) {
          navigate('/home', { replace: true }); // Evita redirecionamento duplo
        }
      } catch (err) {
        console.log('Token inválido/expirado:', err);
        localStorage.removeItem('@token');
      }
    };

    verifyToken();
  }, [navigate]); 


  useEffect(() => {
    let timer;
    if (openError) {
      timer = setTimeout(() => {
        setOpenError(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [openError]);

  const handleTogglePassword = () => {
    setShowPassword(prev => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !senha) {
      setMensagem('Preencha todos os campos');
      setOpenError(true);
      return;
    }

    try {
      const res = await axios.post('http://localhost:3003/user', { 
        data: { email, senha } 
      });
      
      if (res.data.token) {
        localStorage.setItem('@token', res.data.token);
        navigate('/home');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.mensagem || 'Erro ao fazer login';
      setMensagem(errorMsg);
      setOpenError(true);
      setEmail('');
      setSenha('');
    }
  };

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
      {openError && (
        <Fade in={openError} timeout={500}>
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
            <Alert severity="error" color="warning" variant="filled">
              {mensagem}
            </Alert>
          </Box>
        </Fade>
      )}

      <Box
        component="form"
        onSubmit={handleSubmit}
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
        autoComplete="on"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: 2,
            borderRadius: 1,
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            Login
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
              type={showPassword ? "text" : "password"}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              fullWidth
              required
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton 
                      onClick={handleTogglePassword} 
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            sx={{ marginTop: 2 }}
            fullWidth
          >
            Entrar
          </Button>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2">Não tem uma conta?</Typography>
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate('/cadastro')}
              sx={{ ml: 1 }}
            >
              Cadastre-se
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;