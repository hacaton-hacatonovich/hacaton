<?php
require_once $_SERVER['DOCUMENT_ROOT'] . 'config/routes.php';
#[AllowDynamicProperties]
class RouteController
{
    public function __construct() {
        $url = $_SERVER['REQUEST_URI'];
        $url_massive = explode("/", $url);
        $controller = true;
        if (count($url_massive) > 3) {
            $this->controller = strtolower($url_massive[3]);
            if ($this->controller != '') {
                if (!empty(ROUTES[$this->controller])) {
                    if (isset($url_massive[4])) {
                        $this->action = $url_massive[4];
                        if (!empty(ROUTES[$this->controller]['action_name'])) {
                            $this->action = ROUTES[$this->controller]['action_name'];
                        }
                    }
                    else {
                        $this->action = ROUTES[$this->controller]['action_name'];
                    }
                    $this->controller = ROUTES[$this->controller]['controller_name'];
                }
                else {
                    $this->controller = ucfirst($this->controller) . 'Controller';
                    $this->action = 'Get';
                }
            }
            else {
                $controller = false;
            }
        }
        else {
            $controller = false;
        }
        if (!$controller) {
            $this->controller = ROUTES['default']['controller_name'];
            $this->action = ROUTES['default']['action_name'];
        }
    }

    public function Route()
    {
        echo $this->controller;
        echo $this->action;
        $err = false;
        if (class_exists($this->controller)) {
            $controller = new $this->controller;
            $action = $this->action;
            if (method_exists($controller, $action)) {
                $controller->$action();
            }
            else {
                $err = true;
            }
        }
        else {
            $err = true;
        }
        if ($err) {
            $error = new ErrorHandler();
            $error->ShowError('404');
        }
    }
}