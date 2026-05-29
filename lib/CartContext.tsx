/**
 * CartContext.tsx — Le Moteur du Panier
 * ======================================
 * Rédigé par Ryan Neuville
 *
 * Ce fichier est LE CERVEAU du panier sur tout le site.
 *
 * En React, chaque composant vit dans sa propre "bulle".
 * Le problème : la Navbar, la page Shop, la page Cart et la page Checkout
 * ont toutes besoin de savoir ce qu'il y a dans le panier.
 * Comment partager cette information entre elles ?
 *
 * La réponse s'appelle le CONTEXT API de React.
 * C'est une mémoire globale partagée. Pense à ça comme un tableau blanc
 * au milieu d'une salle de classe : tout le monde peut le lire et écrire dessus.
 *
 * Architecture :
 *   CartContext   → le "tableau blanc" (contient l'état actuel)
 *   CartProvider  → le "cadre" qui enveloppe toute l'application
 *   useCart()     → le "coup d'œil" qu'un composant fait vers le tableau blanc
 *   cartReducer   → le "secrétaire" qui gère les modifications officiellement
 */

'use client';

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Product } from '@/lib/products';

/**
 * CartItem
 * --------
 * Représente un produit dans le panier.
 * On stocke le produit entier (pas juste son ID) pour avoir toutes les infos
 * (nom, prix, image...) accessibles directement sans avoir à faire de recherche.
 */
export interface CartItem {
  product: Product;
  quantity: number;
}

/**
 * CartState
 * ---------
 * L'état complet du panier à un instant T.
 * Simple : juste la liste des articles.
 */
interface CartState {
  items: CartItem[];
}

/**
 * CartAction — Les actions possibles sur le panier
 * -------------------------------------------------
 * C'est un "menu" de tout ce qu'on peut faire avec le panier.
 * Le pattern "type" + "payload" est une convention Redux/Reducer très répandue.
 * Chaque action décrit CE QU'ON VEUT FAIRE, pas comment le faire.
 */
type CartAction =
  | { type: 'ADD_ITEM'; product: Product; quantity?: number }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; items: CartItem[] };

/**
 * cartReducer — Le Cerveau des Modifications
 * -------------------------------------------
 * Un "reducer" est une fonction pure qui reçoit :
 *   - l'état actuel (state)
 *   - une action à effectuer (action)
 * ...et retourne TOUJOURS un NOUVEL état, sans jamais modifier l'ancien.
 *
 * Pourquoi ne pas modifier l'état directement ?
 * React détecte les changements en comparant les références des objets.
 * Si on modifie l'objet en place, React ne voit pas de changement → pas de re-render.
 * C'est pour ça qu'on spread toujours ([...state.items]) pour créer de nouveaux tableaux.
 */
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      /**
       * Si le produit est déjà dans le panier, on augmente juste sa quantité.
       * Sinon, on l'ajoute à la liste avec la quantité donnée (ou 1 par défaut).
       */
      const existingIndex = state.items.findIndex(
        (item) => item.product.id === action.product.id
      );
      if (existingIndex >= 0) {
        const updatedItems = [...state.items];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + (action.quantity || 1),
        };
        return { items: updatedItems };
      }
      return {
        items: [...state.items, { product: action.product, quantity: action.quantity || 1 }],
      };
    }

    case 'REMOVE_ITEM':
      /** On filtre : on garde tous les articles SAUF celui avec l'ID à supprimer. */
      return {
        items: state.items.filter((item) => item.product.id !== action.productId),
      };

    case 'UPDATE_QUANTITY': {
      /**
       * Si la nouvelle quantité est 0 ou moins, on supprime l'article complètement.
       * Ça permet d'appuyer sur "−" jusqu'à 0 pour supprimer l'article.
       */
      if (action.quantity <= 0) {
        return {
          items: state.items.filter((item) => item.product.id !== action.productId),
        };
      }
      return {
        items: state.items.map((item) =>
          item.product.id === action.productId
            ? { ...item, quantity: action.quantity }
            : item
        ),
      };
    }

    case 'CLEAR_CART':
      /** Vide complètement le panier — appelé après une commande confirmée. */
      return { items: [] };

    case 'LOAD_CART':
      /** Charge le panier depuis le localStorage au démarrage de l'app. */
      return { items: action.items };

    default:
      return state;
  }
}

/**
 * CartContextType — Ce que le Context expose au reste de l'application
 * ---------------------------------------------------------------------
 * C'est le "contrat" du tableau blanc : voilà ce que tout composant
 * peut lire (items, totalItems, totalPrice) ou appeler (addItem, removeItem...).
 */
interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

/** On crée le Context avec une valeur par défaut "undefined". */
const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * CartProvider — Le Fournisseur de Contexte
 * ------------------------------------------
 * Ce composant enveloppe toute l'application dans app/layout.tsx.
 * Il initialise l'état, gère la persistance (localStorage) et
 * expose tout via CartContext.Provider pour que ses "enfants" y aient accès.
 *
 * Usage dans layout.tsx :
 *   <CartProvider>
 *     {children}  ← tout le site est ici
 *   </CartProvider>
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  /**
   * Au premier chargement de l'application, on essaie de récupérer
   * le panier sauvegardé dans localStorage.
   * Le tableau vide [] en second argument signifie "ne s'exécute qu'une seule fois".
   */
  useEffect(() => {
    try {
      const saved = localStorage.getItem('central-it-cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          dispatch({ type: 'LOAD_CART', items: parsed });
        }
      }
    } catch {
      /** Si le JSON est corrompu, on ignore silencieusement. */
    }
  }, []);

  /**
   * À chaque fois que state.items change, on sauvegarde dans localStorage.
   * Ainsi, le panier survit aux rechargements de page et fermetures d'onglet.
   */
  useEffect(() => {
    localStorage.setItem('central-it-cart', JSON.stringify(state.items));
  }, [state.items]);

  /** Fonctions exposées — elles envoient simplement la bonne action au reducer. */
  const addItem = (product: Product, quantity?: number) => {
    dispatch({ type: 'ADD_ITEM', product, quantity });
  };

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  /**
   * Ces deux valeurs sont recalculées automatiquement à chaque changement du panier.
   * "reduce" parcourt le tableau et accumule une valeur (somme des quantités / des prix).
   */
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/**
 * useCart — Le Hook Personnalisé
 * --------------------------------
 * C'est le raccourci que tous les composants utilisent pour accéder au panier.
 * Au lieu d'écrire useContext(CartContext) partout, on écrit juste useCart().
 *
 * L'erreur lancée si on l'utilise en dehors du CartProvider est volontaire :
 * ça évite des bugs silencieux où le panier serait undefined.
 *
 * Usage dans n'importe quel composant :
 *   const { items, addItem, totalPrice } = useCart();
 */
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
