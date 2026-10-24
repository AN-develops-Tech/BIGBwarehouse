import { useCompany } from '../context/CompanyContext';
import WhatsAppIcon from './WhatsAppIcon';

const WhatsAppButton = () => {
    const { company } = useCompany();

    if (!company || !company.whatsapp) return null;

    return (
        <a
            href={`https://wa.me/${company.whatsapp.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 sm:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 active:scale-[0.92] flex items-center justify-center group will-change-transform"
            style={{ transform: 'translate3d(0, 0, 0)' }}
            aria-label="Chat on WhatsApp"
        >
            <WhatsAppIcon className="w-6 h-6 text-white" />
            <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-3 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] font-semibold text-sm">
                Chat with us
            </span>
        </a>
    );
};

export default WhatsAppButton;
