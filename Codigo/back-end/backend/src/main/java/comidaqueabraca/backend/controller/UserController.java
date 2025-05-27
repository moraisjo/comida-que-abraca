package comidaqueabraca.backend.controller;

import comidaqueabraca.backend.entity.UserEntity;
import comidaqueabraca.backend.repository.UserRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/user")
@Tag(name = "Usuário", description = "Operações relacionadas ao usuário")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Endpoint que registra o aceite do termo LGPD, salvando a data/hora
    @PutMapping("/lgpd-consent/{id}")
    public ResponseEntity<?> acceptLgpd(@PathVariable Integer id) {
        return userRepository.findById(id).map(user -> {
            user.setLgpdConsentDate(LocalDateTime.now());
            userRepository.save(user);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}
