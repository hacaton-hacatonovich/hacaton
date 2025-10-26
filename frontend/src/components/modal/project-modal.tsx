// @ts-nocheck
import { useForm } from "react-hook-form";
import type { Project, RevenueInfo, CostInfo, ProjectHistory } from "../../@types/types";
import { Section } from "./modal-section";
import { FormField } from "./modal-form-field";
import { CheckboxField } from "./modal-checkbox-field";

const emptyProject: Omit<Project, 'id'> = {
  organization_id: 0,
  name: "",
  service_type: "",
  payment_type: "",
  stage: "",
  realization_probability: 0,
  manager_id: 5,
  business_segment: "",
  realization_year: new Date().getFullYear().toString(),
  is_industry_solution: 0,
  is_forecast_accepted: 0,
  is_dzo_implementation: 0,
  requires_management_control: 0,
  evaluation_type: "",
  industry_manager_id: 5,
  project_number: "",
  current_status: "",
  period_work_done: "",
  next_period_plans: "",
  total_revenue: 0,
  total_cost: 0,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  revenueInfo: [],
  costInfo: [],
  projectHistory: []
};

type ProjectFormData = Omit<Project, 'id' | 'revenueInfo' | 'costInfo' | 'projectHistory'> & {
  revenueInfo: Array<{
    year: string;
    month: number;
    amount: string;
    revenue_status: string;
  }>;
  costInfo: Array<{
    year: string;
    month: number;
    amount: string;
    cost_type: string;
    cost_status: string;
  }>;
};

type Props = {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Project) => void;
}

export const ProjectModal: React.FC<Props> = ({ project, isOpen, onClose, onSave }) => {
  const isEdit = !!project;

  const { register, handleSubmit, formState: { errors }, watch, reset, setValue } = useForm<ProjectFormData>({
    defaultValues: project ? {
      ...project,
      revenueInfo: project.revenueInfo.map(revenue => ({
        ...revenue,
        amount: revenue.amount.toString()
      })),
      costInfo: project.costInfo.map(cost => ({
        ...cost,
        amount: cost.amount.toString()
      }))
    } : {
      ...emptyProject,
      revenueInfo: emptyProject.revenueInfo.map(revenue => ({
        ...revenue,
        amount: revenue.amount.toString()
      })),
      costInfo: emptyProject.costInfo.map(cost => ({
        ...cost,
        amount: cost.amount.toString()
      }))
    }
  });

  const watchedIsIndustrySolution = watch('is_industry_solution');
  const watchedIsForecastAccepted = watch('is_forecast_accepted');

  const onSubmit = (data: ProjectFormData) => {
    const projectData: Project = {
      id: project?.id || Date.now().toString(),
      ...data,
      revenueInfo: data.revenueInfo.map(revenue => ({
        ...revenue,
        amount: Number(revenue.amount) || 0,
        project_id: project?.id || '',
        id: '',
        created_at: new Date().toISOString()
      })),
      costInfo: data.costInfo.map(cost => ({
        ...cost,
        amount: Number(cost.amount) || 0,
        project_id: project?.id || '',
        id: '',
        created_at: new Date().toISOString()
      })),
      projectHistory: project?.projectHistory || []
    };
    
    onSave(projectData);
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  // Добавление новой строки выручки
  const addRevenueRow = () => {
    const currentRevenue = watch('revenueInfo') || [];
    setValue('revenueInfo', [
      ...currentRevenue,
      {
        year: new Date().getFullYear().toString(),
        month: 1,
        amount: "0",
        revenue_status: "План"
      }
    ]);
  };

  // Удаление строки выручки
  const removeRevenueRow = (index: number) => {
    const currentRevenue = watch('revenueInfo') || [];
    setValue('revenueInfo', currentRevenue.filter((_, i) => i !== index));
  };

  // Добавление новой строки затрат
  const addCostRow = () => {
    const currentCost = watch('costInfo') || [];
    setValue('costInfo', [
      ...currentCost,
      {
        year: new Date().getFullYear().toString(),
        month: 1,
        amount: "0",
        cost_type: "Зарплата",
        cost_status: "План"
      }
    ]);
  };

  // Удаление строки затрат
  const removeCostRow = (index: number) => {
    const currentCost = watch('costInfo') || [];
    setValue('costInfo', currentCost.filter((_, i) => i !== index));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-purple-100">
          <h2 className="text-xl font-semibold text-purple-800">
            {isEdit ? 'Редактировать проект' : 'Добавить новый проект'}
          </h2>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Общая информация */}
            <Section title="Общая информация по проекту">
              <div className="grid grid-cols-2 gap-4">
                <FormField label="ID организации *" error={errors.organization_id} required>
                  <input 
                    type="text" 
                    {...register("organization_id", { required: "ID организации обязателен" })}
                    className="input" 
                  />
                </FormField>
                
                <FormField label="Название проекта *" error={errors.name} required>
                  <input 
                    type="text" 
                    {...register("name", { required: "Название проекта обязательно" })}
                    className="input" 
                  />
                </FormField>
                
                <FormField label="Тип услуги" error={errors.service_type}>
                  <input 
                    type="text" 
                    {...register("service_type")}
                    className="input" 
                  />
                </FormField>
                
                <FormField label="Тип платежа" error={errors.payment_type}>
                  <input 
                    type="text" 
                    {...register("payment_type")}
                    className="input" 
                  />
                </FormField>
                
                <FormField label="Этап проекта" error={errors.stage}>
                  <input 
                    type="text" 
                    {...register("stage")}
                    className="input" 
                  />
                </FormField>
                
                <FormField label="Вероятность реализации (%)" error={errors.realization_probability}>
                  <input 
                    type="number" 
                    min="0"
                    max="100"
                    {...register("realization_probability", { 
                      min: { value: 0, message: "Минимальное значение 0" },
                      max: { value: 100, message: "Максимальное значение 100" }
                    })}
                    className="input" 
                  />
                </FormField>
                
                <FormField label="ID менеджера" error={errors.manager_id}>
                  <input 
                    type="text" 
                    {...register("manager_id")}
                    className="input" 
                  />
                </FormField>
                
                <FormField label="Сегмент бизнеса" error={errors.business_segment}>
                  <input 
                    type="text" 
                    {...register("business_segment")}
                    className="input" 
                  />
                </FormField>
                
                <FormField label="Год реализации" error={errors.realization_year}>
                  <input 
                    type="text" 
                    {...register("realization_year")}
                    className="input" 
                  />
                </FormField>
              </div>
            </Section>

            {/* Чекбоксы */}
            <Section title="Дополнительные параметры">
              <div className="grid grid-cols-2 gap-4">
                <CheckboxField 
                  label="Отраслевое решение" 
                  {...register("is_industry_solution")} 
                />
                <CheckboxField 
                  label="Принимаемый к прогнозу" 
                  {...register("is_forecast_accepted")} 
                />
                <CheckboxField 
                  label="Реализация через ДЗО" 
                  {...register("is_dzo_implementation")} 
                />
                <CheckboxField 
                  label="Требует контроля управления" 
                  {...register("requires_management_control")} 
                />
              </div>
            </Section>

            {/* Зависимые поля */}
            {watchedIsIndustrySolution && (
              <Section title="Информация по отраслевому решению">
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="ID отраслевого менеджера">
                    <input 
                      type="text" 
                      {...register("industry_manager_id")}
                      className="input" 
                    />
                  </FormField>
                  <FormField label="Номер проекта">
                    <input 
                      type="text" 
                      {...register("project_number")}
                      className="input" 
                    />
                  </FormField>
                </div>
              </Section>
            )}

            {watchedIsForecastAccepted && (
              <FormField label="Тип оценки">
                <input 
                  type="text" 
                  {...register("evaluation_type")}
                  className="input" 
                />
              </FormField>
            )}

            {/* Информация по выручке */}
            <Section title="Информация по выручке проекта">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-md font-medium text-purple-700">Выручка по месяцам</h4>
                <button
                  type="button"
                  onClick={addRevenueRow}
                  className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors duration-200"
                >
                  + Добавить строку
                </button>
              </div>
              <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
                {watch('revenueInfo')?.map((_, index) => (
                  <div key={index} className="grid grid-cols-12 gap-2 p-3 bg-purple-50 rounded-lg items-center">
                    <div className="col-span-2">
                      <FormField label="Год">
                        <input 
                          type="text" 
                          {...register(`revenueInfo.${index}.year`)}
                          className="input" 
                          placeholder="2024"
                        />
                      </FormField>
                    </div>
                    <div className="col-span-2">
                      <FormField label="Месяц">
                        <input 
                          type="number" 
                          min="1"
                          max="12"
                          {...register(`revenueInfo.${index}.month`)}
                          className="input" 
                          placeholder="1"
                        />
                      </FormField>
                    </div>
                    <div className="col-span-3">
                      <FormField label="Сумма">
                        <input 
                          type="number" 
                          {...register(`revenueInfo.${index}.amount`)}
                          className="input" 
                          placeholder="0"
                        />
                      </FormField>
                    </div>
                    <div className="col-span-3">
                      <FormField label="Статус начисления">
                        <select 
                          {...register(`revenueInfo.${index}.revenue_status`)}
                          className="input" 
                        >
                          <option value="План">План</option>
                          <option value="Факт">Факт</option>
                          <option value="Прогноз">Прогноз</option>
                        </select>
                      </FormField>
                    </div>
                    <div className="col-span-2">
                      <button
                        type="button"
                        onClick={() => removeRevenueRow(index)}
                        className="px-2 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors duration-200"
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                ))}
                {(!watch('revenueInfo') || watch('revenueInfo').length === 0) && (
                  <p className="text-purple-500 text-sm text-center py-4">Нет данных по выручке</p>
                )}
              </div>
            </Section>

            {/* Информация по затратам */}
            <Section title="Информация по затратам проекта">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-md font-medium text-purple-700">Затраты по месяцам</h4>
                <button
                  type="button"
                  onClick={addCostRow}
                  className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors duration-200"
                >
                  + Добавить строку
                </button>
              </div>
              <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
                {watch('costInfo')?.map((_, index) => (
                  <div key={index} className="grid grid-cols-12 gap-2 p-3 bg-purple-50 rounded-lg items-center">
                    <div className="col-span-2">
                      <FormField label="Год">
                        <input 
                          type="text" 
                          {...register(`costInfo.${index}.year`)}
                          className="input" 
                          placeholder="2024"
                        />
                      </FormField>
                    </div>
                    <div className="col-span-2">
                      <FormField label="Месяц">
                        <input 
                          type="number" 
                          min="1"
                          max="12"
                          {...register(`costInfo.${index}.month`)}
                          className="input" 
                          placeholder="1"
                        />
                      </FormField>
                    </div>
                    <div className="col-span-2">
                      <FormField label="Сумма">
                        <input 
                          type="number" 
                          {...register(`costInfo.${index}.amount`)}
                          className="input" 
                          placeholder="0"
                        />
                      </FormField>
                    </div>
                    <div className="col-span-3">
                      <FormField label="Вид затрат">
                        <input 
                          type="text" 
                          {...register(`costInfo.${index}.cost_type`)}
                          className="input" 
                          placeholder="Вид затрат"
                        />
                      </FormField>
                    </div>
                    <div className="col-span-2">
                      <FormField label="Статус отражения">
                        <select 
                          {...register(`costInfo.${index}.cost_status`)}
                          className="input" 
                        >
                          <option value="План">План</option>
                          <option value="Факт">Факт</option>
                          <option value="Прогноз">Прогноз</option>
                        </select>
                      </FormField>
                    </div>
                    <div className="col-span-1">
                      <button
                        type="button"
                        onClick={() => removeCostRow(index)}
                        className="px-2 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors duration-200"
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                ))}
                {(!watch('costInfo') || watch('costInfo').length === 0) && (
                  <p className="text-purple-500 text-sm text-center py-4">Нет данных по затратам</p>
                )}
              </div>
            </Section>

            {/* Финансовая информация */}
            <Section title="Финансовая информация">
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Общая выручка">
                  <input 
                    type="number" 
                    {...register("total_revenue")}
                    className="input" 
                    placeholder="0"
                  />
                </FormField>
                <FormField label="Общие затраты">
                  <input 
                    type="number" 
                    {...register("total_cost")}
                    className="input" 
                    placeholder="0"
                  />
                </FormField>
              </div>
            </Section>

            {/* Дополнительная информация */}
            <Section title="Дополнительная информация">
              <div className="space-y-4">
                <FormField label="Текущий статус">
                  <textarea 
                    {...register("current_status")} 
                    className="input h-20" 
                    placeholder="Опишите текущий статус проекта..."
                  />
                </FormField>
                <FormField label="Выполненная работа за период">
                  <textarea 
                    {...register("period_work_done")} 
                    className="input h-20" 
                    placeholder="Опишите достижения за период..."
                  />
                </FormField>
                <FormField label="Планы на следующий период">
                  <textarea 
                    {...register("next_period_plans")} 
                    className="input h-20" 
                    placeholder="Опишите планы на следующий период..."
                  />
                </FormField>
              </div>
            </Section>

            {/* Даты */}
            <Section title="Системная информация">
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Дата создания">
                  <input 
                    type="datetime-local" 
                    {...register("created_at")}
                    className="input" 
                  />
                </FormField>
                <FormField label="Дата обновления">
                  <input 
                    type="datetime-local" 
                    {...register("updated_at")}
                    className="input" 
                  />
                </FormField>
              </div>
            </Section>

            {/* Кнопки */}
            <div className="flex justify-end gap-3 pt-4 border-t border-purple-100">
              <button 
                type="button" 
                onClick={handleClose}
                className="px-4 py-2 text-purple-600 border border-purple-300 rounded-md hover:bg-purple-50 transition-colors duration-200"
              >
                Отмена
              </button>
              <button 
                type="submit" 
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200"
              >
                Сохранить проект
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};