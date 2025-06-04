import { Box, Typography } from "@mui/material";
import colors from "../../shared/theme/colors";
import { useNavigate } from "react-router-dom";
import { PUBLIC_PAGES_URL } from "../../services/AppPageUrl";
import HeaderMenu from "../../shared/components/HeaderMenu";

const NotFoundPage: React.FC = () => {
  // Hook de navegação do React Router
  const navigate = useNavigate();

  // Função para redirecionar para a página de login
  const handleLoginRedirect = () => {
    navigate(PUBLIC_PAGES_URL.INDEX);
  };

  return (
    <>
      <HeaderMenu isExternalPage={true} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: '##E0E0E0'
        }}
      >
        <Box>
          <Typography fontSize={50} fontWeight="bold">
            404 :(
          </Typography>
          <br />
          <Typography fontSize={30}>Página não encontrada!</Typography>
          <Typography fontSize={20}>
            Volte para o{" "}
            <span
              style={{
                cursor: "pointer",
                color: colors.primary,
                fontWeight: "bold",
              }}
              onClick={handleLoginRedirect}
            >
              login.
            </span>
          </Typography>
          <br />
          <br />
          <br />
          <br />
          {/*             <Box 
                component="img"
                src={logo}
                alt="Logo"
                sx={{
                    width: '100%', 
                    maxWidth: 250, 
                    height: 'auto', 
                    margin: 1,
                }}
            /> */}
        </Box>
      </Box>
    </>
  );
};

export default NotFoundPage;
