package comidaqueabraca.backend.enums;

import lombok.Getter;

@Getter
public enum CategoryTransaction {
    PIX("Pix"),
    CASH("Dinheiro físico"),
    TRANSFER("Transferência bancária");

    private final String category;

    CategoryTransaction(String category) {
        this.category = category;
    }
}
