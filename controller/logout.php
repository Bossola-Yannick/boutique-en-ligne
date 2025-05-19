<?php
session_start();
session_unset();
session_destroy();
// suppression des variables
$_SESSION = [];
exit;
