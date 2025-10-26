<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// CORS headers
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=utf-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}


require_once $_SERVER['DOCUMENT_ROOT'] . '/bootstrap/Autoloader.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/database/BaseConnect.php';
$connect = Connect_to_DB();
if ($connect == false) {
    $error = new ErrorHandler();
    $error->ShowError(500);
}
else {
    $route = new RouteController();
    $route->Route();
}

