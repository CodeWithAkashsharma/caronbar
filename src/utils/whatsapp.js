export const WHATSAPP_PHONE = '918750919105'; // Naresh Gaur's WhatsApp number

export const createWhatsAppLink = (serviceName = '', price = '') => {
  let message = 'Hey CarOnBar, I want to book an appointment for my car wash.';
  
  if (serviceName) {
    message = `Hey CarOnBar, I want to book an appointment for ${serviceName}${price ? ` (${price})` : ''} for my vehicle.`;
  }

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
};
