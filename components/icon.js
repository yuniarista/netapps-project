import { Icon } from "@iconify/react";

const IconifyIcon = ({ icon, size = "1.5rem", ...rest }) => {
  return <Icon icon={icon} width={size} height={size} {...rest} />;
};

export default IconifyIcon;
