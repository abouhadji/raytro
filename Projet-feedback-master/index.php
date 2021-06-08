<?php
require "config.php";
require "user.php";
require "comment.php";

/*$user = new User("testl@email.com","mdp","testo");
$user->save();*/

function loadUser(string $email, string $mdp)
{
    $pdo = connexionBDD();
    $sel = $pdo->query("SELECT * FROM User WHERE email = '$email' AND password = '$mdp'");
    $user = $sel->fetch(PDO::FETCH_ASSOC);
    if (isset( $user['email']))
    {
        return  new User($user['email'], $user['password'], $user['name'], (bool)$user['liked'], (bool)$user['unliked'], (bool)$user['admin']);
    }
    else{
        echo "Le nom d'utilisateur ou le mot de passe est incorrect.";
    }
}

$utilisateur = loadUser("test@email.com","mdp");

function getAllMessages()
{

}

function getMessagesWeek(int $week)
{

}

function getGoodUser()
{

}

?>