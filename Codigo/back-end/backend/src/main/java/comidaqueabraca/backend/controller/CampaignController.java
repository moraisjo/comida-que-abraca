package comidaqueabraca.backend.controller;

import comidaqueabraca.backend.dto.CampaignDTO;
import comidaqueabraca.backend.dto.response.ResponseDTO;
import comidaqueabraca.backend.entity.CampaignEntity;
import comidaqueabraca.backend.service.CampaignService;
import jakarta.validation.Valid;
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
public class CampaignController {

    @Autowired
    private CampaignService campaignService;

    @PostMapping("/create-campaign")
    public ResponseEntity<ResponseDTO> createCampaign(@Valid @RequestBody CampaignDTO campaignDTO) {
        campaignService.createCampaign(campaignDTO);
        ResponseDTO response = new ResponseDTO("Campanha criada com sucesso!", 201);
        return ResponseEntity.status(201).body(response);
    }

    @GetMapping("/active-campaigns")
    public ResponseEntity<Page<CampaignDTO>> getActiveCampaigns(
            @RequestBody @Valid CampaignDTO data,
            @PageableDefault(size = 15, direction = Sort.Direction.DESC) Pageable pageable) {
        try {
            Page<CampaignDTO> campaigns = this.campaignService.getActiveCampaigns(data, pageable);
            return ResponseEntity.ok(campaigns);
        } catch (Exception e) {
            log.error("[GET /campaign/active-campaigns] OH, NO! Failed to retrieve active campaigns. Filters: {}. Error: {}",
                    data, e.getMessage(), e);
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "OH, NO! Failed to retrieve active campaigns. Contact dev team for more information.",
                    e
            );
        }
    }
}