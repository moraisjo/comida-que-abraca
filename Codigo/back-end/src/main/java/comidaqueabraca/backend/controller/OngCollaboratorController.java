package comidaqueabraca.backend.controller;

import comidaqueabraca.backend.dto.CreateOngCollaboratorDTO;
import comidaqueabraca.backend.dto.OngCollaboratorResponseDTO;
import comidaqueabraca.backend.service.OngCollaboratorService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ong-collaborator")
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "ONG Collaborator", description = "Operações relacionadas aos colaboradores da ONG")
public class OngCollaboratorController {

    @Autowired
    private OngCollaboratorService ongCollaboratorService;

    @PostMapping("/create")
    public ResponseEntity<OngCollaboratorResponseDTO> createOngCollaborator(@RequestBody @Valid CreateOngCollaboratorDTO request) {
        OngCollaboratorResponseDTO response = ongCollaboratorService.createOngCollaborator(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
