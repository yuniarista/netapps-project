import CustomButton from "../button/customButton";
import { Download } from "lucide-react";

const ExportCustomPDF = ({ handleGenerate }) => {
  return (
    <CustomButton variant="outline" onClick={handleGenerate}>
      <Download /> Export to PDF
    </CustomButton>
  );
};

export default ExportCustomPDF;
