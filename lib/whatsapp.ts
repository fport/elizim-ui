const WHATSAPP_PHONE = "905448611479";

export interface CartItemForMessage {
  title: string;
  quantity: number;
  price: number;
}

/**
 * Build a WhatsApp click-to-chat URL.
 * @param phone  – digits only, no leading "+"
 * @param message – pre-filled message (URL-encoded automatically)
 */
export function buildWhatsAppUrl(
  phone: string = WHATSAPP_PHONE,
  message?: string,
): string {
  const base = `https://wa.me/${phone}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/**
 * Format cart items into a human-readable WhatsApp message.
 */
export function formatCartMessage(
  items: CartItemForMessage[],
  total: number,
): string {
  const lines = items.map(
    (item, i) =>
      `${i + 1}. ${item.title} x${item.quantity} — ${item.price.toLocaleString("tr-TR")} TL`,
  );

  return [
    "Merhaba! Elizim.art uzerinden siparis vermek istiyorum:",
    "",
    ...lines,
    "",
    `Toplam: ${total.toLocaleString("tr-TR")} TL`,
  ].join("\n");
}
