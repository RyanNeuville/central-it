# Algorithmique & Structures de Données Avancées en C
### Cours complet — 1ʳᵉ & 2ᵉ année Génie Logiciel

---

## TABLE DES MATIÈRES

1. [Rappels C essentiels](#1-rappels-c-essentiels)
2. [Analyse de complexité](#2-analyse-de-complexité)
3. [Listes chaînées](#3-listes-chaînées)
4. [Piles & Files](#4-piles--files)
5. [Arbres binaires & BST](#5-arbres-binaires--bst)
6. [Arbres équilibrés (AVL)](#6-arbres-équilibrés-avl)
7. [Tas binaires (Heaps) & File de priorité](#7-tas-binaires-heaps--file-de-priorité)
8. [Tables de hachage](#8-tables-de-hachage)
9. [Graphes](#9-graphes)
10. [Algorithmes de tri avancés](#10-algorithmes-de-tri-avancés)
11. [Algorithmes gloutons](#11-algorithmes-gloutons)
12. [Programmation dynamique](#12-programmation-dynamique)
13. [Algorithmes de strings](#13-algorithmes-de-strings)
14. [Récursivité & Backtracking](#14-récursivité--backtracking)
15. [Exercices pratiques](#15-exercices-pratiques)

---

## 1. RAPPELS C ESSENTIELS

### 1.1 Pointeurs — la base de tout

```c
int x = 42;
int* p = &x;       // p pointe vers x
*p = 24;           // x vaut maintenant 24

int tab[5] = {1,2,3,4,5};
int* q = tab;      // q pointe vers tab[0]
*(q+2) = 99;       // tab[2] = 99
```

**Règle d'or :** `tab[i]` ≡ `*(tab + i)`

### 1.2 Allocation dynamique

```c
#include <stdlib.h>

// Tableau 1D
int* t = malloc(10 * sizeof(int));
if (!t) { perror("malloc"); exit(1); }
t[0] = 5;
free(t);

// Tableau 2D
int** m = malloc(3 * sizeof(int*));
for (int i = 0; i < 3; i++)
    m[i] = malloc(4 * sizeof(int));

// Libération
for (int i = 0; i < 3; i++) free(m[i]);
free(m);
```

### 1.3 Structures et typedef

```c
typedef struct Node {
    int data;
    struct Node* next;
} Node;

Node* n = malloc(sizeof(Node));
n->data = 10;
n->next = NULL;
```

### 1.4 Pointeurs de fonction

```c
int comparer(const void* a, const void* b) {
    return *(int*)a - *(int*)b;
}

qsort(tab, n, sizeof(int), comparer);
```

---

## 2. ANALYSE DE COMPLEXITÉ

### 2.1 Notations asymptotiques

| Notation | Sens | Exemple |
|----------|------|---------|
| **O(f(n))** | Borne supérieure (pire cas) | `O(n²)` |
| **Ω(f(n))** | Borne inférieure (meilleur cas) | `Ω(n)` |
| **Θ(f(n))** | Borne exacte | `Θ(n log n)` |

### 2.2 Règles pratiques

```
Boucle simple (1..n)                   → O(n)
Boucles imbriquées (i..n, j..n)       → O(n²)
Boucle qui divise par 2 (n, n/2, …)  → O(log n)
Boucle + division                     → O(n log n)
Récursive avec 2 appels par niveau    → O(2^n)
Récursive avec division par 2         → O(log n)
```

**Master Theorem :** `T(n) = a·T(n/b) + f(n)`
- a = nombre de sous-problèmes
- b = facteur de division
- f(n) = coût de division et combinaison

| Cas | Condition | Solution |
|-----|-----------|----------|
| 1 | `f(n) = O(n^{log_b a - ε})` | `T(n) = Θ(n^{log_b a})` |
| 2 | `f(n) = Θ(n^{log_b a} log^k n)` | `T(n) = Θ(n^{log_b a} log^{k+1} n)` |
| 3 | `f(n) = Ω(n^{log_b a + ε})` | `T(n) = Θ(f(n))` |

**Exemple :** Merge Sort `T(n) = 2T(n/2) + O(n)` → cas 2 → `Θ(n log n)`

### 2.3 Complexités courantes

```
O(1)      → Accès tableau, insertion/début liste chaînée
O(log n)  → Recherche dichotomique, arbre équilibré
O(n)      → Parcours linéaire
O(n log n)→ Tri fusion, tri rapide (moyen)
O(n²)     → Tri bulle, parcours matrice N×N
O(2^n)    → Fibonacci récursif, sac à dos brut
O(n!)     → Voyageur de commerce (brut)
```

---

## 3. LISTES CHAÎNÉES

### 3.1 Liste simplement chaînée

```c
typedef struct Node {
    int data;
    struct Node* next;
} Node;

Node* tete = NULL;

// Insertion en tête (O(1))
void inserer_debut(int val) {
    Node* n = malloc(sizeof(Node));
    n->data = val;
    n->next = tete;
    tete = n;
}

// Insertion en queue (O(n))
void inserer_fin(int val) {
    Node* n = malloc(sizeof(Node));
    n->data = val;
    n->next = NULL;

    if (!tete) { tete = n; return; }
    Node* cur = tete;
    while (cur->next) cur = cur->next;
    cur->next = n;
}

// Suppression par valeur
void supprimer(int val) {
    Node* cur = tete, *prev = NULL;
    while (cur && cur->data != val) {
        prev = cur;
        cur = cur->next;
    }
    if (!cur) return;          // pas trouvé
    if (!prev) tete = cur->next;  // premier élément
    else prev->next = cur->next;
    free(cur);
}

// Recherche
Node* rechercher(int val) {
    Node* cur = tete;
    while (cur) {
        if (cur->data == val) return cur;
        cur = cur->next;
    }
    return NULL;
}

// Inversion
Node* inverser(Node* t) {
    Node* prev = NULL, *cur = t, *next;
    while (cur) {
        next = cur->next;
        cur->next = prev;
        prev = cur;
        cur = next;
    }
    return prev;  // nouvelle tête
}

// Parcours
void afficher() {
    for (Node* cur = tete; cur; cur = cur->next)
        printf("%d -> ", cur->data);
    printf("NULL\n");
}
```

### 3.2 Liste doublement chaînée

```c
typedef struct DNode {
    int data;
    struct DNode* prev;
    struct DNode* next;
} DNode;

DNode* tete = NULL;

void inserer_debut(int val) {
    DNode* n = malloc(sizeof(DNode));
    n->data = val;
    n->prev = NULL;
    n->next = tete;
    if (tete) tete->prev = n;
    tete = n;
}

void supprimer(DNode* cible) {
    if (cible->prev) cible->prev->next = cible->next;
    else tete = cible->next;
    if (cible->next) cible->next->prev = cible->prev;
    free(cible);
}
```

**Avantage :** supprimer un nœud quand on a son pointeur = O(1) (vs O(n) pour simple).

### 3.3 Liste circulaire

```c
// Dernier élément pointe vers le premier
typedef struct CNode { int data; struct CNode* next; } CNode;

void parcourir_circulaire(CNode* tete) {
    if (!tete) return;
    CNode* cur = tete;
    do {
        printf("%d ", cur->data);
        cur = cur->next;
    } while (cur != tete);
}
```

**Utile pour :** Round Robin, buffer circulaire, jeu de cartes.

---

## 4. PILES & FILES

### 4.1 Pile (Stack) — LIFO

```c
#define MAX 100

typedef struct {
    int data[MAX];
    int sommet;  // index du dernier élément
} Pile;

void init(Pile* p) { p->sommet = -1; }
int est_vide(Pile* p) { return p->sommet == -1; }
int est_pleine(Pile* p) { return p->sommet == MAX-1; }

void empiler(Pile* p, int val) {
    if (est_pleine(p)) { printf("Pile pleine\n"); return; }
    p->data[++(p->sommet)] = val;
}

int depiler(Pile* p) {
    if (est_vide(p)) { printf("Pile vide\n"); exit(1); }
    return p->data[(p->sommet)--];
}

int sommet(Pile* p) {
    return p->data[p->sommet];
}
```

**Avec liste chaînée (taille dynamique) :**
```c
typedef struct StackNode { int data; struct StackNode* next; } StackNode;
StackNode* pile = NULL;

void push(int v) {
    StackNode* n = malloc(sizeof(StackNode));
    n->data = v; n->next = pile; pile = n;
}

int pop() {
    if (!pile) exit(1);
    int v = pile->data;
    StackNode* tmp = pile;
    pile = pile->next;
    free(tmp);
    return v;
}
```

**Applications :**
- Évaluation d'expressions (NPI/postfix)
- Parenthésage
- Parcours DFS (profondeur)
- Undo/Redo

### 4.2 File (Queue) — FIFO

```c
typedef struct {
    int data[MAX];
    int debut, fin;
    int taille;
} File;

void init(File* f) { f->debut = f->fin = f->taille = 0; }

void enfiler(File* f, int val) {
    if (f->taille == MAX) return;
    f->data[f->fin] = val;
    f->fin = (f->fin + 1) % MAX;
    f->taille++;
}

int defiler(File* f) {
    if (f->taille == 0) exit(1);
    int v = f->data[f->debut];
    f->debut = (f->debut + 1) % MAX;
    f->taille--;
    return v;
}
```

**Applications :** BFS, buffer d'impression, file de messages.

### 4.3 File de priorité (avec Tas — voir section 7)

### 4.4 File avec deux piles

```c
typedef struct {
    Pile entree, sortie;
} FileDeuxPiles;

void enfiler(FileDeuxPiles* f, int v) { empiler(&f->entree, v); }

int defiler(FileDeuxPiles* f) {
    if (est_vide(&f->sortie))
        while (!est_vide(&f->entree))
            empiler(&f->sortie, depiler(&f->entree));
    return depiler(&f->sortie);
}
```
Chaque élément est déplacé au plus 2 fois → **O(1) amorti**.

---

## 5. ARBRES BINAIRES & BST

### 5.1 Définitions

```
Arbre binaire : chaque nœud a 0, 1 ou 2 enfants (gauche, droite).
BST (Binary Search Tree) :
  - gauche < racine < droite
  - Tous les sous-arbres sont aussi des BST
```

### 5.2 Structure et opérations de base

```c
typedef struct BSTNode {
    int data;
    struct BSTNode *gauche, *droite;
} BSTNode;

// Insertion (O(h), h=hauteur)
BSTNode* inserer(BSTNode* racine, int val) {
    if (!racine) {
        BSTNode* n = malloc(sizeof(BSTNode));
        n->data = val; n->gauche = n->droite = NULL;
        return n;
    }
    if (val < racine->data)
        racine->gauche = inserer(racine->gauche, val);
    else if (val > racine->data)
        racine->droite = inserer(racine->droite, val);
    return racine;
}

// Recherche (O(h))
BSTNode* chercher(BSTNode* racine, int val) {
    if (!racine || racine->data == val) return racine;
    if (val < racine->data)
        return chercher(racine->gauche, val);
    return chercher(racine->droite, val);
}

// Trouver le minimum
BSTNode* min(BSTNode* racine) {
    while (racine && racine->gauche) racine = racine->gauche;
    return racine;
}

// Suppression (3 cas)
BSTNode* supprimer(BSTNode* racine, int val) {
    if (!racine) return NULL;

    if (val < racine->data)
        racine->gauche = supprimer(racine->gauche, val);
    else if (val > racine->data)
        racine->droite = supprimer(racine->droite, val);
    else {
        // Cas 1 : feuille
        if (!racine->gauche && !racine->droite) {
            free(racine); return NULL;
        }
        // Cas 2 : un enfant
        if (!racine->gauche) {
            BSTNode* tmp = racine->droite;
            free(racine); return tmp;
        }
        if (!racine->droite) {
            BSTNode* tmp = racine->gauche;
            free(racine); return tmp;
        }
        // Cas 3 : deux enfants → successeur
        BSTNode* succ = min(racine->droite);
        racine->data = succ->data;
        racine->droite = supprimer(racine->droite, succ->data);
    }
    return racine;
}
```

### 5.3 Parcours d'arbre

```c
// Préfixe (racine, gauche, droite)
void prefixe(BSTNode* r) {
    if (!r) return;
    printf("%d ", r->data);
    prefixe(r->gauche);
    prefixe(r->droite);
}

// Infixe (gauche, racine, droite) → donne l'ordre croissant
void infixe(BSTNode* r) {
    if (!r) return;
    infixe(r->gauche);
    printf("%d ", r->data);
    infixe(r->droite);
}

// Suffixe (gauche, droite, racine)
void suffixe(BSTNode* r) {
    if (!r) return;
    suffixe(r->gauche);
    suffixe(r->droite);
    printf("%d ", r->data);
}

// Parcours en largeur (BFS) — avec une file
void largeur(BSTNode* racine) {
    if (!racine) return;
    File f; init(&f); enfiler(&f, (int)racine);

    while (f.taille > 0) {
        BSTNode* cur = (BSTNode*)defiler(&f);
        printf("%d ", cur->data);
        if (cur->gauche) enfiler(&f, (int)cur->gauche);
        if (cur->droite) enfiler(&f, (int)cur->droite);
    }
}
```

### 5.4 Hauteur et équilibre

```c
int hauteur(BSTNode* r) {
    if (!r) return 0;
    int g = hauteur(r->gauche);
    int d = hauteur(r->droite);
    return 1 + (g > d ? g : d);
}

// Vérifier si équilibré (|h(g)-h(d)| ≤ 1)
int est_equilibre(BSTNode* r) {
    if (!r) return 1;
    int g = hauteur(r->gauche);
    int d = hauteur(r->droite);
    return abs(g-d) <= 1
        && est_equilibre(r->gauche)
        && est_equilibre(r->droite);
}
```

**Problème du BST non équilibré :** si on insère 1,2,3,4,5 → ça devient une **liste chaînée** (O(n)).

---

## 6. ARBRES ÉQUILIBRÉS (AVL)

### 6.1 Principe

**AVL = BST où |hauteur(gauche) - hauteur(droite)| ≤ 1 pour TOUS les nœuds.**

Facteur d'équilibre : `FE = h(g) - h(d) ∈ {-1, 0, 1}`

### 6.2 Rotations

#### Rotation droite (Right Rotate)

```
        y                        x
       / \     droite(y)        / \
      x   T3   ─────────>      T1  y
     / \                          / \
    T1 T2                        T2 T3
```

```c
AVLNode* rot_droite(AVLNode* y) {
    AVLNode* x = y->gauche;
    AVLNode* T2 = x->droite;

    x->droite = y;
    y->gauche = T2;

    y->h = 1 + max(hauteur(y->gauche), hauteur(y->droite));
    x->h = 1 + max(hauteur(x->gauche), hauteur(x->droite));

    return x;
}
```

#### Rotation gauche (Left Rotate) — symétrique

```c
AVLNode* rot_gauche(AVLNode* x) {
    AVLNode* y = x->droite;
    AVLNode* T2 = y->gauche;

    y->gauche = x;
    x->droite = T2;

    x->h = 1 + max(hauteur(x->gauche), hauteur(x->droite));
    y->h = 1 + max(hauteur(y->gauche), hauteur(y->droite));

    return y;
}
```

#### Double rotation Gauche-Droite (LR)
```
      z                      z                       x
     / \                    / \                    /   \
    y   T4   gauche(y)     x   T4   droite(z)     y     z
   / \      ─────────>    / \      ─────────>    / \   / \
  T1  x                   y  T3                  T1 T2 T3 T4
     / \                 / \
    T2 T3               T1 T2
```

#### Double rotation Droite-Gauche (RL) — symétrique

### 6.3 Insertion AVL complète

```c
typedef struct AVLNode {
    int data;
    struct AVLNode *gauche, *droite;
    int h;  // hauteur
} AVLNode;

int hauteur_avl(AVLNode* n) { return n ? n->h : 0; }
int max(int a, int b) { return a > b ? a : b; }

int facteur_eq(AVLNode* n) {
    return n ? hauteur_avl(n->gauche) - hauteur_avl(n->droite) : 0;
}

AVLNode* inserer_avl(AVLNode* racine, int val) {
    // 1. Insertion BST normale
    if (!racine) {
        AVLNode* n = malloc(sizeof(AVLNode));
        n->data = val; n->gauche = n->droite = NULL; n->h = 1;
        return n;
    }
    if (val < racine->data)
        racine->gauche = inserer_avl(racine->gauche, val);
    else if (val > racine->data)
        racine->droite = inserer_avl(racine->droite, val);
    else return racine;

    // 2. Mise à jour hauteur
    racine->h = 1 + max(hauteur_avl(racine->gauche),
                        hauteur_avl(racine->droite));

    // 3. Vérifier équilibre
    int fe = facteur_eq(racine);

    // 4 Cas d'équilibrage
    // Cas Gauche-Gauche (GG)
    if (fe > 1 && val < racine->gauche->data)
        return rot_droite(racine);
    // Cas Droite-Droite (DD)
    if (fe < -1 && val > racine->droite->data)
        return rot_gauche(racine);
    // Cas Gauche-Droite (GD)
    if (fe > 1 && val > racine->gauche->data) {
        racine->gauche = rot_gauche(racine->gauche);
        return rot_droite(racine);
    }
    // Cas Droite-Gauche (DG)
    if (fe < -1 && val < racine->droite->data) {
        racine->droite = rot_droite(racine->droite);
        return rot_gauche(racine);
    }

    return racine;
}
```

### 6.4 Complexité AVL

| Opération | Complexité |
|-----------|-----------|
| Insertion | O(log n) |
| Suppression | O(log n) |
| Recherche | O(log n) |

**Hauteur maximale d'un AVL :** `h < 1.44 log₂(n+2) - 0.33`

---

## 7. TAS BINAIRES (HEAPS) & FILE DE PRIORITÉ

### 7.1 Définition

**Tas binaire :** arbre binaire (presque) complet avec la propriété de tas :
- **Max-heap :** `parent ≥ enfants` (le max est à la racine)
- **Min-heap :** `parent ≤ enfants` (le min est à la racine)

Représentation avec un tableau :
```
Indice i → enfant gauche = 2i+1, enfant droit = 2i+2, parent = (i-1)/2

        10
       /  \
      5    3          → tableau : [10, 5, 3, 4, 1, 0]
     / \  /
    4  1 0
```

### 7.2 Opérations

```c
typedef struct {
    int* data;
    int taille;       // nombre actuel
    int capacite;     // capacité maximale
} Tas;

// Enfoncement (heapify down)
void enfoncer(Tas* t, int i) {
    int max = i;
    int g = 2*i + 1, d = 2*i + 2;

    if (g < t->taille && t->data[g] > t->data[max]) max = g;
    if (d < t->taille && t->data[d] > t->data[max]) max = d;

    if (max != i) {
        int tmp = t->data[i];
        t->data[i] = t->data[max];
        t->data[max] = tmp;
        enfoncer(t, max);
    }
}

// Élévation (heapify up)
void elever(Tas* t, int i) {
    while (i > 0) {
        int p = (i - 1) / 2;
        if (t->data[i] <= t->data[p]) break;
        int tmp = t->data[i];
        t->data[i] = t->data[p];
        t->data[p] = tmp;
        i = p;
    }
}

// Insérer
void inserer_tas(Tas* t, int val) {
    if (t->taille == t->capacite) return;
    t->data[t->taille] = val;
    elever(t, t->taille);
    t->taille++;
}

// Extraire le max
int extraire_max(Tas* t) {
    if (t->taille == 0) exit(1);
    int max = t->data[0];
    t->data[0] = t->data[--(t->taille)];
    enfoncer(t, 0);
    return max;
}

// Construire un tas à partir d'un tableau O(n)
void construire_tas(Tas* t) {
    for (int i = t->taille/2 - 1; i >= 0; i--)
        enfoncer(t, i);
}
```

### 7.3 Heap Sort

```c
void tri_tas(int arr[], int n) {
    // 1. Construire le max-heap
    for (int i = n/2 - 1; i >= 0; i--)
        enfoncer_tableau(arr, n, i);

    // 2. Extraire un par un
    for (int i = n-1; i > 0; i--) {
        int tmp = arr[0]; arr[0] = arr[i]; arr[i] = tmp;
        enfoncer_tableau(arr, i, 0);
    }
}
```

**Complexité :** O(n log n) en tous cas. Stable ? Non (mais peut être adapté).

---

## 8. TABLES DE HACHAGE

### 8.1 Principe

Fonction de hachage `h(k)` → index dans un tableau. Idéal : O(1) en moyenne.

```c
typedef struct {
    int cle;
    int valeur;
    int occupe;  // 0 = libre, 1 = occupe
} Entree;

typedef struct {
    Entree* table;
    int taille;
    int nb_elements;
} HashTable;
```

### 8.2 Fonctions de hachage (pour ints)

```c
// Division
int h(int cle, int M) {
    return abs(cle) % M;  // M = taille de la table (nombre premier)
}

// Multiplication (Knuth)
int h_mult(int cle, int M) {
    double A = 0.6180339887;  // (sqrt(5)-1)/2
    return (int)(M * fmod(cle * A, 1.0));
}
```

**Pour les strings :**
```c
unsigned long hash_string(const char* s) {
    unsigned long h = 5381;
    int c;
    while ((c = *s++))
        h = ((h << 5) + h) + c;  // h * 33 + c (djb2)
    return h % TAILLE;
}
```

### 8.3 Collisions : Chaînage séparé

```c
typedef struct HashNode {
    int cle;
    int valeur;
    struct HashNode* suivant;
} HashNode;

typedef struct {
    HashNode** table;
    int taille;
} HashChaine;

HashNode* creer_noeud(int k, int v) {
    HashNode* n = malloc(sizeof(HashNode));
    n->cle = k; n->valeur = v; n->suivant = NULL;
    return n;
}

void inserer_ch(HashChaine* ht, int cle, int valeur) {
    int idx = abs(cle) % ht->taille;
    HashNode* cur = ht->table[idx];
    while (cur) {
        if (cur->cle == cle) { cur->valeur = valeur; return; }
        cur = cur->suivant;
    }
    HashNode* n = creer_noeud(cle, valeur);
    n->suivant = ht->table[idx];
    ht->table[idx] = n;
}

int chercher_ch(HashChaine* ht, int cle) {
    int idx = abs(cle) % ht->taille;
    HashNode* cur = ht->table[idx];
    while (cur) {
        if (cur->cle == cle) return cur->valeur;
        cur = cur->suivant;
    }
    return -1;  // pas trouvé
}
```

### 8.4 Collisions : Sondage linéaire (adressage ouvert)

```c
void inserer_lin(HashTable* ht, int cle, int valeur) {
    int idx = abs(cle) % ht->taille;
    while (ht->table[idx].occupe) {
        if (ht->table[idx].cle == cle)
            { ht->table[idx].valeur = valeur; return; }
        idx = (idx + 1) % ht->taille;
    }
    ht->table[idx].cle = cle;
    ht->table[idx].valeur = valeur;
    ht->table[idx].occupe = 1;
}
```

**Sondage quadratique :** `idx + 1², idx + 2², idx + 3², …` — évite le regroupement primaire.

**Double hachage :** `h(k) + i·h₂(k)` — deux fonctions de hachage.

### 8.5 Facteur de charge & Réhachage

```
α = nb_elements / taille
Si α > 0.75 → doubler la table et réinsérer tout
```

**Complexité :** O(1) moyen, O(n) pire cas.

---

## 9. GRAPHES

### 9.1 Représentations

#### Matrice d'adjacence

```c
#define N 100
int graphe[N][N] = {0};

// Ajouter une arête (orienté)
void ajouter_arete(int u, int v, int poids) {
    graphe[u][v] = poids;  // non-orienté: aussi graphe[v][u] = poids
}
```

**Avantage :** O(1) pour tester une arête. **Inconvénient :** O(V²) mémoire.

#### Liste d'adjacence

```c
typedef struct GNode {
    int sommet;
    int poids;
    struct GNode* suivant;
} GNode;

typedef struct {
    GNode** tete;  // tableau de têtes de listes
    int n;
} Graphe;

Graphe* creer_graphe(int n) {
    Graphe* g = malloc(sizeof(Graphe));
    g->n = n;
    g->tete = calloc(n, sizeof(GNode*));
    return g;
}

void ajouter_arete(Graphe* g, int u, int v, int p) {
    GNode* n = malloc(sizeof(GNode));
    n->sommet = v; n->poids = p;
    n->suivant = g->tete[u];
    g->tete[u] = n;
    // Si non-orienté : ajouter(g, v, u, p);
}

void afficher_graphe(Graphe* g) {
    for (int i = 0; i < g->n; i++) {
        printf("%d: ", i);
        for (GNode* cur = g->tete[i]; cur; cur = cur->suivant)
            printf("%d(p=%d) ", cur->sommet, cur->poids);
        printf("\n");
    }
}
```

**Avantage :** O(V + E) mémoire. **Inconvénient :** tester une arête = O(deg(u)).

### 9.2 Parcours en profondeur (DFS)

```c
void dfs_visiter(Graphe* g, int u, int visite[]) {
    visite[u] = 1;
    printf("%d ", u);
    for (GNode* cur = g->tete[u]; cur; cur = cur->suivant)
        if (!visite[cur->sommet])
            dfs_visiter(g, cur->sommet, visite);
}

void dfs(Graphe* g, int depart) {
    int* visite = calloc(g->n, sizeof(int));
    dfs_visiter(g, depart, visite);
    free(visite);
}
```

**Applications :**
- Détection de cycles
- Tri topologique (utiliser une pile — fin de visite = empiler)
- Composantes connexes
- Ponts et points d'articulation

### 9.3 Parcours en largeur (BFS)

```c
void bfs(Graphe* g, int depart) {
    int* visite = calloc(g->n, sizeof(int));
    int file[N], debut = 0, fin = 0;

    visite[depart] = 1;
    file[fin++] = depart;

    while (debut < fin) {
        int u = file[debut++];
        printf("%d ", u);
        for (GNode* cur = g->tete[u]; cur; cur = cur->suivant) {
            if (!visite[cur->sommet]) {
                visite[cur->sommet] = 1;
                file[fin++] = cur->sommet;
            }
        }
    }
    free(visite);
}
```

**Applications :**
- Plus court chemin (graphe non pondéré)
- Composantes connexes
- Détection de cycles

### 9.4 Plus court chemin — Dijkstra

**Principe :** file de priorité (tas). O((V+E) log V)

```c
#define INF 999999

void dijkstra(Graphe* g, int depart) {
    int dist[g->n];
    for (int i = 0; i < g->n; i++) dist[i] = INF;
    dist[depart] = 0;

    // File de priorité manuelle (tableau)
    int vu[g->n]; memset(vu, 0, sizeof(vu));

    for (int count = 0; count < g->n - 1; count++) {
        // Trouver le min des non traités
        int u = -1, min_d = INF;
        for (int i = 0; i < g->n; i++)
            if (!vu[i] && dist[i] < min_d)
                { min_d = dist[i]; u = i; }

        if (u == -1) break;
        vu[u] = 1;

        for (GNode* cur = g->tete[u]; cur; cur = cur->suivant)
            if (!vu[cur->sommet]
                && dist[u] + cur->poids < dist[cur->sommet])
                dist[cur->sommet] = dist[u] + cur->poids;
    }

    for (int i = 0; i < g->n; i++)
        printf("%d -> %d : %d\n", depart, i, dist[i]);
}
```

**Version avec tas (optimale) :**
```c
// À utiliser avec le tas binaire de la section 7
// Chaque élément = (distance, sommet)
// Extraire le min, relaxer les voisins
```

**Ne fonctionne PAS avec des poids négatifs !** → utiliser Bellman-Ford.

### 9.5 Bellman-Ford (poids négatifs autorisés)

```c
void bellman_ford(Graphe* g, int depart) {
    int dist[g->n];
    for (int i = 0; i < g->n; i++) dist[i] = INF;
    dist[depart] = 0;

    // V-1 itérations
    for (int i = 1; i < g->n; i++)
        for (int u = 0; u < g->n; u++)
            for (GNode* cur = g->tete[u]; cur; cur = cur->suivant)
                if (dist[u] != INF
                    && dist[u] + cur->poids < dist[cur->sommet])
                    dist[cur->sommet] = dist[u] + cur->poids;

    // Détection de cycle négatif
    for (int u = 0; u < g->n; u++)
        for (GNode* cur = g->tete[u]; cur; cur = cur->suivant)
            if (dist[u] != INF
                && dist[u] + cur->poids < dist[cur->sommet]) {
                printf("Cycle négatif détecté!\n");
                return;
            }

    for (int i = 0; i < g->n; i++)
        printf("%d -> %d : %d\n", depart, i, dist[i]);
}
```

### 9.6 Floyd-Warshall (tous les plus courts chemins)

```c
void floyd_warshall(int** dist, int n) {
    for (int k = 0; k < n; k++)
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                if (dist[i][k] + dist[k][j] < dist[i][j])
                    dist[i][j] = dist[i][k] + dist[k][j];
}
```

O(V³) — simple mais coûteux.

### 9.7 Arbre couvrant minimal — Kruskal

```c
typedef struct { int u, v, poids; } Arete;

int comparer_aretes(const void* a, const void* b) {
    return ((Arete*)a)->poids - ((Arete*)b)->poids;
}

// Union-Find (Disjoint Set)
int parent[N], rang[N];
void init_uf(int n) {
    for (int i = 0; i < n; i++) { parent[i] = i; rang[i] = 0; }
}
int trouver(int x) {
    if (parent[x] != x) parent[x] = trouver(parent[x]); // compression
    return parent[x];
}
void unir(int x, int y) {
    int rx = trouver(x), ry = trouver(y);
    if (rx == ry) return;
    if (rang[rx] < rang[ry]) parent[rx] = ry;
    else if (rang[rx] > rang[ry]) parent[ry] = rx;
    else { parent[ry] = rx; rang[rx]++; }
}

void kruskal(Arete aretes[], int nb_aretes, int n_sommets) {
    qsort(aretes, nb_aretes, sizeof(Arete), comparer_aretes);
    init_uf(n_sommets);

    for (int i = 0; i < nb_aretes; i++) {
        if (trouver(aretes[i].u) != trouver(aretes[i].v)) {
            unir(aretes[i].u, aretes[i].v);
            printf("(%d, %d) poids=%d\n",
                   aretes[i].u, aretes[i].v, aretes[i].poids);
        }
    }
}
```

**Complexité :** O(E log E) — dominé par le tri.

### 9.8 Arbre couvrant minimal — Prim

Similaire à Dijkstra, utilise une file de priorité.

```c
int prim(Graphe* g) {
    int dist[g->n], parent[g->n], vu[g->n];
    for (int i = 0; i < g->n; i++) dist[i] = INF;
    dist[0] = 0; parent[0] = -1;

    for (int count = 0; count < g->n-1; count++) {
        int u = -1, min_d = INF;
        for (int i = 0; i < g->n; i++)
            if (!vu[i] && dist[i] < min_d) { min_d = dist[i]; u = i; }
        vu[u] = 1;

        for (GNode* cur = g->tete[u]; cur; cur = cur->suivant)
            if (!vu[cur->sommet] && cur->poids < dist[cur->sommet]) {
                dist[cur->sommet] = cur->poids;
                parent[cur->sommet] = u;
            }
    }

    int cout = 0;
    for (int i = 1; i < g->n; i++) cout += dist[i];
    return cout;
}
```

---

## 10. ALGORITHMES DE TRI AVANCÉS

### 10.1 Tri rapide (Quick Sort)

```c
int partition(int arr[], int debut, int fin) {
    int pivot = arr[fin];  // choix simple
    int i = debut - 1;

    for (int j = debut; j < fin; j++) {
        if (arr[j] < pivot) {
            i++;
            int tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
        }
    }
    int tmp = arr[i+1]; arr[i+1] = arr[fin]; arr[fin] = tmp;
    return i+1;
}

void tri_rapide(int arr[], int debut, int fin) {
    if (debut < fin) {
        int p = partition(arr, debut, fin);
        tri_rapide(arr, debut, p-1);
        tri_rapide(arr, p+1, fin);
    }
}
```

**Complexité :** Moyen O(n log n) — Pire O(n²) — Dépend du pivot.

**Optimisation :** choisir le pivot = médiane de 3 (début, milieu, fin).

### 10.2 Tri fusion (Merge Sort)

```c
void fusionner(int arr[], int debut, int milieu, int fin) {
    int n1 = milieu - debut + 1;
    int n2 = fin - milieu;
    int G[n1], D[n2];

    for (int i = 0; i < n1; i++) G[i] = arr[debut + i];
    for (int i = 0; i < n2; i++) D[i] = arr[milieu + 1 + i];

    int i = 0, j = 0, k = debut;
    while (i < n1 && j < n2)
        arr[k++] = (G[i] <= D[j]) ? G[i++] : D[j++];
    while (i < n1) arr[k++] = G[i++];
    while (j < n2) arr[k++] = D[j++];
}

void tri_fusion(int arr[], int debut, int fin) {
    if (debut < fin) {
        int milieu = debut + (fin - debut) / 2;
        tri_fusion(arr, debut, milieu);
        tri_fusion(arr, milieu+1, fin);
        fusionner(arr, debut, milieu, fin);
    }
}
```

**Complexité :** O(n log n) stable. Mémoire : O(n).

### 10.3 Tri par tas (Heap Sort) — voir section 7

### 10.4 Tri par base (Radix Sort) — tri linéaire

```c
int get_max(int arr[], int n) {
    int max = arr[0];
    for (int i = 1; i < n; i++)
        if (arr[i] > max) max = arr[i];
    return max;
}

void counting_sort_radix(int arr[], int n, int exp) {
    int sortie[n], compteur[10] = {0};

    for (int i = 0; i < n; i++)
        compteur[(arr[i] / exp) % 10]++;

    for (int i = 1; i < 10; i++)
        compteur[i] += compteur[i-1];

    for (int i = n-1; i >= 0; i--) {
        sortie[compteur[(arr[i] / exp) % 10] - 1] = arr[i];
        compteur[(arr[i] / exp) % 10]--;
    }

    for (int i = 0; i < n; i++) arr[i] = sortie[i];
}

void tri_radix(int arr[], int n) {
    int max = get_max(arr, n);
    for (int exp = 1; max / exp > 0; exp *= 10)
        counting_sort_radix(arr, n, exp);
}
```

**Complexité :** O(d·(n+k)) où d = nombre de chiffres, k = base.

### 10.5 Comparatif des tris

| Algorithme | Moyenne | Pire cas | Mémoire | Stable |
|-----------|---------|----------|---------|--------|
| **Bulle** | O(n²) | O(n²) | O(1) | Oui |
| **Insertion** | O(n²) | O(n²) | O(1) | Oui |
| **Sélection** | O(n²) | O(n²) | O(1) | Non |
| **Fusion** | O(n log n) | O(n log n) | O(n) | Oui |
| **Rapide** | O(n log n) | O(n²) | O(log n) | Non |
| **Tas** | O(n log n) | O(n log n) | O(1) | Non |
| **Radix** | O(d·(n+k)) | O(d·(n+k)) | O(n+k) | Oui |

---

## 11. ALGORITHMES GLOUTONS

**Principe :** à chaque étape, on prend la décision **locale optimale** en espérant qu'elle mène à l'optimum global.

### 11.1 Rendu de monnaie

```c
int pieces[] = {500, 200, 100, 50, 20, 10, 5, 2, 1};
int nb_pieces = 9;

void rendu_monnaie(int montant) {
    for (int i = 0; i < nb_pieces; i++) {
        int n = montant / pieces[i];
        if (n > 0) {
            printf("%d x %d centimes\n", n, pieces[i]);
            montant -= n * pieces[i];
        }
    }
}
```

**Attention :** Glouton ne donne pas toujours l'optimum (ex: pièces {1,3,4}, montant=6 → glouton: 4+1+1=3 pièces, optimal: 3+3=2 pièces).

### 11.2 Problème du sac à dos fractionnaire

```c
typedef struct { int poids, valeur; double ratio; } Objet;

int cmp_ratio(const void* a, const void* b) {
    double diff = ((Objet*)b)->ratio - ((Objet*)a)->ratio;
    return (diff > 0) - (diff < 0);
}

double sac_dos_fractionnaire(Objet objets[], int n, int capacite) {
    for (int i = 0; i < n; i++)
        objets[i].ratio = (double)objets[i].valeur / objets[i].poids;

    qsort(objets, n, sizeof(Objet), cmp_ratio);

    double valeur_totale = 0;
    for (int i = 0; i < n; i++) {
        if (capacite >= objets[i].poids) {
            capacite -= objets[i].poids;
            valeur_totale += objets[i].valeur;
        } else {
            valeur_totale += objets[i].ratio * capacite;
            break;
        }
    }
    return valeur_totale;
}
```

### 11.3 Ordonnancement d'activités

```c
typedef struct { int debut, fin; } Activite;

int cmp_fin(const void* a, const void* b) {
    return ((Activite*)a)->fin - ((Activite*)b)->fin;
}

void selection_activites(Activite act[], int n) {
    qsort(act, n, sizeof(Activite), cmp_fin);

    printf("Activités sélectionnées: ");
    int derniere_fin = act[0].fin;
    printf("(%d,%d) ", act[0].debut, act[0].fin);

    for (int i = 1; i < n; i++) {
        if (act[i].debut >= derniere_fin) {
            printf("(%d,%d) ", act[i].debut, act[i].fin);
            derniere_fin = act[i].fin;
        }
    }
    printf("\n");
}
```

---

## 12. PROGRAMMATION DYNAMIQUE

**Principe :** On résout un problème en le décomposant en sous-problèmes. On **mémorise** les résultats des sous-problèmes pour ne pas les recalculer.

Deux approches :
- **Top-down (mémoïsation) :** récursif + cache
- **Bottom-up (tabulation) :** itératif, remplit un tableau

### 12.1 Fibonacci — DP simple

```c
// Top-down avec mémoïsation
int fib_memo(int n, int memo[]) {
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n];
    memo[n] = fib_memo(n-1, memo) + fib_memo(n-2, memo);
    return memo[n];
}

// Bottom-up (tabulation)
int fib_tab(int n) {
    if (n <= 1) return n;
    int dp[n+1];
    dp[0] = 0; dp[1] = 1;
    for (int i = 2; i <= n; i++)
        dp[i] = dp[i-1] + dp[i-2];
    return dp[n];
}

// Optimisé (O(1) mémoire)
int fib_opt(int n) {
    int a = 0, b = 1, c;
    for (int i = 2; i <= n; i++) { c = a + b; a = b; b = c; }
    return n <= 1 ? n : c;
}
```

### 12.2 Sac à dos 0/1 (Knapsack)

```c
int max(int a, int b) { return a > b ? a : b; }

// Bottom-up
int sac_dos_01(int poids[], int valeurs[], int n, int W) {
    int dp[n+1][W+1];

    for (int i = 0; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            if (i == 0 || w == 0) dp[i][w] = 0;
            else if (poids[i-1] <= w)
                dp[i][w] = max(valeurs[i-1] + dp[i-1][w - poids[i-1]],
                               dp[i-1][w]);
            else dp[i][w] = dp[i-1][w];
        }
    }
    return dp[n][W];
}
```

**Complexité :** O(n·W) — pseudo-polynomial (W peut être grand).

### 12.3 Plus longue sous-séquence commune (LCS)

```c
int lcs(char X[], char Y[], int m, int n) {
    int dp[m+1][n+1];

    for (int i = 0; i <= m; i++) {
        for (int j = 0; j <= n; j++) {
            if (i == 0 || j == 0) dp[i][j] = 0;
            else if (X[i-1] == Y[j-1])
                dp[i][j] = dp[i-1][j-1] + 1;
            else
                dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
        }
    }
    return dp[m][n];
}
```

### 12.4 Plus longue sous-séquence croissante (LIS)

```c
int lis(int arr[], int n) {
    int dp[n], max_global = 1;
    for (int i = 0; i < n; i++) dp[i] = 1;

    for (int i = 1; i < n; i++)
        for (int j = 0; j < i; j++)
            if (arr[i] > arr[j] && dp[i] < dp[j] + 1)
                dp[i] = dp[j] + 1;

    for (int i = 0; i < n; i++)
        if (dp[i] > max_global) max_global = dp[i];

    return max_global;
}
```

### 12.5 Distance d'édition (Levenshtein)

```c
int min3(int a, int b, int c) {
    return (a < b) ? (a < c ? a : c) : (b < c ? b : c);
}

int distance_levenshtein(char* s1, char* s2) {
    int m = strlen(s1), n = strlen(s2);
    int dp[m+1][n+1];

    for (int i = 0; i <= m; i++) {
        for (int j = 0; j <= n; j++) {
            if (i == 0) dp[i][j] = j;
            else if (j == 0) dp[i][j] = i;
            else if (s1[i-1] == s2[j-1])
                dp[i][j] = dp[i-1][j-1];
            else
                dp[i][j] = 1 + min3(dp[i-1][j],    // supprimer
                                    dp[i][j-1],    // insérer
                                    dp[i-1][j-1]); // remplacer
        }
    }
    return dp[m][n];
}
```

---

## 13. ALGORITHMES DE STRINGS

### 13.1 KMP (Knuth-Morris-Pratt) — Recherche de motif

```c
// Construire la table des préfixes-suffixes (LPS)
void calculer_lps(char* motif, int m, int lps[]) {
    int len = 0;
    lps[0] = 0;
    int i = 1;

    while (i < m) {
        if (motif[i] == motif[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len != 0) len = lps[len - 1];
            else { lps[i] = 0; i++; }
        }
    }
}

int kmp(char* texte, char* motif) {
    int n = strlen(texte), m = strlen(motif);
    int lps[m];
    calculer_lps(motif, m, lps);

    int i = 0, j = 0;
    while (i < n) {
        if (motif[j] == texte[i]) { i++; j++; }

        if (j == m) {
            printf("Motif trouvé à l'indice %d\n", i - j);
            j = lps[j - 1];
            return i - j;
        } else if (i < n && motif[j] != texte[i]) {
            if (j != 0) j = lps[j - 1];
            else i++;
        }
    }
    return -1;
}
```

**Complexité :** O(n + m) — linéaire.

### 13.2 Rabin-Karp (hachage roulant)

```c
#define d 256  // nombre de caractères

void rabin_karp(char texte[], char motif[], int q) {
    int n = strlen(texte), m = strlen(motif);
    int h = 1;  // d^(m-1) mod q
    int p = 0, t = 0;  // hash du motif et de la fenêtre

    for (int i = 0; i < m-1; i++) h = (h * d) % q;
    for (int i = 0; i < m; i++) {
        p = (d * p + motif[i]) % q;
        t = (d * t + texte[i]) % q;
    }

    for (int i = 0; i <= n-m; i++) {
        if (p == t) {
            int j;
            for (j = 0; j < m; j++)
                if (texte[i+j] != motif[j]) break;
            if (j == m)
                printf("Motif trouvé à l'indice %d\n", i);
        }
        if (i < n-m) {
            t = (d * (t - texte[i] * h) + texte[i+m]) % q;
            if (t < 0) t += q;
        }
    }
}
```

### 13.3 Tri de chaînes & tri lexicographique

```c
// Comparer lexicographiquement
int cmp_string(const void* a, const void* b) {
    return strcmp(*(const char**)a, *(const char**)b);
}

// Tri lexicographique
void tri_lexico(char* mots[], int n) {
    qsort(mots, n, sizeof(char*), cmp_string);
}
```

---

## 14. RÉCURSIVITÉ & BACKTRACKING

### 14.1 Tours de Hanoï

```c
void hanoi(int n, char depart, char inter, char dest) {
    if (n == 1) {
        printf("Disque 1 : %c -> %c\n", depart, dest);
        return;
    }
    hanoi(n-1, depart, dest, inter);
    printf("Disque %d : %c -> %c\n", n, depart, dest);
    hanoi(n-1, inter, depart, dest);
}
```

### 14.2 N-Queens (placement de N dames)

```c
int est_sur(int tab[], int ligne, int col) {
    for (int i = 0; i < ligne; i++)
        if (tab[i] == col                     // même colonne
            || tab[i] - i == col - ligne      // diag ↘
            || tab[i] + i == col + ligne)     // diag ↗
            return 1;
    return 0;
}

void afficher_plateau(int tab[], int n) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++)
            printf("%c ", tab[i] == j ? 'Q' : '.');
        printf("\n");
    }
    printf("\n");
}

int placer_dames(int tab[], int ligne, int n) {
    if (ligne == n) { afficher_plateau(tab, n); return 1; }

    int solutions = 0;
    for (int col = 0; col < n; col++) {
        if (!est_sur(tab, ligne, col)) {
            tab[ligne] = col;
            solutions += placer_dames(tab, ligne+1, n);
            // backtracking : on continue (tab est écrasé à l'itération suivante)
        }
    }
    return solutions;
}
```

### 14.3 Génération de permutations

```c
void permuter(int arr[], int i, int n) {
    if (i == n) {
        for (int j = 0; j < n; j++) printf("%d ", arr[j]);
        printf("\n");
        return;
    }
    for (int j = i; j < n; j++) {
        int tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
        permuter(arr, i+1, n);
        tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;  // backtrack
    }
}
```

### 14.4 Rat dans un labyrinthe

```c
#define N 4

int chemin(int maze[N][N], int x, int y, int sol[N][N]) {
    // Arrivée
    if (x == N-1 && y == N-1) { sol[x][y] = 1; return 1; }

    if (x >= 0 && x < N && y >= 0 && y < N
        && maze[x][y] == 1 && sol[x][y] == 0) {
        sol[x][y] = 1;

        if (chemin(maze, x+1, y, sol)) return 1;  // bas
        if (chemin(maze, x, y+1, sol)) return 1;  // droite
        if (chemin(maze, x-1, y, sol)) return 1;  // haut
        if (chemin(maze, x, y-1, sol)) return 1;  // gauche

        sol[x][y] = 0;  // backtrack
        return 0;
    }
    return 0;
}
```

---

## 15. EXERCICES PRATIQUES

### Exercice 1 — Liste inversée
Écrire une fonction qui inverse une liste simplement chaînée **en une seule passe** (itératif + récursif).

### Exercice 2 — Expression parenthésée
Vérifier si une expression est bien parenthésée avec une pile :
```
Entrée : "({[]})"     → Valide
Entrée : "({[})"      → Invalide
```

### Exercice 3 — BST : vérifier
Écrire une fonction qui vérifie si un arbre binaire est un **BST valide**.

### Exercice 4 — AVL
Implémenter la **suppression** dans un AVL.

### Exercice 5 — Tas
Implémenter une **file de priorité** avec un tas min. Tester avec :
- `inserer(5, 3, 8, 1, 9)`
- `extraire_min()` → doit donner 1, 3, 5, 8, 9

### Exercice 6 — Hash collisions
Comparer le nombre de collisions avec chaînage vs sondage linéaire en insérant 50 entiers aléatoires dans une table de taille 37.

### Exercice 7 — Graphe : détection de cycle
Détecter un cycle dans un graphe orienté en utilisant DFS.

### Exercice 8 — Dijkstra
Implémenter Dijkstra avec un **tas binaire** (pas la version O(V²)). Tester sur ce graphe :
```
0→1(4) 0→2(1) 2→1(2) 1→3(1) 2→3(5)
```

### Exercice 9 — Tri rapide avec pivot médiane
Modifier `partition()` pour choisir le pivot comme médiane de (début, milieu, fin). Tester sur un tableau trié → doit éviter O(n²).

### Exercice 10 — Sac à dos 0/1
Avec backtracking (brut force) pour n ≤ 20, puis DP pour n grand. Comparer les temps.

### Exercice 11 — LCS
Trouver la plus longue sous-séquence commune entre `"ABCBDAB"` et `"BDCABA"`. Afficher la sous-séquence, pas seulement la longueur.

### Exercice 12 — Permutations sans récursion
Écrire la fonction `permuter()` en itératif (algorithme de Heap).

### Exercice 13 — Filtrage de Bloom
Implémenter un filtre de Bloom (table de hachage probabiliste) avec 2 fonctions de hachage pour tester l'appartenance d'un mot.

### Exercice 14 — Union-Find optimisé
Implémenter Union-Find avec **compression de chemin** et **union par rang**. Tester avec un réseau de connections.

### Exercice 15 — Tri topologique
Ordonnancer des tâches avec dépendances :
```
A → B, A → C, B → D, C → D
// Résultat possible : A, B, C, D ou A, C, B, D
```

---

## Annexe : Tableau récapitulatif des complexités

| Structure | Insertion | Suppression | Recherche | Accès |
|-----------|-----------|-------------|-----------|-------|
| Tableau | O(n) | O(n) | O(n) | O(1) |
| Liste chaînée | O(1)⁺ | O(1)⁺ | O(n) | O(n) |
| Pile/File | O(1) | O(1) | O(n) | O(n) |
| BST (moyen) | O(log n) | O(log n) | O(log n) | O(log n) |
| BST (pire) | O(n) | O(n) | O(n) | O(n) |
| AVL | O(log n) | O(log n) | O(log n) | O(log n) |
| Tas | O(log n) | O(log n) | O(n) | O(1)⁺ |
| Hash table | O(1) moy | O(1) moy | O(1) moy | — |
| Graphe liste | O(1)⁺ | O(deg) | O(V+E) | — |
| Graphe matrice | O(1) | O(1) | O(V²) | O(1) |

⁺ = insertion en tête/début seulement

---

*Fin du cours — Algorithmique & Structures de Données Avancées en C*
