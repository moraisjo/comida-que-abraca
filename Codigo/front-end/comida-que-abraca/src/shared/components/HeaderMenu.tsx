import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import { Home } from "react-feather";
//import { useAuth } from "../../../contexts/LoginContext";
import React from "react";
import colors from "../theme/colors";
import { useNavigate } from "react-router-dom";
import { AppBar, styled } from "@mui/material";

interface HeaderMenuProps {
  title: string;
}

export default function HeaderMenu({ title }: HeaderMenuProps) {
  // Uso do React Router
  const navigate = useNavigate();
  //const { userType } = useAuth();

  // Função de logout do Provider
  //const { logout } = useAuth();

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

  /* const handleLogout = () => {
    logout(); // Reseta o contexto, removendo os dados de autenticação
    navigate(PUBLIC_PAGES_URL.INDEX); // Redireciona para a página de login ou pública
  }; */

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
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        color: "white",
        textAlign: "center",
        zIndex: 1000, // Para garantir que fique acima dos outros elementos
      }}
    >
      <StyledAppBar position="static">
        <Toolbar>
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

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center", color: colors.darkGray }}
          >
            {title}
          </Typography>

          <div>
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
                sx={{ color: colors.regularGray, fontWeight: "bold" }}
              >
                Minha conta
              </MenuItem>
              <MenuItem
                // onClick={handleLogout}
                sx={{ color: colors.regularGray, fontWeight: "bold" }}
              >
                Sair
              </MenuItem>
            </Menu>
          </div>

          {/* Menu Sanduíche */}
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
              sx={{ color: colors.regularGray, fontWeight: "bold" }}
            >
              📢 Campanhas
            </MenuItem>
            <MenuItem
              onClick={() => {
                //navigate();
              }}
              sx={{ color: colors.regularGray, fontWeight: "bold" }}
            >
              ☎️ Fale conosco
            </MenuItem>
            <MenuItem
              onClick={() => {
                //navigate();
              }}
              sx={{ color: colors.regularGray, fontWeight: "bold" }}
            >
              ⏰ Sobre o Comida Que Abraça
            </MenuItem>
            <MenuItem
              onClick={() => {
              navigate("/cadastro-parceiro");
              handleSandwichMenuClose();
              }}
             sx={{ color: colors.regularGray, fontWeight: "bold" }}
            >
             👥 Cadastro de Parceiros
            </MenuItem>
          </Menu>
        </Toolbar>
      </StyledAppBar>
    </Box>
  );
}
