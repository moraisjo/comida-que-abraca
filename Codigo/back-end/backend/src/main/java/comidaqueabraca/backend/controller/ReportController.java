package comidaqueabraca.backend.controller;

import comidaqueabraca.backend.dto.DetailMonthlyDonationTypeReportData;
import comidaqueabraca.backend.dto.DonationsByCampaignDTO;
import comidaqueabraca.backend.dto.DonationsByYearRequestDTO;
import comidaqueabraca.backend.dto.DonationsPerMonthDTO;
import comidaqueabraca.backend.service.ReportService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/report")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/donations-by-campaign-monthly")
    public List<DonationsByCampaignDTO> getDonationsByCampaignAndMonthYear(
            @RequestParam int month,
            @RequestParam int year) {
        return reportService.getDonationsByCampaignAndMonthYear(month, year);
    }

    @PostMapping("/donations-per-year")
    public List<DonationsPerMonthDTO> getDonationsPerYear(@RequestBody DonationsByYearRequestDTO request) {
        return reportService.getDonationsPerYear(request);
    }

    @GetMapping("/total-campaigns")
    public long getTotalCampaigns() {
        return reportService.getTotalCampaigns();
    }

    @GetMapping("/total-donations")
    public long getTotalDonations() {
        return reportService.getTotalDonations();
    }

    @GetMapping("/total-partners")
    public long getTotalPartners() {
        return reportService.getTotalPartners();
    }

    @GetMapping("/monthly-donation-type")
    public ResponseEntity<List<DetailMonthlyDonationTypeReportData>> getDonationsByMonthYear(
            @RequestParam int month,
            @RequestParam int year) {
        return ResponseEntity.ok(reportService.findDonationReportByMonthAndYear(month, year));
    }
}