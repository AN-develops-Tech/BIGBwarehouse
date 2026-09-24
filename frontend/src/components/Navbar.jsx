import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShieldCheck } from 'lucide-react';
import Logo from './Logo';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

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

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Facilities', path: '/facilities' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Contact', path: '/contact' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ease-out border-b ${
            scrolled 
                ? 'bg-white/95 backdrop-blur-md shadow-lg border-slate-200/80 py-1.5' 
                : 'bg-white/90 backdrop-blur-sm border-slate-100 py-3'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`flex justify-between items-center transition-all duration-300 ${
                    scrolled ? 'h-14 sm:h-16' : 'h-16 sm:h-20'
                }`}>

                    {/* Brand Logo */}
                    <div className="flex items-center gap-4">
                        <Link to="/" className="flex-shrink-0 flex items-center transition-transform duration-300 hover:scale-105">
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

                    {/* Mobile Menu Button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle navigation menu"
                            className="inline-flex items-center justify-center p-2 rounded-lg text-slate-800 hover:text-brand-orange hover:bg-slate-100 transition-colors"
                        >
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav Drawer */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-96 opacity-100 border-t border-slate-100' : 'max-h-0 opacity-0'
            }`}>
                <div className="px-4 pt-2 pb-5 space-y-1 bg-white/95 backdrop-blur-md shadow-xl">
                    {navLinks.map((link) => {
                        const active = isActive(link.path);
                        return (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`block px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors ${
                                    active
                                        ? 'text-brand-orange bg-orange-50 font-black border-l-4 border-brand-orange'
                                        : 'text-slate-800 hover:bg-slate-50 hover:text-brand-orange'
                                }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                    <div className="pt-3">
                        <Link
                            to="/contact"
                            onClick={() => setIsOpen(false)}
                            className="block text-center w-full bg-brand-orange text-white font-black px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors uppercase tracking-wider shadow-md text-sm"
                        >
                            ENQUIRE NOW
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;


