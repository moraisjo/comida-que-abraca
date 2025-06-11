package comidaqueabraca.backend.service;

import comidaqueabraca.backend.dto.MoneyDonationDTO;
import comidaqueabraca.backend.entity.MoneyEntity;
import comidaqueabraca.backend.repository.MoneyRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MoneyService {

    private static final Logger logger = LoggerFactory.getLogger(MoneyService.class);

    private final MoneyRepository moneyRepository;

    @Autowired
    public MoneyService(MoneyRepository moneyRepository) {
        this.moneyRepository = moneyRepository;
    }

    public List<MoneyEntity> getAllMoneyDonations() {
        try {
            return moneyRepository.findAll();
        } catch (Exception e) {
            logger.error("Error in getAllMoneyDonations", e);
            throw e;
        }
    }

    public List<MoneyDonationDTO> getAllMoneyDonationsOrderedByValue() {
        try {
            return moneyRepository.findAllMoneyDonationsOrderedByValueDesc();
        } catch (Exception e) {
            logger.error("Error in getAllMoneyDonationsOrderedByValue", e);
            throw e;
        }
    }
}