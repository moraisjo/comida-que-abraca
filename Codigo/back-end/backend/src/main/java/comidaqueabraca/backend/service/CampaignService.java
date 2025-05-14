package comidaqueabraca.backend.service;

import comidaqueabraca.backend.dto.CampaignDTO;
import comidaqueabraca.backend.entity.CampaignEntity;
import comidaqueabraca.backend.enums.CampaignStatus;
import comidaqueabraca.backend.repository.CampaignRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CampaignService {

    private final CampaignRepository campaignRepository;

    public CampaignService(CampaignRepository campaignRepository) {
        this.campaignRepository = campaignRepository;
    }

    public CampaignEntity createCampaign(CampaignDTO campaignDTO) {
        List<CampaignEntity> existingCampaigns = campaignRepository.findConflictingCampaignsByNameAndPeriod(
                campaignDTO.name(), campaignDTO.startDate(), campaignDTO.endDate()
        );

        if (!existingCampaigns.isEmpty()) {
            throw new IllegalArgumentException("Já existe uma campanha criada para o periodo informado.");
        }

        CampaignEntity campaign = new CampaignEntity(
                campaignDTO.name(),
                campaignDTO.description(),
                campaignDTO.address(),
                campaignDTO.startDate(),
                campaignDTO.endDate(),
                campaignDTO.photoUrl(),
                campaignDTO.status() != null ? campaignDTO.status() : CampaignStatus.ACTIVE
        );

        return campaignRepository.save(campaign);
    }

    public Page<CampaignEntity> getActiveCampaigns(Pageable pageable) {
        return campaignRepository.findAllActiveCampaigns(pageable);
    }
}