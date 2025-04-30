package comidaqueabraca.backend.repository;

import comidaqueabraca.backend.dto.CampaignDTO;
import comidaqueabraca.backend.entity.CampaignEntity;
import comidaqueabraca.backend.enums.CampaignStatus;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CampaignRepository extends JpaRepository<CampaignEntity, Integer> {

    @Query("""
    SELECT c FROM CampaignEntity c
    WHERE c.status = 'ACTIVE'
""")
    Page<CampaignEntity> findAllActiveCampaigns(Pageable pageable);


    @Query(""" 
    SELECT c FROM CampaignEntity c
    WHERE c.status = 'ACTIVE'
    AND (:name IS NULL OR LOWER(c.name) LIKE LOWER(CONCAT('%', :name, '%')))
    AND (:startDateFrom IS NULL OR c.startDate >= :startDateFrom)
    AND (:startDateTo IS NULL OR c.startDate <= :startDateTo)
    AND (:endDateFrom IS NULL OR c.endDate >= :endDateFrom)
    AND (:endDateTo IS NULL OR c.endDate <= :endDateTo)
    ORDER BY c.startDate DESC
""")
    Page<CampaignDTO> findActiveCampaignsWithFilters(@Param("data") CampaignDTO data, Pageable pageable);

    List<CampaignEntity> findByStatus(CampaignStatus status);

    @Query(value = "SELECT * FROM comidaqueabraca.db_campaign  WHERE status = :status ORDER BY startDate DESC", nativeQuery = true)
    List<CampaignEntity> findByStatusOrderByStartDateDesc(CampaignStatus status);
}