package comidaqueabraca.backend.controller;

import comidaqueabraca.backend.dto.ResetPasswordDTO;
import comidaqueabraca.backend.dto.UserResponseDTO;
import comidaqueabraca.backend.repository.UserRepository;
import comidaqueabraca.backend.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Usuário", description = "Operações relacionadas ao usuário")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @GetMapping("/all")
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        List<UserResponseDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PutMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody @Valid ResetPasswordDTO request) {
        try {
            userService.resetPassword(request);
            return ResponseEntity.ok().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/lgpd-consent/{id}")
    public ResponseEntity<?> acceptLgpd(@PathVariable Integer id) {
        return userRepository.findById(id).map(user -> {
            user.setLgpdConsentDate(LocalDateTime.now());
            userRepository.save(user);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}
