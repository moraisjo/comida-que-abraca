import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import colors from "../../shared/theme/colors";
import HeaderMenu from "../../shared/components/HeaderMenu";
import PendingDonations from "./DonationTabs/DonationPending/PendingDonations";
import DonationPendingDelivery from "./DonationTabs/DonationsPendingDelivery/DonationPendingDelivery";
import CustomTabPanel from "../../shared/components/CustomTabPanel/CustomTabPanel";
import DonationStock from "./DonationTabs/DonationStock/DonationStock";

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
      <Box sx={{ width: "100%" }}>
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
              {...getTabAccessibilityProps(1)}
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
          <DonationStock />
        </CustomTabPanel>
      </Box>
    </>
  );
};

export default DonationPage;
