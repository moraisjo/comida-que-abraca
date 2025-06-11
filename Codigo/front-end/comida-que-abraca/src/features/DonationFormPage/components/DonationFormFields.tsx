import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  FormHelperText,
  InputLabel,
  FormControl,
  Select,
} from "@mui/material";
import ImageUpload from "../../../shared/components/Upload/ImageUpload";
import { useCampaignService } from "../../CampaignsPage/hooks/useCampaingService";
import { Campaign } from "../../../data/model/campaign";
import { useAuth } from "../../../context/AuthContext";
import { useDonationService } from "../hooks/useDonationService";
import BackendResponseModal from "../../../shared/components/Modal/BackendResponseModal";

interface FormData {
  itemName: string;
  category: string;
  description: string;
  quantity: number;
  contactInfo: string;
  deliveryOption: string;
  campaignId?: number;
}

const getDeliveryDescription = (option: string): string => {
  const map: Record<string, string> = {
    appCar: "Posso enviar via carro de aplicativo (Uber, 99Pop etc.)",
    deliverMyself: "Posso levar até a ONG Comida Que Abraça",
    requestPickup: "Quero que a ONG busque ou pague o carro de aplicativo",
  };
  return map[option] || "";
};

const getDeliveryEnum = (option: string): string => {
  const deliveryOptionsForDelivery = ["appCar", "deliverMyself"];

  return deliveryOptionsForDelivery.includes(option) ? "DELIVERY" : "PICKUP";
};

const mapFormDataToApiPayload = (
  data: FormData,
  photoUrl: string | null,
  userId: number | null
) => {
  return {
    name: data.itemName,
    description: data.description,
    category: data.category,
    quantity: data.quantity,
    contactInfo: data.contactInfo,
    deliveryDescription: getDeliveryDescription(data.deliveryOption),
    delivery: getDeliveryEnum(data.deliveryOption),
    photoUrl: photoUrl,
    donor: userId,
    campaign: data.campaignId ?? null,
  };
};

const categories = [
  { value: "FOOD", label: "Alimentos Não Perecíveis" },
  { value: "PERISHABLE_FOOD", label: "Alimentos Perecíveis" },
  { value: "BED_BATH", label: "Cama, Mesa e Banho" },
  { value: "CLEANING", label: "Produtos de Limpeza" },
  { value: "PERSONAL_CARE", label: "Cuidados Pessoais" },
  { value: "ELECTRONICS", label: "Eletrônicos" },
  { value: "FURNITURE", label: "Móveis" },
  { value: "HYGIENE", label: "Itens de Higiene" },
  { value: "CLOTHING", label: "Roupas" },
  { value: "APPLIANCES", label: "Eletrodomésticos" },
];

const deliveryOptions = [
  {
    value: "appCar",
    label: "Posso enviar via carro de aplicativo (Uber, 99Pop etc.)",
  },
  { value: "deliverMyself", label: "Posso levar até a ONG Comida Que Abraça" },
  {
    value: "requestPickup",
    label: "Quero que a ONG busque ou pague o carro de aplicativo",
  },
];

const DonationFormFields: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({ mode: "onSubmit" });
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const { createDonation } = useDonationService();

  const { decodedUser } = useAuth();
  const userId = decodedUser?.userId ? Number(decodedUser.userId) : null;

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalSuccess, setModalSuccess] = useState(false);

  const { getActiveCampaigns } = useCampaignService();

  useEffect(() => {
    const fetchCampaigns = async () => {
      const activeCampaigns = await getActiveCampaigns();
      setCampaigns(activeCampaigns);
    };
    fetchCampaigns();
  }, [getActiveCampaigns]);

  const onSubmit = async (data: FormData) => {
    if (!photoUrl) {
      setModalMessage("Por favor, envie uma foto.");
      setModalSuccess(false);
      setModalOpen(true);
      return;
    }

    const payload = mapFormDataToApiPayload(data, photoUrl, userId);

    try {
      const response = await createDonation(payload);
      if (response) {
        setModalMessage(response.message);
        setModalSuccess(true);
        setModalOpen(true);
        reset();
        setPhotoUrl(null);
      }
    } catch (error) {
      setModalMessage(
        "Erro ao criar doação. Verifique os dados e tente novamente."
      );
      setModalSuccess(false);
      setModalOpen(true);
    }
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          maxWidth: 600,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          {...register("itemName", {
            required: "O nome do item é obrigatório",
          })}
          label="Nome do item"
          fullWidth
          margin="normal"
          error={!!errors.itemName}
          helperText={errors.itemName?.message}
        />

        <TextField
          {...register("category", { required: "A categoria é obrigatória" })}
          label="Categoria"
          select
          fullWidth
          margin="normal"
          error={!!errors.category}
          helperText={errors.category?.message}
        >
          {categories.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          {...register("description", {
            required: "A descrição é obrigatória",
          })}
          label="Descrição da doação"
          multiline
          rows={4}
          fullWidth
          margin="normal"
          error={!!errors.description}
          helperText={errors.description?.message}
        />
        <TextField
          {...register("quantity", { required: "A quantidade é obrigatória" })}
          type="number"
          label="Quantidade"
          fullWidth
          margin="normal"
          error={!!errors.quantity}
          helperText={errors.quantity?.message}
        />

        <TextField
          {...register("contactInfo", {
            required: "A informação de contato é obrigatória",
          })}
          label="Informação de contato"
          fullWidth
          margin="normal"
          error={!!errors.contactInfo}
          helperText={errors.contactInfo?.message}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Campanha (opcional)</InputLabel>
          <Controller
            name="campaignId"
            control={control}
            defaultValue={undefined}
            render={({ field }) => (
              <Select<number | "">
                {...field}
                label="Campanha (opcional)"
                value={field.value ?? ""}
                onChange={(e) => {
                  const value =
                    e.target.value === "" ? undefined : Number(e.target.value);
                  field.onChange(value);
                }}
              >
                <MenuItem value="">Nenhuma campanha</MenuItem>
                {campaigns.map((campaign) => (
                  <MenuItem key={campaign.id} value={campaign.id}>
                    {campaign.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>

        <Box
          sx={{
            width: "100%",
            height: "56px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px solid #ccc",
            padding: "0 16px",
            marginTop: 2,
          }}
        >
          <ImageUpload onImageUploaded={setPhotoUrl} />
        </Box>

        <FormControl fullWidth margin="normal" error={!!errors.deliveryOption}>
          <InputLabel>Como você prefere fazer a entrega?</InputLabel>
          <Controller
            name="deliveryOption"
            control={control}
            defaultValue=""
            rules={{ required: "Selecione uma opção de entrega" }}
            render={({ field }) => (
              <Select {...field} label="Como você prefere fazer a entrega?">
                <MenuItem value="" disabled>
                  Selecione uma opção
                </MenuItem>
                {deliveryOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText>{errors.deliveryOption?.message}</FormHelperText>
        </FormControl>

        <FormHelperText>
          Sempre que você nos ajuda a trazer ou enviar a doação até nossa ONG,
          você nos ajuda imensamente. Agradecemos muito!
        </FormHelperText>

        <Box mt={2}>
          <Button type="submit" variant="contained" fullWidth>
            Enviar Solicitação
          </Button>
        </Box>
      </Box>
      <BackendResponseModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        message={modalMessage}
        isSuccess={modalSuccess}
      />
    </>
  );
};

export default DonationFormFields;
