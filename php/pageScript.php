<?php

include 'CurlPersistentConnection.php';
include 'SubjectRetriever.php';

// Allow requests from other domains
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

echo SubjectRetriever::get($_POST['materia']); 
