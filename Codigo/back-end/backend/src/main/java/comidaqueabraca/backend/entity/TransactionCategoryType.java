package comidaqueabraca.backend.entity;

public enum TransactionCategoryType {
    PIX("PIX"),
    CASH("Dinheiro"),
    TRANSFER("Transferência");

    private final String category;

    TransactionCategoryType(String category) {
        this.category = category;
    }

    public String getCategory() {
        return category;
    }

    public static TransactionCategoryType fromString(String category) {
        for (TransactionCategoryType t : TransactionCategoryType.values()) {
            if (t.category.equalsIgnoreCase(category)) {
                return t;
            }
        }
        throw new IllegalArgumentException("Unknown category: " + category);
    }
}