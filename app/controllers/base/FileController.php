<?php

namespace base;

class FileController
{
    public function UploadFile() {
        $input_name = 'file';
        $allow = array();

        $deny = array(
            'xlsx', 'xls', 'ods', 'ots', 'xltx', 'xltm', 'csv', 'xlsb', 'numbers'
        );

        $path = '/Users/reznicenkodaniivsevolodovic/localhost/storage/';
        $error = $success = '';
        if (!isset($_FILES[$input_name])) {
            $error = 'Файл не загружен.';
        } else {
            $file = $_FILES[$input_name];

            // Проверим на ошибки загрузки.
            if (!empty($file['error']) || empty($file['tmp_name'])) {
                $error = 'Не удалось загрузить файл.';
            } elseif ($file['tmp_name'] == 'none' || !is_uploaded_file($file['tmp_name'])) {
                $error = 'Не удалось загрузить файл.';
            } else {
                $pattern = "[^a-zа-яё0-9,~!@#%^-_\$\?\(\)\{\}\[\]\.]";

                $name = mb_eregi_replace($pattern, '-', $file['name']);
                $name = mb_ereg_replace('[-]+', '-', $name);
                if (file_exists($path . $name)) {
                    $name_array = explode('.', $name);
                    $name = $name_array[0] . '_1' . '.' . $name_array[1];
                }
                $parts = pathinfo($name);

                if (empty($name) || empty($parts['extension'])) {
                    $error = 'Недопустимый тип файла';
                } elseif (!empty($allow) && !in_array(strtolower($parts['extension']), $allow)) {
                    $error = 'Недопустимый тип файла';
                } else {
                    if (in_array(strtolower($parts['extension']), $deny)) {
                        if (move_uploaded_file($file['tmp_name'], $path . $name)) {
                            $this->AddJson($name);
                        } else {
                            $error = 'Не удалось загрузить файл.';
                        }
                    }
                }
            }
        }
    }
}