package comidaqueabraca.backend.repository;
import org.springframework.stereotype.Repository;
import comidaqueabraca.backend.entity.DonationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface DonationRepository extends JpaRepository<DonationEntity, Long>{
    
}
