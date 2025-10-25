// hooks/useExcelExport.ts
import { utils, writeFile } from 'xlsx';
import type { Project } from '../@types/types';

export const useExcelExport = () => {
  const exportProjectToExcel = (project: Project) => {
    // Создаем рабочую книгу
    const workbook = utils.book_new();

    // 1. Лист с общей информацией
    const generalInfoData = [
      ['Общая информация по проекту'],
      ['Название организации', project.organizationName],
      ['ИНН организации', project.inn],
      ['Название проекта', project.projectName],
      ['Услуга', project.service],
      ['Тип платежа', project.paymentType],
      ['Этап проекта', project.projectStage],
      ['Вероятность реализации', `${project.realizationProbability}%`],
      ['Менеджер', project.manager],
      ['Сегмент бизнеса', project.businessSegment],
      ['Год реализации', project.realizationYear],
      ['Отраслевое решение', project.isIndustrySolution ? 'Да' : 'Нет'],
      ['Принимаемый к прогнозу', project.isForecastAccepted ? 'Да' : 'Нет'],
      ['Реализация через ДЗО', project.isDzoRealization ? 'Да' : 'Нет'],
      ['Требуется контроль статуса', project.needsManagementControl ? 'Да' : 'Нет'],
      ['Принимаемый к оценке', project.evaluationAccepted],
      ['Отраслевой менеджер', project.industryManager],
      ['Номер проекта', project.projectNumber],
      ['Дата создания', project.creationDate],
      ['', ''],
      ['Сгенерировано', new Date().toLocaleString('ru-RU')]
    ];

    const generalInfoSheet = utils.aoa_to_sheet(generalInfoData);
    utils.book_append_sheet(workbook, generalInfoSheet, 'Общая информация');

    // 2. Лист с выручкой
    const revenueHeaders = [['Информация по выручке проекта'], ['Год', 'Месяц', 'Сумма (руб.)', 'Статус начисления']];
    const revenueData = project.revenueInfo.map(revenue => [
      revenue.year,
      revenue.month,
      revenue.amount,
      revenue.revenueStatus
    ]);
    const revenueSheet = utils.aoa_to_sheet([...revenueHeaders, ...revenueData]);
    utils.book_append_sheet(workbook, revenueSheet, 'Выручка');

    // 3. Лист с затратами
    const costHeaders = [['Информация по затратам проекта'], ['Год', 'Месяц', 'Сумма (руб.)', 'Вид затрат', 'Статус отражения']];
    const costData = project.costInfo.map(cost => [
      cost.year,
      cost.month,
      cost.amount,
      cost.costType,
      cost.costReflectionStatus
    ]);
    const costSheet = utils.aoa_to_sheet([...costHeaders, ...costData]);
    utils.book_append_sheet(workbook, costSheet, 'Затраты');

    // 4. Лист с дополнительной информацией
    const additionalInfoData = [
      ['Дополнительная информация'],
      ['Текущий статус по проекту', project.additionalInfo.currentStatus],
      ['', ''],
      ['Что сделано за период', project.additionalInfo.periodAchievements],
      ['', ''],
      ['Планы на следующий период', project.additionalInfo.nextPeriodPlans],
      ['', ''],
      ['Комментарий', project.additionalInfo.comments]
    ];
    const additionalInfoSheet = utils.aoa_to_sheet(additionalInfoData);
    utils.book_append_sheet(workbook, additionalInfoSheet, 'Дополнительная информация');

    // Генерируем имя файла
    const fileName = `Проект_${project.projectName}_${new Date().toISOString().split('T')[0]}.xlsx`;

    // Сохраняем файл
    writeFile(workbook, fileName);
  };

  return { exportProjectToExcel };
};