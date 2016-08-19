<?php 

/*
    Creates a persisten connection using CURL.

    The cookies are stored between requests.
*/
class CurlPersistentConnection
{

    protected $ch; // Curl connection handler

    public function __construct()
    {
        $this->ch = curl_init();
    }

    /*
        Executes a post request to the given URL
        with the given parameters.

        Returns the contents of the response.
    */
    public function post($url, $fields)
    {
        curl_setopt($this->ch, CURLOPT_POST, 1);
        curl_setopt($this->ch, CURLOPT_POSTFIELDS, $fields);
        curl_setopt($this->ch, CURLOPT_URL, $url);
        curl_setopt($this->ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($this->ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($this->ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($this->ch, CURLOPT_COOKIEJAR, 'cookies/cookies.txt');
        curl_setopt($this->ch, CURLOPT_COOKIEFILE, 'cookies/cookies.txt');
        return curl_exec($this->ch);
    }

    public function __destruct()
    {
        curl_close($this->ch);
    }

}