import { useState } from "react";
import type { AdditionalInfo, Project } from "../../@types/types";
import { Section } from "./modal-section";
import { FormField } from "./modal-form-field";
import { CheckboxField } from "./modal-checkbox-field";
import { BUSINESS_SEGMENTS, EVALUATION_TYPES, PAYMENT_TYPES, PROJECT_STAGES, SERVICES } from "../../constants";

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
	revenueInfo: [{ year: new Date().getFullYear().toString(), month: "Январь", amount: 0, revenueStatus: "План" }],
	costInfo: [{ year: new Date().getFullYear().toString(), month: "Январь", amount: 0, costType: "Зарплата", costReflectionStatus: "План" }],
	additionalInfo: {
		currentStatus: "",
		periodAchievements: "",
		nextPeriodPlans: "",
		comments: ""
	}
};

type Props = {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Project) => void;
}

export const ProjectModal: React.FC<Props> = ({ project, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState<Project>(project || { ...emptyProject, id: Date.now().toString() });
  const isEdit = !!project;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateAdditionalInfo = (field: keyof AdditionalInfo, value: string) => {
    setFormData(prev => ({
      ...prev,
      additionalInfo: { ...prev.additionalInfo, [field]: value }
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-purple-100">
          <h2 className="text-xl font-semibold text-purple-800">
            {isEdit ? 'Редактировать проект' : 'Добавить новый проект'}
          </h2>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Общая информация */}
            <Section title="Общая информация по проекту">
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Название организации *" required>
                  <input type="text" value={formData.organizationName} onChange={e => updateField('organizationName', e.target.value)} className="input" />
                </FormField>
                <FormField label="ИНН организации *" required>
                  <input type="text" value={formData.inn} onChange={e => updateField('inn', e.target.value)} className="input" />
                </FormField>
                <FormField label="Название проекта *" required>
                  <input type="text" value={formData.projectName} onChange={e => updateField('projectName', e.target.value)} className="input" />
                </FormField>
                <FormField label="Услуга">
                  <select value={formData.service} onChange={e => updateField('service', e.target.value)} className="input">
                    <option value="">Выберите услугу</option>
                    {SERVICES.map(service => <option key={service} value={service}>{service}</option>)}
                  </select>
                </FormField>
                <FormField label="Тип платежа">
                  <select value={formData.paymentType} onChange={e => updateField('paymentType', e.target.value)} className="input">
                    <option value="">Выберите тип платежа</option>
                    {PAYMENT_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                </FormField>
                <FormField label="Этап проекта">
                  <select value={formData.projectStage} onChange={e => updateField('projectStage', e.target.value)} className="input">
                    <option value="">Выберите этап</option>
                    {PROJECT_STAGES.map(stage => <option key={stage} value={stage}>{stage}</option>)}
                  </select>
                </FormField>
                <FormField label="Менеджер">
                  <input type="text" value={formData.manager} onChange={e => updateField('manager', e.target.value)} className="input" />
                </FormField>
                <FormField label="Сегмент бизнеса">
                  <select value={formData.businessSegment} onChange={e => updateField('businessSegment', e.target.value)} className="input">
                    <option value="">Выберите сегмент</option>
                    {BUSINESS_SEGMENTS.map(segment => <option key={segment} value={segment}>{segment}</option>)}
                  </select>
                </FormField>
                <FormField label="Год реализации">
                  <input type="text" value={formData.realizationYear} onChange={e => updateField('realizationYear', e.target.value)} className="input" />
                </FormField>
              </div>
            </Section>

            {/* Чекбоксы */}
            <Section title="Дополнительные параметры">
              <div className="grid grid-cols-2 gap-4">
                <CheckboxField label="Отраслевое решение" checked={formData.isIndustrySolution} onChange={e => updateField('isIndustrySolution', e.target.checked)} />
                <CheckboxField label="Принимаемый к прогнозу" checked={formData.isForecastAccepted} onChange={e => updateField('isForecastAccepted', e.target.checked)} />
                <CheckboxField label="Реализация через ДЗО" checked={formData.isDzoRealization} onChange={e => updateField('isDzoRealization', e.target.checked)} />
                <CheckboxField label="Требуется контроль статуса" checked={formData.needsManagementControl} onChange={e => updateField('needsManagementControl', e.target.checked)} />
              </div>
            </Section>

            {/* Зависимые поля */}
            {formData.isIndustrySolution && (
              <Section title="Информация по отраслевому решению">
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Отраслевой менеджер">
                    <input type="text" value={formData.industryManager} onChange={e => updateField('industryManager', e.target.value)} className="input" />
                  </FormField>
                  <FormField label="Номер проекта">
                    <input type="text" value={formData.projectNumber} onChange={e => updateField('projectNumber', e.target.value)} className="input" />
                  </FormField>
                </div>
              </Section>
            )}

            {formData.isForecastAccepted && (
              <FormField label="Принимаемый к оценке">
                <select value={formData.evaluationAccepted} onChange={e => updateField('evaluationAccepted', e.target.value)} className="input">
                  <option value="">Выберите оценку</option>
                  {EVALUATION_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
              </FormField>
            )}

            {/* Дополнительная информация */}
            <Section title="Дополнительная информация">
              <div className="space-y-4">
                <FormField label="Текущий статус по проекту">
                  <textarea value={formData.additionalInfo.currentStatus} onChange={e => updateAdditionalInfo('currentStatus', e.target.value)} className="input h-20" />
                </FormField>
                <FormField label="Что сделано за период">
                  <textarea value={formData.additionalInfo.periodAchievements} onChange={e => updateAdditionalInfo('periodAchievements', e.target.value)} className="input h-20" />
                </FormField>
                <FormField label="Планы на следующий период">
                  <textarea value={formData.additionalInfo.nextPeriodPlans} onChange={e => updateAdditionalInfo('nextPeriodPlans', e.target.value)} className="input h-20" />
                </FormField>
              </div>
            </Section>

            {/* Кнопки */}
            <div className="flex justify-end gap-3 pt-4 border-t border-purple-100">
              <button type="button" onClick={onClose} className="px-4 py-2 text-purple-600 border border-purple-300 rounded-md hover:bg-purple-50 transition-colors duration-200">Отмена</button>
              <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200">Сохранить проект</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};