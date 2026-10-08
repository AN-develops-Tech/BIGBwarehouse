import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import Logo from './Logo';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navRef = useRef(null);
    const location = useLocation();

    // Scroll state tracking for dynamic header height & blur
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu automatically on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    // Apple UI Outside Click & Escape Key Handler
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

    return (
        <>
            {/* Apple-style Backdrop Blur Overlay: closes on any outside click */}
            <div
                onClick={() => setIsOpen(false)}
                className={`fixed inset-0 z-40 bg-slate-950/25 backdrop-blur-sm transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
                    isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
                aria-hidden="true"
            />

            <nav
                ref={navRef}
                className={`sticky top-0 z-50 w-full transition-all duration-300 ease-out border-b ${
                    scrolled 
                        ? 'bg-white/95 backdrop-blur-md shadow-lg border-slate-200/80 py-1.5' 
                        : 'bg-white/90 backdrop-blur-sm border-slate-100 py-3'
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`flex justify-between items-center transition-all duration-300 ${
                        scrolled ? 'h-14 sm:h-16' : 'h-16 sm:h-20'
                    }`}>

                        {/* Brand Logo */}
                        <div className="flex items-center gap-4">
                            <Link
                                to="/"
                                onClick={() => {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                    setIsOpen(false);
                                }}
                                className="flex-shrink-0 flex items-center transition-transform duration-300 hover:scale-105"
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
                                        onClick={() => {
                                            if (link.path === '/') {
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                            }
                                        }}
                                        className={`relative px-4 py-2 text-xs lg:text-sm font-bold uppercase tracking-wider transition-colors duration-200 rounded-lg ${
                                            active
                                                ? 'text-brand-orange bg-orange-50/80 font-black'
                                                : 'text-slate-800 hover:text-brand-orange hover:bg-slate-100/60'
                                        }`}
                                    >
                                        {link.name}
                                        {active && (
                                            <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-orange rounded-full"></span>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Right CTA Action Button */}
                        <div className="hidden md:flex flex-shrink-0 items-center gap-3">
                            <Link
                                to="/contact"
                                className="cta-light-sweep bg-brand-orange text-white font-black uppercase rounded-lg shadow-md hover:bg-orange-600 transition-all duration-200 flex items-center gap-2 border border-orange-400 text-xs sm:text-sm px-5 py-2.5 hover:shadow-orange-500/20 active:scale-95"
                            >
                                <ShieldCheck className="w-4 h-4" /> ENQUIRE NOW
                            </Link>
                        </div>

                        {/* Mobile Menu Button with Apple-style Fluid Morphing Animation */}
                        <div className="flex items-center md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                                aria-expanded={isOpen}
                                className="relative w-10 h-10 flex flex-col items-center justify-center rounded-xl text-slate-800 hover:text-brand-orange hover:bg-slate-100/80 transition-colors focus:outline-none"
                            >
                                <div className="w-5 h-4 relative flex flex-col justify-between">
                                    <span
                                        className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
                                            isOpen ? 'rotate-45 translate-y-[7px] text-brand-orange' : ''
                                        }`}
                                    />
                                    <span
                                        className={`w-full h-0.5 bg-current rounded-full transition-all duration-200 ease-out origin-left ${
                                            isOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
                                        }`}
                                    />
                                    <span
                                        className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
                                            isOpen ? '-rotate-45 -translate-y-[7px] text-brand-orange' : ''
                                        }`}
                                    />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Nav Drawer with Apple UI-style Smooth Fluid Accordion Animation */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isOpen 
                            ? 'max-h-96 opacity-100 border-t border-slate-100 shadow-xl' 
                            : 'max-h-0 opacity-0 pointer-events-none'
                    }`}
                >
                    <div className="px-4 pt-2.5 pb-5 space-y-1 bg-white/98 backdrop-blur-2xl">
                        {navLinks.map((link, idx) => {
                            const active = isActive(link.path);
                            return (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => {
                                        setIsOpen(false);
                                        if (link.path === '/') {
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }
                                    }}
                                    style={{
                                        transitionDelay: isOpen ? `${50 + idx * 40}ms` : '0ms',
                                    }}
                                    className={`block px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                                        isOpen 
                                            ? 'opacity-100 translate-y-0' 
                                            : 'opacity-0 -translate-y-2'
                                    } ${
                                        active
                                            ? 'text-brand-orange bg-orange-50 font-black border-l-4 border-brand-orange'
                                            : 'text-slate-800 hover:bg-slate-50 hover:text-brand-orange'
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}

                        {/* CTA button with staggered entrance */}
                        <div
                            style={{
                                transitionDelay: isOpen ? `${50 + navLinks.length * 40}ms` : '0ms',
                            }}
                            className={`pt-2.5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                                isOpen 
                                    ? 'opacity-100 translate-y-0' 
                                    : 'opacity-0 -translate-y-2'
                            }`}
                        >
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
