import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowUp, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useCompany } from '../context/CompanyContext';
import Logo from './Logo';
import footerMapBgImg from '../assets/images/footer_map_bg.jpg';

const Footer = () => {
    const { company } = useCompany();
    const [curveProgress, setCurveProgress] = useState(0);
    const footerRef = useRef(null);
    const currentProgressRef = useRef(0);
    const targetProgressRef = useRef(0);
    const animFrameRef = useRef(null);

    useEffect(() => {
        const updateTarget = () => {
            if (!footerRef.current) return;
            const rect = footerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;

            // Trigger when footer enters viewport; reach full moon curve smoothly as it scrolls into view
            const enterPoint = windowHeight;
            const fullPoint = windowHeight * 0.35;

            const rawProgress = (enterPoint - rect.top) / (enterPoint - fullPoint);
            targetProgressRef.current = Math.max(0, Math.min(1, rawProgress));
        };

        const renderLoop = () => {
            // Ultra-smooth physics dampening (lerp) for 60/120fps fluid response
            const diff = targetProgressRef.current - currentProgressRef.current;
            if (Math.abs(diff) > 0.0005) {
                currentProgressRef.current += diff * 0.12;
                setCurveProgress(currentProgressRef.current);
            } else if (currentProgressRef.current !== targetProgressRef.current) {
                currentProgressRef.current = targetProgressRef.current;
                setCurveProgress(currentProgressRef.current);
            }
            animFrameRef.current = requestAnimationFrame(renderLoop);
        };

        const handleScroll = () => {
            updateTarget();
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll, { passive: true });
        updateTarget();
        currentProgressRef.current = targetProgressRef.current;
        setCurveProgress(targetProgressRef.current);
        animFrameRef.current = requestAnimationFrame(renderLoop);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
            if (animFrameRef.current) {
                cancelAnimationFrame(animFrameRef.current);
            }
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const phoneNumber = company?.phone || '+91 7909294488';
    const cleanPhone = phoneNumber.replace(/\s+/g, '');
    const emailAddress = company?.email || 'contact@bigbwarehouse.com';
    const facilityAddress = company?.address || 'Ezhippuram, ESI Back Road, Parippally, Kerala 691574';

    const curveHeightPx = (curveProgress * 56).toFixed(2);

    return (
        <footer ref={footerRef} className="bg-[#050b14] text-white relative overflow-hidden">
            
            {/* Scroll-driven Moon-Shaped White Curved Morph on Top Sides (No black line, perfectly smooth) */}
            <div 
                className="absolute -top-px left-0 right-0 z-20 pointer-events-none select-none overflow-hidden will-change-[height]"
                style={{ height: `${curveHeightPx}px` }}
                aria-hidden="true"
            >
                <svg
                    viewBox="0 0 1200 60"
                    preserveAspectRatio="none"
                    className="w-full h-full block"
                >
                    {/* Seamless Moon-Shaped Curved Cutout */}
                    <path
                        d="M -2,-3 L 1202,-3 L 1202,60 Q 600,-3 -2,60 Z"
                        fill="#ffffff"
                    />
                </svg>
            </div>
            
            {/* Aerial Satellite Map Background with Vignette Gradient Overlay */}
            <div className="absolute inset-0 opacity-25 pointer-events-none overflow-hidden select-none z-0">
                <img
                    src={footerMapBgImg}
                    alt="Big B Traders Location Map"
                    className="w-full h-full object-cover filter contrast-125 brightness-75 mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050b14] via-[#050b14]/85 to-[#050b14]/90"></div>
            </div>

            {/* Main Footer Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8">
                    
                    {/* Brand Info & Overview: Full top row on tablet (<992px), left column on desktop */}
                    <div className="col-span-1 sm:col-span-2 lg:col-span-5 space-y-4">
                        <div className="inline-block">
                            <Logo lightTheme={true} />
                        </div>
                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-sm sm:max-w-xl lg:max-w-sm font-medium">
                            {company?.description || 'Modern, heavy-duty industrial storage, 50-Ton weighbridge scale, and logistics infrastructure in Parippally, Kerala.'}
                        </p>
                        
                        {/* Industrial Credibility Badges */}
                        <div className="pt-2 flex flex-wrap gap-2">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-700/70 text-[11px] font-mono font-medium text-slate-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange"></span>
                                50T Weighbridge
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-700/70 text-[11px] font-mono font-medium text-slate-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange"></span>
                                Hydra Crane
                            </span>
                        </div>
                    </div>

                    {/* Quick Links: Splits row below brand on tablet, middle column on desktop */}
                    <div className="col-span-1 sm:col-span-1 lg:col-span-3">
                        <div className="flex items-center gap-2 mb-4 sm:mb-6">
                            <span className="w-1 h-4 bg-brand-orange rounded-full"></span>
                            <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-white">
                                QUICK LINKS
                            </h3>
                        </div>
                        <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm font-semibold text-slate-300">
                            <li>
                                <Link to="/" onClick={scrollToTop} className="hover:text-brand-orange transition-colors inline-block py-0.5">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:text-brand-orange transition-colors inline-block py-0.5">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/facilities" className="hover:text-brand-orange transition-colors inline-block py-0.5">
                                    Facilities
                                </Link>
                            </li>
                            <li>
                                <Link to="/gallery" className="hover:text-brand-orange transition-colors inline-block py-0.5">
                                    Gallery
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:text-brand-orange transition-colors inline-block py-0.5">
                                    Contact & Location
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Desk: Splits row below brand on tablet, right column on desktop */}
                    <div className="col-span-1 sm:col-span-1 lg:col-span-4">
                        <div className="flex items-center gap-2 mb-4 sm:mb-6">
                            <span className="w-1 h-4 bg-brand-orange rounded-full"></span>
                            <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-white">
                                CONTACT DESK
                            </h3>
                        </div>
                        <ul className="space-y-3.5 text-xs sm:text-sm font-medium text-slate-300">
                            <li>
                                <a 
                                    href={`tel:${cleanPhone}`}
                                    className="flex items-start gap-3 hover:text-brand-orange transition-colors group p-2 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-brand-orange/40"
                                >
                                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-700/80 text-brand-orange group-hover:scale-105 shrink-0 mt-0.5 transition-transform">
                                        <Phone className="w-4 h-4" />
                                    </div>
                                    <div className="min-w-0">
                                        <span className="text-[10px] uppercase font-mono text-slate-400 block font-bold">Direct Hotline</span>
                                        <span className="font-bold text-white group-hover:text-brand-orange transition-colors text-sm">{phoneNumber}</span>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a 
                                    href={`mailto:${emailAddress}`}
                                    className="flex items-start gap-3 hover:text-brand-orange transition-colors group p-2 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-brand-orange/40"
                                >
                                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-700/80 text-brand-orange group-hover:scale-105 shrink-0 mt-0.5 transition-transform">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                    <div className="min-w-0">
                                        <span className="text-[10px] uppercase font-mono text-slate-400 block font-bold">Email Support</span>
                                        <span className="font-bold text-white group-hover:text-brand-orange transition-colors break-all text-xs sm:text-sm">{emailAddress}</span>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <Link 
                                    to="/contact"
                                    className="flex items-start gap-3 hover:text-brand-orange transition-colors group p-2 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-brand-orange/40"
                                >
                                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-700/80 text-brand-orange group-hover:scale-105 shrink-0 mt-0.5 transition-transform">
                                        <MapPin className="w-4 h-4" />
                                    </div>
                                    <div className="min-w-0">
                                        <span className="text-[10px] uppercase font-mono text-slate-400 block font-bold">Facility Address</span>
                                        <span className="text-slate-300 leading-relaxed text-xs block group-hover:text-white transition-colors">{facilityAddress}</span>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>

            {/* Bottom Bar: Auto-wrapping, sequentially center-stacked on mobile */}
            <div className="border-t border-slate-800/80 relative z-10 bg-[#03060c]/90 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono tracking-wider text-slate-400 flex-wrap">
                    {/* Copyright Line */}
                    <p className="text-center md:text-left order-1">
                        &copy; {new Date().getFullYear()} <span className="font-bold text-slate-300">BIGB WAREHOUSE PARK</span>. All Rights Reserved.
                    </p>

                    {/* Operational Status Info & Back-to-Top Button */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 order-2 text-center flex-wrap">
                        <span className="flex items-center gap-2 text-emerald-400 text-[11px]">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            24/7 Operations Active
                        </span>
                        <span className="text-slate-600 hidden sm:inline">•</span>
                        <span className="text-slate-400 text-[11px]">Parippally, Kerala</span>

                        {/* Responsive Integrated Back-to-Top Button */}
                        <button
                            onClick={scrollToTop}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 hover:border-brand-orange text-slate-300 hover:text-brand-orange text-xs font-mono font-semibold transition-all cursor-pointer group active:scale-95 mt-1 sm:mt-0"
                            title="Back to Top"
                        >
                            <span>Top</span>
                            <ArrowUp className="w-3.5 h-3.5 text-brand-orange group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
