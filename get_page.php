<?php

function getUrl($ch, $url, $fields)
{
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_COOKIEJAR, 'cookies/cookies.txt');
    curl_setopt($ch, CURLOPT_COOKIEFILE, 'cookies/cookies.txt');
    return curl_exec($ch);
}

function getSubjectPage($subject = '')
{
    $url = 'https://escolar.fie.umich.mx/20162016/estudiante/materia-sig.php';
    $fields = [
        'materia' => $subject,
        // The next two lines aren't important. It's just additional information.
        d('m9secB64TBoqWOUovogmXTgaaTC19XCFiXgbvE7Cz/s=') => d('wAJG92Q/AsOr2uHmOgy2RB9GmfE9TR7OixsMSbHNjdw='),
        d('Q1eM11qvMDNntqPHR3KR+tGijYJND/PTw+L+DJZZcHQ=') => d('78Il3WcSsYoPhsW7gM+AoiqImj58q6sPq3hpENsMXnQ=')
        // If you know what these are, please don't do anything bad ;)
    ];

    $ch = curl_init();

    getUrl($ch, $url, $fields);
    $resultHtml = getUrl($ch, $url, $fields);

    curl_close($ch);

    return $resultHtml;
}

function d($text)
{  
    return trim(mcrypt_decrypt(MCRYPT_RIJNDAEL_256, 'asdfghjklasdfghj', base64_decode($text), MCRYPT_MODE_ECB, mcrypt_create_iv(mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB), MCRYPT_RAND)));
}
