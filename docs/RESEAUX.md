# Formation Complète : Les Bases du Réseau Informatique (A à Z)

---

## Table des Matières

1. [Introduction aux Réseaux](#1-introduction-aux-réseaux)
2. [Concepts Fondamentaux](#2-concepts-fondamentaux)
3. [Le Modèle OSI](#3-le-modèle-osi)
4. [Le Modèle TCP/IP](#4-le-modèle-tcpip)
5. [Les Adresses IP et le Routage](#5-les-adresses-ip-et-le-routage)
6. [Les Protocoles Réseau](#6-les-protocoles-réseau)
7. [Les Équipements Réseau](#7-les-équipements-réseau)
8. [Les Topologies et Architectures](#8-les-topologies-et-architectures)
9. [Les Réseaux Sans Fil (Wi-Fi)](#9-les-réseaux-sans-fil-wi-fi)
10. [La Sécurité Réseau](#10-la-sécurité-réseau)
11. [Le Dépannage et Outils](#11-le-dépannage-et-outils)
12. [Glossaire](#12-glossaire)

---

## 1. Introduction aux Réseaux

### 1.1 Qu'est-ce qu'un réseau informatique ?

Un **réseau informatique** est un ensemble d'équipements (ordinateurs, serveurs, imprimantes, routeurs, etc.) reliés entre eux pour échanger des informations et partager des ressources.

**Objectifs principaux :**
- **Partage de ressources** (fichiers, imprimantes, connexion Internet)
- **Communication** (email, messagerie, visioconférence)
- **Centralisation des données** (bases de données, serveurs)
- **Fiabilité et redondance**

### 1.2 Classification par taille

| Type | Taille | Exemple |
|------|--------|---------|
| **PAN** (Personal Area Network) | ~1m | Bluetooth, téléphone |
| **LAN** (Local Area Network) | ~100m-1km | Maison, entreprise, école |
| **MAN** (Metropolitan Area Network) | ~10km | Ville, campus universitaire |
| **WAN** (Wide Area Network) | ~1000km+ | Internet, inter-sièges |
| **GAN** (Global Area Network) | Planétaire | Internet |

### 1.3 Classification par mode de connexion

- **Filaire** : câbles Ethernet, fibre optique
- **Sans fil** : Wi-Fi, Bluetooth, satellite, 4G/5G

### 1.4 Classification par architecture

- **Peer-to-Peer (P2P)** : Chaque machine est à la fois client et serveur
- **Client-Serveur** : Des serveurs centraux fournissent des services aux clients

---

## 2. Concepts Fondamentaux

### 2.1 La transmission de données

Les données sont transmises sous forme de **bits** (0 et 1). Un bit est l'unité élémentaire d'information.

| Unité | Valeur |
|-------|--------|
| 1 bit | 0 ou 1 |
| 1 octet (byte) | 8 bits |
| 1 Ko | 1024 octets |
| 1 Mo | 1024 Ko |
| 1 Go | 1024 Mo |

### 2.2 Le débit et la bande passante

- **Débit** : Quantité de données transmises par seconde (bps, Kbps, Mbps, Gbps)
- **Bande passante** : Capacité maximale théorique du canal de transmission
- **Latence** : Temps de propagation (ping) - mesuré en ms

### 2.3 Les modes de transmission

- **Simplex** : Transmission à sens unique (TV, radio)
- **Half-Duplex** : Transmission bidirectionnelle alternée (talkie-walkie)
- **Full-Duplex** : Transmission bidirectionnelle simultanée (téléphone)

### 2.4 Les supports de transmission

**Cuivre (paires torsadées) :**
- Cat5e : 1 Gbps jusqu'à 100m
- Cat6 : 10 Gbps jusqu'à 55m
- Cat6a : 10 Gbps jusqu'à 100m
- Cat7 / Cat8 : 40 Gbps

**Fibre optique :**
- Monomode : longue distance (km), laser
- Multimode : courte distance, LED
- Débits : 10 Gbps à 400 Gbps+

**Sans fil :**
- Wi-Fi (802.11)
- Bluetooth
- Ondes radio, micro-ondes, infrarouge

### 2.5 La commutation

- **Commutation de circuits** : Circuit dédié pendant toute la communication (téléphone traditionnel)
- **Commutation de paquets** : Les données sont découpées en paquets, chaque paquet suit son propre chemin (Internet)

---

## 3. Le Modèle OSI

### 3.1 Présentation

Le modèle **OSI** (Open Systems Interconnection) est un standard ISO qui décrit 7 couches pour la communication réseau. Chaque couche rend service à la couche supérieure.

```
 7. Application      ◄ Données utilisateur (HTTP, FTP, SMTP)
 6. Présentation     ◄ Formatage, chiffrement, compression
 5. Session          ◄ Gestion des sessions, dialogues
 4. Transport        ◄ Segments, fiabilité, contrôle de flux (TCP/UDP)
 3. Réseau           ◄ Paquets, routage, adressage logique (IP)
 2. Liaison          ◄ Tramses, adressage MAC, détection d'erreurs
 1. Physique         ◄ Bits, signaux électriques/optiques
```

### 3.2 Détail des couches

#### Couche 1 : Physique
- Transmission brute de bits sur le support physique
- Caractéristiques électriques, mécaniques, optiques
- Câbles, connecteurs, hubs, répéteurs

#### Couche 2 : Liaison (Data Link)
- Adressage MAC (Media Access Control)
- Découpage en trames (frames)
- Détection et correction d'erreurs (CRC)
- Sous-couches : LLC (Logical Link Control) et MAC
- Équipements : switches, ponts (bridges)
- Protocoles : Ethernet, PPP, ARP

**L'adresse MAC :** Identifiant unique de 48 bits (6 octets) affecté à chaque carte réseau. Format hexadécimal : `00:1A:2B:3C:4D:5E`

#### Couche 3 : Réseau (Network)
- Routage des paquets entre réseaux différents
- Adressage logique (adresse IP)
- Découpage en paquets
- Protocoles : IP, ICMP, ARP, OSPF, BGP
- Équipements : routeurs

#### Couche 4 : Transport
- Transport fiable ou non entre applications
- Contrôle de flux et de congestion
- Segmentation et réassemblage
- Protocoles : TCP (fiable), UDP (non fiable)

#### Couche 5 : Session
- Établissement, maintien et terminaison des sessions
- Gestion du dialogue (qui parle quand)
- Reprise sur interruption
- Protocoles : NetBIOS, RPC

#### Couche 6 : Présentation
- Traduction des données (format)
- Chiffrement / déchiffrement
- Compression / décompression
- Exemples : SSL/TLS, JPEG, ASCII/Unicode

#### Couche 7 : Application
- Interface avec les applications utilisateur
- Protocoles : HTTP, HTTPS, FTP, SMTP, POP3, IMAP, DNS, DHCP, SSH

### 3.3 Principe d'encapsulation

Quand des données traversent le modèle, chaque couche ajoute son propre en-tête (header) :

```
Données brutes
→ [AP Data]           (Couche 7)
→ [PH AP Data]        (Couche 6)
→ [SH PH AP Data]     (Couche 5)
→ [TH SH PH AP Data]  (Couche 4)
→ [NH TH SH PH AP DT] (Couche 3)
→ [LH NH TH ... CRC]  (Couche 2)
→ Bits sur le câble   (Couche 1)
```

**Mnémo technique français** : « **P**ar **S**ouci **T**echnique, **R**ien **L**e **P**auvre » (Physique, Session, Transport, Réseau, Liaison, Présentation - à vérifier). Mieux : **P**hysique - **L**iaison - **R**éseau - **T**ransport - **S**ession - **P**résentation - **A**pplication

Du bas vers le haut : « **P**eu **L**es **R**éseaux **T**ransportent **S**ans **P**robleme **A**ucun »

---

## 4. Le Modèle TCP/IP

### 4.1 Présentation

Le modèle **TCP/IP** (Transmission Control Protocol / Internet Protocol) est le modèle pratique utilisé sur Internet. Il comporte 4 couches :

```
 4. Application       ◄ HTTP, FTP, SMTP, DNS, DHCP, SSH
 3. Transport         ◄ TCP, UDP
 2. Internet          ◄ IP, ICMP, ARP
 1. Accès réseau      ◄ Ethernet, Wi-Fi, PPP
```

### 4.2 Correspondance OSI ↔ TCP/IP

| OSI (7 couches) | TCP/IP (4 couches) |
|----------------|-------------------|
| Application | Application |
| Présentation | ↓ |
| Session | ↓ |
| Transport | Transport |
| Réseau | Internet |
| Liaison | Accès réseau |
| Physique | ↓ |

### 4.3 TCP vs UDP

| Critère | TCP | UDP |
|---------|-----|-----|
| Fiabilité | Garantie de livraison | Pas de garantie |
| Ordre | Maintient l'ordre | Pas d'ordre |
| Contrôle de flux | Oui | Non |
| Contrôle d'erreurs | Oui (retransmission) | Oui (checksum, pas de retransmission) |
| Connexion | Orienté connexion (3-way handshake) | Sans connexion |
| Vitesse | Plus lent | Plus rapide |
| Utilisation | Web, email, FTP, SSH | Streaming, VoIP, DNS, jeux |

**Le 3-way handshake TCP :**
1. Client → SYN (synchronisation)
2. Serveur → SYN-ACK (accusé)
3. Client → ACK (accusé de réception)
→ Connexion établie

**Structure d'un segment TCP :**

```
┌──────────┬──────────┬────────────┬──────────┬──────┬───────────┐
│ Port src │ Port dst │ Num seq    │ Num ack  │ Flags│ Checksum  │
│ (16 bits)│ (16 bits)│ (32 bits)  │ (32 bits)│      │ + Options │
└──────────┴──────────┴────────────┴──────────┴──────┴───────────┘
```

Flags TCP importants : SYN, ACK, FIN, RST, PSH, URG

---

## 5. Les Adresses IP et le Routage

### 5.1 Qu'est-ce qu'une adresse IP ?

L'adresse **IP** (Internet Protocol) est un identifiant unique attribué à chaque interface réseau. Elle permet d'identifier un hôte sur un réseau.

### 5.2 IPv4

Format : 4 octets (32 bits) écrits en notation décimale pointée.

Exemple : `192.168.1.1`

Chaque octet va de 0 à 255.

**Structure d'une adresse IPv4 :**
```
[Partie réseau] | [Partie hôte]
```

Le **masque de sous-réseau** détermine la séparation.

Exemples de masques :
- `255.0.0.0` → `/8` → 16 millions d'hôtes
- `255.255.0.0` → `/16` → 65 534 hôtes
- `255.255.255.0` → `/24` → 254 hôtes
- `255.255.255.252` → `/30` → 2 hôtes (liens point-à-point)

**Notation CIDR** (Classless Inter-Domain Routing) : `192.168.1.0/24`

#### Classes d'adresses IPv4 (historique)

| Classe | Début | Fin | Masque par défaut | Usage |
|--------|-------|-----|-------------------|-------|
| A | 0.0.0.0 | 127.255.255.255 | /8 | Très grands réseaux |
| B | 128.0.0.0 | 191.255.255.255 | /16 | Réseaux moyens |
| C | 192.0.0.0 | 223.255.255.255 | /24 | Petits réseaux |
| D | 224.0.0.0 | 239.255.255.255 | - | Multicast |
| E | 240.0.0.0 | 255.255.255.255 | - | Réservé / Recherche |

#### Adresses privées (RFC 1918) - Non routées sur Internet

| Plage | Masque | Nombre d'adresses |
|-------|--------|-------------------|
| 10.0.0.0 - 10.255.255.255 | /8 | 16 777 216 |
| 172.16.0.0 - 172.31.255.255 | /12 | 1 048 576 |
| 192.168.0.0 - 192.168.255.255 | /16 | 65 536 |

#### Adresses spéciales

- `127.0.0.1` : **localhost** (boucle locale)
- `169.254.x.x` : APIPA (auto-configuration quand aucun DHCP)
- `0.0.0.0` : Toutes les interfaces
- `255.255.255.255` : Broadcast limité
- `x.x.x.0` : Adresse du réseau
- `x.x.x.255` : Adresse de broadcast (dans un /24)

### 5.3 IPv6

IPv6 remplace IPv4 pour pallier l'épuisement des adresses.

- 128 bits (16 octets)
- Notation hexadécimale : `2001:0db8:85a3:0000:0000:8a2e:0370:7334`
- Raccourcis : suppression des zéros non significatifs, `::` pour une chaîne de zéros
- `fe80::/10` : adresses link-local
- `fc00::/7` : adresses uniques locales (privées)
- `2000::/3` : adresses globales unicast (Internet)

### 5.4 Le masque de sous-réseau et le calcul

**Opération ET binaire** entre l'adresse IP et le masque → adresse réseau.

Exemple :
```
IP :     192.168.10.42  → 11000000.10101000.00001010.00101010
Masque : 255.255.255.0  → 11111111.11111111.11111111.00000000
ET      ─────────────────────────────────────────────────
Réseau : 192.168.10.0   → 11000000.10101000.00001010.00000000
```

#### Le subnetting (découpage en sous-réseaux)

Technique qui consiste à emprunter des bits à la partie hôte pour créer des sous-réseaux.

Exemple : Découper `192.168.1.0/24` en 4 sous-réseaux
- On emprunte 2 bits → /26
- Sous-réseaux : 192.168.1.0/26, 192.168.1.64/26, 192.168.1.128/26, 192.168.1.192/26
- Chaque sous-réseau a 62 hôtes utilisables

| Masque | Bits | Hôtes utilisables |
|--------|------|-------------------|
| /24 | 0 | 254 |
| /25 | 1 | 126 |
| /26 | 2 | 62 |
| /27 | 3 | 30 |
| /28 | 4 | 14 |
| /29 | 5 | 6 |
| /30 | 6 | 2 |

### 5.5 Le routage

Le **routage** est le processus de sélection du chemin pour transmettre des paquets d'un réseau à un autre.

**Table de routage :** Base de données qui associe des réseaux de destination à des interfaces de sortie ou des adresse de prochain saut (next hop).

**Types de routage :**

| Type | Description | Protocoles |
|------|-------------|------------|
| Statique | Routes configurées manuellement | Aucun |
| Dynamique | Routes apprises automatiquement | OSPF, BGP, RIP, EIGRP |
| Par défaut (default gateway) | Route pour tout ce qui n'est pas dans la table | `0.0.0.0/0` |

#### Routage direct vs indirect

- **Direct** : La destination est sur le même réseau (ARP pour trouver l'adresse MAC)
- **Indirect** : La destination est sur un autre réseau → passer par la passerelle

**Principaux protocoles de routage :**

| Protocole | Type | Métrique | Algorithme |
|-----------|------|----------|------------|
| RIP | IGP (interne) | Sauts (max 15) | Distance vector |
| OSPF | IGP (interne) | Coût (bande passante) | Link state (SPF) |
| EIGRP | IGP (interne, Cisco) | Bande passante + délai | Hybrid |
| BGP | EGP (externe) | Politiques (Chemins AS) | Path vector |

**IGP** = Interior Gateway Protocol (au sein d'un AS)
**EGP** = Exterior Gateway Protocol (entre AS)
**AS** = Autonomous System

---

## 6. Les Protocoles Réseau

### 6.1 Protocoles de la couche Application

#### HTTP / HTTPS (Port 80 / 443)
- **HTTP** : HyperText Transfer Protocol - protocole du Web
- **HTTPS** : HTTP over SSL/TLS (chiffré)
- Méthodes : GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS
- Codes de statut : 200 (OK), 301 (Redirect), 403 (Forbidden), 404 (Not Found), 500 (Server Error)

#### FTP (Ports 20 et 21)
- File Transfer Protocol - transfert de fichiers
- Mode actif et mode passif

#### SMTP (Port 25, 587)
- Simple Mail Transfer Protocol - envoi d'emails

#### POP3 (Port 110) et IMAP (Port 143)
- Réception d'emails
- POP3 : télécharge et supprime du serveur
- IMAP : laisse les messages sur le serveur

#### DNS (Port 53)
- Domain Name System - résolution noms d'hôtes ↔ adresses IP
- Hiérarchie : Root → TLD (.com, .fr) → Domaine → Sous-domaine

**Types d'enregistrements DNS :**
- **A** : IPv4
- **AAAA** : IPv6
- **CNAME** : Alias
- **MX** : Mail Exchange
- **NS** : Name Server
- **TXT** : Texte (SPF, DKIM, DMARC)
- **PTR** : Reverse DNS (IP → nom)

#### DHCP (Ports 67/68)
- Dynamic Host Configuration Protocol - attribution automatique d'adresses IP
- **DORA** : Discover → Offer → Request → Acknowledge

#### SSH (Port 22)
- Secure Shell - accès à distance sécurisé (chiffré)

#### Telnet (Port 23)
- Accès à distance non sécurisé (texte clair) - obsolète

### 6.2 Protocoles de la couche Transport

#### TCP (Ports variés)
Voir section 4.3

#### UDP (Ports variés)
Voir section 4.3

#### Ports courants

| Port | Protocole | Service |
|------|-----------|---------|
| 20/21 | TCP | FTP |
| 22 | TCP | SSH |
| 23 | TCP | Telnet |
| 25 | TCP | SMTP |
| 53 | TCP/UDP | DNS |
| 67/68 | UDP | DHCP |
| 80 | TCP | HTTP |
| 110 | TCP | POP3 |
| 143 | TCP | IMAP |
| 443 | TCP | HTTPS |
| 3389 | TCP | RDP (Remote Desktop) |

### 6.3 Protocoles de la couche Internet

#### IP (Internet Protocol)
- Routage des paquets
- IPv4 (32 bits) et IPv6 (128 bits)
- Non fiable (best effort) - la fiabilité est assurée par TCP

#### ICMP (Internet Control Message Protocol)
- Messages de contrôle et d'erreur
- **ping** : Echo Request / Echo Reply
- **traceroute** : Time Exceeded
- Types : Destination Unreachable, Time Exceeded, Redirect

#### ARP (Address Resolution Protocol)
- Résolution adresse IP → adresse MAC
- Requête broadcast : "Qui a l'IP 192.168.1.10 ?"
- Cache ARP : table temporaire des correspondances IP-MAC

---

## 7. Les Équipements Réseau

### 7.1 Carte réseau (NIC - Network Interface Card)
- Interface entre l'ordinateur et le réseau
- Possède une adresse MAC unique
- Connecteurs : RJ45 (Ethernet), fibre, antenne Wi-Fi

### 7.2 Hub (concentrateur)
- **Couche 1** (Physique)
- Répète le signal sur tous les ports
- Aucune intelligence - domaine de collision unique
- Obsolète

### 7.3 Switch (commutateur)
- **Couche 2** (Liaison)
- Apprend les adresses MAC et ne transmet que sur le port concerné
- Chaque port = domaine de collision séparé
- Types : non managé (plug & play), managé (VLAN, QoS, SNMP)
- **Table MAC** : association MAC ↔ port

### 7.4 Routeur
- **Couche 3** (Réseau)
- Connecte différents réseaux entre eux
- Prend des décisions de routage basées sur les adresses IP
- NAT (Network Address Translation)
- Pare-feu intégré souvent
- Utilise des tables de routage

### 7.5 Passerelle (Gateway)
- Point d'entrée/sortie vers un autre réseau
- La "default gateway" est le routeur par lequel on accède à Internet

### 7.6 Modem
- Module/Démodule les signaux (numérique ↔ analogique)
- Modem ADSL, câble, fibre (ONT)

### 7.7 Point d'accès (Access Point - AP)
- Permet la connexion sans fil (Wi-Fi) au réseau filaire
- Mode bridge (extension) ou routeur

### 7.8 Pare-feu (Firewall)
- Filtre le trafic entrant/sortant basé sur des règles
- Types : logiciel (Windows Defender, iptables), matériel
- **Stateful** : analyse le contexte des connexions
- **Stateless** : filtre paquet par paquet

### 7.9 Proxy
- Intermédiaire entre client et serveur
- Cache, filtrage, anonymat

### 7.10 Load Balancer (répartiteur de charge)
- Distribue le trafic entre plusieurs serveurs
- Haute disponibilité et montée en charge

---

## 8. Les Topologies et Architectures

### 8.1 Topologies physiques

| Topologie | Description | Avantages | Inconvénients |
|-----------|-------------|-----------|---------------|
| **Bus** | Tous les équipements sur un seul câble | Simple | Un seul câble = point unique de panne |
| **Étoile (Star)** | Tous les équipements connectés à un switch central | Fiable, facile à dépanner | Dépend du switch central |
| **Anneau (Ring)** | Chaque équipement connecté à deux voisins | Équitable | Un nœud mort peut casser l'anneau |
| **Maillage (Mesh)** | Tous connectés à tous | Très fiable, redondant | Coûteux en câble |
| **Arbre (Tree)** | Hiérarchie de switches étoilés | Scalable | Complexe |
| **Hybride** | Combinaison de plusieurs topologies | Flexible | Complexe |

### 8.2 Topologies logiques
- **Bus logique** : Tous les nœuds voient tout le trafic (Ethernet avec hub)
- **Anneau logique** : Jeton (token) qui circule (Token Ring)

### 8.3 VLAN (Virtual LAN)
- Découpage logique d'un réseau physique en plusieurs réseaux virtuels
- Isolation du trafic au niveau couche 2
- Communication inter-VLAN nécessite un routeur (ou un switch couche 3)
- Avantages : sécurité, réduction du broadcast, flexibilité

### 8.4 NAT (Network Address Translation)
- Traduit les adresses privées en adresse publique (et vice versa)
- Permet à plusieurs machines de partager une seule IP publique
- Types :
  - **SNAT** (Source NAT) : masquerade
  - **DNAT** (Destination NAT) : redirection de ports
  - **PAT** (Port Address Translation) : overload

### 8.5 VPN (Virtual Private Network)
- Tunnel chiffré sur un réseau public (Internet)
- Types :
  - **Site-to-Site** : entre deux réseaux
  - **Remote Access** : client → réseau
- Protocoles : IPsec, OpenVPN, WireGuard, PPTP (obsolète)

---

## 9. Les Réseaux Sans Fil (Wi-Fi)

### 9.1 Normes Wi-Fi (IEEE 802.11)

| Norme | Bande | Débit max | Portée |
|-------|-------|-----------|--------|
| 802.11b | 2.4 GHz | 11 Mbps | ~100m |
| 802.11g | 2.4 GHz | 54 Mbps | ~100m |
| 802.11n (Wi-Fi 4) | 2.4/5 GHz | 600 Mbps | ~150m |
| 802.11ac (Wi-Fi 5) | 5 GHz | 3.5 Gbps | ~100m |
| 802.11ax (Wi-Fi 6) | 2.4/5/6 GHz | 9.6 Gbps | ~100m |
| 802.11be (Wi-Fi 7) | 2.4/5/6 GHz | 46 Gbps | ~100m |

### 9.2 Modes Wi-Fi
- **Infrastructure** : avec point d'accès (AP)
- **Ad-hoc** : direct entre appareils
- **Mesh** : plusieurs AP interconnectés

### 9.3 Sécurité Wi-Fi

| Standard | Année | Sécurité |
|----------|-------|----------|
| WEP | 1997 | Très faible - ne pas utiliser |
| WPA | 2003 | Faible (TKIP) |
| WPA2 | 2004 | Sûr (AES/CCMP) - encore utilisé |
| WPA3 | 2018 | Très sûr (SAE) - recommandé |

### 9.4 Canaux Wi-Fi
- 2.4 GHz : canaux 1 à 13 (seulement 1, 6, 11 non chevauchants)
- 5 GHz : beaucoup plus de canaux, moins d'interférences

---

## 10. La Sécurité Réseau

### 10.1 Concepts clés (CIA Triad)

- **Confidentialité** : données accessibles uniquement aux autorisés (chiffrement)
- **Intégrité** : données non modifiées (hashing, checksums)
- **Disponibilité** : données accessibles quand nécessaire (redondance, anti-DDoS)

### 10.2 Types d'attaques réseau

| Attaque | Description |
|---------|-------------|
| **Sniffing** | Écoute du trafic (Wireshark) |
| **Spoofing** | Usurpation d'identité (IP, MAC, ARP) |
| **Man-in-the-Middle (MITM)** | Interception entre deux parties |
| **DoS / DDoS** | Déni de service (submerger une cible) |
| **ARP Poisoning** | Corruption de la table ARP |
| **DNS Spoofing** | Redirection DNS frauduleuse |
| **Brute Force** | Tentative de mots de passe |
| **Phishing** | Hameçonnage |
| **Port Scanning** | Scan des ports ouverts (nmap) |
| **SYN Flood** | Inondation de requêtes SYN |

### 10.3 Mesures de sécurité

- **Pare-feu (Firewall)** : filtrage réseau
- **IDS / IPS** (Intrusion Detection/Prevention System) : détection/prévention d'intrusions
- **Chiffrement** : SSL/TLS, IPsec, SSH
- **Authentification** : mots de passe, 2FA, certificats, RADIUS
- **802.1X** : contrôle d'accès au réseau (port-based)
- **DMZ** : zone démilitarisée entre réseau interne et Internet
- **Segmentation réseau** : VLANs, sous-réseaux
- **Antivirus / EDR** : protection des endpoints
- **VPN** : tunnel chiffré

### 10.4 Chiffrement

**Symétrique** (même clé pour chiffrer/déchiffrer) : AES, DES, 3DES
**Asymétrique** (clé publique/clé privée) : RSA, ECC, Diffie-Hellman
**Hashing** (empreinte, non réversible) : MD5, SHA-1, SHA-256, SHA-3

### 10.5 Certificats SSL/TLS
- Authentifient l'identité d'un serveur
- Permettent le chiffrement HTTPS
- Délivrés par une Autorité de Certification (CA)
- Let's Encrypt : CA gratuite et automatisée

---

## 11. Le Dépannage et Outils

### 11.1 Outils en ligne de commande (CLI)

| Commande | Utilisation | Exemple |
|----------|-------------|---------|
| `ping` | Test de connectivité de base | `ping 8.8.8.8` |
| `tracert` / `traceroute` | Suivi du chemin des paquets | `tracert google.com` |
| `ipconfig` / `ifconfig` | Configuration IP de la machine | `ipconfig /all` |
| `nslookup` / `dig` | Interrogation DNS | `nslookup google.com` |
| `netstat` | Statistiques réseau, connexions actives | `netstat -an` |
| `arp` | Affiche/modifie le cache ARP | `arp -a` |
| `route` | Affiche/modifie la table de routage | `route print` |
| `telnet` | Test de ports TCP | `telnet serveur 80` |
| `nmap` | Scan de ports et de réseau | `nmap -sV 192.168.1.1` |
| `curl` | Transfert de données depuis/vers un serveur | `curl -I https://google.com` |
| `wireshark` | Analyse de paquets (interface graphique) | Analyse protocolaire |
| `iperf` | Test de bande passante | `iperf -c serveur` |
| `tcpdump` | Capture de paquets (CLI) | `tcpdump -i eth0` |
| `pathping` | Combinaison ping + traceroute (Windows) | `pathping google.com` |

### 11.2 Méthodologie de dépannage (Modèle OSI)

Toujours dépanner **du bas vers le haut** :

1. **Couche 1 (Physique)** : Câble branché ? Voyants allumés ? Pas de lumière sur la carte réseau ?
2. **Couche 2 (Liaison)** : Adresse MAC correcte ? Switch allumé ? ARP qui fonctionne ?
3. **Couche 3 (Réseau)** : Adresse IP valide ? Ping réussi ? Passerelle accessible ?
4. **Couche 4 (Transport)** : Ports ouverts ? Pare-feu qui bloque ?
5. **Couche 5-7 (Application)** : Service en fonctionnement ? Configuration applicative ?

### 11.3 Commandes Windows essentielles

```powershell
# Voir toutes les interfaces réseau
ipconfig /all

# Libérer et renouveler une adresse IP (DHCP)
ipconfig /release
ipconfig /renew

# Vider le cache DNS
ipconfig /flushdns

# Voir les connexions actives
netstat -ano

# Voir la table de routage
route print

# Voir le cache ARP
arp -a

# Tester un port spécifique
Test-NetConnection -ComputerName serveur -Port 443

# Traceroute
tracert google.com
```

### 11.4 Erreurs courantes et solutions

| Problème | Cause probable | Solution |
|----------|---------------|----------|
| "IP conflict" | Deux machines avec la même IP | Passer en DHCP ou attribuer une IP unique |
| "Limited connectivity" | Pas d'IP valide du DHCP | `ipconfig /release && ipconfig /renew` |
| "DNS not resolving" | Serveur DNS injoignable | `ipconfig /flushdns` ou changer de DNS |
| "Destination unreachable" | Route manquante | Vérifier la passerelle par défaut |
| "Request timed out" | Hôte injoignable ou pare-feu | `tracert` pour identifier où ça bloque |
| Port inaccessible | Pare-feu ou service arrêté | `netstat -an` ou `telnet` pour tester |
| Wi-Fi lent | Interférences, canal saturé | Changer de canal, passer en 5 GHz |

---

## 12. Glossaire

| Terme | Définition |
|-------|-----------|
| **ACK** | Acquittement - accusé de réception |
| **APIPA** | Automatic Private IP Addressing - adresse automatique 169.254.x.x |
| **ARP** | Address Resolution Protocol - résolution IP → MAC |
| **AS** | Autonomous System - système autonome |
| **BGP** | Border Gateway Protocol - protocole de routage Internet |
| **CIDR** | Classless Inter-Domain Routing - notation /xx |
| **CRC** | Cyclic Redundancy Check - contrôle de redondance cyclique |
| **DDoS** | Distributed Denial of Service - attaque par déni de service distribué |
| **DHCP** | Dynamic Host Configuration Protocol - configuration IP automatique |
| **DMZ** | Demilitarized Zone - zone démilitarisée |
| **DNS** | Domain Name System - système de noms de domaine |
| **DoS** | Denial of Service - attaque par déni de service |
| **FTP** | File Transfer Protocol - protocole de transfert de fichiers |
| **HTTP** | HyperText Transfer Protocol - protocole du Web |
| **HTTPS** | HTTP Secure - HTTP chiffré |
| **ICMP** | Internet Control Message Protocol - protocole de messages de contrôle |
| **IDS** | Intrusion Detection System - système de détection d'intrusion |
| **IP** | Internet Protocol - protocole Internet |
| **ISP** | Internet Service Provider - fournisseur d'accès Internet |
| **LAN** | Local Area Network - réseau local |
| **MAC** | Media Access Control - adresse physique d'une carte réseau |
| **MTU** | Maximum Transmission Unit - unité maximale de transmission |
| **NAT** | Network Address Translation - traduction d'adresses réseau |
| **NIC** | Network Interface Card - carte réseau |
| **OSI** | Open Systems Interconnection - modèle de référence en 7 couches |
| **PAT** | Port Address Translation - traduction d'adresses par port |
| **POP3** | Post Office Protocol v3 - protocole de réception d'emails |
| **QoS** | Quality of Service - qualité de service |
| **RDP** | Remote Desktop Protocol - protocole de bureau à distance |
| **RTT** | Round-Trip Time - temps aller-retour |
| **SMTP** | Simple Mail Transfer Protocol - protocole d'envoi d'emails |
| **SNMP** | Simple Network Management Protocol - gestion de réseau |
| **SSH** | Secure Shell - accès distant sécurisé |
| **SSL/TLS** | Secure Sockets Layer / Transport Layer Security - chiffrement |
| **SYN** | Synchronisation - première étape du handshake TCP |
| **TCP** | Transmission Control Protocol - protocole de contrôle de transmission (fiable) |
| **TTL** | Time To Live - durée de vie d'un paquet |
| **UDP** | User Datagram Protocol - protocole de datagramme utilisateur (non fiable) |
| **VLAN** | Virtual LAN - réseau local virtuel |
| **VPN** | Virtual Private Network - réseau privé virtuel |
| **WAN** | Wide Area Network - réseau étendu |
| **WPA/WPA2/WPA3** | Wi-Fi Protected Access - sécurité Wi-Fi |

---

## Annexe : Résumé visuel des couches

```
 ┌─────────────────────────────────────────────────────┐
 │                     UTILISATEUR                      │
 ├─────────────────────────────────────────────────────┤
 │ 7. APPLICATION    ↕ Données applicatives            │
 │     HTTP, FTP, SMTP, DNS, DHCP, SSH                │
 ├─────────────────────────────────────────────────────┤
 │ 6. PRÉSENTATION   ↕ Format, chiffrement             │
 │     SSL/TLS, JPEG, ASCII                           │
 ├─────────────────────────────────────────────────────┤
 │ 5. SESSION        ↕ Sessions, dialogues             │
 │     NetBIOS, RPC                                   │
 ├─────────────────────────────────────────────────────┤
 │ 4. TRANSPORT      ↕ Segments (TCP) / Datagrammes    │
 │     TCP (fiable), UDP (rapide)                     │
 ├─────────────────────────────────────────────────────┤
 │ 3. RÉSEAU         ↕ Paquets                         │
 │     IP (routage), ICMP, ARP                        │
 ├─────────────────────────────────────────────────────┤
 │ 2. LIAISON        ↕ Tramses (Frames)                │
 │     Ethernet, MAC, Switch, VLAN                    │
 ├─────────────────────────────────────────────────────┤
 │ 1. PHYSIQUE       ↕ Bits (signaux)                  │
 │     Câbles, Fibre, Wi-Fi, Hub                      │
 └─────────────────────────────────────────────────────┘
```

---

_Ce document couvre les bases du réseau informatique de A à Z. Pour aller plus loin, étudiez chaque protocole en détail, pratiquez avec des outils comme Wireshark, Packet Tracer, GNS3, et passez des certifications (CompTIA Network+, CCNA)._