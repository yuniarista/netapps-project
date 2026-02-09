import { useState } from "react";
import { Switch } from "@mui/material";
import { SwitchFacilities } from "@/libs/function";

export default function SwitchButton({
  uri,
  params,
  setLoading,
  propertyId,
  property,
  setProperty,
  facilities,
  setResponse,
  updateSession
}) {
  const isSelected = property?.includes(params.row._id);
  const rowIndex = params.api.getRowIndexRelativeToVisibleRows(params.row._id);

  const [switchState, setSwitchState] = useState(isSelected);

  const handleSwitchToggle = async () => {
    let availableProperty;

    if (switchState) {
      availableProperty = property.filter((item) => item !== params.row._id);
    } else {
      availableProperty = [...property];
      availableProperty.splice(rowIndex, 0, params.row._id);
    }

    const resultArray = facilities?.filter((value) =>
      availableProperty?.includes(value)
    );

    setProperty(availableProperty);

    await SwitchFacilities({
      uri,
      setLoading,
      setResponse,
      propertyId,
      setSwitchState,
      availableProperty: resultArray
    });

    if (updateSession) {
      updateSession(params.row.name, params.row.url);
    }
  };

  return (
    <div>
      <Switch
        checked={switchState}
        onChange={handleSwitchToggle}
        sx={{
          "& .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track": {
            backgroundColor: "#a7c404"
          },
          "& .MuiSwitch-thumb": {
            backgroundColor: switchState ? "#a7c404" : "white" // Custom colors
          }
        }}
      />
    </div>
  );
}
