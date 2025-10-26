<?php

class DataBaseController
{
    public function __construct() {
        require_once $_SERVER['DOCUMENT_ROOT'] . '/database/BaseConnect.php';
        $this->link = Connect_to_DB();
    }

    public function CheckEmail($email) {
        $sql = "SELECT COUNT(*) FROM users WHERE email='" . $email . "'";
        $query = mysqli_query($this->link, $sql);
        $result = mysqli_fetch_array($query)[0];
        if ($result == 0) {
            return true;
        }
        else {
            return false;
        }
    }

    public function SelectInfoProjects($id) {
        // Получить все данные из одной таблицы одним запросом
        $tables = [
            'projects' => ['id', 'organization_id', 'name', 'service_type', 'payment_type', 'stage', 'realization_probability', 'manager_id', 'business_segment', 'realization_year', 'is_industry_solution', 'is_forecast_accepted', 'is_dzo_implementation', 'requires_management_control', 'evaluation_type', 'industry_manager_id', 'project_number', 'current_status', 'period_work_done', 'next_period_plans', 'total_revenue', 'total_cost', 'created_at', 'updated_at'],
        ];

        $results = [];
        foreach ($tables as $table => $columns) {
            foreach ($columns as $column) {
                $sql = "SELECT $column FROM $table WHERE id='" . $id . "'";
                $query = mysqli_query($this->link, $sql);
                if ($query && mysqli_num_rows($query) > 0) {
                    $results[$table][$column] = mysqli_fetch_array($query)[0];
                }
            }
        }
        return $results;
    }

    public function SelectInfoUsers($id) {
        // Получить все данные из одной таблицы одним запросом
        $tables = [
            'users' => ['username', 'email', 'first_name', 'last_name', 'role'],
        ];

        $results = [];
        foreach ($tables as $table => $columns) {
            foreach ($columns as $column) {
                $sql = "SELECT $column FROM $table WHERE id='" . $id . "'";
                $query = mysqli_query($this->link, $sql);
                if ($query && mysqli_num_rows($query) > 0) {
                    $results[$table][$column] = mysqli_fetch_array($query)[0];
                }
            }
        }

        return $results;
    }

    public function SelectInfoOrganizations($id) {
        // Получить все данные из одной таблицы одним запросом
        $tables = [
            'organizations' => ['name', 'inn'],
        ];

        $results = [];
        foreach ($tables as $table => $columns) {
            foreach ($columns as $column) {
                $sql = "SELECT $column FROM $table WHERE id='" . $id . "'";
                $query = mysqli_query($this->link, $sql);
                if ($query && mysqli_num_rows($query) > 0) {
                    $results[$table][$column] = mysqli_fetch_array($query)[0];
                }
            }
        }

        return $results;
    }

    public function SelectInfoProjectRevenues($id) {
        // Получить все данные из одной таблицы одним запросом
        $tables = [
            'project_revenues' => ['amount', 'revenue_status'],
        ];

        $results = [];
        foreach ($tables as $table => $columns) {
            foreach ($columns as $column) {
                $sql = "SELECT $column FROM $table WHERE id='" . $id . "'";
                $query = mysqli_query($this->link, $sql);
                if ($query && mysqli_num_rows($query) > 0) {
                    $results[$table][$column] = mysqli_fetch_array($query)[0];
                }
            }
        }

        return $results;
    }

    public function SelectInfoProjectCosts($id) {
        // Получить все данные из одной таблицы одним запросом
        $tables = [
            'project_costs' => ['amount', 'cost_type'],
        ];

        $results = [];
        foreach ($tables as $table => $columns) {
            foreach ($columns as $column) {
                $sql = "SELECT $column FROM $table WHERE id='" . $id . "'";
                $query = mysqli_query($this->link, $sql);
                if ($query && mysqli_num_rows($query) > 0) {
                    $results[$table][$column] = mysqli_fetch_array($query)[0];
                }
            }
        }

        return $results;
    }

    public function SelectInfoProjectHistory($id) {
        // Получить все данные из одной таблицы одним запросом
        $tables = [
            'project_history' => ['changed_field', 'old_value', 'new_value'],
        ];

        $results = [];
        foreach ($tables as $table => $columns) {
            foreach ($columns as $column) {
                $sql = "SELECT $column FROM $table WHERE id='" . $id . "'";
                $query = mysqli_query($this->link, $sql);
                if ($query && mysqli_num_rows($query) > 0) {
                    $results[$table][$column] = mysqli_fetch_array($query)[0];
                }
            }
        }

        return $results;
    }

    public function SelectInfoDictionaries($id) {
        // Получить все данные из одной таблицы одним запросом
        $tables = [
            'dictionaries' => ['dict_type', 'dict_value'],
        ];

        $results = [];
        foreach ($tables as $table => $columns) {
            foreach ($columns as $column) {
                $sql = "SELECT $column FROM $table WHERE id='" . $id . "'";
                $query = mysqli_query($this->link, $sql);
                if ($query && mysqli_num_rows($query) > 0) {
                    $results[$table][$column] = mysqli_fetch_array($query)[0];
                }
            }
        }

        return $results;
    }


    public function SelectInfoCustomReports($id) {
        // Получить все данные из одной таблицы одним запросом
        $tables = [
            'custom_reports' => ['name', 'report_config'],
        ];

        $results = [];
        foreach ($tables as $table => $columns) {
            foreach ($columns as $column) {
                $sql = "SELECT $column FROM $table WHERE id='" . $id . "'";
                $query = mysqli_query($this->link, $sql);
                if ($query && mysqli_num_rows($query) > 0) {
                    $results[$table][$column] = mysqli_fetch_array($query)[0];
                }
            }
        }

        return $results;
    }


    public function SelectInfoUserSession($id) {
        // Получить все данные из одной таблицы одним запросом
        $tables = [
            'user_sessions' => ['session_token', 'two_factor_code']
        ];

        $results = [];
        foreach ($tables as $table => $columns) {
            foreach ($columns as $column) {
                $sql = "SELECT $column FROM $table WHERE id='" . $id . "'";
                $query = mysqli_query($this->link, $sql);
                if ($query && mysqli_num_rows($query) > 0) {
                    $results[$table][$column] = mysqli_fetch_array($query)[0];
                }
            }
        }

        return $results;
    }


    public function ChekAuth($password, $email) {
        $sql = 'SELECT password FROM users WHERE email="' . $email . '"';
        $query = mysqli_query($this->link, $sql);
        $result = mysqli_fetch_array($query);
        $pass_in_base = $result[0];
        echo mysqli_error($this->link);
        if ($password == $pass_in_base) {
            return true;
        }
        else {
            echo $password . "///////////";
            echo $pass_in_base;
        }
    }

    public function CreateUserAccount($data) {
        $sql = "INSERT INTO users (username, password, email, first_name, last_name, patronymic, role, phone_number, status) VALUES ( '" .
    $data['username'] . "', '" .
    md5($data['password']) . "', '" .
    $data['email'] . "', '" .
    $data['first_name'] . "', '" .
    $data['last_name'] . "', '" .
    $data['patronymic'] . "', '" .
    $data['role'] . "', '" .
    $data['phone_number'] . "', '" .
            $data['status'] . "'" . ")";
        var_dump($data);
        $query = mysqli_query($this->link, $sql);
        echo mysqli_error($this->link);
    }

    public function CreateProject($data) {
        $sql = "INSERT INTO users (organization_id, name, service_type, payment_type, stage, realization_probability, manager_id, buisness_segment, realization_year, is_industry_solution, is_forecast_accepted, is_dzo_implementation, requires_managment_control, evaluation_type, industry_manager_id, project_number, current_status, period_work_done, next_period_plans, total_revenue, total_cost) VALUES (  -- замените на нужный ID
   " . md5($data['password']) . ", " .
            $data['email'] . ", " .
            $data['first_name'] . ", " .
            $data['last_name'] . ", " .
            $data['patronymic'] . ", " .
            $data['role'] . ", " .
            $data['phone_number'] . ", " .
            $data['status'] . ", 
    NOW(), 
    NOW()
);";
    }

    public function Verify($_user_email) {
        $sql = 'UPDATE users 
SET status = "active"' .
'WHERE email = "' . $_user_email . '";';
        $query = mysqli_query($this->link, $sql);
        if ($query) {
            return '1212';
        }
        else {
            return '4545';
        }
    }

    public function GetAllProfit($admin_email) {
        $admin_email = mysqli_real_escape_string($this->link, $admin_email);

        // 1. Получаем ID проектов по email
        $sql_projects = "SELECT id FROM projects WHERE admin_email = '$admin_email'";
        $query_projects = mysqli_query($this->link, $sql_projects);

        if (!$query_projects) {
            error_log("SQL Error (projects): " . mysqli_error($this->link));
            return 0;
        }

        $project_ids = [];
        while ($row = mysqli_fetch_assoc($query_projects)) {
            $project_ids[] = $row['id'];
        }

        if (empty($project_ids)) {
            return 0; // Нет проектов у этого email
        }

        // 2. Получаем сумму revenue_status по найденным ID
        $ids_string = implode(',', $project_ids);
        $sql_revenue = "SELECT SUM(amount) as total_revenue 
                   FROM project_revenues 
                   WHERE project_id IN ($ids_string) 
                   AND revenue_status = 'Начисленная'";

        $query_revenue = mysqli_query($this->link, $sql_revenue);

        if (!$query_revenue) {
            error_log("SQL Error (revenue): " . mysqli_error($this->link));
            return 0;
        }

        $result = mysqli_fetch_assoc($query_revenue);
        return $result['total_revenue'] ?? 0;
    }

    public function GetProjects($admin_email) {
        $sql = "SELECT * FROM projects WHERE admin_email = '" . $admin_email . "';";
        $query = mysqli_query($this->link, $sql);
        $result = mysqli_fetch_all($query);
        $massive = [];
        for ($i=0; $i<count($result); $i++) {

            $sql = "SELECT * FROM project_costs WHERE project_id='" . $result[$i][0] . "';";
            $query = mysqli_query($this->link, $sql);
            $rlt = mysqli_fetch_all($query);
            $massive_costs = [];
            for ($j = 0; $j < count($rlt); $j++) {
                $massive_costs[$j] = [
                    'id' => $rlt[$j][0],
                    'project_id' => $rlt[$j][1],
                    'year' => $rlt[$j][2],
                    'month' => $rlt[$j][3],
                    'amount' => $rlt[$j][4],
                    'cost_type' => $rlt[$j][5],
                    'cost_status' => $rlt[$j][6],
                    'created_at' => $rlt[$j][7],
                ];
            }

            $sql = "SELECT * FROM project_history WHERE project_id='" . $result[$i][0] . "';";
            $query = mysqli_query($this->link, $sql);
            $rt = mysqli_fetch_all($query);
            $massive_history = [];
            for ($k = 0; $k < count($rt); $k++) {
                $massive_history[$k] = [
                    'id' => $rt[$k][0],
                    'project_id' => $rt[$k][1],
                    'user_id' => $rt[$k][2],
                    'changed_field' => $rt[$k][3],
                    'old_value' => $rt[$k][4],
                    'new_value' => $rt[$k][5],
                    'change_date' => $rt[$k][6],
                ];
            }



            $sql = "SELECT * FROM project_revenues WHERE project_id='" . $result[$i][0] . "';";
            $query = mysqli_query($this->link, $sql);
            $r = mysqli_fetch_all($query);
            $massive_revenues = [];
            for ($j = 0; $j < count($r); $j++) {
                $massive_history[$j] = [
                    'id' => $r[$j][0],
                    'project_id' => $r[$j][1],
                    'year' => $r[$j][2],
                    'month' => $r[$j][3],
                    'amount' => $r[$j][4],
                    'revenue_type' => $r[$j][5],
                    'created_at' => $r[$j][6],
                ];
            }


            $massive[$i] = [
                'id' => $result[$i][0],
                'organization_id' => $result[$i][1],
                'name' => $result[$i][2],
                'service_type' => $result[$i][3],
                'payment_type' => $result[$i][4],
                'stage' => $result[$i][5],
                'realization_probability' => $result[$i][6],
                'manager_id' => $result[$i][7],
                'business_segment' => $result[$i][8],
                'realization_year' => $result[$i][9],
                'is_industry_solution' => $result[$i][10],
                'is_forecast_accepted' => $result[$i][11],
                'is_dzo_implementation' => $result[$i][12],
                'requires_management_control' => $result[$i][13],
                'evaluation_type' => $result[$i][14],
                'industry_manager_id' => $result[$i][15],
                'project_number' => $result[$i][16],
                'current_status' => $result[$i][17],
                'period_work_done' => $result[$i][18],
                'next_period_plans' => $result[$i][19],
                'total_revenue' => $result[$i][20],
                'total_cost' => $result[$i][21],
                'created_at' => $result[$i][22],
                'updated_at' => $result[$i][23],
                'admin_email' => $result[$i][24],
                'costInfo' => $massive_costs,
                'projectHistory' => $massive_history,
                'revenueInfo' => $massive_revenues


            ];
        }
        return $massive;
    }


    public function CreateNewProject($data) {
        $sql = "INSERT INTO projects (organization_id, name, service_type, payment_type, stage, realization_probability, manager_id, business_segment, realization_year, is_industry_solution, is_forecast_accepted, is_dzo_implementation, 
                      requires_management_control, evaluation_type, industry_manager_id, project_number, current_status, period_work_done, next_period_plans, total_revenue, total_cost, admin_email, created_at, updated_at) VALUES ('" .
        '5' . "', '" .
        $data['name'] . "', '" .
        $data['service_type'] . "', '" .
        $data['payment_type'] . "', '" .
        $data['stage'] . "', '" .
        $data['realization_probability'] . "', '" .
        $data['manager_id'] . "', '" .
        $data['business_segment'] . "', '" .
        $data['realization_year'] . "', '" .
        $data['is_industry_solution'] . "', '" .
        $data['is_forecast_accepted'] . "', '" .
        $data['is_dzo_implementation'] . "', '" .
        $data['requires_management_control'] . "', '" .
        $data['evaluation_type'] . "', '" .
        $data['industry_manager_id'] . "', '" .
        $data['project_number'] . "', '" .
        $data['current_status'] . "', '" .
        $data['period_work_done'] . "', '" .
        $data['next_period_plans'] . "', '" .
        $data['total_revenue'] . "', '" .
        $data['total_cost'] . "', '" .
        $data['email'] . "', NOW(), NOW()); ";
        $query = mysqli_query($this->link, $sql);

        $sql = "SELECT MAX(id) FROM projects;";
        $query = mysqli_query($this->link, $sql);
        $id = mysqli_fetch_array($query)[0];
        for ($i=0;$i < count($data['revenueInfo']);$i++) {
            $sql = "INSERT INTO project_revenues (project_id, year, month, amount, revenue_status) VALUES ('" .
                $id . "', '" .
                $data['revenueInfo'][$i]['year'] . "', '" .
                $data['revenueInfo'][$i]['month'] . "', '" .
                $data['revenueInfo'][$i]['amount'] . "', '" .
                $data['revenueInfo'][$i]['revenue_status'] . "');";
            $query = mysqli_query($this->link, $sql);
        }


        for ($i=0;$i < count($data['costInfo']);$i++) {
                $sql = "INSERT INTO project_costs (project_id, year, month, amount, cost_type, cost_status, created_at) VALUES ('" .
                $id . "', '" .
                $data['costInfo'][$i]['year'] . "', '" .
                $data['costInfo'][$i]['month'] . "', '" .
                $data['costInfo'][$i]['amount'] . "', '" .
                $data['costInfo'][$i]['cost_type'] . "', '" .
                $data['costInfo'][$i]['cost_status'] . "', NOW());";


            $query = mysqli_query($this->link, $sql);
        }

        for ($i=0;$i < count($data['projectHistory']);$i++) {
            $sql = "INSERT INTO project_history (project_id, user_id, changed_field, old_value, new_value, change_date) VALUES ('" .
                $id . "', '" .
                $data['costInfo'][$i]['user_id'] . "', '" .
                $data['costInfo'][$i]['changed_field'] . "', '" .
                $data['costInfo'][$i]['old_value'] . "', '" .
                $data['costInfo'][$i]['new_value'] . "', '" .
                $data['costInfo'][$i]['change_date'] . "');";


            $query = mysqli_query($this->link, $sql);
        }
return mysqli_error($this->link);


//        for ($i=0;$i < count($data['costInfo']);$i++) {
//            $sql = "INSERT INTO project_revenues (project_id, year, month, amount, revenue_status) VALUES ('" .
//                $data[$i]['project_id'] . "', '" .
//                $data[$i]['year'] . "', '" .
//                $data[$i]['month'] . "', '" .
//                $data[$i]['revenue_status'] . "');";
//            $query = mysqli_query($this->link, $sql);
//            $result = mysqli_fetch_array($query);

        }


//        $query = mysqli_query($this->link, $sql);
//        echo json_encode(mysqli_error($this->link));

//        for ($i=0, $i < )



    public function GetActiveProject($admin_email) {
        $sql = "SELECT COUNT(*) as count_implementation
FROM projects
WHERE stage = 'Реализация' AND admin_email='" . $admin_email . "';";
        $query = mysqli_query($this->link, $sql);
        $result = mysqli_fetch_array($query)[0];
        return $result;
    }

    public function GetAllProject($email) {
        $sql = "SELECT COUNT(*) as total_projects
FROM projects WHERE admin_email = '" . $email . "';";
        $query = mysqli_query($this->link, $sql);
        $result = mysqli_fetch_array($query)[0];
        return $result;
    }

    public function GetAnaliticCount($admin_email) {
        $sql = "SELECT users FROM users WHERE email = '" . $admin_email . "';";
        $query = mysqli_query($this->link, $sql);
        $result = mysqli_fetch_array($query)[0];
        $massive = explode(',', $result);
        $massive_result = 0;
        for ($i=0; $i < count($massive); $i++) {
            $sql = "SELECT role FROM users WHERE id = '" . $massive[$i] . "';";
            $query = mysqli_query($this->link, $sql);
            try {
                $result = mysqli_fetch_array($query)[0];
                if ($result == 'analyst') {
                    $massive_result += 1;
                }
            }
            catch (Exception $e) {
                $massive_resilt = 0;
                break;
            }

        }
        return $massive_result;
    }


    public function GetUsersInfo($admin_email) {
        $sql = "SELECT users FROM users WHERE email='" . $admin_email . "';";
        $query = mysqli_query($this->link, $sql);
        $result = mysqli_fetch_array($query)[0];
        $massive = explode(',', $result);
        $mass_result = [];
        for ($i = 0; $i < count($massive); $i++) {
            $sql = "SELECT first_name, last_name, patronymic, email, phone_number, role
FROM users
WHERE id ='" . $massive[$i] . "'";
            $query = mysqli_query($this->link, $sql);
            $result = mysqli_fetch_array($query);
            $mass_result[$i] = $result;
            $mass_result[$i]['id'] = $massive[$i];
        }
        return $mass_result;
    }

    public function DeleteUsers($admin_email, $user_id) {
        $sql = "DELETE FROM users WHERE id='" . $user_id . "';";
        $query = mysqli_query($this->link, $sql);
        $sql = "SELECT users FROM users WHERE email='" . $admin_email . "';";
        $query = mysqli_query($this->link, $sql);
        $result = mysqli_fetch_array($query)[0];
        $result = str_replace($user_id . ',', '', $result);
        $sql = 'UPDATE users 
SET users = "' . $result . '"' .
            'WHERE email = "' . $admin_email . '";';
        $query = mysqli_query($this->link, $sql);
    }
    public function ReturnRole($email) {
        $sql = "SELECT role FROM users WHERE email='" . $email . "';";
        $query = mysqli_query($this->link, $sql);
        $result = mysqli_fetch_array($query)[0];
        return $result;
    }


    public function DeleteProject($id) {
        $sql = "DELETE FROM projects WHERE id='" . $id . "';";
        $query = mysqli_query($this->link, $sql);
        $sql = "DELETE FROM project_costs WHERE project_id='" . $id . "';";
        $query = mysqli_query($this->link, $sql);
        $sql = "DELETE FROM project_revenues WHERE project_id='" . $id . "';";
        $query = mysqli_query($this->link, $sql);
        $sql = "DELETE FROM project_history WHERE project_id='" . $id . "';";
        $query = mysqli_query($this->link, $sql);
    }


    public function CreateUsAccount($data) {
        $sql = "INSERT INTO users (username, first_name, last_name, patronymic, email, phone_number, role, status, password, users) VALUES ('test', " .
            "'" . $data['first_name'] . "', " .
            "'". $data['last_name'] . "', " .
            "'" . $data['patronymic'] . "', " .
            "'" . $data['email'] . "', " .
            "'" . $data['phone_number'] . "', " .
            "'" . $data['role'] . "', " .
            "'inactive', " .
            "'" . $data['password'] . "', '');";
        $query = mysqli_query($this->link, $sql);
        $sql = "SELECT id FROM users WHERE email='" . $data['email'] . "';";
        $query = mysqli_query($this->link, $sql);
        $id = mysqli_fetch_array($query)[0];
        $sql = "SELECT users FROM users WHERE email='" . $data['admin_id'] . "';";
        $query = mysqli_query($this->link, $sql);
        $result = mysqli_fetch_array($query)[0];
        $result = $result . ',' . $id;
        $sql = 'UPDATE users 
SET users = "' . $result . '"' .
            'WHERE email = "' . $data['admin_id'] . '";';
        $query = mysqli_query($this->link, $sql);
    }

}