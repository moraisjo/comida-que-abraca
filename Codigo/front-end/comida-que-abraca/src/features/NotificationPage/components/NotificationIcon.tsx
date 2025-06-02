import { useEffect, useState } from "react";
import { IconButton, Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axios";

type Notification = {
  visualized: boolean;
};

export default function NotificationIcon() {
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();
  const userId = 1;

  useEffect(() => {
    api
      .get(`/notifications/user/${userId}`)
      .then((response) => {
        const notifications = response.data;
        const unread = notifications.filter((n: Notification) => !n.visualized);
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
