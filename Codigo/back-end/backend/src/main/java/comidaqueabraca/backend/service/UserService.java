package comidaqueabraca.backend.service;

import comidaqueabraca.backend.dto.UserResponseDTO;
import comidaqueabraca.backend.entity.UserEntity;
import comidaqueabraca.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

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
}
