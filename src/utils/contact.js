const PHONE = "919052051750"; // your dad's number

export const whatsappLink = (message) =>
  `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;

export const callLink = () => `tel:+${PHONE}`;
