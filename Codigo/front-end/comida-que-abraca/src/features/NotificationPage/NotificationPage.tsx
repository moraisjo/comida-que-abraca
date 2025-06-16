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
  Badge,
  Paper,
  Tabs,
  Tab,
} from "@mui/material";
import HeaderMenu from "../../shared/components/HeaderMenu";
import { useAuth } from "../../context/AuthContext";
import {
  fetchUserNotifications,
  visualizeNotification,
} from "./hooks/notificationService";
import { useNavigate } from "react-router-dom";
import { ButtonBase } from "@mui/material";

interface Notification {
  id: number;
  title: string;
  message: string;
  sentDate: string;
  visualized: boolean;
  campaign?: {
    id: number;
    name: string;
    photoUrl?: string;
  } | null;
  donation?: {
    name: string;
    photoUrl?: string;
  } | null;
}

export default function NotificationPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);

  const { decodedUser } = useAuth();
  const userId = decodedUser?.userId ? Number(decodedUser.userId) : null;

  const navigate = useNavigate();

  const handleNotificationClick = async (notification: Notification) => {
    try {
      await visualizeNotification(notification.id);
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === notification.id ? { ...n, visualized: true } : n
        )
      );

      if (decodedUser?.userRole === "COLLABORATOR") {
        navigate("/ong/doacoes");
      } else if (
        decodedUser?.userRole === "PARTNER" &&
        notification.campaign?.id
      ) {
        navigate(`/parceiro/campanhas/${notification.campaign.id}`);
      }
    } catch (error) {
      console.error("Erro ao processar clique na notificação:", error);
    }
  };

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

  const markAsRead = async (id: number) => {
    try {
      await visualizeNotification(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, visualized: true } : n))
      );
    } catch (error) {
      console.error("Erro ao marcar notificação como visualizada:", error);
    }
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
            {filteredNotifications.map((notification) => {
              const entity = notification.campaign ?? notification.donation;

              return (
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
                  <ListItem alignItems="flex-start" sx={{ p: 0 }}>
                    <ButtonBase
                      onClick={() => handleNotificationClick(notification)}
                      sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        textAlign: "left",
                        p: 2,
                      }}
                    >
                      <ListItemAvatar>
                        <Badge
                          color="error"
                          variant="dot"
                          invisible={notification.visualized}
                        >
                          <Avatar alt={entity?.name} src={entity?.photoUrl} />
                        </Badge>
                      </ListItemAvatar>

                      <ListItemText
                        primary={
                          <Typography
                            variant="subtitle1"
                            fontWeight={
                              notification.visualized ? "normal" : "bold"
                            }
                          >
                            {notification.title}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography variant="body2" color="text.primary">
                              {notification.message}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {new Date(notification.sentDate).toLocaleString()}{" "}
                              | {entity?.name}
                            </Typography>
                          </>
                        }
                      />
                    </ButtonBase>
                  </ListItem>
                </Paper>
              );
            })}
          </List>
        )}
      </Box>
    </>
  );
}
