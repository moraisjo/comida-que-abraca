package comidaqueabraca.backend.controller;

import comidaqueabraca.backend.dto.CreateCampaignDTO;
import comidaqueabraca.backend.service.CampaignService;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/campaign")
public class CampaignController {

    private final CampaignService campaignService;

    public CampaignController(CampaignService campaignService) {
        this.campaignService = campaignService;
    }

    @PostMapping("/create")
    @Transactional
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void createCampaign(@RequestBody CreateCampaignDTO data) {
        this.campaignService.createCampaign(data);
    }
}