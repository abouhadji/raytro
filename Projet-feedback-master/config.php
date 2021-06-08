<?php
//Connexion à la BDD

function connexionBDD()
{
try{
    $pdo = new PDO('mysql:host=localhost;dbname=Feedback', 'root', '');
    return $pdo;
}
    catch(PDOException $e){
        echo $e->getMessage();
     } 
}
