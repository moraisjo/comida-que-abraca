package comidaqueabraca.backend.controller;

import comidaqueabraca.backend.dto.DonationsByCampaignDTO;
import comidaqueabraca.backend.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/report")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/donations-by-campaign")
    public List<DonationsByCampaignDTO> getDonationsByCampaign() {
        return reportService.getDonationsByCampaign();
    }
}
