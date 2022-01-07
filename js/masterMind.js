// Mastermind Florian Zeinetz HE202138 - 07/01/2022
"use strict";

/**
 * Initialisation des différentes variables et données de la page.
 */
let tentative = 1; // nombre de tentatives de l'utilisateur
let combinaisonOrdi = []; // tableau contenant la combinaison de couleurs choisie aléatoirement
let chaineTableau = "<tr><th>Tentative</th><th>Couleur 1</th> <th>Couleur 2</th> <th>Couleur 3</th> <th>Couleur 4</th><th>Résultat</th></tr>";
for (let compteur=0 ; compteur<4; compteur++) // Définition de la combinaison de l'ordinateur dans un tableau
{
    combinaisonOrdi.push(Math.floor(Math.random() * 6)) // Attribution de 4 chiffres aléatoires entre 0 et 5 pour les 4 premiers emplacements de l'array

    switch (true) // Convertion des chiffres en string pour chacune des couleur proposée
    {
        case (combinaisonOrdi[compteur] == 0) : combinaisonOrdi[compteur] = "orange";
            break;
        case (combinaisonOrdi[compteur] == 1) : combinaisonOrdi[compteur] = "bleu";
            break;
        case (combinaisonOrdi[compteur] == 2) : combinaisonOrdi[compteur] = "rouge";
            break;
        case (combinaisonOrdi[compteur] == 3) : combinaisonOrdi[compteur] = "vert";
            break;
        case (combinaisonOrdi[compteur] == 4) : combinaisonOrdi[compteur] = "jaune";
            break;
        case (combinaisonOrdi[compteur] == 5) : combinaisonOrdi[compteur] = "mauve";
            break;
        default: console.log("RIP!");
    }
}

/**
 * Fonction qui verrouille les boutons
 */
function lockAffichage() {
    document.getElementById("resetChoix").setAttribute("disabled", "true");
    document.getElementById("envoiChoix").setAttribute("disabled", "true");
    document.getElementById("couleur1").setAttribute("disabled", "true");
    document.getElementById("couleur2").setAttribute("disabled", "true");
    document.getElementById("couleur3").setAttribute("disabled", "true");
    document.getElementById("couleur4").setAttribute("disabled", "true");
    document.getElementById("divAffichage").innerHTML += "<button id='rejouer' type='button' onclick='location.reload()'>Cliquez ici pour recommencer une partie</button>";
}

/**
 * Fonction qui respecte le principe du jeu de société "Mastermind" :
 * Le but du jeu du Mastermind est pour le joueur de deviner en un minimum de tentatives une combinaison de 4 couleurs choisie aléatoirement (ici, par l'ordinateur)
 *
 * @param {}
 *
 * @return {}
 *
 */

function jouerAuMastermind()
{
    // déclaration des variables
    let reponseUser = []; // Couleurs choisies par l'utilisateur dans #formChoix
    let essais = true;
    reponseUser.push(document.getElementById("couleur1").value);
    reponseUser.push(document.getElementById("couleur2").value);
    reponseUser.push(document.getElementById("couleur3").value);
    reponseUser.push(document.getElementById("couleur4").value);
    for (let e of reponseUser) {
        if (e === "bloque") {
            alert("Veuillez sélectionner des couleurs sans laisser de vides!");
            return false;
        }
    }

    let logoCouleur1 = document.getElementById("couleur1");
    logoCouleur1 = logoCouleur1.options[logoCouleur1.selectedIndex].innerText;
    let logoCouleur2 = document.getElementById("couleur2");
    logoCouleur2 = logoCouleur2.options[logoCouleur2.selectedIndex].innerText;
    let logoCouleur3 = document.getElementById("couleur3");
    logoCouleur3 = logoCouleur3.options[logoCouleur3.selectedIndex].innerText;
    let logoCouleur4 = document.getElementById("couleur4");
    logoCouleur4 = logoCouleur4.options[logoCouleur4.selectedIndex].innerText;

    let commentaireReponse = [];

    for (let emplacement=0; emplacement < 4; emplacement++) {
        if (reponseUser[emplacement] === combinaisonOrdi[emplacement]) // Comparaison avec la couleur choisie par l'ordinateur à cet emplacement et affichage si la couleur correspond
        {
                commentaireReponse.push("La couleur " + (emplacement + 1) + " est bonne.<br>");
        }
    }
    if ((reponseUser[0] === combinaisonOrdi[0]) && (reponseUser[1] === combinaisonOrdi[1]) && (reponseUser[2] === combinaisonOrdi[2]) && (reponseUser[3] === combinaisonOrdi[3])) // Comparaison du tableau de l'utilisateur avec le tableau de l'ordinateur et arrêt de la boucle si gagné
    {
        essais = false;
        commentaireReponse.push("Bravo, vous avez gagné!");
        document.getElementById("maitresprit").style.backgroundColor = "limegreen";
        lockAffichage();
    }
    if (tentative === 10) // Sortie de la boucle si les 10 tentatives sont écoulées et affichage de la réponse//
    {
        essais = false;
        commentaireReponse.push("Vous avez atteint 10 tentatives. Vous avez perdu. La réponse était:<br>" + combinaisonOrdi[0] + ", " + combinaisonOrdi[1] + ", " + combinaisonOrdi[2] + ", " + combinaisonOrdi[3] + ".");
        document.getElementById("maitresprit").style.backgroundColor = "red";
        lockAffichage();
    }
    if (essais) {commentaireReponse.push("Retentez votre chance!");}
    chaineTableau += "<tr><td class='tentatives'>" + tentative + "</td><td>" + logoCouleur1 + "</td><td>" + logoCouleur2 + "</td><td>" + logoCouleur3 + "</td><td>" + logoCouleur4 + "</td><td class='commentaires'>" + commentaireReponse.join(" ") + "</td></tr>";
    document.getElementById("tableAffichage").innerHTML = chaineTableau;
    tentative++;
    return false;
}