package comidaqueabraca.backend.repository;
import comidaqueabraca.backend.enums.DonationStatus;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import comidaqueabraca.backend.entity.DonationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

@Repository
public interface DonationRepository extends JpaRepository<DonationEntity, Long>{
    List<DonationEntity> findByStatus(DonationStatus status);
}
