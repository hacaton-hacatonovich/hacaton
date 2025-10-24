<?php
require_once $_SERVER['DOCUMENT_ROOT'] . "/config/db_config.php";
require_once $_SERVER['DOCUMENT_ROOT'] . "/bootstrap/Autoloader.php";
function Connect_to_DB()
{
    try {
        $connect = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
        return $connect;
    }
    catch (Exception $e) {
        return false;
    }

}