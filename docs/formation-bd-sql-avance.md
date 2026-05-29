# Base de Données & SQL Avancé — Cours complet
### 1ʳᵉ & 2ᵉ année Génie Logiciel

---

## TABLE DES MATIÈRES

1. [Concepts fondamentaux](#1-concepts-fondamentaux)
2. [Modèle relationnel](#2-modèle-relationnel)
3. [Normalisation](#3-normalisation)
4. [SQL DDL — Définition des données](#4-sql-ddl--définition-des-données)
5. [SQL DML — Requêtes de base](#5-sql-dml--requêtes-de-base)
6. [Les Jointures (JOIN)](#6-les-jointures-join)
7. [Sous-requêtes](#7-sous-requêtes)
8. [Opérateurs ensemblistes](#8-opérateurs-ensemblistes)
9. [Fonctions d'agrégation & GROUP BY](#9-fonctions-dagrégation--group-by)
10. [Fonctions de fenêtrage (Window Functions)](#10-fonctions-de-fenêtrage-window-functions)
11. [CTE & Requêtes récursives](#11-cte--requêtes-récursives)
12. [Indexes & performances](#12-indexes--performances)
13. [Vues (Views)](#13-vues-views)
14. [Procédures stockées & Fonctions](#14-procédures-stockées--fonctions)
15. [Déclencheurs (Triggers)](#15-déclencheurs-triggers)
16. [Transactions & Verrous](#16-transactions--verrous)
17. [Sécurité & Injection SQL](#17-sécurité--injection-sql)
18. [Optimisation de requêtes](#18-optimisation-de-requêtes)
19. [Modélisation & MERISE](#19-mélisation--merise-schéma-conceptuel)
20. [NoSQL — Introduction](#20-nosql--introduction)
21. [Exercices pratiques](#21-exercices-pratiques)

---

## 1. CONCEPTS FONDAMENTAUX

### 1.1 Définitions

| Terme | Définition |
|-------|-----------|
| **Base de données** | Ensemble structuré de données stockées durablement |
| **SGBD** | Système de Gestion de Base de Données (MySQL, PostgreSQL, Oracle, SQL Server) |
| **Schéma** | Structure qui décrit l'organisation des données |
| **Requête** | Question posée à la base — SQL |
| **Transaction** | Unité de travail atomique (tout ou rien) |

### 1.2 Propriétés ACID

```
A → Atomicité    : Tout ou rien (si une étape échoue, tout est annulé)
C → Cohérence    : Les contraintes d'intégrité sont toujours respectées
I → Isolation    : Les transactions concurrentes ne se marchent pas dessus
D → Durabilité   : Une fois validée, la donnée est sauvegardée même après crash
```

### 1.3 Types de SGBD

| Type | Exemples | Usage |
|------|----------|-------|
| **Relationnel** (SQL) | PostgreSQL, MySQL, SQLite, Oracle, SQL Server | Transactions, données structurées |
| **Document** | MongoDB, CouchDB | JSON, données semi-structurées |
| **Clé-Valeur** | Redis, DynamoDB | Cache, sessions |
| **Colonne** | Cassandra, HBase | Big Data, analytics |
| **Graphe** | Neo4j | Réseaux sociaux, recommandations |

---

## 2. MODÈLE RELATIONNEL

### 2.1 Concepts

```
Relation (table) = ensemble de tuples (lignes)
Attribut (colonne) = une propriété
Domaine = ensemble de valeurs possibles pour un attribut
Clé primaire (PK) = identifiant unique d'une ligne
Clé étrangère (FK) = référence à une clé primaire d'une autre table
```

### 2.2 Exemple de schéma

```
┌──────────────┐       ┌───────────────┐
│  Etudiants   │       │  Inscriptions │       ┌──────────┐
├──────────────┤       ├───────────────┤       │  Cours   │
│ id_etudiant  │◄──────┤ id_etudiant   │       ├──────────┤
│ nom          │       │ id_cours      │───◄───│ id_cours │
│ prenom       │       │ date_inscr    │       │ intitule │
│ email        │       │ note          │       │ credits  │
│ date_naiss   │       └───────────────┘       │ prof     │
└──────────────┘                               └──────────┘
```

### 2.3 Contraintes d'intégrité

```sql
-- 1. Domaine : type de données, CHECK
CREATE TABLE Etudiants (
    age INTEGER CHECK (age >= 16 AND age <= 120),
    email VARCHAR(255) UNIQUE,
    sexe CHAR(1) CHECK (sexe IN ('M', 'F'))
);

-- 2. Clé primaire
id_etudiant INTEGER PRIMARY KEY,
-- ou
PRIMARY KEY (id_etudiant, id_cours)  -- composée

-- 3. Clé étrangère
FOREIGN KEY (id_cours) REFERENCES Cours(id_cours)
    ON DELETE CASCADE      -- suppression en cascade
    ON UPDATE CASCADE      -- mise à jour en cascade

-- 4. Not NULL
nom VARCHAR(100) NOT NULL
```

---

## 3. NORMALISATION

**Objectif :** Éviter la redondance et les anomalies d'insertion/suppression/mise à jour.

### 3.1 1FN — Première forme normale

**Règle :** Un attribut doit être **atomique** (pas de liste, pas de tableau dans une cellule).

```
❌ Tableau (pas normalisé) :
id | nom   | telephone
1  | Alice | 0612345678, 0698765432

✅ 1FN :
id | nom   | telephone
1  | Alice | 0612345678
1  | Alice | 0698765432
```

### 3.2 2FN — Deuxième forme normale

**Règle :** Être en 1FN + **tous les attributs non-clé dépendent de la totalité de la clé primaire** (pas d'une partie).

```
❌ Clé primaire = (id_etudiant, id_cours)
id_etudiant | id_cours | nom_etudiant | note
    1       |   101    |   Alice      |  15
    1       |   102    |   Alice      |  12
    ← "nom_etudiant" ne dépend que de id_etudiant, pas de (id_etudiant, id_cours)

✅ 2FN : Séparer en 2 tables
Etudiants(id_etudiant, nom)
Notes(id_etudiant, id_cours, note)
```

### 3.3 3FN — Troisième forme normale

**Règle :** Être en 2FN + **pas de dépendance transitive** (un attribut non-clé ne doit pas dépendre d'un autre attribut non-clé).

```
❌ id_etudiant | code_postal | ville
   1          |  75001      | Paris
   2          |  75001      | Paris
   ← ville dépend de code_postal, pas de id_etudiant

✅ 3FN : Séparer
Etudiants(id_etudiant, code_postal)
Villes(code_postal, ville)
```

### 3.4 BCNF — Boyce-Codd

**Règle :** Pour toute dépendance fonctionnelle X → Y, X doit être une **super-clé**.

Plus forte que 3FN. Toute table en BCNF est en 3FN, mais l'inverse n'est pas toujours vrai.

### 3.5 Résumé

| Forme | Règle | Problème résolu |
|-------|-------|-----------------|
| **1FN** | Attributs atomiques | Colonnes multivaluées |
| **2FN** | Dépendance totale à la clé | Dépendance partielle |
| **3FN** | Pas de dépendance transitive | Dépendance indirecte |
| **BCNF** | X → Y ⇒ X est super-clé | Anomalies résiduelles de 3FN |

**Règle d'or :** La 3FN est suffisante dans 95% des cas. La BCNF est parfois trop stricte.

---

## 4. SQL DDL — DÉFINITION DES DONNÉES

### 4.1 CREATE TABLE

```sql
CREATE TABLE Clients (
    id_client INTEGER PRIMARY KEY AUTOINCREMENT,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    telephone VARCHAR(20),
    date_inscription DATE DEFAULT CURRENT_DATE,
    actif BOOLEAN DEFAULT TRUE
);

-- Avec clé étrangère
CREATE TABLE Commandes (
    id_commande INTEGER PRIMARY KEY AUTOINCREMENT,
    id_client INTEGER NOT NULL,
    date_commande TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    montant DECIMAL(10,2) CHECK (montant > 0),
    statut VARCHAR(20) DEFAULT 'en_attente',
    FOREIGN KEY (id_client) REFERENCES Clients(id_client)
        ON DELETE CASCADE
);

-- Clé primaire composée
CREATE TABLE DetailsCommande (
    id_commande INTEGER,
    id_produit INTEGER,
    quantite INTEGER NOT NULL CHECK (quantite > 0),
    prix_unitaire DECIMAL(10,2),
    PRIMARY KEY (id_commande, id_produit),
    FOREIGN KEY (id_commande) REFERENCES Commandes(id_commande),
    FOREIGN KEY (id_produit) REFERENCES Produits(id_produit)
);
```

### 4.2 ALTER TABLE

```sql
-- Ajouter une colonne
ALTER TABLE Clients ADD COLUMN adresse VARCHAR(255);

-- Modifier une colonne
ALTER TABLE Clients ALTER COLUMN telephone TYPE VARCHAR(30);

-- Renommer une colonne
ALTER TABLE Clients RENAME COLUMN adresse TO adresse_postale;

-- Supprimer une colonne
ALTER TABLE Clients DROP COLUMN adresse_postale;

-- Ajouter une contrainte
ALTER TABLE Commandes ADD CONSTRAINT fk_client
    FOREIGN KEY (id_client) REFERENCES Clients(id_client);

-- Ajouter un index
CREATE INDEX idx_clients_email ON Clients(email);
```

### 4.3 DROP & TRUNCATE

```sql
DROP TABLE IF EXISTS DetailsCommande;     -- Supprime table + structure
TRUNCATE TABLE Commandes;                 -- Vide la table (plus rapide que DELETE)
DROP DATABASE IF EXISTS ma_base;          -- Supprime la base
```

---

## 5. SQL DML — REQUÊTES DE BASE

### 5.1 INSERT

```sql
-- Simple
INSERT INTO Clients (nom, email) VALUES ('Dupont', 'dupont@email.com');

-- Multiple
INSERT INTO Produits (nom, prix, stock) VALUES
    ('Chaise', 49.99, 100),
    ('Table', 199.99, 50),
    ('Lampe', 29.99, 200);

-- Depuis une autre table
INSERT INTO ClientsPremium (id_client, nom, email)
SELECT id_client, nom, email FROM Clients WHERE actif = TRUE;
```

### 5.2 UPDATE

```sql
UPDATE Produits SET prix = prix * 1.10 WHERE stock < 20;
UPDATE Clients SET actif = FALSE WHERE date_inscription < '2020-01-01';
```

### 5.3 DELETE

```sql
DELETE FROM Commandes WHERE statut = 'annulee';
DELETE FROM Produits WHERE stock = 0;
```

### 5.4 SELECT — La base

```sql
-- Sélection simple
SELECT nom, email FROM Clients WHERE actif = TRUE;

-- DISTINCT
SELECT DISTINCT ville FROM Clients;

-- ORDER BY
SELECT * FROM Produits ORDER BY prix DESC LIMIT 10;

-- LIKE (pattern matching)
SELECT * FROM Clients WHERE nom LIKE 'Du%';
SELECT * FROM Clients WHERE email LIKE '%@gmail.com';

-- BETWEEN
SELECT * FROM Commandes WHERE montant BETWEEN 50 AND 200;

-- IN
SELECT * FROM Produits WHERE categorie IN ('Meuble', 'Éclairage');

-- NULL
SELECT * FROM Clients WHERE telephone IS NULL;

-- COALESCE (première valeur non NULL)
SELECT nom, COALESCE(telephone, 'Non renseigné') AS telephone FROM Clients;
```

---

## 6. LES JOINTURES (JOIN)

### 6.1 INNER JOIN

```sql
-- Seulement les lignes qui existent dans les deux tables
SELECT c.nom, co.id_commande, co.montant
FROM Clients c
INNER JOIN Commandes co ON c.id_client = co.id_client;
```

✅ = intersection des deux tables.

### 6.2 LEFT JOIN (LEFT OUTER JOIN)

```sql
-- Tous les clients, avec leurs commandes (NULL si aucune commande)
SELECT c.nom, co.id_commande, co.montant
FROM Clients c
LEFT JOIN Commandes co ON c.id_client = co.id_client;
```

### 6.3 RIGHT JOIN

```sql
-- Symétrique du LEFT JOIN
SELECT c.nom, co.id_commande
FROM Commandes co
RIGHT JOIN Clients c ON c.id_client = co.id_client;
```

### 6.4 FULL OUTER JOIN

```sql
-- Tous les clients + toutes les commandes (même sans correspondance)
SELECT c.nom, co.id_commande
FROM Clients c
FULL OUTER JOIN Commandes co ON c.id_client = co.id_client;
```

### 6.5 CROSS JOIN

```sql
-- Produit cartésien (toutes les combinaisons)
SELECT e.nom, p.intitule
FROM Etudiants e
CROSS JOIN Projets p;
```

### 6.6 SELF JOIN

```sql
-- Une table jointe à elle-même
SELECT e1.nom AS employe, e2.nom AS responsable
FROM Employes e1
LEFT JOIN Employes e2 ON e1.id_responsable = e2.id_employe;
```

### 6.7 JOIN avec conditions complexes

```sql
SELECT *
FROM Commandes c
JOIN Clients cl ON c.id_client = cl.id_client
    AND cl.actif = TRUE
    AND c.montant > 100;
```

### 6.8 Exemple complet de multi-jointure

```sql
SELECT
    c.nom AS client,
    p.nom AS produit,
    dc.quantite,
    dc.prix_unitaire,
    (dc.quantite * dc.prix_unitaire) AS total_ligne
FROM Clients c
JOIN Commandes co ON c.id_client = co.id_client
JOIN DetailsCommande dc ON co.id_commande = dc.id_commande
JOIN Produits p ON dc.id_produit = p.id_produit
WHERE co.statut = 'livree'
ORDER BY c.nom, co.date_commande;
```

---

## 7. SOUS-REQUÊTES

### 7.1 Sous-requête dans WHERE

```sql
-- Clients qui ont passé au moins une commande > 200€
SELECT nom, email FROM Clients
WHERE id_client IN (
    SELECT id_client FROM Commandes WHERE montant > 200
);

-- Produits dont le prix > prix moyen
SELECT nom, prix FROM Produits
WHERE prix > (SELECT AVG(prix) FROM Produits);

-- Clients sans commande
SELECT * FROM Clients
WHERE id_client NOT IN (SELECT DISTINCT id_client FROM Commandes);
```

### 7.2 Sous-requête corrélée

```sql
-- Pour chaque client, le montant de sa plus grande commande
SELECT c.nom,
       (SELECT MAX(montant)
        FROM Commandes co
        WHERE co.id_client = c.id_client) AS max_commande
FROM Clients c;
```

**Attention :** La sous-requête corrélée est ré-exécutée pour **chaque ligne** de la requête externe. Peut être lente.

### 7.3 Sous-requête dans FROM

```sql
SELECT categorie, avg_prix
FROM (
    SELECT categorie, AVG(prix) AS avg_prix
    FROM Produits
    GROUP BY categorie
) AS stats
WHERE avg_prix > 50;
```

### 7.4 Sous-requête avec EXISTS

```sql
-- Clients qui ont au moins une commande (plus efficace que IN)
SELECT * FROM Clients c
WHERE EXISTS (
    SELECT 1 FROM Commandes co WHERE co.id_client = c.id_client
);

-- Produits jamais commandés
SELECT * FROM Produits p
WHERE NOT EXISTS (
    SELECT 1 FROM DetailsCommande dc WHERE dc.id_produit = p.id_produit
);
```

**EXISTS vs IN :** EXISTS s'arrête dès qu'il trouve une correspondance. IN évalue toutes les valeurs. EXISTS est souvent plus rapide avec de grands volumes.

---

## 8. OPÉRATEURS ENSEMBLISTES

### 8.1 UNION & UNION ALL

```sql
-- Clients qui sont soit des particuliers, soit des entreprises (sans doublons)
SELECT nom, email FROM Particuliers
UNION
SELECT nom, email FROM Entreprises;

-- Avec doublons (plus rapide)
SELECT nom FROM Clients_Paris
UNION ALL
SELECT nom FROM Clients_Lyon;
```

### 8.2 INTERSECT

```sql
-- Clients présents dans les deux tables
SELECT id_client FROM Commandes_2023
INTERSECT
SELECT id_client FROM Commandes_2024;
```

### 8.3 EXCEPT (ou MINUS)

```sql
-- Clients qui ont commandé en 2023 mais pas en 2024
SELECT id_client FROM Commandes_2023
EXCEPT
SELECT id_client FROM Commandes_2024;
```

**Règles :**
- Même nombre de colonnes
- Types compatibles
- Tri par la première requête

---

## 9. FONCTIONS D'AGRÉGATION & GROUP BY

### 9.1 Fonctions

```sql
COUNT(*)         → nombre de lignes
COUNT(colonne)   → nombre de valeurs non NULL
SUM(colonne)     → somme
AVG(colonne)     → moyenne
MIN(colonne)     → minimum
MAX(colonne)     → maximum
```

### 9.2 GROUP BY

```sql
-- Nombre de commandes par client
SELECT id_client, COUNT(*) AS nb_commandes
FROM Commandes
GROUP BY id_client;

-- Chiffre d'affaires par catégorie
SELECT categorie, SUM(prix * quantite) AS ca
FROM Produits p
JOIN DetailsCommande dc ON p.id_produit = dc.id_produit
GROUP BY categorie;
```

### 9.3 HAVING — Filtre après GROUP BY

```sql
-- Catégories avec CA > 1000€
SELECT categorie, SUM(prix * quantite) AS ca
FROM Produits p
JOIN DetailsCommande dc ON p.id_produit = dc.id_produit
GROUP BY categorie
HAVING ca > 1000;

-- Clients avec au moins 5 commandes
SELECT id_client, COUNT(*) AS nb
FROM Commandes
GROUP BY id_client
HAVING nb >= 5;
```

**WHERE vs HAVING :**
- `WHERE` filtre **AVANT** le GROUP BY (sur les lignes individuelles)
- `HAVING` filtre **APRÈS** le GROUP BY (sur les groupes)

### 9.4 Ordre d'exécution SQL

```
FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT
```

---

## 10. FONCTIONS DE FENÊTRAGE (WINDOW FUNCTIONS)

**Les fonctions de fenêtrage sont ce qui différencie le SQL basique du SQL avancé.** Elles permettent de calculer sur un "ensemble de lignes lié à la ligne courante" **sans grouper les résultats**.

### 10.1 Syntaxe

```sql
FONCTION(...) OVER (
    PARTITION BY colonne   -- optionnel : divise en groupes
    ORDER BY colonne       -- optionnel : ordre dans le groupe
    ROWS/RANGE BETWEEN ... -- optionnel : cadre de fenêtre
)
```

### 10.2 ROW_NUMBER, RANK, DENSE_RANK

```sql
SELECT
    nom,
    salaire,
    ROW_NUMBER() OVER (ORDER BY salaire DESC) AS rang,
    RANK()       OVER (ORDER BY salaire DESC) AS rang_avec_trous,
    DENSE_RANK() OVER (ORDER BY salaire DESC) AS rang_sans_trous
FROM Employes;
```

| salaire | ROW_NUMBER | RANK | DENSE_RANK |
|---------|-----------|------|------------|
| 10000   | 1         | 1    | 1          |
| 8000    | 2         | 2    | 2          |
| 8000    | 3         | 2    | 2          |
| 7000    | 4         | 4    | 3          |

### 10.3 NTILE — Diviser en groupes

```sql
-- Découper les clients en 4 quartiles selon leur dépense
SELECT
    nom,
    total_depenses,
    NTILE(4) OVER (ORDER BY total_depenses DESC) AS quartile
FROM Clients;
```

### 10.4 LAG & LEAD — Accès aux lignes voisines

```sql
-- Pour chaque employé, comparer avec le précédent
SELECT
    nom,
    salaire,
    LAG(salaire) OVER (ORDER BY salaire DESC) AS precedent,
    salaire - LAG(salaire) OVER (ORDER BY salaire DESC) AS difference
FROM Employes;

-- Lead : ligne suivante
SELECT
    date_vente,
    montant,
    LEAD(montant) OVER (ORDER BY date_vente) AS prochain_montant
FROM Ventes;
```

### 10.5 FIRST_VALUE & LAST_VALUE

```sql
-- Pour chaque employé, le salaire max du département
SELECT
    nom,
    departement,
    salaire,
    FIRST_VALUE(salaire) OVER (
        PARTITION BY departement
        ORDER BY salaire DESC
    ) AS max_departement
FROM Employes;
```

### 10.6 SUM/AVG cumulatifs

```sql
-- CA cumulé par mois
SELECT
    mois,
    ca_mensuel,
    SUM(ca_mensuel) OVER (ORDER BY mois) AS ca_cumule
FROM ChiffreAffaires;

-- Moyenne mobile sur 3 mois
SELECT
    mois,
    ca_mensuel,
    AVG(ca_mensuel) OVER (
        ORDER BY mois
        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
    ) AS moyenne_mobile_3
FROM ChiffreAffaires;
```

### 10.7 Pourcentage du total

```sql
SELECT
    nom,
    ventes,
    ventes / SUM(ventes) OVER () * 100 AS pourcentage,
    -- cumul
    SUM(ventes) OVER (ORDER BY ventes DESC) / SUM(ventes) OVER () * 100 AS cumul_pct
FROM Vendeurs;
```

### 10.8 ROWS vs RANGE vs UNBOUNDED

```sql
-- ROWS : cadre physique (nombre exact de lignes)
ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING

-- RANGE : cadre logique (valeurs égales incluses)
RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW

-- Par défaut (si ORDER BY mais pas de cadre) :
RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
```

---

## 11. CTE & REQUÊTES RÉCURSIVES

### 11.1 CTE — Common Table Expression

Un CTE = une **table temporaire nommée** qui n'existe que le temps d'une requête.

```sql
WITH clients_actifs AS (
    SELECT * FROM Clients WHERE actif = TRUE
),
commandes_recentes AS (
    SELECT * FROM Commandes WHERE date_commande > '2024-01-01'
)
SELECT ca.nom, COUNT(cr.id_commande) AS nb_commandes
FROM clients_actifs ca
LEFT JOIN commandes_recentes cr ON ca.id_client = cr.id_client
GROUP BY ca.id_client;
```

**Avantages :** Lisibilité, réutilisabilité, récursivité.

### 11.2 CTE récursif — Hiérarchies

**Problème classique :** Une table "Employes" avec `id_employe` et `id_responsable`.

```sql
WITH RECURSIVE hierarchie AS (
    -- Ancrage (le niveau 0)
    SELECT id_employe, nom, id_responsable, 1 AS niveau,
           CAST(nom AS TEXT) AS chemin
    FROM Employes
    WHERE id_responsable IS NULL  -- les chefs suprêmes

    UNION ALL

    -- Récursion
    SELECT e.id_employe, e.nom, e.id_responsable,
           h.niveau + 1,
           CAST(h.chemin || ' → ' || e.nom AS TEXT)
    FROM Employes e
    JOIN hierarchie h ON e.id_responsable = h.id_employe
)
SELECT * FROM hierarchie ORDER BY niveau, nom;
```

**Résultat :**
```
id   nom      niveau  chemin
1    Claire   1       Claire
2    Bob      2       Claire → Bob
3    Alice    2       Claire → Alice
4    David    3       Claire → Bob → David
```

### 11.3 CTE récursif — Générer une séquence

```sql
WITH RECURSIVE seq AS (
    SELECT 1 AS n
    UNION ALL
    SELECT n + 1 FROM seq WHERE n < 10
)
SELECT * FROM seq;
```

### 11.4 CTE récursif — Arbre des catégories

```sql
WITH RECURSIVE arbre_cat AS (
    SELECT id_categorie, nom, id_parent, 0 AS profondeur
    FROM Categories WHERE id_parent IS NULL
    UNION ALL
    SELECT c.id_categorie, c.nom, c.id_parent, ac.profondeur + 1
    FROM Categories c
    JOIN arbre_cat ac ON c.id_parent = ac.id_categorie
)
SELECT * FROM arbre_cat ORDER BY profondeur, nom;
```

---

## 12. INDEXES & PERFORMANCES

### 12.1 Pourquoi des indexes ?

Sans index : **lecture séquentielle** (full scan) → O(n).  
Avec index : **recherche par arbre B** → O(log n).

```sql
EXPLAIN ANALYZE SELECT * FROM Clients WHERE email = 'test@test.com';
-- Sans index : Seq Scan (lit toute la table)
-- Avec index  : Index Scan (2-3 lectures)
```

### 12.2 Types d'indexes

#### B-Tree (par défaut dans presque tous les SGBD)

```sql
CREATE INDEX idx_clients_email ON Clients(email);
```

**Utilisé pour :** `=`, `<`, `>`, `<=`, `>=`, `BETWEEN`, `IN`, `LIKE 'abc%'`

#### Hash

```sql
CREATE INDEX idx_hash ON Clients USING HASH (email);
```

**Utilisé pour :** `=` uniquement. Plus rapide que B-Tree pour l'égalité exacte.

#### Composite (multi-colonnes)

```sql
CREATE INDEX idx_client_date ON Commandes(id_client, date_commande);
```

**Ordre des colonnes important !** L'index peut servir pour :
- `WHERE id_client = X` (✅ première colonne)
- `WHERE id_client = X AND date_commande > Y` (✅ les deux)
- `WHERE date_commande > Y` (❌ pas la première colonne → inutilisable)

#### Partiel

```sql
-- Index qui ne concerne que les clients actifs
CREATE INDEX idx_clients_actifs ON Clients(email) WHERE actif = TRUE;
```

#### Unique

```sql
CREATE UNIQUE INDEX idx_email_unique ON Clients(email);
```

### 12.3 Index clusterisé (Clustered Index)

**La table est physiquement réorganisée selon l'index.**

- Une seule table = un seul clustered index (logiquement : la clé primaire)
- PostgreSQL : `CLUSTER table_name USING index_name`
- MySQL/InnoDB : la PK est clustered par défaut

**Avantage :** Les lectures séquentielles sur la PK sont très rapides.

### 12.4 Quand créer un index ?

✅ **Créer un index sur :**
- Colonnes utilisées dans `WHERE`, `JOIN`, `ORDER BY`
- Clés étrangères
- Colonnes avec haute sélectivité (beaucoup de valeurs distinctes)

❌ **Éviter sur :**
- Petites tables (< 1000 lignes)
- Colonnes rarement utilisées dans les requêtes
- Colonnes fréquemment mises à jour (index = overhead en écriture)
- Colonnes avec faible sélectivité (`sexe` : M/F → index inutile)

### 12.5 Analyse de requêtes

```sql
-- PostgreSQL
EXPLAIN ANALYZE SELECT * FROM Clients WHERE email = 'x';

-- MySQL
EXPLAIN SELECT * FROM Clients WHERE email = 'x';

-- SQL Server
SET STATISTICS TIME ON;
SET STATISTICS IO ON;
```

**Ce qu'il faut regarder :**
- **Seq Scan** sur grande table → manque un index
- **Index Scan** → bon
- **Bitmap Index Scan** → acceptable
- **Sort** sans index → peut être lent
- **Nested Loop** sur grande table → peut nécessiter un index

---

## 13. VUES (VIEWS)

### 13.1 Vue simple

```sql
CREATE VIEW ClientsCommandes AS
SELECT c.nom, c.email, COUNT(co.id_commande) AS nb_commandes
FROM Clients c
LEFT JOIN Commandes co ON c.id_client = co.id_client
GROUP BY c.id_client;

-- Utilisation
SELECT * FROM ClientsCommandes WHERE nb_commandes > 5;
```

### 13.2 Vue matérialisée (Materialized View)

```sql
-- PostgreSQL : les données sont stockées physiquement
CREATE MATERIALIZED VIEW CA_Mensuel AS
SELECT
    DATE_TRUNC('month', date_commande) AS mois,
    SUM(montant) AS ca
FROM Commandes
GROUP BY mois;

-- Rafraîchir
REFRESH MATERIALIZED VIEW CA_Mensuel;
```

**Vue simple vs matérialisée :**

| Critère | Vue simple | Vue matérialisée |
|---------|-----------|-----------------|
| Stockage | Aucun (requête SQL stockée) | Stocke les données |
| Fraîcheur | Toujours à jour | Nécessite rafraîchissement |
| Performance | Recalcule à chaque accès | Lecture directe |
| Index | Impossible | Possible |

### 13.3 Vue avec CHECK OPTION

```sql
CREATE VIEW ClientsActifs AS
SELECT * FROM Clients WHERE actif = TRUE
WITH CHECK OPTION;
-- Empêche d'insérer un client inactif via la vue
```

### 13.4 Mise à jour à travers une vue

```sql
-- Possible si la vue est simple (une table, pas d'agrégation, pas de DISTINCT)
UPDATE ClientsActifs SET email = 'nouveau@email.com' WHERE id_client = 1;
```

---

## 14. PROCÉDURES STOCKÉES & FONCTIONS

### 14.1 Fonction SQL

```sql
-- PostgreSQL
CREATE FUNCTION total_commandes_client(p_id INTEGER)
RETURNS INTEGER AS $$
    SELECT COUNT(*) FROM Commandes WHERE id_client = p_id;
$$ LANGUAGE SQL;

-- Utilisation
SELECT nom, total_commandes_client(id_client) FROM Clients;
```

### 14.2 Procédure stockée (PL/pgSQL)

```sql
CREATE OR REPLACE FUNCTION creer_commande(
    p_id_client INTEGER,
    p_montant DECIMAL
) RETURNS INTEGER AS $$
DECLARE
    v_id_commande INTEGER;
BEGIN
    -- Vérifier que le client existe
    IF NOT EXISTS (SELECT 1 FROM Clients WHERE id_client = p_id_client) THEN
        RAISE EXCEPTION 'Client % inexistant', p_id_client;
    END IF;

    -- Insérer
    INSERT INTO Commandes (id_client, montant, statut)
    VALUES (p_id_client, p_montant, 'en_attente')
    RETURNING id_commande INTO v_id_commande;

    RETURN v_id_commande;
END;
$$ LANGUAGE plpgsql;

-- Appel
SELECT creer_commande(1, 150.00);
```

### 14.3 Boucle et curseur

```sql
CREATE FUNCTION appliquer_remise(p_pourcentage DECIMAL) RETURNS VOID AS $$
DECLARE
    v_produit RECORD;
BEGIN
    FOR v_produit IN
        SELECT id_produit, prix FROM Produits WHERE stock > 0
    LOOP
        UPDATE Produits
        SET prix = prix * (1 - p_pourcentage / 100)
        WHERE id_produit = v_produit.id_produit;
    END LOOP;
END;
$$ LANGUAGE plpgsql;
```

**Important :** Éviter les curseurs quand une simple UPDATE suffit. La version ensembliste est toujours plus rapide.

### 14.4 MySQL — Procédure

```sql
DELIMITER //
CREATE PROCEDURE GetClients(IN p_actif BOOLEAN)
BEGIN
    SELECT * FROM Clients WHERE actif = p_actif;
END //
DELIMITER ;

CALL GetClients(TRUE);
```

### 14.5 Gestion d'erreurs

```sql
CREATE FUNCTION transferer(
    p_de INTEGER, p_vers INTEGER, p_montant DECIMAL
) RETURNS TEXT AS $$
BEGIN
    -- Vérifier le solde
    IF (SELECT solde FROM Comptes WHERE id = p_de) < p_montant THEN
        RETURN 'Solde insuffisant';
    END IF;

    UPDATE Comptes SET solde = solde - p_montant WHERE id = p_de;
    UPDATE Comptes SET solde = solde + p_montant WHERE id = p_vers;

    RETURN 'OK';
EXCEPTION
    WHEN OTHERS THEN
        RETURN 'Erreur: ' || SQLERRM;
END;
$$ LANGUAGE plpgsql;
```

---

## 15. DÉCLENCHEURS (TRIGGERS)

### 15.1 Syntaxe

```sql
CREATE TRIGGER nom_trigger
    {BEFORE | AFTER} {INSERT | UPDATE | DELETE}
    ON table
    [FOR EACH ROW]
    EXECUTE FUNCTION fonction_trigger();
```

### 15.2 Exemple PostgreSQL

```sql
-- 1. Créer la fonction du trigger
CREATE FUNCTION log_modification()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO Audit(operation, table_name, new_data, date)
        VALUES ('INSERT', TG_TABLE_NAME,
                row_to_json(NEW)::TEXT, NOW());
        RETURN NEW;

    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO Audit(operation, table_name, old_data, new_data, date)
        VALUES ('UPDATE', TG_TABLE_NAME,
                row_to_json(OLD)::TEXT,
                row_to_json(NEW)::TEXT, NOW());
        RETURN NEW;

    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO Audit(operation, table_name, old_data, date)
        VALUES ('DELETE', TG_TABLE_NAME,
                row_to_json(OLD)::TEXT, NOW());
        RETURN OLD;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- 2. Créer le trigger
CREATE TRIGGER trg_log_clients
    AFTER INSERT OR UPDATE OR DELETE ON Clients
    FOR EACH ROW
    EXECUTE FUNCTION log_modification();
```

### 15.3 MySQL — Trigger

```sql
DELIMITER //
CREATE TRIGGER before_insert_commande
    BEFORE INSERT ON Commandes
    FOR EACH ROW
BEGIN
    IF NEW.montant <= 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Montant doit être > 0';
    END IF;
END //
DELIMITER ;
```

### 15.4 Cas d'usage des triggers

| Usage | Exemple |
|-------|---------|
| **Audit** | Enregistrer qui a modifié quoi et quand |
| **Validation** | Vérifier une règle métier avant insertion |
| **Synchronisation** | Mettre à jour un cache ou une table de stats |
| **Historisation** | Sauvegarder l'ancienne valeur avant UPDATE |

**Mise en garde :** Les triggers sont exécutés dans la même transaction. Un trigger lent ralentit toute l'opération. Ils rendent le debug difficile.

---

## 16. TRANSACTIONS & VERROUS

### 16.1 BEGIN, COMMIT, ROLLBACK

```sql
BEGIN;

UPDATE Comptes SET solde = solde - 100 WHERE id = 1;
UPDATE Comptes SET solde = solde + 100 WHERE id = 2;

-- Si tout va bien
COMMIT;

-- Si erreur
ROLLBACK;
```

### 16.2 Savepoints

```sql
BEGIN;
INSERT INTO Commandes(id_client, montant) VALUES (1, 100);
SAVEPOINT sp1;

UPDATE Stock SET quantite = quantite - 1 WHERE id_produit = 10;
-- Oups, stock insuffisant : on annule seulement cette partie
ROLLBACK TO sp1;

-- On continue
COMMIT;
```

### 16.3 Niveaux d'isolation (SQL standard)

```
READ UNCOMMITTED    → Dirty reads, non-repeatable reads, phantom reads
READ COMMITTED      →         Non-repeatable reads, phantom reads
REPEATABLE READ     →                           Phantom reads
SERIALIZABLE        →                           (aucun)
```

| Problème | Description |
|----------|-------------|
| **Dirty read** | Lire une donnée modifiée par une transaction non encore validée |
| **Non-repeatable read** | Lire 2 fois la même ligne et obtenir 2 valeurs différentes (modifiée entre-temps) |
| **Phantom read** | Une deuxième lecture retourne plus de lignes qu'avant (insertion entre-temps) |

```sql
-- PostgreSQL : changer le niveau
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
```

### 16.4 Verrous (Locks)

```sql
-- Verrouillage explicite (PostgreSQL)
BEGIN;
SELECT * FROM Comptes WHERE id = 1 FOR UPDATE;  -- verrouillage exclusif
UPDATE Comptes SET solde = solde - 100 WHERE id = 1;
COMMIT;

-- MySQL
SELECT * FROM Comptes WHERE id = 1 FOR UPDATE;
SELECT * FROM Comptes WHERE id = 1 LOCK IN SHARE MODE;  -- lecture seule
```

**Deadlock :**
```
Transaction 1 : verrouille A, demande B
Transaction 2 : verrouille B, demande A
→ Chacune attend l'autre → DEADLOCK
→ Le SGBD tue automatiquement une transaction
```

### 16.5 Concurrence — Bonnes pratiques

1. **Transactions courtes** — moins de risque de conflit
2. **Ordre d'accès cohérent** — toujours verrouiller A puis B (jamais B puis A)
3. **Niveau d'isolation minimum nécessaire** — READ COMMITTED suffit souvent
4. **Éviter les inputs utilisateur** dans une transaction longue

---

## 17. SÉCURITÉ & INJECTION SQL

### 17.1 Injection SQL — Le danger

```sql
-- ❌ MAUVAIS : concaténation directe
req = "SELECT * FROM Clients WHERE nom = '" + user_input + "'";

-- Si user_input = "Dupont' OR '1'='1"
-- La requête devient :
SELECT * FROM Clients WHERE nom = 'Dupont' OR '1'='1';
-- → TOUS les clients fuient !

-- Pire : user_input = "'; DROP TABLE Clients; --"
SELECT * FROM Clients WHERE nom = ''; DROP TABLE Clients; --'
-- → Table Clients supprimée !
```

### 17.2 Protection : Requêtes paramétrées

```sql
-- PostgreSQL (libpq)
PREPARE find_client (TEXT) AS
    SELECT * FROM Clients WHERE nom = $1;
EXECUTE find_client('Dupont');

-- En PHP (PDO)
$stmt = $pdo->prepare("SELECT * FROM Clients WHERE email = ?");
$stmt->execute([$email]);

-- En Python
cursor.execute("SELECT * FROM Clients WHERE nom = %s", (nom,))

-- En Java (JDBC)
PreparedStatement stmt = conn.prepareStatement(
    "SELECT * FROM Clients WHERE nom = ?");
stmt.setString(1, nom);
```

**Règle d'or :** JAMAIS de concaténation de chaînes pour construire du SQL → TOUJOURS des requêtes paramétrées.

### 17.3 Gestion des utilisateurs

```sql
-- Créer un utilisateur
CREATE USER app_user WITH PASSWORD 'strong_password';

-- Donner seulement les droits nécessaires
GRANT SELECT, INSERT, UPDATE ON Clients TO app_user;
GRANT SELECT, INSERT ON Commandes TO app_user;
GRANT USAGE ON SEQUENCE commandes_id_seq TO app_user;

-- Ne JAMAIS donner
GRANT ALL PRIVILEGES ON ALL TABLES TO app_user;
GRANT DROP, CREATE, TRUNCATE TO app_user;
```

### 17.4 Principe du moindre privilège

- L'application web a un compte **lecture/écriture limité**
- L'administrateur a un compte séparé avec tous les droits
- Les comptes de service (backup, migration) sont différents

---

## 18. OPTIMISATION DE REQUÊTES

### 18.1 Les 10 commandements

1. **SELECT * → SELECT colonnes** — Ne remontez que ce dont vous avez besoin
2. **Index sur les clés étrangères** — Les JOIN en ont besoin
3. **Éviter les fonctions sur les colonnes indexées** — `WHERE YEAR(date) = 2024` → pas d'index. Écrire `WHERE date >= '2024-01-01' AND date < '2025-01-01'`
4. **Éviter les OR** — Utiliser UNION ou IN
5. **Préférer EXISTS à IN** pour les sous-requêtes
6. **LIMIT avec ORDER BY** — dès que possible
7. **Éviter les curseurs** — Préférer le traitement ensembliste
8. **Analyser les plans d'exécution** — `EXPLAIN ANALYZE`
9. **Mettre à jour les statistiques** — `ANALYZE;` régulièrement
10. **Éviter les boucles en PL/SQL** — Faire en SQL unique si possible

### 18.2 Anti-patrons à éviter

```sql
-- ❌ Éviter : DISTINCT avec JOIN souvent signe de mauvaise structure
SELECT DISTINCT c.* FROM Clients c JOIN Commandes co ON c.id = co.id_client;

-- ✅ Solution : EXISTS
SELECT * FROM Clients c WHERE EXISTS (
    SELECT 1 FROM Commandes co WHERE co.id_client = c.id_client
);

-- ❌ Éviter : LIKE '%mot%' (ne peut pas utiliser d'index)
SELECT * FROM Produits WHERE nom LIKE '%chaise%';

-- ✅ Alternative : PostgreSQL full-text search
SELECT * FROM Produits WHERE to_tsvector('french', nom) @@ to_tsquery('chaise');

-- ❌ Éviter : fonctions sur colonne indexée
SELECT * FROM Commandes WHERE DATE(date_commande) = '2024-01-01';

-- ✅ Solution
SELECT * FROM Commandes
WHERE date_commande >= '2024-01-01' AND date_commande < '2024-01-02';
```

### 18.3 Techniques avancées

```sql
-- PostgreSQL : ANALYZE pour des stats à jour
ANALYZE;

-- VACUUM (PostgreSQL) : récupérer l'espace des lignes supprimées
VACUUM ANALYZE Clients;

-- Partitionnement (PostgreSQL 10+)
CREATE TABLE Ventes_2024 PARTITION OF Ventes
    FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');

-- LATERAL JOIN (PostgreSQL)
-- Pour chaque client, ses 3 dernières commandes
SELECT c.nom, co.montant, co.date_commande
FROM Clients c
CROSS JOIN LATERAL (
    SELECT * FROM Commandes
    WHERE id_client = c.id_client
    ORDER BY date_commande DESC
    LIMIT 3
) co;
```

### 18.4 Lecture du plan d'exécution (PostgreSQL)

```sql
EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT e.nom, COUNT(co.id_commande)
FROM Employes e
LEFT JOIN Commandes co ON e.id_employe = co.id_commercial
WHERE e.actif = TRUE
GROUP BY e.id_employe;
```

**Ce qu'il faut regarder :**
- **cost** : estimation en unités arbitraires
- **actual time** : le vrai temps
- **rows** : nb de lignes estimé vs réel (gros écart = stats obsolètes)
- **Seq Scan** sur grande table → index manquant
- **Sort** sans index → peut être lent

---

## 19. MODÉLISATION & MERISE (SCHÉMA CONCEPTUEL)

### 19.1 MCD — Modèle Conceptuel de Données

```
Entité : un "objet" du monde réel (Client, Produit)
Association : lien entre entités (Commander, Appartenir)
Propriété : attribut d'une entité
Cardinalité : combien de fois une entité participe à une association
```

**Cardinalités :**
```
(0,1)  → zéro ou un
(1,1)  → exactement un
(0,n)  → zéro ou plusieurs
(1,n)  → un ou plusieurs
```

```
Client ──────(1,n)────── Passe ──────(0,n)────── Commande
  │                                                  │
 nom                                              date
 email                                             montant
```

### 19.2 MLD — Modèle Logique de Données

```
Client (id_client, nom, email)
Commande (id_commande, date, montant, #id_client)
```

`#id_client` = clé étrangère vers Client.

### 19.3 MPD — Modèle Physique de Données

```sql
CREATE TABLE Client (
    id_client SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE Commande (
    id_commande SERIAL PRIMARY KEY,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    montant DECIMAL(10,2),
    id_client INTEGER NOT NULL,
    FOREIGN KEY (id_client) REFERENCES Client(id_client)
);
```

### 19.4 Héritage en base de données

**Problème :** `Client` est un `Utilisateur`. Plusieurs solutions.

```
Option A — Table unique (Single Table Inheritance) :
Utilisateur(id, nom, email, type, solde, entreprise, …)
→ Beaucoup de NULL dans les colonnes inutilisées

Option B — Tables séparées (Class Table Inheritance) :
Utilisateur(id, nom, email)
Client(id, solde) → PK = FK vers Utilisateur
Fournisseur(id, entreprise) → PK = FK vers Utilisateur

Option C — PostgreSQL : héritage natif
CREATE TABLE Client () INHERITS (Utilisateur);
```

---

## 20. NoSQL — INTRODUCTION

### 20.1 SQL vs NoSQL

| Critère | SQL | NoSQL |
|---------|-----|-------|
| **Schéma** | Fixe, rigide | Flexible, dynamique |
| **Scalabilité** | Verticale (plus gros serveur) | Horizontale (plus de serveurs) |
| **ACID** | Oui | Souvent BASE (Eventually Consistent) |
| **Requêtes** | SQL puissant | Limitée, spécifique au produit |
| **Idéal pour** | Transactions, intérité, reporting | Big Data, temps réel, prototyping |

**BASE (contraire d'ACID) :**
- **B**asically **A**vailable
- **S**oft state
- **E**ventually consistent

### 20.2 Types de NoSQL

#### Documents (MongoDB)

```json
{
  "_id": ObjectId("..."),
  "nom": "Dupont",
  "email": "dupont@email.com",
  "commandes": [
    { "date": "2024-01-15", "montant": 150 },
    { "date": "2024-02-20", "montant": 89 }
  ]
}
```

**Usage :** catalogues, CMS, logs.

#### Clé-Valeur (Redis)

```bash
SET client:1:nom "Dupont"
SET client:1:email "dupont@email.com"
GET client:1:nom
```

**Usage :** cache, sessions, compteurs.

#### Colonne (Cassandra)

```
Row Key   | nom    | email        | commandes
dupont    | Dupont | dupont@...   | {2024-01:150}
```

**Usage :** time-series, IoT, analytics.

#### Graphe (Neo4j)

```
(n:Personne {nom: "Dupont"}) -[a:A_ACHETE]-> (p:Produit {nom: "Chaise"})
```

**Usage :** réseaux sociaux, recommandations, fraude.

### 20.3 Quand utiliser quoi ?

```
✅ SQL :
- Comptabilité, banque (ACID obligatoire)
- Rapports complexes (jointures, agrégations)
- Relations entre entités nombreuses
- Données structurées stables

✅ NoSQL :
- Volumes massifs (milliards de lignes)
- Schéma changeant fréquemment
- Cache / temps réel
- Données dénormalisées acceptables
```

---

## 21. EXERCICES PRATIQUES

### Exercice 1 — Schéma bibliothèque
Créer le schéma d'une bibliothèque :
- Livres (ISBN, titre, auteur, année, disponible)
- Adhérents (id, nom, email)
- Emprunts (id, id_adherent, isbn, date_emprunt, date_retour)
Contraintes : pas d'emprunt si livre déjà emprunté, pas d'emprunt si adhérent a 3+ livres.

### Exercice 2 — Requêtes bibliothèque
1. Livres actuellement empruntés (avec nom emprunteur et date)
2. Adhérents avec retards (>14 jours)
3. Auteur le plus emprunté
4. Livres jamais empruntés

### Exercice 3 — Normalisation
Table `Notes(id_etudiant, nom_etudiant, id_cours, intitule_cours, note, prof)`
Identifier les dépendances fonctionnelles. Normaliser jusqu'en 3FN.

### Exercice 4 — Window Functions
Table `Ventes(id, produit, categorie, montant, date)`
1. Classer les produits par CA total (RANK)
2. Pour chaque vente, CA cumulé de la catégorie
3. Évolution du CA mois par mois (LAG)
4. Moyenne mobile 3 mois
5. Top 3 produits par catégorie

### Exercice 5 — CTE récursif
Table `Categories(id, nom, id_parent)`
- Insérer 10 catégories sur 3 niveaux (ex: Électronique → Ordinateurs → PC Portable)
- Afficher l'arbre complet avec indentation
- Compter le nombre de sous-catégories pour chaque nœud

### Exercice 6 — Procédure stockée
Créer une procédure `facturer_penalites()` qui :
1. Calcule les pénalités pour les emprunts en retard (0.50€/jour)
2. Ajoute la pénalité à la table `Penalites`
3. Retourne le nombre d'adhérents pénalisés

### Exercice 7 — Trigger
Créer un trigger qui empêche la suppression d'un client s'il a des commandes en cours (statut != 'livree').

### Exercice 8 — Optimisation
Soit la requête :
```sql
SELECT * FROM Commandes WHERE YEAR(date) = 2024 ORDER BY montant DESC;
```
1. Expliquer le problème
2. Réécrire la requête correctement
3. Suggérer un index

### Exercice 9 — Injection SQL
Le code suivant est vulnérable. Expliquer pourquoi et le corriger :
```php
$id = $_GET['id'];
$result = $db->query("SELECT * FROM Produits WHERE id = $id");
```

### Exercice 10 — Modélisation
Modéliser (MCD + MLD + SQL) un système de réservation de vols :
- Compagnies, Avions, Vols, Passagers, Réservations
- Un passager peut réserver plusieurs vols
- Un vol a un avion, une date, un départ, une arrivée
- Gérer les classes (eco, business, première)

### Exercice 11 — Partitionnement
Créer une table partitionnée `Logs` par mois et expliquer comment cela améliore les performances.

### Exercice 12 — Transaction
Écrire une transaction qui transfère de l'argent entre deux comptes bancaires. Gérer :
- Solde insuffisant
- Erreur de connexion (ROLLBACK)
- Deadlock

---

## Annexe : Résumé des commandes SQL avancées

| Commande | But |
|----------|-----|
| `WITH RECURSIVE` | Requêtes hiérarchiques / récursives |
| `ROW_NUMBER() OVER()` | Numérotation de lignes |
| `RANK() / DENSE_RANK()` | Classement avec/sans trous |
| `LAG() / LEAD()` | Accès à la ligne précédente/suivante |
| `SUM() OVER(ORDER BY)` | Cumul |
| `PARTITION BY` | Fenêtrage par groupe |
| `ROWS BETWEEN` | Cadre de fenêtre personnalisé |
| `EXPLAIN ANALYZE` | Analyse du plan d'exécution |
| `FOR UPDATE` | Verrouillage explicite |
| `SAVEPOINT` | Point de restauration dans une transaction |
| `CREATE INDEX CONCURRENTLY` | Créer un index sans bloquer les écritures |
| `REFRESH MATERIALIZED VIEW` | Actualiser une vue matérialisée |
| `CREATE TRIGGER` | Déclencheur automatique |
| `COALESCE` | Valeur par défaut si NULL |
| `LATERAL JOIN` | Sous-requête dépendante dans un JOIN |

---

*Fin du cours — Base de Données & SQL Avancé*
