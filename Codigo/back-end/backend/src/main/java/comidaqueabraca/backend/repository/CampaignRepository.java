package comidaqueabraca.backend.repository;

import comidaqueabraca.backend.entity.CampaignEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CampaignRepository extends JpaRepository<CampaignEntity, Integer> {
}