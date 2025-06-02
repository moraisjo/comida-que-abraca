import React, { useEffect, useState } from "react";
import { IconButton, Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";

export default function NotificationIcon() {
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();
  const userId = 1;

  useEffect(() => {
    axios
      .get(`http://localhost:8080/notifications/user/${userId}`)
      .then((response) => {
        const notifications = response.data;
        const unread = notifications.filter((n: any) => !n.visualized);
        console.log("Notificações não lidas:", unread.length);
        setUnreadCount(unread.length);
      })
      .catch((error) =>
        console.error("Erro ao buscar notificações não lidas:", error)
      );
  }, []);

  return (
    <IconButton
      size="large"
      aria-label="notificações"
      onClick={() => navigate("/notificacoes")}
      sx={{ color: "#333" }}
    >
      <Badge badgeContent={unreadCount} color="error">
        <NotificationsIcon />
      </Badge>
    </IconButton>
  );
}
