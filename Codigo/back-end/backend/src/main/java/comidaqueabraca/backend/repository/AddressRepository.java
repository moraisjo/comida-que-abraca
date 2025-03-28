package comidaqueabraca.backend.repository;

import comidaqueabraca.backend.entity.AddressEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepository extends JpaRepository<AddressEntity, Integer> {
}