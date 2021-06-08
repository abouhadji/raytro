<?php


/**
 * Classe User (Utilisateur)
 * Permet de créer des utilisateurs
 * @property mixed $name Prénom de la personne
 * @property mixed $email Email de l'utilisateur qui servira de pseudo
 * @property mixed $mdp Mot de passe
 * @property mixed $admin Pour savoir si l'utilisateur est administrateur
 * @property mixed $liked Pour savoir si l'utilisateur a déjà envoyé un commentaire positif
 * @property mixed $unliked Pour savoir si l'utilisateur a déjà envoyé un commentaire négatif
 * @property mixed $pdo Variable de connexion à la bdd
 * @property  $name
 * @author Labigna
 */
class User { 
    private string $email;
    private string $mdp;
    private string $name;
    private bool $admin;
    private bool $liked;
    private bool $unliked;
    private $pdo;

    /**
     * Construction de l'utilisateur, procédure obligatoire pour qu'il existe
     * 
     * @param string $email Récupère l'adresse mail de l'utilisateur au format "adresse@email.com"
     * @param string $mdp Récupère le mot de passe de l'utilisateur
     * @param string $name Récupère l'adresse email de l'utilisateur
     * @param bool $liked Permet de savoir si l'utilisateur a au moins saisi un commentaire positif (liked)
     * et un commentaire négatif (unliked). Lors de la création d'un utilisateur, il est certain qu'il n'a pas envoyé de message
     * donc liked et unliked sont faux par défaut
     * @param bool $unliked Voir $liked
     * @param bool $admin Niveau de l'utilisateur (Normal = O, Admin = 1)
     * @return void
     *  */ 
    function __construct(string $email, string $mdp, string $name, 
    bool $liked = false, bool $unliked = false, bool $admin) {
        $this->email = $email;
        $this->mdp = $mdp;
        $this->name = $name;
        $this->liked = $liked;
        $this->unliked = $unliked;
        $this->admin = $admin;
        $this->pdo = connexionBDD();
    }

    /**
     * Fonction de sauvegarde de l'utilisateur dans la base de donnée
     * @return void
     */
    function save()
    {  
        $ins = $this->pdo->prepare("INSERT INTO User (name, email, password, liked, unliked, admin) VALUES (?,?,?,?,?,?)");
        $ins->execute(array( $this->name,  $this->email,$this->mdp, (int)$this->liked, (int)$this->unliked, (int)$this->admin)); 
    }
}
