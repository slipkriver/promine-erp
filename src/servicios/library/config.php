<?php

define("DB_NAME", "s82JdA0Szr");
define("DB_USER", "s82JdA0Szr");
define("DB_PASSWORD", "WpBOPhQg52");
define("DB_HOST", "remotemysql.com");

$mysqli = new mysqli(DB_HOST,DB_USER,DB_PASSWORD,DB_NAME);
$mysqli->set_charset("utf8");
if (!$mysqli ){
    echo "Error: No se pudo conectar a MySQL." . PHP_EOL;
    echo "errno de depuraci�n: " . mysqli_connect_errno() . PHP_EOL;
    echo "error de depuraci�n: " . mysqli_connect_error() . PHP_EOL;
    exit;
}


?>
