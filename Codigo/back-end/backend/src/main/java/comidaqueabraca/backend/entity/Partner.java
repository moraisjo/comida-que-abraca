package comidaqueabraca.backend.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import comidaqueabraca.backend.enums.PartnerType;
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
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "partner")
@Getter
@Setter
@NoArgsConstructor
public class Partner extends User{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo", nullable = false)
    private PartnerType tipo;

    @Column(name = "quer_dar", nullable = false)
    private boolean querDoar;

    @Column(name = "quer_receber_doacao", nullable = false)
    private boolean querReceberDoacao;

    @OneToMany(mappedBy = "doador", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Donation> doacoesFeitas = new ArrayList<>();

    @OneToMany(mappedBy = "beneficiario", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Donation> doacoesRecebidas = new ArrayList<>();

    @Column(name = "data_cadastro", nullable = false)
    private LocalDateTime dataCadastro;
}
