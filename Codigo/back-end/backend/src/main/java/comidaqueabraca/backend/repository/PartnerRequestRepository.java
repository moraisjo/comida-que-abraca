package comidaqueabraca.backend.repository;

import comidaqueabraca.backend.entity.PartnerRequestEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PartnerRequestRepository extends JpaRepository<PartnerRequestEntity, Integer> {
    List<PartnerRequestEntity> findByUserId(Integer userId);
}
