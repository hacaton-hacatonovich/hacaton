<?php

const ROUTES = [
    'default' => ['controller_name' => 'MainController', 'action_name' => 'Get'],
    'test' => ['controller_name' => 'TestController', 'action_name' => 'Get'],
    'add_file' => ['controller_name' => 'FileController', 'action_name' => 'AddFile'],
    'graphic_processing' => ['controller_name' => 'GraphicProcessingController', 'action_name' => 'Get'],
    'dot_graphic_settings_str' => ['controller_name' => 'GraphicProcessingController', 'action_name' => 'Dot_Grahpic_Setting_Show'],
    'upload_json_files_get' => ['controller_name' => 'FileController', 'action_name' => 'UploadJson'],
    'create_dot_graphic' => ['controller_name' => 'GraphicProcessingController', 'action_name' => 'Create_dot_Graphic'],
    'columnar_graphic_settings_str' => ['controller_name' => 'GraphicProcessingController', 'action_name' => 'Columnar_Grahpic_Setting_Show'],
    'delete_file' => ['controller_name' => 'FileController', 'action_name' => 'DeleteFile'],
    'auth' => ['controller_name' => 'AuthController', 'action_name' => 'ShowAuthForm'],
];