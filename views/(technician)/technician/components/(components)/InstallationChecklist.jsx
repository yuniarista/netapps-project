import ChecklistItem from "@/components/checkbox/checklistItem";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export default function InstallationChecklist({ }) {

  const [tasks, setTasks] = useState({
    arrived: true,
    cableInstalled: false,
    routerConfigured: false,
    speedTested: false,
    walkthroughDone: false,
  });

  const toggleTask = (key) => {
    setTasks((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  const completedCount = Object.values(tasks).filter(Boolean).length;

  return (
    <div className="space-y-3 p-4 bg-muted/40 rounded-sm">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-foreground">Installation Checklist</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          {completedCount} / 5 Completed
        </p>
      </div>
      <Separator />
      <div className="grid gap-3">
        <ChecklistItem
          id="step1"
          title="Arrived at customer location"
          desc="Confirm you are on site and ready to begin installation."
          checked={tasks.arrived}
          onToggle={() => toggleTask("arrived")}
        />

        <ChecklistItem
          id="step2"
          title="Install fiber cable to CPE"
          desc="Run fiber from ODP port to customer's ONT/router location."
          checked={tasks.cableInstalled}
          onToggle={() => toggleTask("cableInstalled")}
        />

        <ChecklistItem
          id="step3"
          title="Configure ONT / Router"
          desc="Apply ISP settings, SSID, and password per customer request."
          checked={tasks.routerConfigured}
          onToggle={() => toggleTask("routerConfigured")}
        />

        <ChecklistItem
          id="step4"
          title="Run connection speed test"
          desc="Minimum 45 Mbps down / 20 Mbps up required to pass."
          checked={tasks.speedTested}
          onToggle={() => toggleTask("speedTested")}
        />

        <ChecklistItem
          id="step5"
          title="Customer usage walkthrough"
          desc="Explain WiFi name, password, and basic troubleshooting steps."
          checked={tasks.walkthroughDone}
          onToggle={() => toggleTask("walkthroughDone")}
        />
      </div>
    </div>
  )
}