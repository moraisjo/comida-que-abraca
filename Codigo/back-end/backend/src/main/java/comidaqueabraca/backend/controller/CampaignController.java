package comidaqueabraca.backend.controller;

import comidaqueabraca.backend.dto.CampaignDTO;
import comidaqueabraca.backend.dto.response.ResponseDTO;
import comidaqueabraca.backend.entity.CampaignEntity;
import comidaqueabraca.backend.service.CampaignService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@Slf4j
@RestController
@RequestMapping("/campaign")
@CrossOrigin(origins = "http://localhost:5173")
public class CampaignController {

    @Autowired
    private CampaignService campaignService;

    @PostMapping("/create-campaign")
    public ResponseEntity<ResponseDTO> createCampaign(@RequestBody CampaignDTO campaignDTO) {
        try {
            campaignService.createCampaign(campaignDTO);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ResponseDTO("Campanha criada com sucesso!", 201));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseDTO(e.getMessage(), 400));
        }
    }

    @GetMapping("/active-campaigns")
    public ResponseEntity<Page<CampaignEntity>> getActiveCampaigns(Pageable pageable) {
        Page<CampaignEntity> campaigns = campaignService.getActiveCampaigns(pageable);
        return ResponseEntity.ok(campaigns);
    }
}