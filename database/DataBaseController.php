<?php

class DataBaseController
{
    public function __construct() {
        require_once $_SERVER['DOCUMENT_ROOT'] . '/database/BaseConnect.php';
        $connect = Connect_to_DB();
    }

    public function Example() {
        $sql = "SELECT code FROM code";
        $result = mysqli_query($this->link, $sql);
        $code = mysqli_fetch_array($result);
        return $code;
    }
}