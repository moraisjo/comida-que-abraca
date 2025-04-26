package comidaqueabraca.backend.repository;

import comidaqueabraca.backend.dto.CampaignDTO;
import comidaqueabraca.backend.entity.CampaignEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CampaignRepository extends JpaRepository<CampaignEntity, Integer> {

    @Query("""
        SELECT new comidaqueabraca.backend.dto.CampaignDTO(
            c.name, c.description, c.address, c.startDate, c.endDate, c.photoUrl, c.status
        )
        FROM CampaignEntity c
        WHERE c.status = 'ACTIVE'
        ORDER BY c.startDate ASC
    """)
    Page<CampaignDTO> findAllActiveCampaigns(Pageable pageable);
}