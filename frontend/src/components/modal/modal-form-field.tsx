type Props = { label: string; children: React.ReactNode; required?: boolean }

export const FormField: React.FC<Props> = ({ label, children, required }) => (
	<div>
		<label className="block text-sm font-medium text-purple-600 mb-1">
			{label} {required && <span className="text-red-500">*</span>}
		</label>
		{children}
	</div>
);