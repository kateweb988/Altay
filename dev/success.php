<?php
header("Content-Type: text/html; charset=utf-8");
$name = htmlspecialchars($_POST["name"]);
$tel = htmlspecialchars($_POST["tel"]);
$datetime = htmlspecialchars($_POST["datetime"]);
$local = htmlspecialchars($_POST["local"]);
$guests = htmlspecialchars($_POST["guests"]);


$refferer = getenv('HTTP_REFERER');
$date=date("d.m.y"); // число.месяц.год  
$time=date("H:i"); // часы:минуты:секунды 
$myemail = "info@altayrestart.ru";

$tema = "Новая заявка";
$message_to_myemail = "
<br><br>
Имя: $name<br>
Телефон: $tel<br>
Дата: $datetime<br>
Локация: $local<br>
Гостей: $guests<br>

Источник (ссылка): $refferer
";

mail($myemail, $tema, $message_to_myemail, "From: Altay <admin@kateweb.ru> \r\n  \r\n"."MIME-Version: 1.0\r\n"."Content-type: text/html; charset=utf-8\r\n" );



?>
