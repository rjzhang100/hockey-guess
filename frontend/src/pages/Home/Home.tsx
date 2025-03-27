import { Box, Divider, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import GamePage from "../../components/GamePage/GamePage";
import { DAYS } from "../../constants/consts";
import UserStats from "../../components/UserStats/UserStats";
import { COLOURS } from "../../constants/styles";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Home = () => {
  const [tabValue, setTabValue] = useState<number>(2);
  const handleChange = (newValue: number) => {
    setTabValue(newValue);
  };
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          variant="scrollable"
          allowScrollButtonsMobile
          value={tabValue}
          onChange={(_, newValue) => handleChange(newValue)}
        >
          <Tab label={DAYS.YESTERDAY} value={1} />
          <Tab label={DAYS.TODAY} value={2} />
          <Tab label={DAYS.TOMORROW} value={3} />
          <Tab label={"User Stats"} value={4} />
        </Tabs>
      </Box>
      <CustomTabPanel index={1} value={tabValue}>
        <GamePage day={DAYS.YESTERDAY} />
      </CustomTabPanel>
      <CustomTabPanel index={2} value={tabValue}>
        <GamePage day={DAYS.TODAY} />
      </CustomTabPanel>
      <CustomTabPanel index={3} value={tabValue}>
        <GamePage day={DAYS.TOMORROW} />
      </CustomTabPanel>
      <CustomTabPanel index={4} value={tabValue}>
        <UserStats />
      </CustomTabPanel>
      <Divider
        sx={{
          marginY: "2rem",
        }}
      />
      <Box
        display="flex"
        color={COLOURS.GREY_BACK_SHADE}
        justifyContent="center"
        marginBottom="2rem"
      >
        <Typography variant="body2">
          All logos belong to their respective owners. Not affiliated in any way
          with the NHL.
        </Typography>
      </Box>
    </>
  );
};

export default Home;
