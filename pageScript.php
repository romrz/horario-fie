<?php

include 'get_page.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

echo getSubjectPage($_POST['materia']);
