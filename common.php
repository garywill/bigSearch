<?php 
/*
 * By 大术专搜(bigSearch)
 * (acsearch.ga, acsearch.tk)
 * 
 * 版权所有 保留所有权利
 * All Rights Reserved
 * 
 * Source code: https://github.com/garywill/bigSearch
 * 
 */


ini_set("default_charset", "UTF-8");
//define('DEBUG', false);
//ini_set("display_errors", "Off");
//error_reporting(0);


function stdout($s){

    if ( is_string($s) ){
        file_put_contents("php://stdout", $s . PHP_EOL);
    }else{
        file_put_contents("php://stdout", var_export( $s , TRUE) . PHP_EOL);
    }

}

if ( array_key_exists("SERVER_PROTOCOL", $_SERVER) )
    define("php_run_env", "web");
else 
    define("php_run_env", "not-web");
///////////////////////////////////////
function getUserLang(){
    //stdout($_SERVER );
    
    if (php_run_env != "web") return "undetermined";
    
    if ( array_key_exists("hl", $_GET) )
        return $_GET["hl"];
    else if ( array_key_exists("hl", $_COOKIE) )
        return $_COOKIE["hl"];
    else if ( array_key_exists("Accept-Language", getallheaders()) )
        return substr(getallheaders()["Accept-Language"], 0, 2) ;
    else
        return "en";
}
define("lang",getUserLang());

?>
