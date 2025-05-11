<?php
session_start();

// suppression des variables
$_SESSION = [];

// destructioln de la session
session_destroy();

exit;
