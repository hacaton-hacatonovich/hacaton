// @ts-nocheck
type Props = { title: string; children: React.ReactNode }

export const Section: React.FC<Props> = ({ title, children }) => (
	<div>
		<h3 className="text-lg font-medium text-purple-700 mb-4">{title}</h3>
		{children}
	</div>
);