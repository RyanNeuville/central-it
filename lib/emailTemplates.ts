export const generateClientEmailHtml = (info: any, address: any, items: any[], subtotal: number, shipping: number, tva: number, total: number, orderNumber: string) => {
  const itemsHtml = items.map(item => `
    <tr>
      <td style="padding: 15px; border-bottom: 1px solid #e5e7eb;">
        <div style="font-weight: 600; color: #111827;">${item.product.name}</div>
        <div style="color: #6b7280; font-size: 14px; margin-top: 4px;">Quantité : ${item.quantity}</div>
      </td>
      <td style="padding: 15px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 500; color: #111827;">
        ${(item.product.price * item.quantity).toFixed(2)} €
      </td>
    </tr>
  `).join('');

  return `
  <!DOCTYPE html>
  <html>
  <head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f3f4f6; margin: 0; padding: 40px 0; color: #374151; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
    .header { text-align: center; border-bottom: 2px solid #f3f4f6; padding-bottom: 24px; margin-bottom: 32px; }
    .logo { font-size: 28px; font-weight: 800; color: #111827; letter-spacing: -0.5px; }
    .logo span { color: #2563eb; }
    h1 { color: #111827; font-size: 24px; margin-bottom: 8px; font-weight: 700; }
    p { color: #4b5563; font-size: 16px; line-height: 1.6; margin-top: 0; }
    .highlight-box { background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 20px; margin: 24px 0; text-align: center; }
    .highlight-box p { color: #1e3a8a; margin: 0; font-size: 18px; font-weight: 600; }
    .order-table { width: 100%; border-collapse: collapse; margin-top: 24px; }
    .summary-box { background-color: #f9fafb; padding: 24px; border-radius: 8px; margin-top: 32px; border: 1px solid #e5e7eb; }
    .summary-row { display: flex; justify-content: space-between; padding: 8px 0; color: #4b5563; font-size: 15px; }
    .total-row { display: flex; justify-content: space-between; font-weight: 700; font-size: 20px; margin-top: 16px; padding-top: 16px; border-top: 2px solid #e5e7eb; color: #111827; }
    .address-section { margin-top: 32px; padding-top: 32px; border-top: 1px solid #e5e7eb; }
    .address-section h3 { color: #111827; font-size: 18px; margin-bottom: 12px; }
    .footer { text-align: center; margin-top: 48px; font-size: 14px; color: #9ca3af; }
    .btn { display: inline-block; background-color: #111827; color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 32px; text-align: center; }
  </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div class="logo">Central <span>IT</span></div>
      </div>
      
      <h1>Merci pour votre commande, ${info.firstName} !</h1>
      <p>Votre paiement a été validé avec succès. Nous préparons actuellement vos articles pour l'expédition.</p>
      
      <div class="highlight-box">
        <p>Commande n° ${orderNumber}</p>
      </div>

      <table class="order-table">
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>
      
      <div class="summary-box">
        <div style="display: table; width: 100%;">
          <div style="display: table-row;">
            <div style="display: table-cell; padding: 6px 0; color: #6b7280;">Sous-total HT</div>
            <div style="display: table-cell; padding: 6px 0; text-align: right; font-weight: 500;">${subtotal.toFixed(2)} €</div>
          </div>
          <div style="display: table-row;">
            <div style="display: table-cell; padding: 6px 0; color: #6b7280;">TVA (20%)</div>
            <div style="display: table-cell; padding: 6px 0; text-align: right; font-weight: 500;">${tva.toFixed(2)} €</div>
          </div>
          <div style="display: table-row;">
            <div style="display: table-cell; padding: 6px 0; color: #6b7280;">Frais de livraison</div>
            <div style="display: table-cell; padding: 6px 0; text-align: right; font-weight: 500;">${shipping === 0 ? 'Offert' : `${shipping.toFixed(2)} €`}</div>
          </div>
          <div style="display: table-row;">
            <div style="display: table-cell; padding: 16px 0 0 0; color: #111827; font-weight: 700; font-size: 18px; border-top: 2px solid #e5e7eb;">Total TTC</div>
            <div style="display: table-cell; padding: 16px 0 0 0; text-align: right; color: #111827; font-weight: 700; font-size: 18px; border-top: 2px solid #e5e7eb;">${total.toFixed(2)} €</div>
          </div>
        </div>
      </div>
      
      <div class="address-section">
        <h3>Adresse de livraison</h3>
        <p style="color: #374151; font-weight: 500;">
          ${info.firstName} ${info.lastName}<br>
          ${address.street}<br>
          ${address.zip} ${address.city}<br>
          ${address.country}
        </p>
      </div>
      
      <div style="text-align: center;">
        <a href="#" class="btn" style="color: #ffffff;">Suivre ma commande</a>
      </div>
      
      <div class="footer">
        <p>Si vous avez la moindre question concernant votre commande, répondez simplement à cet email.</p>
        <p>&copy; 2026 Central IT. Tous droits réservés.</p>
      </div>
    </div>
  </body>
  </html>
  `;
};

export const generateAdminEmailHtml = (info: any, address: any, items: any[], subtotal: number, shipping: number, tva: number, total: number, orderNumber: string) => {
  const itemsHtml = items.map(item => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${item.product.name}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">${(item.product.price * item.quantity).toFixed(2)} €</td>
    </tr>
  `).join('');

  return `
  <!DOCTYPE html>
  <html>
  <head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f3f4f6; margin: 0; padding: 40px 0; color: #374151; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); border-top: 6px solid #10b981; }
    h1 { color: #111827; font-size: 22px; margin-bottom: 24px; border-bottom: 1px solid #e5e7eb; padding-bottom: 16px; }
    h3 { color: #111827; font-size: 16px; margin-top: 24px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700; }
    .data-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; background-color: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; }
    .data-label { font-size: 13px; color: #6b7280; text-transform: uppercase; font-weight: 600; margin-bottom: 4px; }
    .data-value { font-size: 15px; color: #111827; font-weight: 500; }
    table { width: 100%; border-collapse: collapse; margin-top: 16px; }
    th { text-align: left; padding: 12px; background-color: #f9fafb; color: #4b5563; font-size: 13px; text-transform: uppercase; border-bottom: 2px solid #e5e7eb; }
    .total-box { margin-top: 24px; text-align: right; padding: 20px; background-color: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb; }
    .total-box div { margin-bottom: 8px; color: #4b5563; }
    .total-box .final { font-size: 20px; font-weight: 700; color: #111827; margin-top: 16px; padding-top: 16px; border-top: 2px solid #e5e7eb; margin-bottom: 0; }
  </style>
  </head>
  <body>
    <div class="container">
      <h1>🚨 Nouvelle commande reçue</h1>
      
      <div style="display: table; width: 100%; background-color: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb;">
        <div style="display: table-cell; width: 50%;">
          <div class="data-label">Numéro de Commande</div>
          <div class="data-value" style="color: #10b981; font-weight: 700; font-size: 18px;">${orderNumber}</div>
        </div>
        <div style="display: table-cell; width: 50%;">
          <div class="data-label">Montant Total TTC</div>
          <div class="data-value" style="font-weight: 700; font-size: 18px;">${total.toFixed(2)} €</div>
        </div>
      </div>

      <h3>Informations Client</h3>
      <div style="background-color: #ffffff; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <p style="margin: 0 0 8px 0;"><strong>Nom complet :</strong> ${info.firstName} ${info.lastName}</p>
        <p style="margin: 0 0 8px 0;"><strong>Email :</strong> <a href="mailto:${info.email}" style="color: #2563eb;">${info.email}</a></p>
        <p style="margin: 0 0 8px 0;"><strong>Téléphone :</strong> ${info.phone}</p>
        <p style="margin: 0;"><strong>Adresse d'expédition :</strong><br>
        ${address.street}, ${address.zip} ${address.city}, ${address.country}</p>
      </div>

      <h3>Contenu de la commande</h3>
      <table>
        <thead>
          <tr>
            <th>Produit</th>
            <th style="text-align: center;">Qté</th>
            <th style="text-align: right;">Prix Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>
      
      <div class="total-box">
        <div>Sous-total HT : <strong>${subtotal.toFixed(2)} €</strong></div>
        <div>TVA (20%) : <strong>${tva.toFixed(2)} €</strong></div>
        <div>Frais de port : <strong>${shipping === 0 ? 'Offert' : `${shipping.toFixed(2)} €`}</strong></div>
        <div class="final">Revenu généré (TTC) : ${total.toFixed(2)} €</div>
      </div>
      
      <div style="margin-top: 40px; text-align: center;">
        <a href="#" style="background-color: #2563eb; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px;">Gérer cette commande dans le Dashboard</a>
      </div>
    </div>
  </body>
  </html>
  `;
};
