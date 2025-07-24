package comidaqueabraca.backend.repository;

import comidaqueabraca.backend.entity.PartnerEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PartnerRepository extends JpaRepository<PartnerEntity, Integer> {

    List<PartnerEntity> findByWantsToReceiveDonationsTrue();
}
