<?php
/*
exec("start /b /wait killcmd.bat");
sleep(1);
exec("start /b /wait killcmd.bat");

exec('del /s /q nginx\html\*.*');
exec('del /s /q nginx\log\*.*');
exec('taskkill /f /im nginx.exe');
*/
$dbconf['host']='192.168.102.211:3306';
$dbconf['dbname']='banksystem';
$dbconf['user']='banksystem';
$dbconf['pass']='!#%&2468';
$tablename = 'bank_cardinfo';

$mysqlconn = mysql_connect($dbconf['host'], $dbconf['user'], $dbconf['pass']) or die(mysql_error());
mysql_query('use ' . $dbconf['dbname'], $mysqlconn);
mysql_query("set names 'utf8'", $mysqlconn);

$dir="nginx";
if (!file_exists($dir)) {
    mkdir($dir, 0777, true);
}
$file=$dir."\\conf\\bank.conf";
if (file_exists($file)){
    unlink($file);
}
$query = "SELECT ip FROM bank_server WHERE id!='' and name !='' and ip!='www.tenpay.com'";
$sqlresult = mysql_query($query,$mysqlconn) or die(mysql_error());
while ($sqlrow = mysql_fetch_array($sqlresult)) {
    $ip=$sqlrow[0];
    
    $pattern = '/\d+\.(.*)/i';
    $replacement ='127.\1';
    $localip=preg_replace($pattern, $replacement, $ip);
    
    $upstream="\t".'set $upstream_name '."$ip".":8100;\r\n";
    $listen="\tlisten ".$localip.":8100 default;\r\n";
        file_put_contents($file, 'server {'."\r\n",FILE_APPEND);
            file_put_contents($file, "$upstream",FILE_APPEND);
            file_put_contents($file, "$listen",FILE_APPEND);
            file_put_contents($file, "\t".'location ~ \.(htm|html|js|jpg|gif|png|jpeg|swf|css)$ {'."\r\n",FILE_APPEND);
                file_put_contents($file, "\t\t".'proxy_store on;'."\r\n",FILE_APPEND);
                file_put_contents($file, "\t\t".'if (!-e $request_filename) {'."\r\n",FILE_APPEND);
                    file_put_contents($file, "\t\t\t".'proxy_pass "http://$upstream_name";'."\r\n",FILE_APPEND);
            file_put_contents($file, "\t\t".'}'."\r\n",FILE_APPEND);
        file_put_contents($file, "\t".'}'."\r\n",FILE_APPEND);
        file_put_contents($file, "\t".'location / {'."\r\n",FILE_APPEND);
            file_put_contents($file, "\t\t".'proxy_redirect  off;'."\r\n",FILE_APPEND);
            file_put_contents($file, "\t\t".'proxy_buffering off;'."\r\n",FILE_APPEND);
            file_put_contents($file, "\t\t".'proxy_pass "http://$upstream_name";'."\r\n",FILE_APPEND);
        file_put_contents($file, "\t".'}'."\r\n",FILE_APPEND);
    file_put_contents($file, '}'."\r\n",FILE_APPEND);
}


//$query = "SELECT id,title FROM $tablename WHERE  cardTypeID=1 and isDel=1";
$query = "SELECT id,title FROM $tablename WHERE  cardTypeID=1 and ((UNIX_TIMESTAMP(now())-checktime) < 3600*72 or checktime='')";
$sqlresult = mysql_query($query,$mysqlconn) or die(mysql_error());

//查询需要在本机上运行的脚本
file_put_contents('tmp.bat','');
while ($sqlrow = mysql_fetch_array($sqlresult)) {
    $id=$sqlrow[0];
    $title=$sqlrow[1];
    $dir="forwarding";
    if (!file_exists($dir)) {
        mkdir($dir, 0777, true);
    }
    $file=$dir."\\".$title.'.bat';
    if (!file_exists($file)) {
        touch($file);
    }
    file_put_contents($file, "echo off\r\n");
    file_put_contents($file, "cls\r\n", FILE_APPEND);
    file_put_contents($file, ":start\r\n", FILE_APPEND);
    file_put_contents($file, "node bank.js ".$id." ".$title."\r\n", FILE_APPEND);
    file_put_contents($file, "goto start\r\n", FILE_APPEND);
    file_put_contents($file, "pause", FILE_APPEND);
		
    file_put_contents('tmp.bat', "start \"转发器$title\" $dir\\$title.bat\r\n", FILE_APPEND);
}
sleep(1);
//exec("start startnginx.vbs");
//sleep(1);
exec("start /b /wait tmp.bat");
?>