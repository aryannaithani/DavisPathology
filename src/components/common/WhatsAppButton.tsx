import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210';
  const defaultMessage = encodeURIComponent(
    'Hello Davis Pathology Lab, I would like to enquire about your diagnostic services.'
  );

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${defaultMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-[#171717] px-4 py-2.5 font-bold text-xs uppercase tracking-wider border-2 border-[#171717] shadow-[3px_3px_0px_0px_#171717] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_#171717] transition-all"
    >
      <MessageCircle className="w-5 h-5 fill-[#171717] text-[#25D366]" />
      <span className="hidden sm:inline">WhatsApp Enquiry</span>
    </a>
  );
};
