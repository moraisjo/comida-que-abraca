import { useEffect, useState } from "react";
import { IconButton, Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { fetchUserNotifications } from "../hooks/notificationService";

export default function NotificationIcon() {
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  const { decodedUser } = useAuth();
  const userId = decodedUser?.userId ? Number(decodedUser.userId) : null;

  useEffect(() => {
    if (!userId) return;

    fetchUserNotifications(userId)
      .then((notifications) => {
        const unread = notifications.filter(
          (n: { visualized: any }) => !n.visualized
        );
        setUnreadCount(unread.length);
      })
      .catch((error) =>
        console.error("Erro ao buscar notificações não lidas:", error)
      );
  }, [userId]);

  return (
    <IconButton
      size="large"
      aria-label="notificações"
      onClick={() => navigate("/ong/notificacoes")}
      sx={{ color: "#333" }}
    >
      <Badge badgeContent={unreadCount} color="error">
        <NotificationsIcon />
      </Badge>
    </IconButton>
  );
}
