package comidaqueabraca.backend.service;

import comidaqueabraca.backend.entity.UserEntity;
import comidaqueabraca.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class LgpdConsentService {

    @Autowired
    private UserRepository userRepository;

    public LocalDateTime checkUserConsent(Integer userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return user.getLgpdConsentDate();
    }

    public void saveConsentDate(Integer userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setLgpdConsentDate(LocalDateTime.now());
        userRepository.save(user);
    }
}