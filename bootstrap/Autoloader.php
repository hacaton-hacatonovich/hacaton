<?php
spl_autoload_register(function ($class_name)
{
    require_once $_SERVER['DOCUMENT_ROOT'] . '/config/path_to_directories.php';
    for ($i=0; $i < count(PATH_TO_DIRECTORIES); $i++) {
        $path = $_SERVER['DOCUMENT_ROOT'] . PATH_TO_DIRECTORIES[$i] . $class_name . '.php';
        if (file_exists($path)) {
            require_once $path;
        }
    }
});