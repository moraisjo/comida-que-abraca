package comidaqueabraca.backend.repository;

import comidaqueabraca.backend.entity.UserEntity;
import comidaqueabraca.backend.service.CustomUserDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    Optional<UserEntity> findByEmail(String email);

    @Query("SELECT new comidaqueabraca.backend.service.CustomUserDetails(u) FROM UserEntity u WHERE u.email = :email")
    CustomUserDetails findByLogin(String email);

    List<UserEntity> findAll();
}
