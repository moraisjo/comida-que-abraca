package comidaqueabraca.backend.service;

import comidaqueabraca.backend.entity.NotificationEntity;
import comidaqueabraca.backend.repository.NotificationRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public List<NotificationEntity> getNotificationsByUserId(Integer userId) {
        return notificationRepository.findOrderedByUserId(userId);
    }

    public void markNotificationAsVisualized(Integer notificationId) {
        NotificationEntity notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new EntityNotFoundException("Notificação não encontrada com ID: " + notificationId));

        notification.setVisualized(true);
        notification.setVisualizedDate(LocalDateTime.now());

        notificationRepository.save(notification);
    }
}
