import { Box, Typography, IconButton } from "@mui/material";
import { Instagram } from "@mui/icons-material";
import XIcon from "@mui/icons-material/X";
import { SiTiktok } from "react-icons/si";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        backgroundColor: "#F4F4F4",
        padding: "1rem",
        textAlign: "center",
        position: "fixed",
        bottom: 0,
        left: 0,
        height: 80,
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 1 }}>
        <IconButton
          href="https://www.tiktok.com/@_comidaqueabraca"
          target="_blank"
          rel="noopener"
          sx={{ color: "darkGray" }}
        >
          <SiTiktok />
        </IconButton>
        <IconButton
          href="https://www.instagram.com/_comidaqueabraca/"
          target="_blank"
          rel="noopener"
          sx={{ color: "darkGray" }}
        >
          <Instagram />
        </IconButton>
        <IconButton
          href="https://x.com/comidaqueabraca"
          target="_blank"
          rel="noopener"
          sx={{ color: "darkGray" }}
        >
          <XIcon />
        </IconButton>
      </Box>
      <Typography variant="body2" color="darkGray">
        © {new Date().getFullYear()} Comida Que Abraça. Todos os direitos
        reservados.
      </Typography>
    </Box>
  );
}
