<?php

/**
 * Classe Comment (Commentaire)
 * Commentaires positifs ou négatifs par semaine des utilisateurs
 * @property mixed $message Commentaire de la personne
 * @property mixed $week Semaine à laquelle le commentaire a été passé, directement initialisé dans le constructeur à la date d'ahujourd'hui
 * @property mixed $name Type du commentaire à savoir si c'est un "j'ai aimé" ou "j'ai pas aimé"
 * @property mixed $pdo Variable de connexion à la bdd
 * @author Labigna
 * 
 */
class Comment { 
    private string $message;
    private int $week;
    private bool $type;
    private $pdo;

    /**
     * Construction du commentaire avec attribution des paramètres, 
     * on n'a pas besoin de week qui sera automatiquement initialisé à la création
     * @param string $message Récupère le message propre pour l'insérer dans l'instance
     * @param bool $type Permet de savoir si c'est un commentaire FALSE "J'ai pas aimé", TRUE "J'ai aimé"
     * @return void
     *  */ 
    function __construct(string $message, bool $type) {
        $this->message = $message;
        $this->type = $type;
        $this->week = date("W"); 
        $this->pdo = connexionBDD();
    }

    /**
     * Fonction pour obtenir le message du commnentaire
     * @return string  Retourne le contenu du commentaire
     */
    function getMessage()
    {
        return $this->message;
    }

    /**
     * Fonction pour obtenir la semaine du commentaire
     * @return int Retourne le numéro de la semaine
     */
    function getWeek()
    {
        return $this->week;
    }


 /**
     * Fonction de sauvegarde du commentaire dans la base de donnée
     * @return void
     */
    function save()
    {
        $ins = $this->pdo->prepare("INSERT INTO Comments (message, type, week) VALUES (?,?,?)");
        $ins->execute(array( $this->message, (int)$this->type, $this->week)); 
    }
}
?>

