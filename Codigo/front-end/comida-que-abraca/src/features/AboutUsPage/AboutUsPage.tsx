import {
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import HeaderMenu from "../../shared/components/HeaderMenu";
import { Heart, Users, Globe, Star, Activity } from "react-feather";
import BannerAboutUsPage from "./components/BannerAboutUsPage";
import Footer from "../../shared/components/Footer/Footer";

const AboutUsPage = () => {
  return (
    <>
      <HeaderMenu />
      <BannerAboutUsPage />

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">
        {/* Seções */}
        <Paper sx={{ p: 2, backgroundColor: "#F2821A", mb: 2, mr: 2, ml: 2, mt: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Heart />
            <Typography color="#FFFF"><strong>O que é o Projeto Comida Que Abraça?</strong></Typography>
          </Stack>
          <Typography color="#FFFF">
            Nós temos uma missão e levamos ela no peito, com amor e entrega. 💖<br />
            Buscamos resgatar a dignidade de nossos irmãos em situação de
            vulnerabilidade social, valorizando suas individualidades e
            potencializando seus talentos.<br />  Trabalhamos para estimular a
            esperança em um mundo melhor, pelas vias da solidariedade e da
            fraternidade. ✨
          </Typography>
        </Paper>

        <Paper sx={{ p: 2, backgroundColor: "#F2821A", mb: 2, mr: 2, ml: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Users />
            <Typography color="#FFFF"><strong>Comida que abraça, acolhe e dá esperança</strong></Typography>
          </Stack>
          <Typography color="#FFFF">
            Existimos para fazer a diferença. Estamos ativos e fortes no
            propósito de auxiliar famílias carentes, através de tudo o que
            sabemos fazer e de todas as formas que podemos ajudar. 👐<br /> 
            Seja você também uma força pujante a fazer a diferença! 🌟
          </Typography>
        </Paper>

        <Paper sx={{ p: 2, backgroundColor: "#F2821A", mb: 2, mr: 2, ml: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Globe />
            <Typography color="#FFFF"><strong>Como pensamos e no que acreditamos</strong></Typography>
          </Stack>
          <Typography color="#FFFF">
            Acreditamos na liberdade, na valorização do ser, no direito à
            igualdade e fraternidade. Todos os seres humanos nascem livres e
            iguais em dignidade e direitos. Devem agir com espírito de
            fraternidade. 🤝 <br /> Queremos ser reconhecidos por um trabalho sólido
            e gradual, com credibilidade e transparência. Trabalhamos para
            transformar vidas e promover o desenvolvimento social e econômico.
            💼🌍
          </Typography>
        </Paper>

        <Paper sx={{ p: 2, backgroundColor: "#F2821A", mb: 2, mr: 2, ml: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Star />
            <Typography color="#FFFF"><strong>Por que fazemos tudo isso?</strong></Typography>
          </Stack>
          <Typography color="#FFFF">
            Porque acreditamos na construção coletiva de um mundo mais justo
            🌎 <br /> Porque queremos combater a pobreza e a exclusão
            sócio-econômica 🙅‍♀️ <br /> Porque queremos estimular sonhos e
            possibilidades ✨
          </Typography>
        </Paper>

        <Paper sx={{ p: 2, backgroundColor: "#F2821A", mb: 2, mr: 2, ml: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Activity />
            <Typography color="#FFFF"><strong>Como fazemos o que fazemos?</strong></Typography>
          </Stack>
          <Typography color="#FFFF">
            Desenvolvendo competências socioemocionais 💡<br /> Criando ações que
            impactam no desenvolvimento humano, com responsabilidade,
            criatividade, ética e cooperação 🙌 <br /> Estimulando pessoas a sonhar
            — porque sonhos criam metas e nos aproximam da realidade que
            queremos viver 💭🎯
          </Typography>
        </Paper>
      </div>
      <Footer />
    </>
  );
};

export default AboutUsPage;
