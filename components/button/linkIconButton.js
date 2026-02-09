// ** React / Next
import React from "react";
import Link from "next/link";

// ** Components
import IconifyIcon from "../icon";

const LinkIconButton = ({ href = "/", icon, ...additionalStyle }) => {
  return (
    <Link href={href}>
      <IconifyIcon icon={icon} {...additionalStyle} />
    </Link>
  );
};

export default LinkIconButton;
