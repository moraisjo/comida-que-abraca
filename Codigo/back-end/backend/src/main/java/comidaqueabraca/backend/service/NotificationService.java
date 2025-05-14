package comidaqueabraca.backend.service;

import comidaqueabraca.backend.entity.NotificationEntity;
import comidaqueabraca.backend.repository.NotificationRepository;
import org.springframework.stereotype.Service;

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
}
