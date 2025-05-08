
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";

interface FilterOption {
  id: string;
  label: string;
}

interface JobFiltersProps {
  title: string;
  options: FilterOption[];
  selectedOptions: string[];
  onChange: (selected: string[]) => void;
}

const JobFilters = ({ title, options, selectedOptions, onChange }: JobFiltersProps) => {
  const handleCheckboxChange = (id: string) => {
    const newSelectedOptions = selectedOptions.includes(id)
      ? selectedOptions.filter(option => option !== id)
      : [...selectedOptions, id];
    
    onChange(newSelectedOptions);
  };

  return (
    <div className="mb-6">
      <h3 className="font-medium text-lg mb-3">{title}</h3>
      <div className="space-y-2">
        {options.map(option => (
          <div key={option.id} className="flex items-center space-x-2">
            <Checkbox 
              id={`${title.toLowerCase()}-${option.id}`}
              checked={selectedOptions.includes(option.id)}
              onCheckedChange={() => handleCheckboxChange(option.id)}
            />
            <label
              htmlFor={`${title.toLowerCase()}-${option.id}`}
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobFilters;
