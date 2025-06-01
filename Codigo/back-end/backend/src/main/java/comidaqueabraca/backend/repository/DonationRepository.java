package comidaqueabraca.backend.repository;

import comidaqueabraca.backend.enums.DonationStatus;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import comidaqueabraca.backend.dto.DetailMonthlyDonationTypeReportData;
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
        WHERE MONTH(d.arrivingDate) = :month AND YEAR(d.arrivingDate) = :year
        GROUP BY c.name
        ORDER BY COUNT(d) DESC
    """)
    List<DonationsByCampaignDTO> countDonationsGroupedByCampaignAndMonthYear(
        @Param("month") int month,
        @Param("year") int year
    );

    @Query("SELECT new comidaqueabraca.backend.dto.DonationsPerMonthDTO(" +
        "MONTH(d.arrivingDate), '', COUNT(d)) " +
        "FROM DonationEntity d " +
        "WHERE YEAR(d.arrivingDate) = :year " +
        "GROUP BY MONTH(d.arrivingDate) " +
        "ORDER BY MONTH(d.arrivingDate)")
List<DonationsPerMonthDTO> countDonationsPerMonth(@Param("year") Integer year);

    @Query(value = """
        SELECT
            d.name AS donationName,
            c.name AS campaignName,
            DATE_FORMAT(d.arriving_date, '%m/%Y') AS donationMonthYear,
            CASE
                WHEN f.id IS NOT NULL THEN 'Alimento'
                WHEN i.id IS NOT NULL THEN 'Item'
                WHEN m.id IS NOT NULL THEN 'Dinheiro'
                ELSE ''
            END AS donationType
        FROM db_donation d
        JOIN db_campaign c ON d.campaign_id = c.id
        LEFT JOIN db_food f ON f.id = d.id
        LEFT JOIN db_item i ON i.id = d.id
        LEFT JOIN db_money m ON m.id = d.id
        WHERE EXTRACT(MONTH FROM d.arriving_date) = :month
          AND EXTRACT(YEAR FROM d.arriving_date) = :year
        ORDER BY d.arriving_date, c.name, d.name
        """, nativeQuery = true)
    List<DetailMonthlyDonationTypeReportData> findDonationReportByMonthAndYear(
        @Param("month") int month,
        @Param("year") int year
    );

    @Query(value = """
        INSERT INTO db_donation (
            name, 
            arriving_date, 
            delivery, 
            status, 
            photo_url,
            donor_id, 
            campaign_id
        ) VALUES (
            :#{#donation.name}, 
            :#{#donation.arrivingDate}, 
            :#{#donation.delivery}, 
            :#{#donation.status}, 
            :#{#donation.photoUrl},
            :#{#donation.donor.id}, 
            :#{#donation.campaign.id}
        )
        """, nativeQuery = true)
    void createDonation(@Param("donation") DonationEntity donation);
}
