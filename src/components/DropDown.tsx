import React from "react";
import { FormVersion } from './FormVersion';

interface DropDownProps {
  name: string;
  value: FormVersion;
  onChange: (value: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}


const Dropdown: React.FC<DropDownProps> = ({ name, value, onChange }) => {  
  const formVersionLabels: Record<FormVersion, string> = {
    [FormVersion.SurgingSparks]: "Surging Sparks",
    [FormVersion.JourneyTogether]: "Journey Together",
  }
  
  return (
      <select
        name={name}
        value={value}
        onChange={(e) => onChange(e)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {Object.values(FormVersion).map((option) => (
          <option key={option} value={option}>
            {formVersionLabels[option]}
          </option>
        ))}
      </select>
    )
  }
  
  export default Dropdown;