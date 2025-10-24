<?php

class MainController
{

    public function Get()
    {
        readfile($_SERVER['DOCUMENT_ROOT'] . 'resources/views/user/main.html');
    }

}