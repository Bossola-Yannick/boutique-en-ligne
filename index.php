<?php
session_start();
require 'config.php';
?>
<?php
include './components/header.php';
include './components/search.php';
?>
<h1>HELLO HOME PAGE</h1>
<?php var_dump($_SESSION); ?>
<?php
include './components/footer.php';
?>