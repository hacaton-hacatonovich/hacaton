<?php


class TwoFactorAuthentification
{
    public function GetCodeToUserEmail()
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
        $code = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
        mail('danyrezni4enko@yandex.ru', 'My Subject', $code);
        echo json_encode($code);
    }

//    public function GetChekCodeForm() {
//        require_once $_SERVER['DOCUMENT_ROOT'] . '/database/DataBaseController.php';
//        $base = new DataBaseController();
//        $base->VerifyEmail($_COOKIE['user']);
//    }

    public function ChekCodeProcess() {
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
//

        require_once $_SERVER['DOCUMENT_ROOT'] . '/database/DataBaseController.php';
//        echo json_encode($json_data);
        $base = new DataBaseController();
        if ($data['code'] == $data['right_code']) {
            $a = $base->Verify($data['email']);

            echo $a;
        }
        else {
//            echo json_encode("error");
        }
//        $base->Verify($data['code'], $data['right_code'], $data['email']);
    }


    public function ReturnRole() {
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
//
        require_once $_SERVER['DOCUMENT_ROOT'] . '/database/DataBaseController.php';
//        echo json_encode($json_data);
        $base = new DataBaseController();
        $result = $base->ReturnRole($data['email']);
        echo json_encode($result);

    }

}