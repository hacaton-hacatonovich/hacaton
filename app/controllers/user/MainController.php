<?php

class MainController
{

    public function Get()
    {
        require_once $_SERVER['DOCUMENT_ROOT'] . '/app/controllers/base/TwoFactorAuthentification.php';
        $auth = new TwoFactorAuthentification();
        $auth->GetCodeToUserEmail('qqq');

    }
}