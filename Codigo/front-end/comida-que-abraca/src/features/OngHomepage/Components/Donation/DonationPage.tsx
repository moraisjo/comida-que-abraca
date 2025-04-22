import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import colors from "../../../../shared/theme/colors";

import HeaderMenu from "../../../../shared/components/HeaderMenu";
import PendingDonations from "../Donation/DonationTabs/DonationPending/PendingDonations";
import DonationsAccepted from "../Donation/DonationTabs/DonationAccepted/DonationsAccepted";
import CustomTabPanel from "../../../../shared/components/CustomTabPanel/CustomTabPanel";

function getTabAccessibilityProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const DonationPage: React.FC = () => {
  const [value, setValue] = useState(0);

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
            borderColor: colors.secondary,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="tabs de doações"
            sx={{
              "& .MuiTabs-indicator": { backgroundColor: colors.secondary },
            }}
          >
            <Tab
              label="Doações Pendentes"
              {...getTabAccessibilityProps(0)}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                "&.Mui-selected": { color: colors.secondary },
              }}
            />
            <Tab
              label="Doações Aceitas"
              {...getTabAccessibilityProps(1)}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                "&.Mui-selected": { color: colors.secondary },
              }}
            />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <PendingDonations />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <DonationsAccepted />
        </CustomTabPanel>
      </Box>
    </>
  );
};

export default DonationPage;
