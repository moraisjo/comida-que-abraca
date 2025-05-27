package comidaqueabraca.backend.repository;

import comidaqueabraca.backend.entity.CampaignEntity;
import comidaqueabraca.backend.enums.CampaignStatus;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface CampaignRepository extends JpaRepository<CampaignEntity, Integer> {

    @Query("""
    SELECT c FROM CampaignEntity c
    WHERE c.status = 'ACTIVE'
""")
    Page<CampaignEntity> findAllActiveCampaigns(Pageable pageable);

    @Query(value = "SELECT * FROM comidaqueabraca.db_campaign  WHERE status = :status ORDER BY startDate DESC", nativeQuery = true)
    List<CampaignEntity> findByStatusOrderByStartDateDesc(CampaignStatus status);

    @Query(value = "SELECT * FROM comidaqueabraca.db_campaign c WHERE c.name = :name AND (:startDate <= c.end_date AND :endDate >= c.start_date)", nativeQuery = true)
    List<CampaignEntity> findConflictingCampaignsByNameAndPeriod(
            @Param("name") String name,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );

}