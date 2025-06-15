package comidaqueabraca.backend.util.message;

import comidaqueabraca.backend.entity.DonationEntity;

public class DonationNotificationMessageBuilder {

    public static String buildTitle() {
        return "🎁 Nova doação solicitada!";
    }

    public static String buildMessage(DonationEntity donation) {
        return "Uma nova doação foi solicitada: \"" + donation.getName() + "\" com quantidade de "
                + donation.getQuantity() + ".";
    }
}
