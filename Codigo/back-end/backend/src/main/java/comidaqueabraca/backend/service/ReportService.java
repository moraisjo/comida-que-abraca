package comidaqueabraca.backend.service;

import comidaqueabraca.backend.dto.DetailMonthlyDonationTypeReportData;
import comidaqueabraca.backend.dto.DonationsByCampaignDTO;
import comidaqueabraca.backend.dto.DonationsByYearRequestDTO;
import comidaqueabraca.backend.dto.DonationsPerMonthDTO;
import comidaqueabraca.backend.repository.CampaignRepository;
import comidaqueabraca.backend.repository.DonationRepository;
import comidaqueabraca.backend.repository.PartnerRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportService {

    @Autowired
    private DonationRepository donationRepository;

    @Autowired
    private CampaignRepository campaignRepository;

    @Autowired
    private PartnerRepository partnerRepository;

    public List<DonationsByCampaignDTO> getDonationsByCampaignAndMonthYear(int month, int year) {
        return donationRepository.countDonationsGroupedByCampaignAndMonthYear(month, year);
    }

    public List<DonationsPerMonthDTO> getDonationsPerYear(DonationsByYearRequestDTO request) {
        return donationRepository.countDonationsPerMonth(request.year());
    }

    public long getTotalCampaigns() {
        return campaignRepository.count();
    }

    public long getTotalDonations() {
        return donationRepository.count();
    }

    public long getTotalPartners() {
        return partnerRepository.count();
    }

    public List<DetailMonthlyDonationTypeReportData> findDonationReportByMonthAndYear(int month, int year) {
        return (donationRepository.findDonationReportByMonthAndYear(month, year));
    }
}
