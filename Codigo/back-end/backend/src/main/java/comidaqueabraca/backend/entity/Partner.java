package comidaqueabraca.backend.entity;

import java.time.LocalDateTime;
import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "partner")
public class Partner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto incrementa o ID no banco de dados
    @Column(name = "id")
    private Long id;

    @Enumerated(EnumType.STRING) // Mapeia o enum como string no banco de dados
    @Column(name = "tipo", nullable = false)
    private PartnerType tipo;

    @Column(name = "quer_dar", nullable = false)
    private boolean querDoar;

    @Column(name = "quer_receber_doacao", nullable = false)
    private boolean querReceberDoacao;

    @OneToMany(mappedBy = "partner", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Donation> doacoes; // Lista de doações associadas ao parceiro

    @Column(name = "data_cadastro", nullable = false)
    private LocalDateTime dataCadastro; // Data e hora do cadastro no sistema

    // Construtor
    public Partner() {}

    public Partner(PartnerType
     tipo, boolean querDoar, boolean querReceberDoacao, List<Donation> doacoes, LocalDateTime dataCadastro) {
        this.tipo = tipo;
        this.querDoar = querDoar;
        this.querReceberDoacao = querReceberDoacao;
        this.doacoes = doacoes;
        this.dataCadastro = dataCadastro;
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PartnerType getTipo() {
        return tipo;
    }

    public void setTipo(PartnerType tipo) {
        this.tipo = tipo;
    }

    public boolean isQuerDoar() {
        return querDoar;
    }

    public void setQuerDoar(boolean querDoar) {
        this.querDoar = querDoar;
    }

    public boolean isQuerReceberDoacao() {
        return querReceberDoacao;
    }

    public void setQuerReceberDoacao(boolean querReceberDoacao) {
        this.querReceberDoacao = querReceberDoacao;
    }

    public List<Donation> getDoacoes() {
        return doacoes;
    }

    public void setDoacoes(List<Donation> doacoes) {
        this.doacoes = doacoes;
    }

    public LocalDateTime getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(LocalDateTime dataCadastro) {
        this.dataCadastro = dataCadastro;
    }
}
