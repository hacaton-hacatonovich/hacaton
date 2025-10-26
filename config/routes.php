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
    'auth' => ['controller_name' => 'AuthController', 'action_name' => 'AuthProcess'],
    'register' => ['controller_name' => 'AuthController', 'action_name' => 'RegisterProcess'],
    'check-code' => ['controller_name' => 'TwoFactorAuthentification', 'action_name' => 'GetCodeToUserEmail'],
    'check-code-process' => ['controller_name' => 'TwoFactorAuthentification', 'action_name' => 'ChekCodeProcess'],
    'dashboard_info' => ['controller_name' => 'DashboardController', 'action_name' => 'GetDashboardInfo'],
    'show_all_users' => ['controller_name' => 'MainAdminController', 'action_name' => 'ShowAllUsers'],
    'delete_user' => ['controller_name' => 'MainAdminController', 'action_name' => 'DeleteUser'],
    'show_project' => ['controller_name' => 'MainAdminController', 'action_name' => 'ShowProject'],
    'create_new_project' => ['controller_name' => 'MainAdminController', 'action_name' => 'CreateProject'],
    'get_role' => ['controller_name' => 'TwoFactorAuthentification', 'action_name' => 'ReturnRole'],
    'delete_project' => ['controller_name' => 'MainAdminController', 'action_name' => 'DeleteProject'],
    'create_user_process' => ['controller_name' => 'MainAdminController', 'action_name' => 'CreateUsers']

];