import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import HeaderMenu from "../../shared/components/HeaderMenu";
import PendingDonations from "./DonationTabs/DonationPending/PendingDonations";
import DonationPendingDelivery from "./DonationTabs/DonationsPendingDelivery/DonationPendingDelivery";
import CustomTabPanel from "../../shared/components/CustomTabPanel/CustomTabPanel";
import DonationsStocks from "./DonationTabs/DonationStock/DonationsStocks";
import { Inbox, Truck, Package } from "react-feather";
import Footer from "../../shared/components/Footer/Footer";

function getTabAccessibilityProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const DonationPage: React.FC = () => {
  const [value, setValue] = useState(0);
  const theme = useTheme();

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <HeaderMenu />
      <Box sx={{ width: "100%", pb: 10 }}>
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
              icon={<Inbox />}
              iconPosition="start"
              label="Solicitações de doação"
              {...getTabAccessibilityProps(0)}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                "&.Mui-selected": { color: theme.palette.secondary.main },
              }}
            />
            <Tab
              icon={<Truck />}
              iconPosition="start"
              label="Entregas pendentes"
              {...getTabAccessibilityProps(1)}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                "&.Mui-selected": { color: theme.palette.secondary.main },
              }}
            />
            <Tab
              icon={<Package />}
              iconPosition="start"
              label="Estoque de doações"
              {...getTabAccessibilityProps(2)}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                "&.Mui-selected": { color: theme.palette.secondary.main },
              }}
            />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <PendingDonations />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <DonationPendingDelivery />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={2}>
          <DonationsStocks />
        </CustomTabPanel>
      </Box>
      <Footer />
    </>
  );
};

export default DonationPage;
