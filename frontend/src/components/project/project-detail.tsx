import type { Project } from "../../@types/types";
import { DetailField } from "./detail-field";
import { DetailSection } from "./detail-section";

type Props = { project: Project }

export const ProjectDetails: React.FC<Props> = ({ project }) => (
	<>
		<DetailSection title="Общая информация по проекту">
			<div className="grid grid-cols-2 gap-4">
				<DetailField label="Название организации" value={project.organizationName} />
				<DetailField label="ИНН организации" value={project.inn} />
				<DetailField label="Услуга" value={project.service} />
				<DetailField label="Тип платежа" value={project.paymentType} />
				<DetailField label="Сегмент бизнеса" value={project.businessSegment} />
				<DetailField label="Отраслевое решение" value={project.isIndustrySolution ? "Да" : "Нет"} />
				<DetailField label="Принимаемый к прогнозу" value={project.isForecastAccepted ? "Да" : "Нет"} />
				<DetailField label="Отраслевой менеджер" value={project.industryManager} />
				<DetailField label="Номер проекта" value={project.projectNumber} />
				<DetailField label="Дата создания" value={project.creationDate} />
			</div>
		</DetailSection>

		<DetailSection title="Информация по выручке проекта">
			{project.revenueInfo.map((revenue, index) => (
				<div key={index} className="grid grid-cols-4 gap-4 mb-2 p-2 bg-purple-50 rounded">
					<DetailField label="Год" value={revenue.year} />
					<DetailField label="Месяц" value={revenue.month} />
					<DetailField label="Сумма" value={`${revenue.amount.toLocaleString()} руб.`} />
					<DetailField label="Статус начисления" value={revenue.revenueStatus} />
				</div>
			))}
		</DetailSection>

		<DetailSection title="Информация по затратам проекта">
			{project.costInfo.map((cost, index) => (
				<div key={index} className="grid grid-cols-5 gap-4 mb-2 p-2 bg-purple-50 rounded">
					<DetailField label="Год" value={cost.year} />
					<DetailField label="Месяц" value={cost.month} />
					<DetailField label="Сумма" value={`${cost.amount.toLocaleString()} руб.`} />
					<DetailField label="Вид затрат" value={cost.costType} />
					<DetailField label="Статус отражения" value={cost.costReflectionStatus} />
				</div>
			))}
		</DetailSection>

		<DetailSection title="Дополнительная информация">
			<div className="space-y-4">
				<DetailField label="Текущий статус по проекту" value={project.additionalInfo.currentStatus} fullWidth />
				<DetailField label="Что сделано за период" value={project.additionalInfo.periodAchievements} fullWidth />
				<DetailField label="Планы на следующий период" value={project.additionalInfo.nextPeriodPlans} fullWidth />
				<DetailField label="Комментарий" value={project.additionalInfo.comments} fullWidth />
			</div>
		</DetailSection>
	</>
);