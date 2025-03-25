package comidaqueabraca.backend.service;

import comidaqueabraca.backend.dto.MoneyDonationDTO;
import comidaqueabraca.backend.entity.MoneyEntity;
import comidaqueabraca.backend.repository.MoneyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MoneyService {

    private final MoneyRepository moneyRepository;

    @Autowired
    public MoneyService(MoneyRepository moneyRepository) {
        this.moneyRepository = moneyRepository;
    }

    public List<MoneyEntity> getAllMoneyDonations() {
        return moneyRepository.findAll();
    }

    public List<MoneyDonationDTO> getAllMoneyDonationsOrderedByValue() {
        return moneyRepository.findAllMoneyDonationsOrderedByValueDesc();
    }
}