<?php 

/*
    Retrieves the raw HTML that contains
    the subject information
*/
class SubjectRetriever
{
    const URL = 'https://escolar.fie.umich.mx/actual/estudiante/materia-sig.php';

    public static function get($subjectId)
    {
        $fields = [
            'materia' => $subjectId,
            // The next two lines aren't important. It's just additional information.
            d('m9secB64TBoqWOUovogmXTgaaTC19XCFiXgbvE7Cz/s=') => d('wAJG92Q/AsOr2uHmOgy2RB9GmfE9TR7OixsMSbHNjdw='),
            d('Q1eM11qvMDNntqPHR3KR+tGijYJND/PTw+L+DJZZcHQ=') => d('78Il3WcSsYoPhsW7gM+AoiqImj58q6sPq3hpENsMXnQ=')
            // If you know what these are, please don't do anything bad ;)
        ];

        $connection = new CurlPersistentConnection;
        $connection->post(self::URL, $fields); // Login request
        $html = $connection->post(self::URL, $fields); // Subject info request

        return $html;
    }
}

function e($text)
{  
    return trim(base64_encode(mcrypt_encrypt(MCRYPT_RIJNDAEL_256, 'asdfghjklasdfghj', $text, MCRYPT_MODE_ECB, mcrypt_create_iv(mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB), MCRYPT_RAND))));
}

function d($text)
{  
    return trim(mcrypt_decrypt(MCRYPT_RIJNDAEL_256, 'asdfghjklasdfghj', base64_decode($text), MCRYPT_MODE_ECB, mcrypt_create_iv(mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB), MCRYPT_RAND)));
}
