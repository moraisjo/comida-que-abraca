import { useState } from 'react';
import { createPartner } from '../../data/repository/partnerRepository';
import { Partner } from '../../data/model/Partner';
import './PartnerForm.css'; // ⬅️ IMPORTANTE

export default function PartnerForm() {
  const [partner, setPartner] = useState<Partner>({
    name: '',
    email: '',
    phone: '',
    wantsToDonate: false,
    wantsToReceiveDonations: false,
    legalEntityType: 'ONG',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setPartner(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPartner(partner);
      alert('Parceiro cadastrado com sucesso!');
      setPartner({
        name: '',
        email: '',
        phone: '',
        wantsToDonate: false,
        wantsToReceiveDonations: false,
        legalEntityType: 'ONG',
      });
    } catch (err) {
      alert('Erro ao cadastrar parceiro');
    }
  };

  return (
    <div className="partner-form-container">
      <form onSubmit={handleSubmit} className="partner-form">
        <h2>Cadastro de Parceiro</h2>

        <input
          type="text"
          name="name"
          value={partner.name}
          onChange={handleChange}
          placeholder="Nome"
          required
        />

        <input
          type="email"
          name="email"
          value={partner.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />

        <input
          type="text"
          name="phone"
          value={partner.phone}
          onChange={handleChange}
          placeholder="Telefone"
          required
        />

        <select
          name="legalEntityType"
          value={partner.legalEntityType}
          onChange={handleChange}
        >
          <option value="ONG">ONG</option>
          <option value="GOVERNMENT">Governo</option>
          <option value="COMPANY">Empresa</option>
          <option value="VOLUNTARY">Voluntário</option>
        </select>

        <div className="checkbox-group">
            <input
                type="checkbox"
                name="wantsToDonate"
                checked={partner.wantsToDonate}
                onChange={handleChange}
            />
            <span>Deseja doar?</span>
        </div>

        <div className="checkbox-group">
            <input
                type="checkbox"
                name="wantsToReceiveDonations"
                checked={partner.wantsToReceiveDonations}
             onChange={handleChange}
            />
             <span>Deseja receber doações?</span>
            </div>

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}