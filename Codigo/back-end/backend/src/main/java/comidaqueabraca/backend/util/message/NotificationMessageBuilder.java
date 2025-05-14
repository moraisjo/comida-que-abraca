package comidaqueabraca.backend.util.message;

import comidaqueabraca.backend.entity.CampaignEntity;

import java.time.format.DateTimeFormatter;

public class NotificationMessageBuilder {

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public static String buildTitle() {
        return "💛 Sua ajuda pode transformar vidas!";
    }

    public static String buildMessage(CampaignEntity campaign) {
        return "Acabamos de lançar a campanha \"" + campaign.getName() +
                "\" e precisamos de você! Doe agora e ajude quem mais precisa até " +
                campaign.getEndDate().format(DATE_FORMATTER) + ".";
    }
}
