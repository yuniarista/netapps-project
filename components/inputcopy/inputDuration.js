// components/custom-input-duration.js
"use client";

import { useCallback, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import IconifyIcon from "../icon";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function InputDuration({
  name,
  label,
  variant = "default",
  placeholder = ["00", "00", "00"],
  helperText,
  disabled = false,
  value = 0,
  onChange,
  showLabel = false,
  layout = "vertical",
  readOnly = false
}) {
  const isDestructive = variant === "destructive";
  const isHorizontal = layout === "horizontal";

  // convert seconds ke HH, MM, SS
  const secondsToParts = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return [h, m, s];
  };

  const partsToSeconds = (h, m, s) => {
    return Number(h) * 3600 + Number(m) * 60 + Number(s);
  };

  const [part1, setPart1] = useState(secondsToParts(value)[0]);
  const [part2, setPart2] = useState(secondsToParts(value)[1]);
  const [part3, setPart3] = useState(secondsToParts(value)[2]);

  const formatPart = (val) => {
    if (val === "" || isNaN(val)) return "00";
    return val.toString().padStart(2, "0");
  };

  // update ke parent
  const handleChange = useCallback(
    (p1, p2, p3) => {
      const totalSeconds = partsToSeconds(p1, p2, p3);
      if (onChange) onChange(totalSeconds);
    },
    [onChange]
  );

  useEffect(() => {}, [value]);

  useEffect(() => {
    handleChange(part1, part2, part3);
  }, [part1, part2, part3]);

  useEffect(() => {
    const [h, m, s] = secondsToParts(value);
    setPart1(h.toString());
    setPart2(m.toString());
    setPart3(s.toString());
  }, [value]);

  return (
    <>
      <div className={cn("w-full flex flex-col space-y-2")}>
        {showLabel && (
          <Label
            className={cn(
              "text-sm font-medium",
              isDestructive && !!helperText && value === 0
                ? "text-red-600"
                : "text-slate-900"
            )}
          >
            {label}
          </Label>
        )}
        <div
          className={cn(
            "w-full items-center justify-between gap-x-1 border p-1 rounded-md",
            isDestructive &&
              !!helperText &&
              value === 0 &&
              "border-red-500 focus-visible:ring-red-500",
            (value > 0 || !helperText) &&
              "border-none focus:bg-black focus:border-white",
            isHorizontal ? "flex items-center gap-4" : "flex flex-row gap-1"
          )}
        >
          <div className={cn("flex items-center justify-start")}>
            {/* HH */}
            <Input
              type="number"
              name={`${name}-part1`}
              value={formatPart(part1)}
              onChange={(e) => {
                let raw = e.target.value.replace(/\D/g, "");

                if (raw === "") {
                  setPart1("");
                  return;
                }

                let num = parseInt(raw, 10);
                if (num > 23) num = 23;

                setPart1(num.toString());
              }}
              disabled={disabled}
              readOnly={readOnly}
              placeholder={placeholder[0]}
              className={cn(
                "!px-0 shadow-none !border-0 focus-visible:ring-0 w-6 text-muted-foreground font-medium text-sm text-center"
              )}
            />

            <span className="text-muted-foreground font-medium text-sm">:</span>

            {/* MM */}
            <Input
              type="number"
              name={`${name}-part2`}
              value={formatPart(part2)}
              onChange={(e) => {
                let raw = e.target.value.replace(/\D/g, "");

                if (raw === "") {
                  setPart2("");
                  return;
                }

                let num = parseInt(raw, 10);
                if (num > 59) num = 59;

                setPart2(num.toString());
              }}
              disabled={disabled}
              readOnly={readOnly}
              placeholder={placeholder[1]}
              className={cn(
                "!px-0 shadow-none !border-0 focus-visible:ring-0 w-6 text-muted-foreground font-medium text-sm text-center"
              )}
            />

            <span className="text-muted-foreground font-medium text-sm">:</span>

            {/* SS */}
            <Input
              type="number"
              name={`${name}-part3`}
              value={formatPart(part3)}
              onChange={(e) => {
                let raw = e.target.value.replace(/\D/g, "");

                if (raw === "") {
                  setPart3("");
                  return;
                }

                let num = parseInt(raw, 10);
                if (num > 59) num = 59;

                setPart3(num.toString());
              }}
              disabled={disabled}
              readOnly={readOnly}
              placeholder={placeholder[2]}
              className={cn(
                "!px-0 shadow-none !border-0 focus-visible:ring-0 w-6 text-muted-foreground font-medium text-sm text-center"
              )}
            />
          </div>
          {!!helperText && value === 0 && (
            <Tooltip key={"error-tooltip"}>
              <TooltipTrigger asChild>
                <button className="p-2 rounded ">
                  <IconifyIcon
                    className="text-red-600"
                    icon={"solar:danger-circle-outline"}
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                align="end"
                sideOffset={8}
                className="bg-red-50 border-red-600 text-red-600"
              >
                {helperText}
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
    </>
  );
}
