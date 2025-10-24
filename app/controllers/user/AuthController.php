<?php

class AuthController
{
    public function ShowAuthForm()
    {
        readfile($_SERVER['DOCUMENT_ROOT'] . 'resources/views/user/auth.html');
    }

    public function ShowRegisterForm()
    {
        readfile($_SERVER['DOCUMENT_ROOT'] . 'resources/views/user/auth.html');
    }

    public function AuthProcess()
    {

    }

    public function RegisterProcess()
    {

    }
}