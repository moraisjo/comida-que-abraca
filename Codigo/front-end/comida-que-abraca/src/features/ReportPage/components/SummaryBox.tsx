import { useEffect, useState } from "react";
import { Paper, Stack, Box, Typography, CardActionArea, CardMedia } from "@mui/material";
import { Card, CardContent } from "@mui/material";

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
            title: "Campanhas",
            value: totals.campaigns,
            subtitle: "Campanhas realizadas",
            image: "https://plus.unsplash.com/premium_photo-1681830423545-1ab48007a668?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // troque para o caminho da imagem desejada
        },
        {
            title: "Doações",
            value: totals.donations,
            subtitle: "Total de doações",
            image: "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNoYXJpdHl8ZW58MHx8MHx8fDA%3D", // troque para o caminho da imagem desejada
        },
        {
            title: "Parceiros",
            value: totals.partners,
            subtitle: "Total de parceiros",
            image: "https://plus.unsplash.com/premium_photo-1683141173692-aba4763bce41?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // troque para o caminho da imagem desejada
        },
    ];

    return (
        <Stack direction={{ xs: "column", sm: "row" }} spacing={4} justifyContent="center" alignItems="stretch">
            {cards.map((card) => (
                <Card key={card.title} sx={{ maxWidth: 345, flex: 1 }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image={card.image}
                            alt={card.title}
                        />
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
    );
}

export default SummaryBox;