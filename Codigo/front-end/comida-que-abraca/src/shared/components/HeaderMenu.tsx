import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import logo from "../../assets/comida-que-abraca-logo.png";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationIcon from "../../features/NotificationPage/components/NotificationIcon";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import React from "react";
import colors from "../theme/colors";
import { useNavigate } from "react-router-dom";
import { AppBar, Button, styled } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

export default function HeaderMenu() {
  // Uso do React Router
  const navigate = useNavigate();
  const { userId, userType, token, logout } = useAuth();

  // Estado para controlar a exibição do menu de perfil
  const [profileMenuIsOpen, setProfileMenuIsOpen] =
    React.useState<null | HTMLElement>(null);

  // Estado para controlar a exibição do menu sanduíche
  const [sandwichMenuIsOpen, setSandwichMenuIsOpen] =
    React.useState<null | HTMLElement>(null);

  // Função para abrir o menu de perfil
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenuIsOpen(event.currentTarget);
  };

  // Função para fechar o menu de perfil
  const handleProfileMenuClose = () => {
    setProfileMenuIsOpen(null);
  };

  // Função para abrir o menu sanduíche
  const handleSandwichMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setSandwichMenuIsOpen(event.currentTarget);
  };

  // Função para fechar o menu sanduíche
  const handleSandwichMenuClose = () => {
    setSandwichMenuIsOpen(null);
  };

  const handleLogout = () => {
    logout(); // Reseta o contexto, removendo os dados de autenticação
    handleProfileMenuClose();
    navigate("/login"); // Redireciona para a página de login ou pública
  }

  // Função para decidir para onde voltar com base no tipo de usuário
  /* const handleBackNavigation = () => {
    if (userType === "Client") {
      navigate("/cliente");
    } else if (userType === "Physiotherapist") {
      navigate("/fisio");
    }
  }; */

  const StyledAppBar = styled(AppBar)(() => ({
    backgroundColor: colors.background,
  }));

  return (
    <Box
      sx={{
        flexGrow: 1,
        position: "static",
        top: 0,
        left: 0,
        width: "100%",
        color: "white",
        textAlign: "center",
        zIndex: 1000,
      }}
    >
      <StyledAppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Menu sanduíche */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, color: colors.darkGray }}
            onClick={handleSandwichMenuOpen}
          >
            <MenuIcon />
          </IconButton>

          {/*Logo Comida Que Abraça*/}
          <img
            src={logo}
            style={{ width: "130px", height: "auto" }}
            alt="Logo Comida Que Abraça"
          />

          <Box>
            {!token ? (
              <Button
                color="primary"
                variant="contained"
                sx={{ ml: 2 }}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            ) : (
              <>
                <NotificationIcon />

                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar-profile"
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  sx={{ color: colors.darkGray }}
                >
                  <AccountCircle />
                </IconButton>
              </>
            )}

            {/* Menu de perfil */}
            <Menu
              id="menu-appbar-profile"
              anchorEl={profileMenuIsOpen}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(profileMenuIsOpen)}
              onClose={handleProfileMenuClose}
            >
              <MenuItem
                onClick={handleProfileMenuClose}
                sx={{ color: colors.darkGray, fontWeight: "bold" }}
              >
                Minha conta
              </MenuItem>
              <MenuItem
                onClick={handleLogout}
                sx={{ color: colors.darkGray, fontWeight: "bold" }}
              >
                Sair
              </MenuItem>
            </Menu>
          </Box>

          <Menu
            id="menu-appbar-sandwich"
            anchorEl={sandwichMenuIsOpen}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(sandwichMenuIsOpen)}
            onClose={handleSandwichMenuClose}
          >
            <MenuItem
              onClick={() => {
                navigate("/campanhas");
                handleSandwichMenuClose();
              }}
              sx={{ color: colors.darkGray, fontWeight: "bold" }}
            >
              📢 Gerenciar Campanhas
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/doacoes");
                handleSandwichMenuClose();
              }}
              sx={{ color: colors.darkGray, fontWeight: "bold" }}
            >
              📑 Gerenciar Doações
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/relatorios");
                handleSandwichMenuClose();
              }}
              sx={{ color: colors.darkGray, fontWeight: "bold" }}
            >
              📊 Relatórios
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/doadores");
                handleSandwichMenuClose();
              }}
              sx={{ color: colors.darkGray, fontWeight: "bold" }}
            >
              👥 Doadores
            </MenuItem>
            <MenuItem
              onClick={() => {
                //navigate();
              }}
              sx={{ color: colors.darkGray, fontWeight: "bold" }}
            >
              ☎️ Fale conosco
            </MenuItem>
            <MenuItem
              onClick={() => {
                //navigate();
              }}
              sx={{ color: colors.darkGray, fontWeight: "bold" }}
            >
              ⏰ Sobre o Comida Que Abraça
            </MenuItem>
          </Menu>
        </Toolbar>
      </StyledAppBar>
    </Box>
  );
}
