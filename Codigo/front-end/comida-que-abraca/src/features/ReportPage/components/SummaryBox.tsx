import { useEffect, useState } from "react";
import { Stack, Typography, CardActionArea, CardMedia } from "@mui/material";
import { Card, CardContent } from "@mui/material";

function ProjectDescription() {
    return (
        <Typography variant="body2" align="justify" color="text.secondary" sx={{ mb: 3, fontSize: { xs: '1rem', md: '1.1rem' } }}>
            O <b>Comida que Abraça</b> é um projeto social que atua há cinco anos na região metropolitana de Belo Horizonte, surgindo na pandemia a partir da iniciativa de pessoas com experiência em gastronomia para produzir marmitas para pessoas em situação de vulnerabilidade social. Formalizado há quatro anos, o projeto busca combater a fome de forma prática, mas também promover ações educativas e de conscientização, valorizando a dignidade humana. Além da distribuição de alimentos, gerencia doações de roupas e móveis, organiza campanhas sazonais e busca parcerias para ampliar o impacto. Seu objetivo é estruturar um sistema ágil de captação e distribuição de doações, criando uma rede solidária que atenda às múltiplas necessidades das pessoas em vulnerabilidade, sempre com um olhar humanizado e sistêmico.
        </Typography>
    );
}

function DataIntroDescription() {
    return (
        <Typography variant="body2" align="justify" color="text.secondary" sx={{ mb: 3, fontSize: { xs: '1rem', md: '1.1rem' } }}>
            <br />Os dados apresentados a seguir trazem um panorama das ações realizadas por nós, evidenciando a distribuição de doações ao longo dos meses, os tipos de itens arrecadados e o impacto das campanhas realizadas. Essa análise permite compreender o alcance das iniciativas e orientar decisões estratégicas para fortalecer a rede de solidariedade.
        </Typography>
    );
}


function SummaryBox() {
    const [totals, setTotals] = useState<{ campaigns: number; donations: number; partners: number }>({
        campaigns: 0,
        donations: 0,
        partners: 0,
    });

    useEffect(() => {
        Promise.all([
            fetch("http://localhost:8080/report/total-campaigns").then(res => res.json()),
            fetch("http://localhost:8080/report/total-donations").then(res => res.json()),
            fetch("http://localhost:8080/report/total-partners").then(res => res.json()),
        ]).then(([campaigns, donations, partners]) => {
            setTotals({ campaigns, donations, partners });
        });
    }, []);

    const cards = [
        {
            title: "Campanhas realizadas",
            value: totals.campaigns,
            subtitle: "Ações sazonais e estratégicas que mobilizam recursos e corações para transformar realidades.",
            image: "https://plus.unsplash.com/premium_photo-1681830423545-1ab48007a668?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // troque para o caminho da imagem desejada
        },
        {
            title: "Doações",
            value: totals.donations,
            subtitle: "A solidariedade de muitas mãos se transforma em alimento, roupa e acolhimento para quem mais precisa.",
            image: "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNoYXJpdHl8ZW58MHx8MHx8fDA%3D", // troque para o caminho da imagem desejada
        },
        {
            title: "Parceiros",
            value: totals.partners,
            subtitle: "Instituições e pessoas que caminham conosco para ampliar o impacto e fortalecer a rede solidária.",
            image: "https://plus.unsplash.com/premium_photo-1683141173692-aba4763bce41?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // troque para o caminho da imagem desejada
        },
    ];

    return (
        <>
            <ProjectDescription />
            <DataIntroDescription />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={4} justifyContent="center" alignItems="stretch">
                {cards.map((card) => (
                    <Card key={card.title} sx={{ maxWidth: 345, flex: 1, boxShadow: 0, borderRadius: 20 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={card.image}
                                alt={card.title} />
                            <CardContent>
                                <Typography gutterBottom variant="h6" align="center" component="div">
                                    {card.title}
                                </Typography>
                                <Typography variant="h4" align="center" color="primary">
                                    {card.value}
                                </Typography>
                                <Typography variant="body2" align="center" sx={{ color: 'text.secondary' }}>
                                    {card.subtitle}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </Stack>
            </>
    );
}

export default SummaryBox;