package comidaqueabraca.backend.repository;

import comidaqueabraca.backend.entity.NotificationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<NotificationEntity, Integer> {
    @Query(value = "SELECT * FROM comidaqueabraca.db_notification n WHERE n.user_id = :userId ORDER BY n.visualized ASC, n.sent_date DESC", nativeQuery = true)
    List<NotificationEntity> findOrderedByUserId(Integer userId);
}
