import { BasicStepperStyle } from "@/libs/muiStyle";
import { Box, Step, StepLabel, Stepper } from "@mui/material";

const StepperComponent = ({
  activeStep,
  steps,
  errors,
  setActiveStep,
  setIsBack,
  submitRef,
  handleStepMoveTo,
}) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper sx={BasicStepperStyle} activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step
            key={index}
            // active={index === activeStep}
            // completed={index < highestStep}
          >
            <StepLabel
              onClick={() => {
                if (Object.keys(errors).length === 0) {
                  handleStepMoveTo(index);
                  setActiveStep(index);
                  setIsBack(false);
                } else {
                  submitRef.current.click();
                }
                // handleStepMoveTo(index);
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default StepperComponent;
