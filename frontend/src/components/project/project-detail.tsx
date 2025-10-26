// @ts-nocheck
import type { Project } from "../../@types/types";
import { DetailField } from "./detail-field";
import { DetailSection } from "./detail-section";

type Props = { project: Project }

export const ProjectDetails: React.FC<Props> = ({ project }) => (
  <>
    <DetailSection title="Общая информация по проекту">
      <div className="grid grid-cols-2 gap-4">
        <DetailField label="ID организации" value={project.organization_id} />
        <DetailField label="Название проекта" value={project.name} />
        <DetailField label="Тип услуги" value={project.service_type} />
        <DetailField label="Тип платежа" value={project.payment_type} />
        <DetailField label="Этап" value={project.stage} />
        <DetailField label="Вероятность реализации" value={`${project.realization_probability}%`} />
        <DetailField label="ID менеджера" value={project.manager_id} />
        <DetailField label="Сегмент бизнеса" value={project.business_segment} />
        <DetailField label="Год реализации" value={project.realization_year} />
        <DetailField label="Отраслевое решение" value={project.is_industry_solution ? "Да" : "Нет"} />
        <DetailField label="Принимаемый к прогнозу" value={project.is_forecast_accepted ? "Да" : "Нет"} />
        <DetailField label="Реализация ДЗО" value={project.is_dzo_implementation ? "Да" : "Нет"} />
        <DetailField label="Требует контроля управления" value={project.requires_management_control ? "Да" : "Нет"} />
        <DetailField label="Тип оценки" value={project.evaluation_type} />
        <DetailField label="ID отраслевого менеджера" value={project.industry_manager_id} />
        <DetailField label="Номер проекта" value={project.project_number} />
        <DetailField label="Дата создания" value={project.created_at} />
        <DetailField label="Дата обновления" value={project.updated_at} />
      </div>
    </DetailSection>

    <DetailSection title="Финансовая информация">
      <div className="grid grid-cols-2 gap-4">
        <DetailField label="Общая выручка" value={`${project.total_revenue.toLocaleString()} руб.`} />
        <DetailField label="Общие затраты" value={`${project.total_cost.toLocaleString()} руб.`} />
      </div>
    </DetailSection>

    <DetailSection title="Информация по выручке проекта">
      {project.revenueInfo && project.revenueInfo.map((revenue, index) => (
        <div key={revenue.id || index} className="grid grid-cols-4 gap-4 mb-2 p-2 bg-purple-50 rounded">
          <DetailField label="Год" value={revenue.year} />
          <DetailField label="Месяц" value={revenue.month.toString()} />
          <DetailField label="Сумма" value={`${revenue.amount.toLocaleString()} руб.`} />
          <DetailField label="Статус начисления" value={revenue.revenue_status} />
        </div>
      ))}
      {(!project.revenueInfo || project.revenueInfo.length === 0) && (
        <p className="text-purple-500 text-sm">Нет данных по выручке</p>
      )}
    </DetailSection>

    <DetailSection title="Информация по затратам проекта">
      {project.costInfo && project.costInfo.map((cost, index) => (
        <div key={cost.id || index} className="grid grid-cols-5 gap-4 mb-2 p-2 bg-purple-50 rounded">
          <DetailField label="Год" value={cost.year} />
          <DetailField label="Месяц" value={cost.month.toString()} />
          <DetailField label="Сумма" value={`${cost.amount.toLocaleString()} руб.`} />
          <DetailField label="Вид затрат" value={cost.cost_type} />
          <DetailField label="Статус отражения" value={cost.cost_status} />
        </div>
      ))}
      {(!project.costInfo || project.costInfo.length === 0) && (
        <p className="text-purple-500 text-sm">Нет данных по затратам</p>
      )}
    </DetailSection>

    <DetailSection title="История изменений проекта">
      {project.projectHistory && project.projectHistory.map((history, index) => (
        <div key={history.id || index} className="grid grid-cols-4 gap-4 mb-2 p-2 bg-purple-50 rounded">
          <DetailField label="Измененное поле" value={history.changed_field} />
          <DetailField label="Старое значение" value={history.old_value || "—"} />
          <DetailField label="Новое значение" value={history.new_value || "—"} />
          <DetailField label="Дата изменения" value={history.change_date} />
        </div>
      ))}
      {(!project.projectHistory || project.projectHistory.length === 0) && (
        <p className="text-purple-500 text-sm">Нет данных по истории изменений</p>
      )}
    </DetailSection>

    <DetailSection title="Дополнительная информация">
      <div className="space-y-4">
        <DetailField label="Текущий статус" value={project.current_status} fullWidth />
        <DetailField label="Выполненная работа за период" value={project.period_work_done} fullWidth />
        <DetailField label="Планы на следующий период" value={project.next_period_plans} fullWidth />
      </div>
    </DetailSection>
  </>
);