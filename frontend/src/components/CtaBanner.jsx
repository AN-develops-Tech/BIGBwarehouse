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
        <section className="bg-gradient-to-b from-slate-950 via-[#070e18] to-[#040811] py-12 sm:py-16 lg:py-20 border-t border-slate-800/80 relative overflow-hidden">
            {/* Ambient Lighting & Industrial Grid Accent */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 right-10 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-60"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="bg-gradient-to-br from-slate-900/90 via-[#0b1626]/90 to-slate-950/95 border border-slate-800/90 hover:border-brand-orange/30 rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl transition-all duration-300">
                    
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
                        
                        {/* Left: Value Proposition & Heading */}
                        <div className="w-full lg:max-w-xl text-center lg:text-left space-y-3">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono font-bold tracking-wider">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                IMMEDIATE SPACE AVAILABILITY
                            </div>

                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                                HAVE A WAREHOUSE <span className="text-brand-orange">REQUIREMENT?</span>
                            </h2>

                            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-lg mx-auto lg:mx-0 font-normal">
                                Connect directly with our on-site facility operations team for quick space booking, weighbridge slots, and heavy crane scheduling.
                            </p>
                        </div>

                        {/* Right: Quick Connect Cards & CTA Button */}
                        <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-row items-stretch sm:items-center justify-center lg:justify-end gap-4 sm:gap-5">
                            
                            {/* Interactive Direct Line Card */}
                            <a
                                href={`tel:${cleanPhone}`}
                                className="group flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-brand-orange/50 hover:bg-slate-900/80 transition-all duration-200 shadow-md"
                                title="Call Facility Directly"
                            >
                                <div className="p-3 rounded-xl bg-brand-orange/15 border border-brand-orange/30 text-brand-orange group-hover:scale-105 group-hover:bg-brand-orange group-hover:text-white transition-all shrink-0">
                                    <PhoneCall className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-[10px] font-mono font-bold text-slate-400 tracking-wider uppercase">Direct Line</span>
                                    </div>
                                    <p className="font-bold text-sm sm:text-base text-white group-hover:text-brand-orange transition-colors whitespace-nowrap">
                                        {phoneNumber}
                                    </p>
                                </div>
                            </a>

                            {/* Interactive WhatsApp Desk Card */}
                            <a
                                href={`https://wa.me/${whatsappNumber}?text=Hello%20BigB%20Warehouse%20Team%2C%20I%20have%20an%20inquiry%20regarding%20warehouse%20space.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900/80 transition-all duration-200 shadow-md"
                                title="Chat on WhatsApp"
                            >
                                <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 group-hover:scale-105 group-hover:bg-emerald-500 group-hover:text-white transition-all shrink-0">
                                    <WhatsAppIcon className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-[10px] font-mono font-bold text-slate-400 tracking-wider uppercase">WhatsApp Desk</span>
                                    </div>
                                    <p className="font-bold text-sm sm:text-base text-emerald-400 group-hover:text-emerald-300 transition-colors whitespace-nowrap">
                                        Available 24/7
                                    </p>
                                </div>
                            </a>

                            {/* Primary Action Button */}
                            <Link
                                to="/contact"
                                className="cta-light-sweep group bg-gradient-to-r from-brand-orange to-orange-600 hover:from-orange-500 hover:to-brand-orange text-white px-7 py-4 rounded-xl sm:rounded-2xl font-black text-sm uppercase tracking-wider shadow-xl shadow-brand-orange/20 hover:shadow-brand-orange/35 transition-all flex items-center justify-center gap-2.5 border border-orange-400/30 active:scale-[0.98] shrink-0"
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
