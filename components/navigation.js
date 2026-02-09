"use client";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Divider,
  List,
  ListItemButton,
  Typography
} from "@mui/material";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import IconifyIcon from "./icon";
import theme from "@/themes";
import { SidebarStyles } from "@/libs/muiStyle";
import { signOut } from "next-auth/react";

export default function NavigationBar({ menu }) {
  const router = usePathname();
  const [expandedMenu, setExpandedMenu] = useState("");

  return (
    <Box sx={SidebarStyles(theme).sidebar}>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        columnGap={1}
        py={2}
        px={3}
      >
        <Box sx={SidebarStyles(theme).avatarWrapper}>
          <Avatar
            src="https://upload.wikimedia.org/wikipedia/commons/f/f0/Bae_Suzy_at_%27Vagabond%27_show_party_in_Seoul_on_May_24%2C_2019.png"
            sx={SidebarStyles(theme).avatar}
          />
        </Box>
        <Box padding={2}>
          <Typography color="text.primary" fontSize={14} fontWeight={600}>
            Bae Suzy
          </Typography>
          <Typography color="text.primary" fontSize={12} fontWeight={400}>
            Super Admin
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ marginX: 3, color: "#09090B" }} />
      <Box
        flex={1}
        py={2}
        px={3}
        sx={{
          overflowY: "auto",
          "&::-webkit-scrollbar": { width: 4 },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.grey[400],
            borderRadius: 4
          },
          "&::-webkit-scrollbar-track": { backgroundColor: "transparent" },
          height: "100%"
        }}
      >
        {menu?.map((data, idx) => {
          const isExpanded = expandedMenu === data?.category;

          if (data?.items?.length > 1) {
            return (
              <Accordion
                key={idx}
                sx={SidebarStyles(theme).accordion}
                expanded={isExpanded}
              >
                <AccordionSummary
                  sx={SidebarStyles(theme).accordionSummary}
                  expandIcon={
                    <GridExpandMoreIcon
                      sx={{ color: theme.palette.text.primary }}
                    />
                  }
                  onClick={() =>
                    setExpandedMenu(isExpanded ? "" : data?.category)
                  }
                >
                  <IconifyIcon icon={data?.icon} size="1.5rem" />
                  <Typography sx={SidebarStyles(theme).sidebarItemTitle}>
                    {data?.category}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={SidebarStyles(theme).accordionDetails}>
                  {data?.items?.map((item, index) => {
                    const isActive = router === item?.url;
                    return (
                      <List component="nav" key={index} disablePadding>
                        <Box
                          sx={{
                            borderRadius: isActive ? 1 : 0,
                            ml: 2,
                            backgroundColor: isActive
                              ? theme.palette.primary.main
                              : theme.palette.background.paper,
                            color: isActive
                              ? theme.palette.primary.contrastText
                              : theme.palette.text.primary
                          }}
                        >
                          <Link href={item?.url} passHref>
                            <ListItemButton
                              disableGutters
                              sx={{
                                borderRadius: theme.customVariables.radius.md
                              }}
                            >
                              <Box sx={SidebarStyles(theme).listItemInner}>
                                {item?.name}
                              </Box>
                            </ListItemButton>
                          </Link>
                        </Box>
                      </List>
                    );
                  })}
                </AccordionDetails>
              </Accordion>
            );
          }

          const singleItem = data?.items[0];
          const isActive = singleItem.url === router;

          return (
            <List component="nav" key={idx} disablePadding>
              <Link href={singleItem.url} passHref>
                <ListItemButton
                  disableGutters
                  sx={SidebarStyles(theme).listItemButton(isActive)}
                >
                  <IconifyIcon icon={data?.icon} />
                  <Box sx={{ fontWeight: 400, fontSize: 14 }}>
                    {singleItem.name}
                  </Box>
                </ListItemButton>
              </Link>
            </List>
          );
        })}
      </Box>
      <Divider sx={{ marginX: 3, color: "#09090B" }} />
      <List component="nav" disablePadding>
        <ListItemButton
          disableGutters
          sx={SidebarStyles(theme).logoutButton}
          onClick={() => signOut()}
        >
          <IconifyIcon icon={"codicon:sign-out"} />
          <Box sx={{ fontWeight: 400, fontSize: 14 }}>Logout</Box>
        </ListItemButton>
      </List>
    </Box>
  );
}
