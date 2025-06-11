import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import logo from "../../assets/comida-que-abraca-logo.png";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationIcon from "../../features/NotificationPage/components/NotificationIcon";
import BarChartIcon from "@mui/icons-material/BarChart";
import CampaignIcon from "@mui/icons-material/Campaign";
import RedeemIcon from "@mui/icons-material/Redeem";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import HandshakeIcon from "@mui/icons-material/Handshake";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { Menu, MenuItem, ListItemIcon, Typography } from "@mui/material";
import React from "react";
import colors from "../theme/colors";
import { useNavigate } from "react-router-dom";
import { AppBar, styled } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { DownloadForOffline, VolunteerActivism } from "@mui/icons-material";

type HeaderMenuProps = {
  isExternalPage?: boolean;
};

export default function HeaderMenu({ isExternalPage }: HeaderMenuProps) {
  // Uso do React Router
  const navigate = useNavigate();
  const { token, logout, decodedUser } = useAuth();

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
    navigate("/"); // Redireciona para a página pública
  };

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
          {!isExternalPage && (
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
          )}

          {/*Logo Comida Que Abraça*/}
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            {" "}
            <img
              src={logo}
              style={{ width: "130px", height: "auto" }}
              alt="Logo Comida Que Abraça"
            />
          </Box>

          <Box>
            {!token ? (
              <Box
                onClick={() => navigate("/login")}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  ml: "auto", // empurra para o fim do flex container
                  color: colors.darkGray,
                }}
              >
                <IconButton sx={{ color: colors.darkGray }}>
                  <LoginIcon />
                </IconButton>
                <Typography fontWeight="bold">Login</Typography>
              </Box>
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
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                Configuracoes
              </MenuItem>
              <MenuItem
                onClick={handleLogout}
                sx={{ color: colors.darkGray, fontWeight: "bold" }}
              >
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Sair
              </MenuItem>
            </Menu>
          </Box>

          {/* Menu de opções */}
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
            {/* TROCAR PRO USER_TYPE!!!!!!!!!! ESSA FOI UMA SOLUÇÃO PALIATIVA */}
            {/* Itens dos parceiros */}
            {decodedUser && decodedUser?.userId != "1" && (
              <>
                <MenuItem
                  onClick={() => {
                    navigate("/parceiro/doar");
                    handleSandwichMenuClose();
                  }}
                  sx={{ color: colors.darkGray, fontWeight: "bold" }}
                >
                  <ListItemIcon>
                    <VolunteerActivism fontSize="small" />
                  </ListItemIcon>
                  Quero doar
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    navigate("/parceiro/solicitacao");
                    handleSandwichMenuClose();
                  }}
                  sx={{ color: colors.darkGray, fontWeight: "bold" }}
                >
                  <ListItemIcon>
                    <DownloadForOffline fontSize="small" />
                  </ListItemIcon>
                  Quero receber
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/parceiro/campanhas");
                    handleSandwichMenuClose();
                  }}
                  sx={{ color: colors.darkGray, fontWeight: "bold" }}
                >
                  <ListItemIcon>
                    <CampaignIcon fontSize="small" />
                  </ListItemIcon>
                  Campanhas
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/parceiro/doacoes");
                    handleSandwichMenuClose();
                  }}
                  sx={{ color: colors.darkGray, fontWeight: "bold" }}
                >
                  <ListItemIcon>
                    <RedeemIcon fontSize="small" />
                  </ListItemIcon>
                  Minhas Doações
                </MenuItem>
              </>
            )}

            {/* TROCAR PRO USER_TYPE!!!!!!!!!! ESSA FOI UMA SOLUÇÃO PALIATIVA */}
            {/* Itens da ONG */}
            {decodedUser && decodedUser?.userId == "1" && (
              <>
                <MenuItem
                  onClick={() => {
                    navigate("/ong/campanhas");
                    handleSandwichMenuClose();
                  }}
                  sx={{ color: colors.darkGray, fontWeight: "bold" }}
                >
                  <ListItemIcon>
                    <CampaignIcon fontSize="small" />
                  </ListItemIcon>
                  Campanhas
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/ong/doacoes");
                    handleSandwichMenuClose();
                  }}
                  sx={{ color: colors.darkGray, fontWeight: "bold" }}
                >
                  <ListItemIcon>
                    <RedeemIcon fontSize="small" />
                  </ListItemIcon>
                  Doações
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/ong/relatorios");
                    handleSandwichMenuClose();
                  }}
                  sx={{ color: colors.darkGray, fontWeight: "bold" }}
                >
                  <ListItemIcon>
                    <BarChartIcon fontSize="small" />
                  </ListItemIcon>
                  Relatórios
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/ong/doadores");
                    handleSandwichMenuClose();
                  }}
                  sx={{ color: colors.darkGray, fontWeight: "bold" }}
                >
                  <ListItemIcon>
                    <HandshakeIcon fontSize="small" />
                  </ListItemIcon>
                  Doadores
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/ong/solicitantes");
                    handleSandwichMenuClose();
                  }}
                  sx={{ color: colors.darkGray, fontWeight: "bold" }}
                >
                  <ListItemIcon>
                    <PersonSearchIcon fontSize="small" />
                  </ListItemIcon>
                  Solicitantes
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/ong/ranking");
                  }}
                  sx={{ color: colors.darkGray, fontWeight: "bold" }}
                >
                  <ListItemIcon>
                    <EmojiEventsIcon fontSize="small" />
                  </ListItemIcon>
                  Ranking
                </MenuItem>
              </>
            )}
          </Menu>
        </Toolbar>
      </StyledAppBar>
    </Box>
  );
}
