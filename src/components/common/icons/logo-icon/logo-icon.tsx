import React from "react";

import { SvgIcon } from "@mui/material";

import { icons } from "~/basics/constants/icons.constant";

export const LogoIcon = () => {
  return (
    <SvgIcon
      viewBox='0 0 53 53'
      component={icons.logo}
      sx={{ width: "53px", height: "53px", fill: "none" }}
    />
  );
};
