#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <string.h>
#include <unistd.h> // pour pouvoir utiliser la fonction sleep() uniquement 

// les couleurs que j'utilise pour mes drapeaux
#define RED     "\033[41m\033[37m"
#define GREEN   "\033[42m\033[37m"
#define YELLOW  "\033[43m\033[30m"
#define BLUE    "\033[44m\033[37m"
#define WHITE   "\033[47m\033[30m"
#define BLACK   "\033[40m\033[37m"
#define ORANGE  "\033[48;5;208m\033[37m" 


struct donnée {
    int position1;
    int position2;
};

struct DrapeauStruct {
    char *nom;
    char *couleurs[3];  //3 bandes de couleurs
    int largeur;
};

void Mr_Dath();
void rules();
void rules_deux_point_zero();
void afficherDrapeaux();

// pour les resultat on va comparer les positions avec celle donne par le joueur 
int position_france1 = 0;
int position_france2 = 0;
int niveau_de_difficulte;

int main (){
    struct donnée d ;
    printf("\n");
    printf("\n");
    printf("     ╔══════════════════════════════════════════╗\n");
    printf("     ║        JEU DE MEMORY avec des drapeaux   ║\n");
    printf("     ╚══════════════════════════════════════════╝\n");
    printf("\n");
    Mr_Dath();
    printf("\n");
    rules();
    do{
        printf("Entrez un niveau de difficulté 1 2 ou 3 😇: ");
        scanf("%d", &niveau_de_difficulte);
    }while( niveau_de_difficulte != 3 && niveau_de_difficulte != 2 && niveau_de_difficulte != 1);
    printf(" \n");
    afficherDrapeaux();
    if( niveau_de_difficulte == 1){
        sleep(10);
    }else if ( niveau_de_difficulte == 2){
        sleep (7);
    }else {
        sleep(4);
    }
    system("clear");  // pour effacer le terminal
    printf("\n");
    printf("\n");
    printf("     ╔══════════════════════════════════════════╗\n");
    printf("     ║        JEU DE MEMORY avec des drapeaux   ║\n");
    printf("     ╚══════════════════════════════════════════╝\n");
    printf("\n");
    Mr_Dath();
    printf("\n");
    rules();
    printf("\n\n");
    printf("     ╔══════════════════════════════════════════╗\n");
    printf("     ║  TEMPS ÉCOULÉ ! Les drapeaux ont disparu ║\n");
    printf("     ╚══════════════════════════════════════════╝\n\n");
    
    rules_deux_point_zero();
    // On essaye de lire les deux nombres
    if (scanf("%d %d", &d.position1, &d.position2) != 2) {
        printf("\n❌ ERREUR : Saisie invalide ! Vous devez entrer deux nombres.\n");
        printf("Le programme s'arrête.\n");
        return 1;  // Arrête le programme
    }
    
    // Vérifier si les nombres sont dans la bonne plage
    if (d.position1 <= 0 || d.position1 > 30 || d.position2 <= 0 || d.position2 > 30) {
        printf("\n❌ ERREUR : Les positions doivent être entre 1 et 30 !\n");
        printf("Vous avez entré : %d et %d\n", d.position1, d.position2);
        printf("Le programme s'arrête.\n");
        return 1;  // Arrête le programme
    }

    printf("\n\n");
    printf("     ╔══════════════════════════════════════════╗\n");
    printf("     ║            VERDICT FINAL                 ║\n");
    printf("     ╚══════════════════════════════════════════╝\n");

    // comparer les positions du drpeau de la france avec ceux donne par l'utilisateur et donner le verdict 
    if((d.position1 == position_france1 && d.position2 == position_france2) || (d.position1 == position_france2 && d.position2 == position_france1)){
        printf("\n🎉🎉🎉 FÉLICITATIONS ! 🎉🎉🎉\n");
        printf("🌟 BRAVO ! Tu as une EXCELLENTE mémoire ! 🌟\n");
        printf("🏆 Score parfait : 10/10 ! Tu es un champion ! 🏆\n");
        printf("👑 Mr_Dath 💻 est très impressionné ! 👑\n");
    }else{
        if((d.position1 == position_france1 || d.position2 == position_france2) || (d.position1 == position_france2 || d.position2 == position_france1)){
            printf("\nPAS MAL au moins une bonne position\n");
            printf("👍 Tu as une mémoire correcte ! 👍\n");
            printf("💡 Tu peux encore t'améliorer ! 💡\n");
    
        }else{
            printf("\n😢 DÉSOLÉ... 😢\n");
            printf("Tu n'as pas trouvé les bonnes positions 💔\n");
        }
    }
    return 0;
}



void rules() {
    printf("Les règles du jeu :\n");
    printf("1. Tu vois 30 drapeaux numérotés de 1 à 30\n");
    printf("2. Il y a 2 drapeaux France cachés\n");
    printf("3. Tu dois trouver TOUTES leurs positions\n");
    printf("4. Tu as 10 secondes pour mémoriser\n");
    printf("5. Ensuite, entre les positions que tu as retenues\n\n");
}
void rules_deux_point_zero() {
    printf("Mr_Dath 😇: Donne-moi les positions du drapeau de la FRANCE \n");
    printf("     (sépare les positions par un espace, exemple: 5 12) : ");
}



void Mr_Dath(){
    printf ("Bonjour je suis Mr_Dath et je vais evaluez votre memoire avec mon jeu de memory 😊.\n");
}


void afficherDrapeaux() {
    // Définition des drapeaux avec 'struct DrapeauStruct'
    struct DrapeauStruct drapeaux[] = {  
        {"France", {BLUE, WHITE, RED}, 6},
        {"Italie", {GREEN, WHITE, RED}, 6},
        {"Allemagne", {BLACK, RED, YELLOW}, 6},
        {"Belgique", {BLACK, YELLOW, RED}, 6},
        {"Pays-Bas", {RED, WHITE, BLUE}, 6},
        {"Russie", {WHITE, BLUE, RED}, 6},
        {"Roumanie", {BLUE, RED, WHITE}, 6},
        {"Irlande", {GREEN, WHITE, ORANGE}, 6},
        {"Bulgarie", {WHITE, GREEN, RED}, 6},
        {"Hongrie", {RED, WHITE, GREEN}, 6},
        {"Lituanie", {YELLOW, GREEN, RED}, 6},
        {"Yougoslavie", {BLUE, WHITE, ORANGE}, 6},
        {"Armenie", {RED, BLUE, ORANGE}, 6}
    };
    struct donnée d;
    int nb_drapeaux = 13;
    int total = 30;
    int occurence_speciale1 = 2;  // Drapeau France
    int occurence_speciale2 = 3;  // Drapeau Italie mais je ne demande a l'utilisateur que le drapeau de la france 
    int par_ligne = 6;
    // Tableau pour stocker les indices des drapeaux
    int indices[30];
    int index = 0;
    
    srand(time(NULL));  //pour pouvoir reinitialiser l'affichage des drapeau a chaque execution 
    
    // Ajouter les drapeaux spéciaux c'est principalement le drpeau de la france que je vise
    for (int i = 0; i < occurence_speciale1; i++) {
        indices[index] = 0;
        index = index + 1;  // France
    }
    
    for (int i = 0; i < occurence_speciale2; i++) {
        indices[index] = 1;
        index++ ;  // Italie
    }
    
    // Remplir avec des drapeaux aléatoires 
    while (index < total) {
        indices[index] = 2 + rand() % (nb_drapeaux - 2);
        index++ ;
    }
    
    // Mélanger
    for (int i = 0; i < total - 1; i++) {
        int j = i + rand() % (total - i);
        int temp = indices[i];
        indices[i] = indices[j];
        indices[j] = temp;
    }
    // Trouver et memoriser  les positions des drapeaux France
    int france_trouvee = 0;
    for (int i = 0; i < total; i++) {
        if (indices[i] == 0) {  // 0 = France
            if (france_trouvee == 0) {
                position_france1 = i + 1;  // +1 car affiché de 1 à 30
                france_trouvee++;
            } else if (france_trouvee == 1) {
                position_france2 = i + 1;
                break;  // On a trouvé les 2 France
            }
        }
    }
    // Afficher les drapeaux
    printf("Mr_Dath 😇: donne moi les positions du drapeau de la France separer par un espace. Attention tu as 10 secondes !!!💭 🔎\n\n");
    
    for (int i = 0; i < total; i++) {
        int idx = indices[i];
        
        // Afficher le numéro
        printf("%2d: ", i + 1);
        
        // Afficher les 3 bandes du drapeau en les concatenant !
        for (int b = 0; b < 3; b++) {
            printf("%s", drapeaux[idx].couleurs[b]);

            for (int w = 0; w < drapeaux[idx].largeur/3; w++) {
                printf(" ");
            }
            printf("\033[0m");
        }
        
        // Espacement entre les drapeaux 
        printf("  ");

        // Nouvelle ligne tous les 6 drapeaux
        if ((i + 1) % par_ligne == 0) {
            printf("\n\n");
        }
    }   
}