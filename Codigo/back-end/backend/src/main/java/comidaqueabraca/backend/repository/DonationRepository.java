package comidaqueabraca.backend.repository;

import comidaqueabraca.backend.enums.DonationStatus;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import comidaqueabraca.backend.dto.DonationsByCampaignDTO;
import comidaqueabraca.backend.dto.DonationsPerMonthDTO;
import comidaqueabraca.backend.entity.DonationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

@Repository
public interface DonationRepository extends JpaRepository<DonationEntity, Long> {

    List<DonationEntity> findByStatus(DonationStatus status);

    @Query("""
                SELECT new comidaqueabraca.backend.dto.DonationsByCampaignDTO(
                    COALESCE(c.name, 'Outras Campanhas'),
                    COUNT(d))
                FROM DonationEntity d
                LEFT JOIN d.campaign c
                GROUP BY c.name
                ORDER BY COUNT(d) DESC
            """)
    List<DonationsByCampaignDTO> countDonationsGroupedByCampaign();

    @Query("SELECT new comidaqueabraca.backend.dto.DonationsPerMonthDTO(" +
        "MONTH(d.arrivingDate), '', COUNT(d)) " +
        "FROM DonationEntity d " +
        "WHERE YEAR(d.arrivingDate) = :year " +
        "GROUP BY MONTH(d.arrivingDate) " +
        "ORDER BY MONTH(d.arrivingDate)")
List<DonationsPerMonthDTO> countDonationsPerMonth(@Param("year") Integer year);
}
