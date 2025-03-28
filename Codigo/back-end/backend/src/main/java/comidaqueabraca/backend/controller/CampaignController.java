package comidaqueabraca.backend.controller;

import ch.qos.logback.classic.Logger;
import comidaqueabraca.backend.dto.CampaignDTO;
import comidaqueabraca.backend.repository.CampaignRepository;
import comidaqueabraca.backend.service.CampaignService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.query.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@Slf4j // Lombok para criar o logger
@RestController
@RequestMapping("/campaign")
public class CampaignController {

    private final CampaignService campaignService;

    public CampaignController(CampaignService campaignService) {
        this.campaignService = campaignService;
    }

    @PostMapping("/create-campaign")
    @Transactional
    public ResponseEntity<Void> createCampaign(@RequestBody @Valid CampaignDTO data) {
        try {
            campaignService.createCampaign(data);
            log.info("[POST /campaign/create] Yay!, campaign '{}' created successfully! ", data.name());
            return ResponseEntity.noContent().build(); // Returns 204 No Content (without response body!)
        } catch (Exception e) {
            log.error("[POST /campaign/create] OH NO! Failed to create a campaign: {}", e.getMessage(), e);
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "OH NO! Failed to create a campaign! Contact dev team for more information."
            );
        }
    }

    @GetMapping("/active-campaigns")
    public ResponseEntity<Page<CampaignDTO>> getActiveCampaigns(@RequestBody @Valid CampaignDTO data,
                                                                @PageableDefault(size = 20, direction = Sort.Direction.DESC) Pageable pageable) {

        CampaignRepository campaignRepository;
        Page campaigns = campaignRepository.findActiveCampaignsWithFilters(data,
                pageable);

        return ResponseEntity.ok(campaigns);
    }
}