package comidaqueabraca.backend.controller;

import comidaqueabraca.backend.dto.CreatePartnerDTO;
import comidaqueabraca.backend.dto.PartnerDTO;
import comidaqueabraca.backend.service.PartnerService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/partners")
@Tag(name = "Parceiros", description = "Gerenciamento de parceiros que podem doar ou receber doações")
public class PartnerController {

    @Autowired
    private PartnerService partnerService;

    @PostMapping("/create")
    public ResponseEntity<PartnerDTO> createPartner(@RequestBody @Valid CreatePartnerDTO data) {
        PartnerDTO newPartner = partnerService.createPartner(data);

        return ResponseEntity.status(HttpStatus.CREATED).body(newPartner);
    }
}
