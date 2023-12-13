<?php

$dbhostname = 'localhost';
$dbname     = 'cps3351';
/* $port = 3307; */
$dbusername = 'jou';
$dbpassword = 'password'; 
$chartset = 'utf8mb4';

/* $attr = "mysql:host=$dbhostname; port=$port;dbname=$dbname"; */
$attr = "mysql:host=$dbhostname; dbname=$dbname";
$opts = 
[
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];

try {
    $pdo = new PDO($attr, $dbusername, $dbpassword, $opts);
}
catch(PDOException $e) {
    throw new PDOException($e->getMessage(), (int)$e->getCode());
}

?>
