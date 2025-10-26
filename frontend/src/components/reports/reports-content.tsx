// @ts-nocheck
import React from "react";
import { Download, FileText } from "lucide-react";

export type ReportFile = {
    id: string;
    name: string;
    uploadDate: string;
    fileUrl: string;
    size?: string;
};

type Props = {
    reports: ReportFile[];
};

export const ReportsContent: React.FC<Props> = ({ reports }) => {
    const handleDownload = (report: ReportFile) => {
        // Создаем временную ссылку для скачивания
        const link = document.createElement('a');
        link.href = report.fileUrl;
        link.download = report.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-purple-800">Отчеты</h1>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-purple-100">
                {reports.length === 0 ? (
                    <div className="text-center py-12">
                        <FileText className="mx-auto h-12 w-12 text-purple-300" />
                        <h3 className="mt-4 text-lg font-medium text-purple-900">Нет доступных отчетов</h3>
                        <p className="mt-2 text-sm text-purple-600">
                            Отчеты появятся здесь после их загрузки в систему.
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-purple-100">
                        {reports.map((report) => (
                            <div
                                key={report.id}
                                className="flex items-center justify-between p-6 hover:bg-purple-50 transition-colors duration-200 cursor-pointer"
                                onClick={() => handleDownload(report)}
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="bg-purple-100 p-3 rounded-lg">
                                        <FileText className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-purple-800">
                                            {report.name}
                                        </h3>
                                        <p className="text-sm text-purple-600 mt-1">
                                            Загружен: {formatDate(report.uploadDate)}
                                            {report.size && ` • ${report.size}`}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDownload(report);
                                    }}
                                    className="bg-orange-500 text-white p-2 rounded-md hover:bg-orange-600 transition-colors duration-200"
                                    title="Скачать отчет"
                                >
                                    <Download className="h-5 w-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};