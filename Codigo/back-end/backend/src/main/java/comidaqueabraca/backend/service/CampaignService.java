package comidaqueabraca.backend.service;

import comidaqueabraca.backend.dto.CampaignDTO;
import comidaqueabraca.backend.entity.CampaignEntity;
import comidaqueabraca.backend.enums.CampaignStatus;
import comidaqueabraca.backend.repository.CampaignRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class CampaignService {

    private final CampaignRepository campaignRepository;

    public CampaignService(CampaignRepository campaignRepository) {
        this.campaignRepository = campaignRepository;
    }

    public void createCampaign(CampaignDTO data) {
        if (data.startDate().isAfter(data.endDate())) {
            throw new IllegalArgumentException("A data de início não pode ser depois da data de término");
        }

        CampaignEntity newCampaign = new CampaignEntity();
        newCampaign.setName(data.name());
        newCampaign.setDescription(data.description());
        newCampaign.setAddress(data.address());
        newCampaign.setStartDate(data.startDate());
        newCampaign.setEndDate(data.endDate());
        newCampaign.setPhotoUrl(data.photoUrl());
        newCampaign.setStatus(data.status() != null ? data.status() : CampaignStatus.ACTIVE);

        campaignRepository.save(newCampaign);
    }


    public Page<CampaignDTO> getActiveCampaigns(CampaignDTO data, Pageable pageable){
        return this.campaignRepository.findActiveCampaignsWithFilters(data, pageable);
    }
}