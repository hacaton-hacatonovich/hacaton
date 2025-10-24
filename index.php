<?php

require_once $_SERVER['DOCUMENT_ROOT'] . 'bootstrap/Autoloader.php';
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

