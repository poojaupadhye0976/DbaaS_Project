import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import {
  Card,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Drawer as MuiDrawer,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { useParams } from "react-router-dom";

const Drawer = styled(MuiDrawer)`
  border-right: 1px solid rgba(0, 0, 0, 0.12); // Added border-right for separation
  > div {
    border-right: none;
  }
`;

const Sidebar = ({ items, isBotsScreen, ...rest }) => {
  const state = useSelector((store) => store.dbaasStore);
  const navigate = useNavigate();
  let { pathname } = useLocation();
  pathname = pathname.replace("%20", "");
  const currentPath = pathname;
  const theme = useTheme();
  const dispatch = useDispatch();
  const { appName } = useParams();

  const onClickSidebar = (item) => {
    navigate(`${item.route}`);
  };

  let currentLocation = window.location.href;
  currentLocation = currentLocation
    .replace("http://", "")
    .replace("https://", "");

  let xyz = currentLocation.split("/");
  let currentMergeRoute = "";
  for (let index = 1; index < xyz.length; index++) {
    const element = xyz[index];
    currentMergeRoute = currentMergeRoute + "/" + element;
  }
  const currentRoute = `/${currentLocation.split("/")[1]}`;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: "13vw",
        height: "100%",
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: "13vw",
          boxSizing: "border-box",
          background: theme.palette.primary.sideBar,
          borderRight: '2px solid rgba(0, 0, 0, 0.12)', // Added border-right for consistency
        },
        background: theme.palette.primary.sideBar,
        backgroundColor: theme.palette.primary.sideBar,
      }}
      direction={"column"}
    >
      <Grid
        className="sidebar-logo-and-heading-css"
        sx={{
          display: "grid",
          placeItems: "center",
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)', // Added border-bottom for separation
          pb: 2, // Added padding-bottom for spacing
        }}
        paddingX={2}
        gap={2}
      >
        <Grid mt={3} sx={{ display: "grid", placeItems: "center" }}>
          <Grid>DAAS</Grid>
        </Grid>
      </Grid>
      <Grid
        flex={1}
        overflow={"auto"}
        sx={{
          "&::-webkit-scrollbar": {
            width: 2,
          },
          "&::-webkit-scrollbar-track": {
            background: "#f5f5f5",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#f5f5f5",
            borderRadius: 4,
          },
        }}
      >
        <List className="mt-1" sx={{ padding: "8px" }}>
          {items.map((item, index) => (
            <React.Fragment key={`sidebar-items-${index}`}>
              <div>
                <Card
                  className="mb-1"
                  style={{
                    boxShadow: "none",
                    backgroundColor:
                      item.route === currentMergeRoute
                        ? theme.palette.primary.light
                        : "",
                    color:
                      item.route === currentRoute
                        ? theme.palette.primary.dark
                        : theme.palette.primary.dark,
                  }}
                  key={index}
                >
                  <ListItem
                    display="flex"
                    alignItems="center"
                    key={item.name}
                    disablePadding
                    onClick={() => {
                      onClickSidebar(item);
                    }}
                  >
                    <ListItemButton
                      sx={{
                        color:
                          item.route === currentPath
                            ? theme.palette.primary.text
                            : theme.palette.primary.dark,
                        ":hover": {
                          backgroundColor: "transparent",
                          color: ``,
                        },
                        gap: 1
                      }}
                    >
                      <item.icon />
                      <ListItemText
                        className="ml-3 poppins-regular"
                        primary={
                          <Typography>
                            {item.name}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                </Card>
              </div>
            </React.Fragment>
          ))}
        </List>
      </Grid>
    </Drawer>
  );
};

export default Sidebar;