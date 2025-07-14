import { Box, Typography, AppBar, Toolbar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("@token");
    navigate("/");
  }

  return (
    <Box sx={{ height: "100vh", backgroundColor: "#f2f2f2" }}>


      {/* Conteúdo principal */}
      <Box
        sx={{
          height: "calc(100vh - 64px)", // 64px é a altura do AppBar
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Bem-vindo à Home!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Você está logado com sucesso. Agora pode acessar o sistema.
        </Typography>
      </Box>
    </Box>
  );
}
