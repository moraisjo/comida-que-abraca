import React, { useState } from "react";
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

type FormData = {
  itemName: string;
  category: string;
  description: string;
  quantity: number;
  contactInfo: string;
  deliveryOption: string;
  photoUrl?: string;
};

const DonationFormFields: React.FC = () => {
  const { register, handleSubmit, control } = useForm<FormData>();
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  const onSubmit = (data: FormData) => {
    const formDataWithPhoto = { ...data, photoUrl };
    console.log(formDataWithPhoto);
  };

  return (
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
        {...register("itemName")}
        label="Nome do item"
        fullWidth
        margin="normal"
      />

      <TextField
        {...register("category")}
        label="Categoria"
        select
        fullWidth
        margin="normal"
      >
        {categories.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        {...register("description")}
        label="Descrição da doação"
        multiline
        rows={4}
        fullWidth
        margin="normal"
      />

      <TextField
        {...register("quantity")}
        type="number"
        label="Quantidade"
        fullWidth
        margin="normal"
      />

      <TextField
        {...register("contactInfo")}
        label="Informação de contato"
        fullWidth
        margin="normal"
      />

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

      <FormControl fullWidth margin="normal">
        <InputLabel>Como você prefere fazer a entrega?</InputLabel>
        <Controller
          name="deliveryOption"
          control={control}
          defaultValue=""
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
  );
};

export default DonationFormFields;
