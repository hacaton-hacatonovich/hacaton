<?php

class MainAdminController
{
    public function __construct() {
        require_once $_SERVER['DOCUMENT_ROOT'] . '/database/DataBaseController.php';
        $this->base = new \DataBaseController();
    }
    public function Get() {

    }


    public function ShowAllUsers() {
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
        if (json_last_error() !== JSON_ERROR_NONE) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid JSON data']);
            exit();
        }
        $this->base->GetUsersInfo($data['email']);
        echo json_encode($this->base->GetUsersInfo($data['email']));
    }


    public function DeleteUser() {
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
        if (json_last_error() !== JSON_ERROR_NONE) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid JSON data']);
            exit();
        }
        $this->base->DeleteUsers($data['admin_id'], $data['user_id']);
    }

    public function ShowProject() {
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
        if (json_last_error() !== JSON_ERROR_NONE) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid JSON data']);
            exit();
        }

        $name = $this->base->GetProjects($data['email']);
        echo json_encode($name);
    }


    public function CreateProject() {
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
        if (json_last_error() !== JSON_ERROR_NONE) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid JSON data']);
            exit();
        }

        $name = $this->base->CreateNewProject($data);
        echo json_encode($name);
    }


    public function DeleteProject() {
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
        $this->base->DeleteProject($data['id']);
    }


    public function CreateUsers() {
        header("Access-Control-Allow-Origin: http://localhost:5173 always");
        header("Access-Control-Allow-Credentials: true always");
        header("Access-Control-Allow-Methods: POST, GET, OPTIONS always");
        header("Access-Control-Allow-Headers: Content-Type always");
        header("Content-Type: application/json");

        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
            http_response_code(200);
            exit();
        }

        $json_data = file_get_contents('php://input');
        $data = json_decode($json_data, true);
        echo json_encode($this->base->CreateUsAccount($data));




    }
}