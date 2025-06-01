import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import HeaderMenu from "../../shared/components/HeaderMenu";
import PendingDonations from "./DonationTabs/DonationPending/PendingDonations";
import DonationPendingDelivery from "./DonationTabs/DonationsPendingDelivery/DonationPendingDelivery";
import CustomTabPanel from "../../shared/components/CustomTabPanel/CustomTabPanel";
import DonationStock from "./DonationTabs/DonationStock/DonationStock";
import MyDonations from "./DonationTabs/MyDonations/MyDonations";
import NewDonationModal from "../ManageDonationsPage/DonationCreate/DonationCreate";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

function getTabAccessibilityProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const DonationPage: React.FC = () => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const { userId } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const checkAdminRole = async () => {
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:8080/api/ong-collaborator/is-admin/${userId}`);
          setIsAdmin(response.data);
        } catch {
          setIsAdmin(false);
        }
      }
    };

    checkAdminRole();
  }, [userId]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDonationSuccess = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <HeaderMenu />
      <Box sx={{ width: "100%" }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenModal}
            sx={{ mb: 2 }}
          >
            Adicionar nova doação
          </Button>
        </Box>

        <Box
          sx={{
            borderBottom: 1,
            borderColor: theme.palette.secondary.main,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="tabs de doações"
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: theme.palette.secondary.main,
              },
            }}
          >
            <Tab
              label="Solicitações Pendentes"
              {...getTabAccessibilityProps(0)}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                "&.Mui-selected": { color: theme.palette.secondary.main },
              }}
            />
            <Tab
              label="Doações Pendentes Entrega"
              {...getTabAccessibilityProps(1)}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                "&.Mui-selected": { color: theme.palette.secondary.main },
              }}
            />
            <Tab
              label="Estoque de doações"
              {...getTabAccessibilityProps(2)}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                "&.Mui-selected": { color: theme.palette.secondary.main },
              }}
            />
            {!isAdmin && (
              <Tab
                label="Minhas Doações"
                {...getTabAccessibilityProps(3)}
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  "&.Mui-selected": { color: theme.palette.secondary.main },
                }}
              />
            )}
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <PendingDonations />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <DonationPendingDelivery />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={2}>
          <DonationStock />
        </CustomTabPanel>

        {!isAdmin && (
          <CustomTabPanel value={value} index={3}>
            <MyDonations />
          </CustomTabPanel>
        )}

        <NewDonationModal
          open={isModalOpen}
          onClose={handleCloseModal}
          onSuccess={handleDonationSuccess}
        />
      </Box>
    </>
  );
};

export default DonationPage;
