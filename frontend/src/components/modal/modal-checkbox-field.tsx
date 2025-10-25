// components/modal/modal-checkbox-field.tsx
import type { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  label: string;
} & UseFormRegisterReturn;

export const CheckboxField: React.FC<Props> = ({ label, ...registerProps }) => (
  <label className="flex items-center">
    <input 
      type="checkbox" 
      {...registerProps}
      className="rounded border-purple-300 text-purple-600 focus:ring-purple-500" 
    />
    <span className="ml-2 text-sm text-purple-600">{label}</span>
  </label>
);