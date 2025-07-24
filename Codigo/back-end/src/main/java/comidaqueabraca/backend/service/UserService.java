package comidaqueabraca.backend.service;

import comidaqueabraca.backend.dto.*;
import comidaqueabraca.backend.dto.UserResponseDTO;
import comidaqueabraca.backend.entity.UserEntity;
import comidaqueabraca.backend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<UserResponseDTO> getAllUsers() {
        List<UserEntity> users = userRepository.findAll();
        return users.stream()
                .map(user -> new UserResponseDTO(
                        user.getName(),
                        user.getEmail(),
                        user.getPhone(),
                        user.getAddress()))
                .collect(Collectors.toList());
    }

    public void resetPassword(ResetPasswordDTO request) {
        var user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado para o email: " + request.email()));

        String hashedPassword = passwordEncoder.encode(request.newPassword());
        user.setPassword(hashedPassword);
        userRepository.save(user);
    }
}
