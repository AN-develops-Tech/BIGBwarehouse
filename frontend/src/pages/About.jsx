import { Link } from 'react-router-dom';
import { useCompany } from '../context/CompanyContext';
import { Warehouse, Scale, ShieldCheck, Truck, Users, Sparkles, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import bigbWarehouseImg from '../assets/images/bigb_warehouse.png';
import orangeHydraCraneImg from '../assets/images/orange_hydra_crane.png';

const About = () => {
    const { company } = useCompany();

    const keyFacilities = [
        {
            title: "State-of-the-Art High-Bay Infrastructure",
            description: "Spacious, high-ceiling storage designed to accommodate large-volume inventory and optimize warehouse capacity.",
            icon: Warehouse,
            stat: "50,000+ SQ. FT.",
            color: "border-orange-500/40 bg-slate-900/90 text-brand-orange"
        },
        {
            title: "On-Site Heavy-Duty Hydra Crane",
            description: "Convenient in-house lifting and handling support for heavy and oversized materials.",
            icon: Truck,
            stat: "MOBILE HYDRA CRANE",
            color: "border-amber-500/40 bg-slate-900/90 text-amber-500"
        },
        {
            title: "50-Ton Weighbridge",
            description: "Reliable on-site weighing facility for efficient vehicle and cargo management.",
            icon: Scale,
            stat: "50-TON CAPACITY",
            color: "border-blue-500/40 bg-slate-900/90 text-blue-400"
        },
        {
            title: "24/7 CCTV Monitored Gated Security",
            description: "Continuous surveillance and controlled access for enhanced protection of your goods.",
            icon: ShieldCheck,
            stat: "24/7 SURVEILLANCE",
            color: "border-emerald-500/40 bg-slate-900/90 text-emerald-400"
        },
        {
            title: "Union-Free Loading Docks & In-House Labour Crew",
            description: "Faster, organized loading and unloading supported by an in-house team, reducing operational delays and simplifying logistics.",
            icon: Users,
            stat: "NO UNION DELAYS",
            color: "border-purple-500/40 bg-slate-900/90 text-purple-400"
        }
    ];

    return (
        <div className="bg-slate-950 text-slate-100 min-h-screen font-sans">
            
            {/* Header Banner */}
            <div className="relative py-20 bg-slate-900 border-b border-brand-orange/30 overflow-hidden blueprint-grid-pattern">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 bg-brand-orange/15 border border-brand-orange/50 text-brand-orange px-4 py-1.5 rounded-full text-xs font-mono mb-4 uppercase tracking-widest font-black">
                        <Sparkles className="w-4 h-4" /> PROFESSIONALLY MANAGED WAREHOUSING
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-4">
                        ABOUT BIGB WAREHOUSE PARK
                    </h1>
                    <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto font-medium leading-relaxed">
                        More Than Storage. A Complete Space for Your Business to Store, Handle & Move with Confidence.
                    </p>
                </div>
            </div>

            {/* Main Overview Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Left: Interactive Real-World Image */}
                    <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-2xl border-2 border-brand-orange/40 group">
                        <img
                            src={bigbWarehouseImg}
                            alt="BigB Warehouse Park Kerala Exterior"
                            loading="lazy"
                            className="w-full h-[450px] sm:h-[520px] object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95 contrast-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
                        
                        <div className="absolute bottom-6 left-6 right-6 steel-glass-card p-5 rounded-xl border border-brand-orange/40">
                            <div className="flex items-center justify-between text-xs font-mono mb-1">
                                <span className="text-brand-orange font-bold">KERALA LOGISTICS HUB</span>
                                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                    OPERATIONAL
                                </span>
                            </div>
                            <div className="text-sm font-bold text-gray-200">
                                High-bay industrial facility with 50-Ton weighbridge & heavy dock access in Parippally, Kerala.
                            </div>
                        </div>
                    </div>

                    {/* Right: Core Introduction Content */}
                    <div className="lg:col-span-6 space-y-6">
                        <div className="inline-flex items-center gap-2 text-brand-orange font-mono text-xs uppercase tracking-widest font-extrabold">
                            <span className="w-2 h-2 bg-brand-orange rounded-full"></span>
                            WELCOME TO BIGB WAREHOUSE PARK
                        </div>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-tight">
                            {company?.tagline || 'Modern Storage & Hassle-Free Logistics Destination'}
                        </h2>

                        <p className="text-gray-200 leading-relaxed text-base sm:text-lg font-medium">
                            <strong className="text-brand-orange">BIGB Warehouse Park</strong> is a modern, professionally managed warehousing destination designed to support businesses with secure storage, efficient handling, and hassle-free logistics. Built with state-of-the-art infrastructure and essential on-site facilities, BIGB provides the space and support businesses need to store, move, and manage goods with confidence.
                        </p>

                        <p className="text-gray-300 leading-relaxed text-sm sm:text-base border-l-4 border-brand-orange pl-4 italic">
                            From high-capacity storage and heavy-duty material handling to weighing, loading, and round-the-clock security, every facility is thoughtfully designed to make day-to-day warehouse operations smoother and more efficient.
                        </p>

                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
                                <div className="text-brand-orange font-mono font-black text-xl sm:text-2xl">50,000+ SQ. FT.</div>
                                <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider mt-0.5">High-Bay Capacity</div>
                            </div>
                            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
                                <div className="text-emerald-400 font-mono font-black text-xl sm:text-2xl">100% UNION-FREE</div>
                                <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider mt-0.5">Uninterrupted Loading</div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            {/* Key Facilities Section */}
            <div className="bg-slate-900/80 py-24 border-y border-slate-800 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="text-center mb-16">
                        <span className="text-brand-orange font-mono text-xs uppercase tracking-widest font-extrabold">INFRASTRUCTURE EXCELLENCE</span>
                        <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mt-2">
                            KEY WAREHOUSE FACILITIES
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base mt-3">
                            Engineered with built-in industrial support to streamline your supply chain operations.
                        </p>
                        <div className="mt-4 h-1.5 w-24 bg-brand-orange mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {keyFacilities.map((fac, idx) => {
                            const IconComponent = fac.icon;
                            return (
                                <div
                                    key={idx}
                                    className="bg-slate-950 border border-slate-800 hover:border-brand-orange/60 rounded-2xl p-8 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:-translate-y-1 relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/5 rounded-bl-full pointer-events-none"></div>

                                    <div>
                                        <div className="flex items-center justify-between mb-6">
                                            <div className={`w-14 h-14 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-110 shadow-md ${fac.color}`}>
                                                <IconComponent className="w-7 h-7" />
                                            </div>
                                            <span className="text-[10px] font-mono font-extrabold uppercase px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-gray-300">
                                                {fac.stat}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-black text-white mb-3 uppercase tracking-wide group-hover:text-brand-orange transition-colors">
                                            {fac.title}
                                        </h3>

                                        <p className="text-gray-300 text-sm leading-relaxed font-normal">
                                            {fac.description}
                                        </p>
                                    </div>

                                    <div className="mt-8 pt-4 border-t border-slate-900 flex items-center gap-2 text-xs font-mono font-bold text-emerald-400">
                                        <CheckCircle2 className="w-4 h-4" />
                                        <span>INCLUDED ON-SITE</span>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Extra Hydra Crane Highlight Card */}
                        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-2 border-brand-orange/50 rounded-2xl p-8 shadow-2xl flex flex-col justify-between group hover:-translate-y-1 relative overflow-hidden">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="bg-brand-orange text-white font-mono text-[10px] font-black uppercase px-3 py-1 rounded-full">
                                        FEATURED CAPABILITY
                                    </span>
                                    <span className="text-xs font-mono font-bold text-brand-orange">HEAVY LIFTING</span>
                                </div>

                                <h3 className="text-xl font-black text-white mb-3 uppercase tracking-wide text-brand-orange">
                                    HYDRA CRANE LIFTING SUPPORT
                                </h3>

                                <p className="text-gray-200 text-sm leading-relaxed font-normal mb-4">
                                    On-site mobile Hydra Crane ready for immediate heavy equipment and oversized cargo placement without external contractor delays.
                                </p>
                            </div>

                            <Link
                                to="/facilities"
                                className="inline-flex items-center gap-2 text-xs font-mono font-black text-brand-orange uppercase hover:underline"
                            >
                                EXPLORE ALL FACILITIES <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                </div>
            </div>

            {/* Closing Tagline Banner */}
            <div className="py-20 bg-slate-950 relative border-t border-slate-800">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border-2 border-brand-orange/60 rounded-3xl p-8 sm:p-14 text-center shadow-2xl relative overflow-hidden">
                        
                        <div className="relative z-10 space-y-6">
                            <div className="inline-block bg-brand-orange text-white font-mono font-black text-xs uppercase px-4 py-1.5 rounded-full tracking-wider shadow-md">
                                BIGB WAREHOUSE PARK
                            </div>

                            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-tight max-w-4xl mx-auto">
                                MORE THAN STORAGE. A COMPLETE SPACE FOR YOUR BUSINESS TO STORE, HANDLE & MOVE WITH CONFIDENCE.
                            </h2>

                            <p className="text-gray-300 max-w-2xl mx-auto text-base font-medium">
                                Contact our facility operations team today to discuss space availability, weight requirements, or custom logistics setup.
                            </p>

                            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link
                                    to="/contact"
                                    className="cta-light-sweep bg-brand-orange text-white px-8 py-4 rounded-xl font-black uppercase tracking-wider text-sm hover:bg-orange-600 transition-all flex items-center justify-center gap-3 shadow-xl border border-orange-400"
                                >
                                    BOOK SPACE / ENQUIRE NOW <ArrowRight className="w-5 h-5" />
                                </Link>
                                <Link
                                    to="/facilities"
                                    className="bg-slate-900 border border-slate-700 text-gray-200 px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-sm hover:border-brand-orange hover:text-brand-orange transition-all flex items-center justify-center gap-2"
                                >
                                    VIEW ALL FACILITIES
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default About;

