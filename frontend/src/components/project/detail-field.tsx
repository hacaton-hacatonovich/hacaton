// @ts-nocheck
type Props = { label: string; value: string; fullWidth?: boolean }

export const DetailField: React.FC<Props> = ({ label, value, fullWidth }) => (
	<div className={fullWidth ? "col-span-2" : ""}>
		<label className="text-sm text-purple-600">{label}</label>
		<p className="text-purple-900">{value}</p>
	</div>
);