<?php

class ErrorHandler
{
    public function ShowError($error_type)
    {
    $path = $_SERVER['DOCUMENT_ROOT'] . 'resources/views/error/';
    switch ($error_type) {
        case '404':
            readfile($path . $error_type . '.html');
        case '500':
            readfile($path . $error_type . '.html');
    }
    }
}