// components/modal/project-modal.tsx
import { useForm } from "react-hook-form";
import type { Project } from "../../@types/types";
import { Section } from "./modal-section";
import { FormField } from "./modal-form-field";
import { CheckboxField } from "./modal-checkbox-field";
import { BUSINESS_SEGMENTS, EVALUATION_TYPES, MONTHS, PAYMENT_TYPES, PROJECT_STAGES, SERVICES } from "../../constants";

const emptyProject: Omit<Project, 'id'> = {
  organizationName: "",
  inn: "",
  projectName: "",
  service: "",
  paymentType: "",
  projectStage: "",
  realizationProbability: 0,
  manager: "",
  businessSegment: "",
  realizationYear: new Date().getFullYear().toString(),
  isIndustrySolution: false,
  isForecastAccepted: false,
  isDzoRealization: false,
  needsManagementControl: false,
  evaluationAccepted: "",
  industryManager: "",
  projectNumber: "",
  creationDate: new Date().toISOString().split('T')[0],
  revenueInfo: MONTHS.map(month => ({ 
    year: new Date().getFullYear().toString(), 
    month, 
    amount: 0, 
    revenueStatus: "План" 
  })),
  costInfo: MONTHS.map(month => ({ 
    year: new Date().getFullYear().toString(), 
    month, 
    amount: 0, 
    costType: "Зарплата", 
    costReflectionStatus: "План" 
  })),
  additionalInfo: {
    currentStatus: "",
    periodAchievements: "",
    nextPeriodPlans: "",
    comments: ""
  }
};

type ProjectFormData = Omit<Project, 'id' | 'revenueInfo' | 'costInfo'> & {
  revenueInfo: Array<{
    year: string;
    month: string;
    amount: string;
    revenueStatus: string;
  }>;
  costInfo: Array<{
    year: string;
    month: string;
    amount: string;
    costType: string;
    costReflectionStatus: string;
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

  const watchedIsIndustrySolution = watch('isIndustrySolution');
  const watchedIsForecastAccepted = watch('isForecastAccepted');
  const watchedRevenueYear = watch('revenueInfo.0.year');
  const watchedCostYear = watch('costInfo.0.year');

  // Функция для обновления года во всех месяцах выручки
  const updateRevenueYear = (year: string) => {
    MONTHS.forEach((_, index) => {
      setValue(`revenueInfo.${index}.year`, year);
    });
  };

  // Функция для обновления года во всех месяцах затрат
  const updateCostYear = (year: string) => {
    MONTHS.forEach((_, index) => {
      setValue(`costInfo.${index}.year`, year);
    });
  };

  const onSubmit = (data: ProjectFormData) => {
    const projectData: Project = {
      id: project?.id || Date.now().toString(),
      ...data,
      revenueInfo: data.revenueInfo.map(revenue => ({
        ...revenue,
        amount: Number(revenue.amount) || 0
      })),
      costInfo: data.costInfo.map(cost => ({
        ...cost,
        amount: Number(cost.amount) || 0
      }))
    };
    
    onSave(projectData);
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
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
                <FormField label="Название организации *" error={errors.organizationName}>
                  <input 
                    type="text" 
                    {...register("organizationName", { required: "Название организации обязательно" })}
                    className="input" 
                  />
                </FormField>
                
                <FormField label="ИНН организации *" error={errors.inn}>
                  <input 
                    type="text" 
                    {...register("inn", { required: "ИНН организации обязателен" })}
                    className="input" 
                  />
                </FormField>
                
                <FormField label="Название проекта *" error={errors.projectName}>
                  <input 
                    type="text" 
                    {...register("projectName", { required: "Название проекта обязательно" })}
                    className="input" 
                  />
                </FormField>
                
                <FormField label="Услуга">
                  <select {...register("service")} className="input">
                    <option value="">Выберите услугу</option>
                    {SERVICES.map(service => <option key={service} value={service}>{service}</option>)}
                  </select>
                </FormField>
                
                <FormField label="Тип платежа">
                  <select {...register("paymentType")} className="input">
                    <option value="">Выберите тип платежа</option>
                    {PAYMENT_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                </FormField>
                
                <FormField label="Этап проекта">
                  <select {...register("projectStage")} className="input">
                    <option value="">Выберите этап</option>
                    {PROJECT_STAGES.map(stage => <option key={stage} value={stage}>{stage}</option>)}
                  </select>
                </FormField>
                
                <FormField label="Менеджер">
                  <input 
                    type="text" 
                    {...register("manager")}
                    className="input" 
                  />
                </FormField>
                
                <FormField label="Сегмент бизнеса">
                  <select {...register("businessSegment")} className="input">
                    <option value="">Выберите сегмент</option>
                    {BUSINESS_SEGMENTS.map(segment => <option key={segment} value={segment}>{segment}</option>)}
                  </select>
                </FormField>
                
                <FormField label="Год реализации">
                  <input 
                    type="text" 
                    {...register("realizationYear")}
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
                  {...register("isIndustrySolution")} 
                />
                <CheckboxField 
                  label="Принимаемый к прогнозу" 
                  {...register("isForecastAccepted")} 
                />
                <CheckboxField 
                  label="Реализация через ДЗО" 
                  {...register("isDzoRealization")} 
                />
                <CheckboxField 
                  label="Требуется контроль статуса" 
                  {...register("needsManagementControl")} 
                />
              </div>
            </Section>

            {/* Зависимые поля */}
            {watchedIsIndustrySolution && (
              <Section title="Информация по отраслевому решению">
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Отраслевой менеджер">
                    <input 
                      type="text" 
                      {...register("industryManager")}
                      className="input" 
                    />
                  </FormField>
                  <FormField label="Номер проекта">
                    <input 
                      type="text" 
                      {...register("projectNumber")}
                      className="input" 
                    />
                  </FormField>
                </div>
              </Section>
            )}

            {watchedIsForecastAccepted && (
              <FormField label="Принимаемый к оценке">
                <select {...register("evaluationAccepted")} className="input">
                  <option value="">Выберите оценку</option>
                  {EVALUATION_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
              </FormField>
            )}

            {/* Информация по выручке */}
            <Section title="Информация по выручке проекта">
              <div className="mb-4">
                <FormField label="Год для выручки">
                  <input 
                    type="text" 
                    value={watchedRevenueYear || ''}
                    onChange={(e) => updateRevenueYear(e.target.value)}
                    className="input w-32"
                    placeholder="Год"
                  />
                </FormField>
              </div>
              <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
                {watch('revenueInfo').map((_, index) => (
                  <div key={index} className="grid grid-cols-12 gap-2 p-3 bg-purple-50 rounded-lg items-center">
                    <div className="col-span-2 font-medium text-sm text-purple-700">
                      {MONTHS[index]}
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
                          {...register(`revenueInfo.${index}.revenueStatus`)}
                          className="input" 
                        >
                          <option value="План">План</option>
                          <option value="Факт">Факт</option>
                          <option value="Прогноз">Прогноз</option>
                        </select>
                      </FormField>
                    </div>
                    <div className="col-span-4 text-xs text-purple-500">
                      Год: {watch(`revenueInfo.${index}.year`)}
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Информация по затратам */}
            <Section title="Информация по затратам проекта">
              <div className="mb-4">
                <FormField label="Год для затрат">
                  <input 
                    type="text" 
                    value={watchedCostYear || ''}
                    onChange={(e) => updateCostYear(e.target.value)}
                    className="input w-32"
                    placeholder="Год"
                  />
                </FormField>
              </div>
              <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
                {watch('costInfo').map((_, index) => (
                  <div key={index} className="grid grid-cols-12 gap-2 p-3 bg-purple-50 rounded-lg items-center">
                    <div className="col-span-2 font-medium text-sm text-purple-700">
                      {MONTHS[index]}
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
                        <select 
                          {...register(`costInfo.${index}.costType`)}
                          className="input" 
                        >
                          <option value="Зарплата">Зарплата</option>
                          <option value="Материалы">Материалы</option>
                          <option value="Оборудование">Оборудование</option>
                          <option value="Аутсорсинг">Аутсорсинг</option>
                          <option value="Прочие">Прочие</option>
                        </select>
                      </FormField>
                    </div>
                    <div className="col-span-3">
                      <FormField label="Статус отражения">
                        <select 
                          {...register(`costInfo.${index}.costReflectionStatus`)}
                          className="input" 
                        >
                          <option value="План">План</option>
                          <option value="Факт">Факт</option>
                          <option value="Прогноз">Прогноз</option>
                        </select>
                      </FormField>
                    </div>
                    <div className="col-span-2 text-xs text-purple-500">
                      Год: {watch(`costInfo.${index}.year`)}
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Дополнительная информация */}
            <Section title="Дополнительная информация">
              <div className="space-y-4">
                <FormField label="Текущий статус по проекту">
                  <textarea 
                    {...register("additionalInfo.currentStatus")} 
                    className="input h-20" 
                    placeholder="Опишите текущий статус проекта..."
                  />
                </FormField>
                <FormField label="Что сделано за период">
                  <textarea 
                    {...register("additionalInfo.periodAchievements")} 
                    className="input h-20" 
                    placeholder="Опишите достижения за период..."
                  />
                </FormField>
                <FormField label="Планы на следующий период">
                  <textarea 
                    {...register("additionalInfo.nextPeriodPlans")} 
                    className="input h-20" 
                    placeholder="Опишите планы на следующий период..."
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