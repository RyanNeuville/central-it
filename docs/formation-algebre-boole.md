# Formation Algèbre de Boole — Guide Pratique & Direct

## 1. Qu'est-ce que l'algèbre de Boole ?

C'est une algèbre **binaire** : tout n'a que **2 valeurs possibles** :

| Symbole | Sens         |
|---------|--------------|
| 0       | FAUX / Éteint / Bas    |
| 1       | VRAI / Allumé / Haut   |

**C'est LA base de l'informatique.** Tout processeur, tout circuit, tout code utilise ça.

---

## 2. Les 3 opérations fondamentales

### NOT (NON) — Inverseur
```
A  | NOT A
0  |  1
1  |  0
```
En programmation : `!A`  
En électronique : une barre au-dessus `¯A` ou `A'`

### AND (ET) — 1 si **tous** sont 1
```
A  B  | A AND B
0  0  |   0
0  1  |   0
1  0  |   0
1  1  |   1
```
En prog : `A && B`  
En algèbre : `A · B` ou `AB`

### OR (OU) — 1 si **au moins un** est 1
```
A  B  | A OR B
0  0  |   0
0  1  |   1
1  0  |   1
1  1  |   1
```
En prog : `A || B`  
En algèbre : `A + B`

---

## 3. Les lois fondamentales (à connaître par cœur)

| Loi              | Formule                          |
|------------------|----------------------------------|
| **Identité**     | `A + 0 = A` · `A · 1 = A`       |
| **Idempotence**  | `A + A = A` · `A · A = A`       |
| **Complément**   | `A + ¬A = 1` · `A · ¬A = 0`     |
| **Dominance**    | `A + 1 = 1` · `A · 0 = 0`       |
| **Absorption**   | `A + (A·B) = A` · `A·(A+B) = A` |
| **Distributivité** | `A·(B+C) = A·B + A·C`         |
| **Double négation** | `¬(¬A) = A`                   |

### ➤ De Morgan (ultra important)
```
¬(A · B) = ¬A + ¬B
¬(A + B) = ¬A · ¬B
```
**Traduction :** pour "casser" une barre collective, on inverse chaque variable et on change l'opérateur.

**Exemple concret :**
```
¬(A · B · C) = ¬A + ¬B + ¬C   // ET devient OU
¬(A + B + C) = ¬A · ¬B · ¬C   // OU devient ET
```

---

## 4. Prioritie des opérateurs

1. **NOT** (priorité la plus haute)
2. **AND**
3. **OR** (priorité la plus basse)

```
A + B · ¬C    c'est   A + (B · (¬C))
¬A + B · C    c'est   (¬A) + (B · C)
```

---

## 5. Simplifier une expression booléenne

### Méthode 1 : Algébrique (appliquer les lois)

**Exemple :** Simplifier `A·B + A·¬B`

```
A·B + A·¬B
= A·(B + ¬B)           // distributivité
= A·1                  // complément
= A                    // identité
```

**Exemple :** Simplifier `(A+B)·(A+¬B)`

```
(A+B)·(A+¬B)
= A·A + A·¬B + B·A + B·¬B   // distributivité
= A + A·¬B + A·B + 0        // idempotence + complément
= A + A·(¬B + B)             // mise en facteur
= A + A·1                    // complément
= A + A                      // identité
= A                          // idempotence
```

### Méthode 2 : Table de vérité (visuelle)

Pour chaque combinaison d'entrées, on calcule la sortie, puis on écrit l'expression.

1. Lister toutes les combinaisons d'entrées
2. Calculer la sortie pour chaque ligne
3. Écrire les minterms (lignes où la sortie = 1)
4. Additionner les minterms

### Méthode 3 : Tableau de Karnaugh (la plus rapide pour 2-4 variables)

---

## 6. Tableau de Karnaugh (K-map)

C'est une **table de vérité simplifiée visuellement**.

### Règles :
- Les cases adjacentes ne diffèrent que d'**1 bit** (code Gray)
- On regroupe les 1 par **puissances de 2** (1, 2, 4, 8…)
- Plus le groupe est grand, plus l'expression est simple

### Exemple à 2 variables :

```
        B=0  B=1
     +----+----+
 A=0 |  0 |  1 |
     +----+----+
 A=1 |  1 |  1 |
     +----+----+
```

Groupe du bas : `A` (car B change, A reste 1)  
Groupe de droite : `B` (car A change, B reste 1)  
**Résultat :** `A + B`

### Exemple à 3 variables :

```
        BC
       00  01  11  10
     +---+---+---+---+
 A=0 | 0 | 0 | 1 | 1 |
     +---+---+---+---+
 A=1 | 0 | 1 | 1 | 1 |
     +---+---+---+---+
```

**Groupes :**
- Carré central (4 cases) : `B` (car A et C varient)
- Groupe A=1, BC=01/11 : `A·C` (non, B varie)
- En fait : groupe `A·C` + groupe `B`

**Détail :**
- Cases A=0, BC=11 et A=0, BC=10 → `¬A·B`
- Cases A=1, BC=01 et A=1, BC=11 → `A·C`
- Cases A=1, BC=10 et A=1, BC=11 → `A·B`
- Meilleur groupement : `B` (les 4 cases centrales : 011, 111, 010, 110)

**Résultat simplifié :** `B`

---

## 7. Portes logiques (schémas)

```
NOT      AND           OR
┌───┐    ┌───┐        ┌───┐
A─┤O  ├── A─┤& ├──     A─┤≥1├──
  └───┘    B─┤  │       B─┤  │
             └───┘       └───┘

NAND     NOR           XOR
┌───┐    ┌───┐        ┌───┐
A─┤&  ├── A─┤≥1├──     A─┤=1├──
B─┤O  │    B─┤O │       B─┤  │
  └───┘    └───┘        └───┘
```

| Porte | Expression      | Table courte          |
|-------|----------------|----------------------|
| NAND  | `¬(A·B)`       | 0 sauf si A=B=1 → 0  |
| NOR   | `¬(A+B)`       | 1 seulement si A=B=0 |
| XOR   | `A·¬B + ¬A·B`  | 1 si A ≠ B           |
| XNOR  | `A·B + ¬A·¬B`  | 1 si A = B           |

---

## 8. Applications pratiques

### Ex. 1 : Tester si un nombre est pair
```c
fonction estPair(n):
    retourne (n & 1) == 0   // AND bit à bit
```

### Ex. 2 : Verrouillage d'accès
```
Accès = (Badge_valide ET Code_OK) OU (Admin ET Fingerprint)
A = B·C + D·E
```

### Ex. 3 : Afficheur 7 segments (allumer le segment 'a')
```
Seg_a = ¬A·¬C + B + A·C + A·¬B·¬C
// Après simplification par Karnaugh :
Seg_a = A + C + ¬A·¬B
```

### Ex. 4 : Demi-additionneur (addition binaire)
```
Somme   = A XOR B
Retenue = A AND B
```

---

## 9. Conversion d'expressions avec NAND/NOR

**Toute expression peut être construite uniquement avec des NAND (ou uniquement des NOR).**

| Opération | Avec NAND             |
|-----------|----------------------|
| `¬A`      | `NAND(A, A)`         |
| `A·B`     | `NAND(NAND(A,B), NAND(A,B))` |
| `A+B`     | `NAND(NAND(A,A), NAND(B,B))` |

---

## 10. Exercices (à faire)

### Simplifier :
1. `A·B + A·B·C`
2. `(A+B)·(A+¬B)`
3. `¬A·¬B·C + ¬A·B·C + A·B·C`
4. `¬(A·B) + ¬(¬A·¬B)`

### Construire la table de vérité de :
5. `(A XOR B) AND C`
6. `A + ¬B·C`

### Par Karnaugh, simplifier :
7.
```
        AB
       00  01  11  10
     +---+---+---+---+
 C=0 | 1 | 0 | 1 | 1 |
     +---+---+---+---+
 C=1 | 0 | 1 | 1 | 0 |
     +---+---+---+---+
```

---

## Résumé en 1 phrase

**L'algèbre de Boole = des 0 et des 1, avec ET/OU/NON, qu'on simplifie par des lois ou des tableaux pour fabriquer des circuits ou du code plus efficaces.**

---

*Fin de la formation.*
