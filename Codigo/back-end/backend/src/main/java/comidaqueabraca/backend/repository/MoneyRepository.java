package comidaqueabraca.backend.repository;

import comidaqueabraca.backend.dto.MoneyDonationDTO;
import comidaqueabraca.backend.entity.MoneyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MoneyRepository extends JpaRepository<MoneyEntity, Long> {

    // Consulta para retornar todas as doações em dinheiro
    List<MoneyEntity> findAll();

    // Consulta personalizada para o relatório
    @Query("SELECT new comidaqueabraca.backend.dto.MoneyDonationDTO(" +
            "u.name, m.value, m.category, d.arrivingDate) " +
            "FROM MoneyEntity m " +
            "JOIN DonationEntity d ON m.id = d.id " +
            "JOIN PartnerEntity p ON d.donor.id = p.id " +
            "JOIN UserEntity u ON p.id = u.id " +
            "ORDER BY m.value DESC")
    List<MoneyDonationDTO> findAllMoneyDonationsOrderedByValueDesc();
}