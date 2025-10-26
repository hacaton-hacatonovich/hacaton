<?php

class AuthController
{

    public function __construct()
    {
        require_once $_SERVER['DOCUMENT_ROOT'] . '/database/DataBaseController.php';
        $this->base = new DataBaseController();

    }

    public function ShowAuthForm()
    {
        readfile($_SERVER['DOCUMENT_ROOT'] . '/resources/views/user/auth.html');
    }

    public function ShowRegisterForm()
    {
        readfile($_SERVER['DOCUMENT_ROOT'] . '/resources/views/user/auth.html');
    }

    public function AuthProcess()
    {

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


        $ch = $this->base->ChekAuth(md5($data['password']), $data['email'], 'http://localhost:5173/login');
        if ($ch != false) {
            echo json_encode($data['email']);
        }
        else {
            echo "3434";
        }
//        }
//        else {
//
//            $result = $this->base->CreateUserAccount($data['login'], $data['name'], $data['surname'], $data['patronymic'], $data['password'], $data['posts']);
//            if ($result) {
//                setcookie('user', $data['login'], time() + 3600 * 90);
//                header("Location: " . $protocol . $url);
//            }
//            else {
//                echo "<script>alert('Что-то пошло не так.Повторите попытку позже.')</script>";
//                header("Location: " . $protocol . $url . '/Auth');
//            }
//        }
    }

    public function RegisterProcess()
    {
        header("Access-Control-Allow-Origin: http://localhost:5173");
        header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type");
        header("Content-Type: application/json");

        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
            http_response_code(200);
            exit();
        }

// Получаем raw JSON данные из тела запроса
        $json_data = file_get_contents('php://input');
        $data = json_decode($json_data, true);
        var_dump($data);
        $data['username'] = 'test';
        $data['role'] = 'admin';
        $data['status'] = 'inactive';// true для ассоциативного массива
        $chek_email = $this->base->CheckEmail($data['email']);
        if  ($chek_email) {
            $create_new_user = $this->base->CreateUserAccount($data);
            if ($create_new_user) {
                echo json_encode($data['email']);
            }
            else {
                return false;
            }
        }
        else {
            return "error";
        }
// Проверяем, удалось ли распарсить JSON

//        $data = [
//            'email' => $_POST['email'],
//            'first_name' => $_POST['first_name'],
//            'last_name' => $_POST['last_name'],
//            'patronymic' => $_POST['patronymic'],
//            'password' => md5($_POST['password']),
//            'phone_number' => $_POST['phone_number'],
//        ];
//        $chek = $this->base->ChekUserLogin($data['login']);

    }
}