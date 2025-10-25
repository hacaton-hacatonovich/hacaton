type Props = { title: string; children: React.ReactNode }

export const DetailSection: React.FC<Props> = ({ title, children }) => (
	<div className="mb-6">
		<h4 className="text-md font-medium text-purple-700 mb-4">{title}</h4>
		{children}
	</div>
);