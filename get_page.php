<?php

include 'src/php/CurlPersistentConnection.php';
include 'src/php/SubjectRetriever.php';

// Allow requests from other domains
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

echo SubjectRetriever::get($_POST['materia']); 
