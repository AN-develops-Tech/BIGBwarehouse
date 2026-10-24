import { Link } from 'react-router-dom';
import { PhoneCall, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { useCompany } from '../context/CompanyContext';
import WhatsAppIcon from './WhatsAppIcon';

const CtaBanner = () => {
    const { company } = useCompany();

    const phoneNumber = company?.phone || '+91 7909294488';
    const cleanPhone = phoneNumber.replace(/\s+/g, '');
    const whatsappNumber = (company?.whatsapp || phoneNumber).replace(/\D/g, '');

    return (
        <section className="bg-slate-50 py-16 sm:py-20 lg:py-24 border-t border-slate-200 relative overflow-hidden blueprint-grid-pattern">
            {/* Subtle Ambient Accent Glow */}
            <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="bg-white border-2 border-slate-200 hover:border-brand-orange/50 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                    {/* Top Orange Accent Line */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-orange via-orange-500 to-amber-400"></div>

                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
                        
                        {/* Left: Value Proposition & Heading */}
                        <div className="w-full lg:max-w-xl text-center lg:text-left space-y-3">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-slate-900 leading-tight">
                                HAVE A WAREHOUSE <span className="text-brand-orange">REQUIREMENT?</span>
                            </h2>

                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium">
                                Connect directly with our on-site facility operations team for quick space booking, weighbridge slots, and heavy crane scheduling.
                            </p>
                        </div>

                        {/* Right: Quick Connect Cards & CTA Button */}
                        <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-row items-stretch sm:items-center justify-center lg:justify-end gap-3.5 sm:gap-4">
                            
                            {/* Interactive Direct Line Card */}
                            <a
                                href={`tel:${cleanPhone}`}
                                className="group flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-slate-50 hover:bg-orange-50/70 border border-slate-200 hover:border-brand-orange/60 transition-all duration-200 shadow-xs"
                                title="Call Facility Directly"
                            >
                                <div className="p-3 rounded-xl bg-orange-100 border border-orange-200 text-brand-orange group-hover:scale-105 group-hover:bg-brand-orange group-hover:text-white transition-all shrink-0">
                                    <PhoneCall className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-[10px] font-mono font-bold text-slate-400 tracking-wider uppercase">Direct Line</span>
                                    </div>
                                    <p className="font-mono font-bold text-sm sm:text-base text-slate-900 group-hover:text-brand-orange transition-colors whitespace-nowrap">
                                        {phoneNumber}
                                    </p>
                                </div>
                            </a>

                            {/* Interactive WhatsApp Desk Card */}
                            <a
                                href={`https://wa.me/${whatsappNumber}?text=Hello%20BigB%20Warehouse%20Team%2C%20I%20have%20an%20inquiry%20regarding%20warehouse%20space.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50/70 border border-slate-200 hover:border-emerald-500/60 transition-all duration-200 shadow-xs"
                                title="Chat on WhatsApp"
                            >
                                <div className="p-3 rounded-xl bg-emerald-100 border border-emerald-200 text-emerald-600 group-hover:scale-105 group-hover:bg-[#25D366] group-hover:text-white transition-all shrink-0">
                                    <WhatsAppIcon className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-[10px] font-mono font-bold text-slate-400 tracking-wider uppercase">WhatsApp Desk</span>
                                    </div>
                                    <p className="font-mono font-bold text-sm sm:text-base text-emerald-700 group-hover:text-emerald-800 transition-colors whitespace-nowrap">
                                        Available 24/7
                                    </p>
                                </div>
                            </a>

                            {/* Primary Action Button */}
                            <Link
                                to="/contact"
                                className="cta-light-sweep group bg-gradient-to-r from-brand-orange to-orange-600 hover:from-orange-600 hover:to-brand-orange text-white px-7 py-4 rounded-2xl font-black text-sm uppercase tracking-wider shadow-lg shadow-brand-orange/25 hover:shadow-brand-orange/40 transition-all flex items-center justify-center gap-2.5 border border-orange-400 active:scale-[0.98] shrink-0"
                            >
                                <span>SEND ENQUIRY</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>

                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default CtaBanner;
