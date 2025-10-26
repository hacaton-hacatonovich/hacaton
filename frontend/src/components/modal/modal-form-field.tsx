// @ts-nocheck
import type { FieldError } from "react-hook-form";

type Props = {
  label: string;
  children: React.ReactNode;
  error?: FieldError;
  required?: boolean;
}

export const FormField: React.FC<Props> = ({ label, children, error, required }) => (
  <div>
    <label className="block text-sm font-medium text-purple-600 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {error && (
      <p className="text-red-500 text-sm mt-1">{error.message}</p>
    )}
  </div>
);