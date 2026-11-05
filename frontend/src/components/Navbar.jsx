import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, Phone } from 'lucide-react';
import Logo from './Logo';
import { useCompany } from '../context/CompanyContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navRef = useRef(null);
    const location = useLocation();
    const { company } = useCompany();

    const phoneNumber = company?.phone || '+91 7909294488';
    const cleanPhone = phoneNumber.replace(/\s+/g, '');

    // Track scroll for subtle border and shadow elevation with rAF throttling for 120Hz/60Hz smooth rendering
    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const isScrolled = window.scrollY > 15;
                    setScrolled(prev => prev !== isScrolled ? isScrolled : prev);
                    ticking = false;
                });
                ticking = true;
            }
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu automatically on route change
    useEffect(() => {
        setIsOpen(prev => (prev ? false : prev));
    }, [location.pathname]);

    // Handle outside click & escape key
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('touchstart', handleClickOutside);
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Facilities', path: '/facilities' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Contact', path: '/contact' },
    ];

    const isActive = (path) => location.pathname === path;

    const handleNavClick = (path) => {
        setIsOpen(false);
        if (location.pathname === path) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <>
            {/* Backdrop Blur Overlay for Mobile Menu */}
            <div
                onClick={() => setIsOpen(false)}
                className={`fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm transition-all duration-300 md:hidden ${
                    isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
                aria-hidden="true"
            />

            <nav
                ref={navRef}
                className={`sticky top-0 z-50 w-full transition-colors duration-300 border-b ${
                    scrolled 
                        ? 'bg-white/95 backdrop-blur-md shadow-md border-slate-200/90' 
                        : 'bg-white/90 backdrop-blur-sm border-slate-200/60'
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="h-20 flex justify-between items-center">

                        {/* Brand Logo */}
                        <div className="flex items-center gap-4">
                            <Link
                                to="/"
                                onClick={() => handleNavClick('/')}
                                className="flex-shrink-0 flex items-center transition-transform duration-300 hover:scale-[1.02]"
                            >
                                <Logo lightTheme={false} />
                            </Link>
                        </div>

                        {/* Desktop Navigation Links */}
                        <div className="hidden md:flex flex-1 justify-center items-center space-x-1 lg:space-x-2">
                            {navLinks.map((link) => {
                                const active = isActive(link.path);
                                return (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        onClick={() => handleNavClick(link.path)}
                                        className={`relative px-4 py-2 text-xs lg:text-sm font-bold uppercase tracking-wider transition-all duration-200 rounded-xl ${
                                            active
                                                ? 'text-brand-orange bg-orange-50 font-black shadow-xs'
                                                : 'text-slate-800 hover:text-brand-orange hover:bg-slate-100/70'
                                        }`}
                                    >
                                        {link.name}
                                        {active && (
                                            <span className="absolute bottom-0.5 left-4 right-4 h-0.5 bg-brand-orange rounded-full"></span>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Right Actions: Phone Hotline & Enquire CTA */}
                        <div className="hidden md:flex flex-shrink-0 items-center gap-3">
                            <a
                                href={`tel:${cleanPhone}`}
                                className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold text-slate-700 bg-slate-100 hover:bg-orange-50 hover:text-brand-orange border border-slate-200/80 transition-colors shadow-2xs"
                                title="Call warehouse desk"
                            >
                                <Phone className="w-3.5 h-3.5 text-brand-orange" />
                                <span>{phoneNumber}</span>
                            </a>

                            <Link
                                to="/contact"
                                className="cta-light-sweep bg-brand-orange text-white font-black uppercase rounded-xl shadow-md hover:bg-orange-600 transition-all duration-200 flex items-center gap-2 border border-orange-400 text-xs sm:text-sm px-5 py-2.5 hover:shadow-orange-500/20 active:scale-95"
                            >
                                <ShieldCheck className="w-4 h-4" /> ENQUIRE NOW
                            </Link>
                        </div>

                        {/* Mobile Menu Hamburger Button */}
                        <div className="flex items-center md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                                aria-expanded={isOpen}
                                className="relative w-11 h-11 flex flex-col items-center justify-center rounded-xl text-slate-800 hover:text-brand-orange hover:bg-slate-100/80 transition-colors focus:outline-none cursor-pointer"
                            >
                                <div className="w-5 h-4 relative flex flex-col justify-between">
                                    <span
                                        className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ease-out origin-center ${
                                            isOpen ? 'rotate-45 translate-y-[7px] text-brand-orange' : ''
                                        }`}
                                    />
                                    <span
                                        className={`w-full h-0.5 bg-current rounded-full transition-all duration-200 ease-out origin-left ${
                                            isOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
                                        }`}
                                    />
                                    <span
                                        className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ease-out origin-center ${
                                            isOpen ? '-rotate-45 -translate-y-[7px] text-brand-orange' : ''
                                        }`}
                                    />
                                </div>
                            </button>
                        </div>

                    </div>
                </div>

                {/* Mobile Navigation Drawer */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-350 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-[max-height,opacity] ${
                        isOpen 
                            ? 'max-h-[26rem] opacity-100 border-t border-slate-100 shadow-xl' 
                            : 'max-h-0 opacity-0 pointer-events-none'
                    }`}
                >
                    <div className="px-4 pt-3 pb-6 space-y-1.5 bg-white/98 backdrop-blur-2xl">
                        {navLinks.map((link) => {
                            const active = isActive(link.path);
                            return (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => handleNavClick(link.path)}
                                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-colors ${
                                        active
                                            ? 'text-brand-orange bg-orange-50 font-black border-l-4 border-brand-orange shadow-2xs'
                                            : 'text-slate-800 hover:bg-slate-50 hover:text-brand-orange'
                                    }`}
                                >
                                    <span>{link.name}</span>
                                    {active && <span className="w-1.5 h-1.5 rounded-full bg-brand-orange"></span>}
                                </Link>
                            );
                        })}

                        {/* Mobile Quick Call & Enquire CTA */}
                        <div className="pt-3 border-t border-slate-100 space-y-2">
                            <a
                                href={`tel:${cleanPhone}`}
                                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-xs font-mono font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors uppercase border border-slate-200"
                            >
                                <Phone className="w-3.5 h-3.5 text-brand-orange" />
                                <span>CALL {phoneNumber}</span>
                            </a>

                            <Link
                                to="/contact"
                                onClick={() => setIsOpen(false)}
                                className="cta-light-sweep flex items-center justify-center gap-2 text-center w-full bg-brand-orange text-white font-black px-6 py-3.5 rounded-xl hover:bg-orange-600 transition-colors uppercase tracking-wider shadow-md text-sm border border-orange-400/40 active:scale-[0.98]"
                            >
                                <ShieldCheck className="w-4 h-4" /> ENQUIRE NOW
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
