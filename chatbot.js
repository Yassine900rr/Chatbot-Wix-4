// ===== CHATBOT PARFUMS : COMPORTEMENT (JavaScript) =====
// Le client ne tape rien : il clique sur des boutons et reçoit la réponse directement.

// 1. On récupère les éléments de la page
const bouton = document.getElementById("chat-bouton");
const fenetre = document.getElementById("chat-fenetre");
const zoneMessages = document.getElementById("chat-messages");
const zoneOptions = document.getElementById("chat-options");

// 2. Le "menu" du chatbot.
//    Chaque étape a : un texte (réponse du bot) et des options (boutons).
//    Chaque option a : un label (texte du bouton) et "vers" (l'étape suivante).
const etapes = {
  accueil: {
    texte: "Bienvenue chez Parfumerie de Luxe ! 🌸 Que souhaitez-vous savoir ?",
    options: [
      { label: "🧴 Nos parfums", vers: "parfums" },
      { label: "💰 Prix", vers: "prix" },
      { label: "🚚 Livraison", vers: "livraison" },
      { label: "↩️ Retours", vers: "retours" },
      { label: "🕘 Horaires", vers: "horaires" },
      { label: "📍 Localisation", vers: "localisation" },
      { label: "📧 Contact", vers: "contact" }
    ]
  },

  parfums: {
    texte: "Pour découvrir tous nos parfums et nos catégories, consultez la page Boutique du site.",
    options: [{ label: "Voir les prix", vers: "prix" }]
  },

  prix: {
    texte: "Nos produits ont des prix variés. Consultez la page Boutique pour voir tous les tarifs.",
    options: [{ label: "Livraison", vers: "livraison" }]
  },

  livraison: {
    texte: "Le délai de livraison est à partir de 2 jours.",
    options: [{ label: "Retours", vers: "retours" }]
  },

  retours: {
    texte: "Les retours sont acceptés sous 9 jours maximum. La consommation du produit doit être inférieure à 5 ml.",
    options: [{ label: "Contact", vers: "contact" }]
  },

  horaires: {
    texte: "Nous sommes ouverts du lundi au vendredi, de 9h00 à 19h00.",
    options: [{ label: "Localisation", vers: "localisation" }]
  },

  localisation: {
    texte: "Notre adresse :\n123 Avenue de la Paix, 75008 Paris, France",
    options: [{ label: "Horaires", vers: "horaires" }]
  },

  contact: {
    texte: "Écrivez-nous par email : hello@parfumeriedeluxe.com",
    options: []
  }
};

// 3. Ouvrir / fermer la fenêtre
bouton.addEventListener("click", function () {
  fenetre.classList.toggle("cache");

  // Premier affichage : on montre le menu d'accueil
  if (!fenetre.classList.contains("cache") && zoneMessages.children.length === 0) {
    afficherEtape("accueil");
  }
});

// 4. Ajouter un message dans la zone de discussion
function ajouterMessage(texte, auteur) {
  const message = document.createElement("div");
  message.className = "message " + auteur; // "message bot" ou "message utilisateur"
  message.textContent = texte;
  zoneMessages.appendChild(message);
  zoneMessages.scrollTop = zoneMessages.scrollHeight;
}

// 5. Afficher la réponse du bot + les boutons de l'étape
function afficherEtape(nom) {
  const etape = etapes[nom];
  ajouterMessage(etape.texte, "bot");

  zoneOptions.innerHTML = ""; // on efface les anciens boutons

  for (const opt of etape.options) {
    creerBouton(opt.label, opt.vers);
  }

  // Sur toutes les étapes sauf l'accueil, on propose de revenir au menu
  if (nom !== "accueil") {
    creerBouton("🏠 Menu principal", "accueil");
  }
}

// 6. Créer un bouton de choix
function creerBouton(label, vers) {
  const b = document.createElement("button");
  b.className = "option";
  b.textContent = label;
  b.addEventListener("click", function () {
    ajouterMessage(label, "utilisateur");   // le choix du client apparaît comme son message
    zoneOptions.innerHTML = "";             // on retire les boutons le temps de répondre
    setTimeout(function () {
      afficherEtape(vers);
    }, 400);
  });
  zoneOptions.appendChild(b);
}