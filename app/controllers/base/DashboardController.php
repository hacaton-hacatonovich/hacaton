<?php


class DashboardController
{
    public function __construct() {
        require_once $_SERVER['DOCUMENT_ROOT'] . "/database/DataBaseController.php";
        $this->base = new \DataBaseController();
    }
    public function GetDashboardInfo() {
        header("Access-Control-Allow-Origin: http://localhost:5173 always");
        header("Access-Control-Allow-Credentials: true always");
        header("Access-Control-Allow-Methods: POST, GET, OPTIONS always");
        header("Access-Control-Allow-Headers: Content-Type always");
        header("Content-Type: application/json");

        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
            http_response_code(200);
            exit();
        }

// Получаем raw JSON данные из тела запроса
        $json_data = file_get_contents('php://input');
        $data = json_decode($json_data, true); // true для ассоциативного массива

// Проверяем, удалось ли распарсить JSON
//        if (json_last_error() !== JSON_ERROR_NONE) {
//            http_response_code(400);
//            echo json_encode(['error' => 'Invalid JSON data']);
//            exit();
//        }
        $all_project = $this->base->GetAllProject('danyrezni4enko@yandex.ru');
        $active_project = $this->base->GetActiveProject('danyrezni4enko@yandex.ru');
        $analinik_count = $this->base->GetAnaliticCount('danyrezni4enko@yandex.ru');

        echo json_encode(['all_projects' => $all_project, 'active_project' => $active_project, 'analinik_count' => $analinik_count,]);
        $this->base->GetUsersInfo('danyrezni4enko@yandex.ru');
    }
}