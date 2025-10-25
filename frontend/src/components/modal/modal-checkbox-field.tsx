type Props =  {label: string; checked: boolean; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }

export const CheckboxField: React.FC<Props> = ({ label, checked, onChange }) => (
	<label className="flex items-center">
		<input type="checkbox" checked={checked} onChange={onChange} className="rounded border-purple-300 text-purple-600 focus:ring-purple-500" />
		<span className="ml-2 text-sm text-purple-600">{label}</span>
	</label>
);