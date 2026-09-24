import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowUp } from 'lucide-react';
import { useCompany } from '../context/CompanyContext';
import Logo from './Logo';
import footerMapBgImg from '../assets/images/footer_map_bg.jpg';

const Footer = () => {
    const { company } = useCompany();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-[#060c16] text-white relative overflow-hidden border-t border-brand-orange/30">
            
            {/* User Provided Google Satellite Map Background Blended at 45% Visibility */}
            <div className="absolute inset-0 opacity-[0.45] pointer-events-none overflow-hidden select-none z-0">
                <img
                    src={footerMapBgImg}
                    alt="Big B Traders Location Map"
                    className="w-full h-full object-cover filter contrast-110 brightness-90 mix-blend-luminosity"
                />
                {/* Dark Vignette Overlay for High Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060c16] via-[#060c16]/50 to-[#060c16]/75"></div>
            </div>

            {/* Top Banner section */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="md:col-span-1 space-y-4">
                    <Logo lightTheme={true} />
                    <p className="text-gray-300 text-sm leading-relaxed max-w-xs mt-6 font-medium">
                        Reliable Warehouse Space for Your Business
                    </p>
                </div>

                <div>
                    <h3 className="text-sm font-bold mb-6 tracking-wider text-white uppercase">QUICK LINKS</h3>
                    <ul className="space-y-4 text-sm font-semibold text-brand-orange">
                        <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                        <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                        <li><Link to="/facilities" className="hover:text-white transition-colors">Facilities</Link></li>
                        <li><Link to="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
                        <li><Link to="/contact" className="hover:text-white transition-colors">Contact & Location</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-sm font-bold mb-6 tracking-wider text-white uppercase">OUR FACILITIES</h3>
                    <ul className="space-y-4 text-sm font-semibold text-brand-orange">
                        <li>Warehouse</li>
                        <li>Weigh Bridge</li>
                        <li>Loading & Unloading</li>
                        <li>Ample Parking</li>
                        <li className="flex items-center gap-1.5">
                            <span>Hydra Crane</span>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-sm font-bold mb-6 tracking-wider text-white uppercase">CONTACT US</h3>
                    <ul className="space-y-4 text-sm font-semibold text-brand-orange">
                        <li className="flex items-center gap-3">
                            <Phone className="w-4 h-4 text-brand-orange shrink-0" />
                            <span>{company?.phone || '+91 7909294488'}</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail className="w-4 h-4 text-brand-orange shrink-0" />
                            <span className="break-all">{company?.email || 'test@bigb.com'}</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Horizontal Divider & Copyright */}
            <div className="border-t border-slate-800/80 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col items-center justify-center text-xs font-mono tracking-wider text-gray-400">
                    <p>&copy; {new Date().getFullYear()} BIGB WAREHOUSE PARK. All Rights Reserved.</p>
                </div>
                <button
                    onClick={scrollToTop}
                    className="absolute right-4 md:right-10 -top-6 bg-slate-900 border border-brand-orange/50 text-brand-orange hover:bg-brand-orange hover:text-white rounded-full p-3 transition-all shadow-xl z-20 cursor-pointer"
                    title="Back to top"
                >
                    <ArrowUp className="w-5 h-5" />
                </button>
            </div>
        </footer>
    );
};

export default Footer;
