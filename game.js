// game.js - Logique du jeu Memory Drapeaux

// Variables globales du jeu
let niveauDifficulte = 1;
let tempsRestant = 10;
let timerInterval = null;
let positionsFrance = [];
let jeuEnCours = false;
let drapeauxAffiches = false;

// Éléments DOM
const flagsContainer = document.getElementById('flags-container');
const startBtn = document.getElementById('start-btn');
const hideBtn = document.getElementById('hide-btn');
const timerElement = document.getElementById('countdown');
const timerSeconds = document.getElementById('timer-seconds');
const timeDisplay = document.getElementById('time-display');
const instruction = document.getElementById('instruction');
const inputSection = document.getElementById('input-section');
const position1Input = document.getElementById('position1');
const position2Input = document.getElementById('position2');
const submitBtn = document.getElementById('submit-btn');
const errorMsg = document.getElementById('error-msg');
const resultSection = document.getElementById('result-section');
const resultContent = document.getElementById('result-content');
const restartBtn = document.getElementById('restart-btn');

// Définition des drapeaux (identique à ton code C)
const drapeaux = [
    { nom: "France", couleurs: ["blue-band", "white-band", "red-band"] },
    { nom: "Italie", couleurs: ["green-band", "white-band", "red-band"] },
    { nom: "Allemagne", couleurs: ["black-band", "red-band", "yellow-band"] },
    { nom: "Belgique", couleurs: ["black-band", "yellow-band", "red-band"] },
    { nom: "Pays-Bas", couleurs: ["red-band", "white-band", "blue-band"] },
    { nom: "Russie", couleurs: ["white-band", "blue-band", "red-band"] },
    { nom: "Roumanie", couleurs: ["blue-band", "red-band", "white-band"] },
    { nom: "Irlande", couleurs: ["green-band", "white-band", "orange-band"] },
    { nom: "Bulgarie", couleurs: ["white-band", "green-band", "red-band"] },
    { nom: "Hongrie", couleurs: ["red-band", "white-band", "green-band"] },
    { nom: "Lituanie", couleurs: ["yellow-band", "green-band", "red-band"] },
    { nom: "Yougoslavie", couleurs: ["blue-band", "white-band", "orange-band"] },
    { nom: "Armenie", couleurs: ["red-band", "blue-band", "orange-band"] }
];

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Gestion des boutons de difficulté
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons
            document.querySelectorAll('.difficulty-btn').forEach(b => {
                b.classList.remove('active');
            });
            
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            // Mettre à jour le niveau de difficulté
            niveauDifficulte = parseInt(this.dataset.level);
            
            // Mettre à jour le temps selon le niveau
            switch(niveauDifficulte) {
                case 1: tempsRestant = 10; break;
                case 2: tempsRestant = 7; break;
                case 3: tempsRestant = 4; break;
            }
            
            // Mettre à jour l'affichage du temps
            timerElement.textContent = tempsRestant;
            timerSeconds.textContent = tempsRestant;
            timeDisplay.textContent = `${tempsRestant} secondes`;
            
            console.log(`Niveau ${niveauDifficulte} sélectionné (${tempsRestant}s)`);
        });
    });
    
    // Sélectionner le niveau 1 par défaut
    document.querySelector('.difficulty-btn[data-level="1"]').classList.add('active');
    
    // Bouton pour afficher les drapeaux
    startBtn.addEventListener('click', afficherDrapeaux);
    
    // Bouton pour cacher les drapeaux (pour test)
    hideBtn.addEventListener('click', cacherDrapeauxEtDemander);
    
    // Bouton pour soumettre les réponses
    submitBtn.addEventListener('click', verifierReponses);
    
    // Bouton pour recommencer
    restartBtn.addEventListener('click', recommencerJeu);
    
    // Entrée directe dans les champs
    position1Input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') position2Input.focus();
    });
    
    position2Input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') verifierReponses();
    });
});

// Fonction pour afficher les drapeaux (adaptée de ton code C)
function afficherDrapeaux() {
    if (jeuEnCours) return;
    
    jeuEnCours = true;
    drapeauxAffiches = true;
    positionsFrance = [];
    
    // Mettre à jour l'instruction
    instruction.textContent = `Mr_Dath 😇: donne moi les positions du drapeau de la France séparées par un espace. Attention tu as ${tempsRestant} secondes !!!💭 🔎`;
    
    // Changer les boutons
    startBtn.style.display = 'none';
    hideBtn.style.display = 'inline-block';
    
    // Réinitialiser le conteneur
    flagsContainer.innerHTML = '';
    flagsContainer.classList.add('flags-grid');
    
    // Variables du jeu (identique à ton code C)
    const nbDrapeaux = 13;
    const total = 30;
    const occurenceSpeciale1 = 2;  // Drapeau France
    const occurenceSpeciale2 = 3;  // Drapeau Italie
    
    // Tableau pour stocker les indices des drapeaux
    const indices = [];
    let index = 0;
    
    // Ajouter les drapeaux spéciaux (France)
    for (let i = 0; i < occurenceSpeciale1; i++) {
        indices[index] = 0;  // France
        index++;
    }
    
    // Ajouter les drapeaux Italiens
    for (let i = 0; i < occurenceSpeciale2; i++) {
        indices[index] = 1;  // Italie
        index++;
    }
    
    // Remplir avec des drapeaux aléatoires
    while (index < total) {
        indices[index] = 2 + Math.floor(Math.random() * (nbDrapeaux - 2));
        index++;
    }
    
    // Mélanger (algorithme de Fisher-Yates)
    for (let i = 0; i < total - 1; i++) {
        const j = i + Math.floor(Math.random() * (total - i));
        const temp = indices[i];
        indices[i] = indices[j];
        indices[j] = temp;
    }
    
    // Trouver et mémoriser les positions des drapeaux France
    let franceTrouvee = 0;
    for (let i = 0; i < total; i++) {
        if (indices[i] === 0) {  // 0 = France
            if (franceTrouvee === 0) {
                positionsFrance[0] = i + 1;
                franceTrouvee++;
            } else if (franceTrouvee === 1) {
                positionsFrance[1] = i + 1;
            }
        }
    }
    
    console.log(`Positions France: ${positionsFrance[0]} et ${positionsFrance[1]}`);
    
    // Afficher les drapeaux
    for (let i = 0; i < total; i++) {
        const idx = indices[i];
        
        // Créer l'élément drapeau
        const flagItem = document.createElement('div');
        flagItem.className = 'flag-item';
        
        // Numéro
        const flagNumber = document.createElement('div');
        flagNumber.className = 'flag-number';
        flagNumber.textContent = i + 1;
        flagItem.appendChild(flagNumber);
        
        // Bande du drapeau
        const flagBands = document.createElement('div');
        flagBands.className = 'flag-bands';
        
        // Créer les 3 bandes
        for (let b = 0; b < 3; b++) {
            const band = document.createElement('div');
            band.className = `flag-band ${drapeaux[idx].couleurs[b]}`;
            
            flagBands.appendChild(band);
        }
        
        flagItem.appendChild(flagBands);
        flagsContainer.appendChild(flagItem);
    }
    
    // Démarrer le timer
    demarrerTimer();
}

// Fonction pour démarrer le timer
function demarrerTimer() {
    let temps = tempsRestant;
    
    // Mettre à jour l'affichage initial
    timerElement.textContent = temps;
    timerElement.classList.add('pulse');
    
    timerInterval = setInterval(() => {
        temps--;
        timerElement.textContent = temps;
        
        if (temps <= 0) {
            clearInterval(timerInterval);
            timerElement.classList.remove('pulse');
            cacherDrapeauxEtDemander();
        }
        
        // Changement de couleur pour les dernières secondes
        if (temps <= 3) {
            timerElement.style.color = '#ff5252';
        }
    }, 1000);
}

// Fonction pour cacher les drapeaux et demander les positions
function cacherDrapeauxEtDemander() {
    if (!drapeauxAffiches) return;
    
    clearInterval(timerInterval);
    drapeauxAffiches = false;
    
    // Cacher les drapeaux
    document.querySelectorAll('.flag-bands').forEach(bands => {
        bands.style.opacity = '0.1';
    });
    
    // Afficher la section de saisie
    inputSection.style.display = 'block';
    
    // Focus sur le premier champ
    position1Input.focus();
    
    // Réinitialiser les messages d'erreur
    errorMsg.textContent = '';
    position1Input.value = '';
    position2Input.value = '';
}

// Fonction pour vérifier les réponses
function verifierReponses() {
    const pos1 = parseInt(position1Input.value.trim());
    const pos2 = parseInt(position2Input.value.trim());
    
    // Validation
    if (isNaN(pos1) || isNaN(pos2)) {
        errorMsg.textContent = '❌ ERREUR : Vous devez entrer deux nombres valides !';
        return;
    }
    
    if (pos1 < 1 || pos1 > 30 || pos2 < 1 || pos2 > 30) {
        errorMsg.textContent = '❌ ERREUR : Les positions doivent être entre 1 et 30 !';
        return;
    }
    
    if (pos1 === pos2) {
        errorMsg.textContent = '❌ ERREUR : Les positions doivent être différentes !';
        return;
    }
    
    // Si validation réussie
    errorMsg.textContent = '';
    inputSection.style.display = 'none';
    afficherResultat(pos1, pos2);
}

// Fonction pour afficher le résultat (identique à ton code C)
function afficherResultat(pos1, pos2) {
    resultSection.style.display = 'block';
    
    // Révéler les positions françaises
    document.querySelectorAll('.flag-item').forEach((item, index) => {
        const flagNumber = parseInt(item.querySelector('.flag-number').textContent);
        if (flagNumber === positionsFrance[0] || flagNumber === positionsFrance[1]) {
            item.style.border = '3px solid #4CAF50';
            item.style.boxShadow = '0 0 15px rgba(76, 175, 80, 0.7)';
        }
    });
    
    // Comparer les positions
    let resultatHTML = '';
    
    if ((pos1 === positionsFrance[0] && pos2 === positionsFrance[1]) || 
        (pos1 === positionsFrance[1] && pos2 === positionsFrance[0])) {
        // Parfait
        resultatHTML = `
            <h3 style="color: #4CAF50; margin-bottom: 20px;">🎉🎉🎉 FÉLICITATIONS ! 🎉🎉🎉</h3>
            <p style="font-size: 1.2em; margin: 10px 0;">🌟 BRAVO ! Tu as une EXCELLENTE mémoire ! 🌟</p>
            <p style="font-size: 1.2em; margin: 10px 0;">🏆 Score parfait : 10/10 ! Tu es un champion ! 🏆</p>
            <p style="font-size: 1.2em; margin: 10px 0;">👑 Mr_Dath 💻 est très impressionné ! 👑</p>
            <div style="margin-top: 20px; font-size: 1.5em;">
                ✅ Positions trouvées : ${pos1} et ${pos2}<br>
                ✅ Positions réelles : ${positionsFrance[0]} et ${positionsFrance[1]}
            </div>
        `;
    } else if ((pos1 === positionsFrance[0] || pos2 === positionsFrance[1]) || 
               (pos1 === positionsFrance[1] || pos2 === positionsFrance[0])) {
        // Une bonne position
        resultatHTML = `
            <h3 style="color: #FF9800; margin-bottom: 20px;">👍 PAS MAL ! 👍</h3>
            <p style="font-size: 1.2em; margin: 10px 0;">Au moins une bonne position !</p>
            <p style="font-size: 1.2em; margin: 10px 0;">👍 Tu as une mémoire correcte ! 👍</p>
            <p style="font-size: 1.2em; margin: 10px 0;">💡 Tu peux encore t'améliorer ! 💡</p>
            <div style="margin-top: 20px; font-size: 1.2em;">
                📍 Ta réponse : ${pos1} et ${pos2}<br>
                📍 Positions réelles : ${positionsFrance[0]} et ${positionsFrance[1]}
            </div>
        `;
    } else {
        // Aucune bonne position
        resultatHTML = `
            <h3 style="color: #f44336; margin-bottom: 20px;">😢 DÉSOLÉ... 😢</h3>
            <p style="font-size: 1.2em; margin: 10px 0;">Tu n'as pas trouvé les bonnes positions 💔</p>
            <p style="font-size: 1.2em; margin: 10px 0;">😴 Peut-être que tu étais fatigué ?</p>
            <p style="font-size: 1.2em; margin: 10px 0;">🎯 Essaye encore, tu vas y arriver !</p>
            <div style="margin-top: 20px; font-size: 1.2em;">
                📍 Ta réponse : ${pos1} et ${pos2}<br>
                📍 Positions réelles : ${positionsFrance[0]} et ${positionsFrance[1]}
            </div>
        `;
    }
    
    resultContent.innerHTML = resultatHTML;
}

// Fonction pour recommencer le jeu
function recommencerJeu() {
    // Réinitialiser tout
    jeuEnCours = false;
    drapeauxAffiches = false;
    
    // Réinitialiser l'affichage
    flagsContainer.innerHTML = '';
    flagsContainer.classList.remove('flags-grid');
    resultSection.style.display = 'none';
    inputSection.style.display = 'none';
    
    // Réafficher le bouton de démarrage
    startBtn.style.display = 'inline-block';
    hideBtn.style.display = 'none';
    
    // Réinitialiser le timer
    timerElement.textContent = tempsRestant;
    timerElement.style.color = '';
    timerElement.classList.remove('pulse');
    
    // Réinitialiser les champs
    position1Input.value = '';
    position2Input.value = '';
    errorMsg.textContent = '';
    
    // Mettre à jour l'instruction
    instruction.textContent = `Mr_Dath 😇: donne moi les positions du drapeau de la France séparées par un espace. Attention tu as ${tempsRestant} secondes !!!💭 🔎`;
    
    console.log('Jeu réinitialisé');
}

// Fonction pour quitter en cas d'erreur (comme dans ton C)
function quitterAvecErreur(message) {
    alert(`❌ ERREUR : ${message}\nLe programme s'arrête.`);
    // Dans une vraie app web, on redirige ou on affiche un message
    resultContent.innerHTML = `<h3 style="color: #f44336;">${message}</h3>`;
    resultSection.style.display = 'block';
}