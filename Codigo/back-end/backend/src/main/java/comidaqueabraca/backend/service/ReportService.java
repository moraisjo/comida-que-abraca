package comidaqueabraca.backend.service;

import comidaqueabraca.backend.dto.DonationsByCampaignDTO;
import comidaqueabraca.backend.repository.DonationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final DonationRepository donationRepository;

    public List<DonationsByCampaignDTO> getDonationsByCampaign() {
        return donationRepository.countDonationsGroupedByCampaign();
    }
}
