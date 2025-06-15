import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Badge,
  Paper,
  Tabs,
  Tab,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import HeaderMenu from "../../shared/components/HeaderMenu";
import { useAuth } from "../../context/AuthContext";
import { fetchUserNotifications } from "./hooks/notificationService";

interface Notification {
  id: number;
  title: string;
  message: string;
  sentDate: string;
  visualized: boolean;
  campaign: {
    name: string;
    photoUrl?: string;
  };
}

export default function NotificationPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);

  const { decodedUser } = useAuth();
  const userId = decodedUser?.userId ? Number(decodedUser.userId) : null;

  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    fetchUserNotifications(userId)
      .then((data) => {
        setNotifications(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar notificações:", error);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, visualized: true } : n))
    );
  };

  const handleChange = (_: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };

  const filteredNotifications =
    tabIndex === 0 ? notifications : notifications.filter((n) => !n.visualized);

  return (
    <>
      <HeaderMenu />
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom color="primary">
          Minhas Notificações
        </Typography>

        <Tabs value={tabIndex} onChange={handleChange}>
          <Tab
            label="Todas"
            sx={{ textTransform: "none", fontWeight: "bold" }}
          />
          <Tab
            label={`Não Visualizadas (${
              notifications.filter((n) => !n.visualized).length
            })`}
            sx={{ textTransform: "none", fontWeight: "bold" }}
          />
        </Tabs>

        {loading ? (
          <CircularProgress />
        ) : filteredNotifications.length === 0 ? (
          <Typography>Nenhuma notificação encontrada.</Typography>
        ) : (
          <List sx={{ width: "100%" }}>
            {filteredNotifications.map((notification) => (
              <Paper
                key={notification.id}
                elevation={notification.visualized ? 0 : 2}
                sx={{
                  width: "100%",
                  mb: 2,
                  borderRadius: 2,
                  bgcolor: notification.visualized ? "#f5f5f5" : "#fff8e1",
                }}
              >
                <ListItem
                  secondaryAction={
                    !notification.visualized && (
                      <IconButton
                        edge="end"
                        onClick={() => markAsRead(notification.id)}
                        title="Marcar como lida"
                      >
                        <DoneIcon />
                      </IconButton>
                    )
                  }
                  alignItems="flex-start"
                >
                  <ListItemAvatar>
                    <Badge
                      color="error"
                      variant="dot"
                      invisible={notification.visualized}
                    >
                      <Avatar
                        alt={notification.campaign.name}
                        src={notification.campaign.photoUrl}
                      />
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        variant="subtitle1"
                        fontWeight={notification.visualized ? "normal" : "bold"}
                      >
                        {notification.title}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="text.primary">
                          {notification.message}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(notification.sentDate).toLocaleString()} |{" "}
                          {notification.campaign.name}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              </Paper>
            ))}
          </List>
        )}
      </Box>
    </>
  );
}
