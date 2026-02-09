// components/ui/loading-circle.tsx

import React from "react";
import { cn } from "@/lib/utils";

export default function LoadingCircle({
  size = 24,
  thickness = 3,
  color = "#6332ce",
  className
}) {
  const borderColor = color;
  const spinnerStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderWidth: `${thickness}px`,
    borderColor: `${borderColor}`,
    borderTopColor: "transparent"
  };

  return (
    <div
      className={cn(
        "inline-block animate-spin rounded-full border-solid",
        className
      )}
      style={spinnerStyle}
    />
  );
}
