package comidaqueabraca.backend.controller;

import comidaqueabraca.backend.dto.CampaignDTO;
import comidaqueabraca.backend.entity.CampaignEntity;
import comidaqueabraca.backend.service.CampaignService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
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
    public ResponseEntity<CampaignEntity> createCampaign(@RequestBody CampaignDTO campaignDTO) {
        CampaignEntity createdCampaign = campaignService.createCampaign(campaignDTO);
        return ResponseEntity.status(200).body(createdCampaign);
    }

    @GetMapping("/active-campaigns")
    public ResponseEntity<Page<CampaignEntity>> getActiveCampaigns(Pageable pageable) {
        Page<CampaignEntity> campaigns = campaignService.getActiveCampaigns(pageable);
        return ResponseEntity.ok(campaigns);
    }
}