import { Link } from 'react-router-dom';
import { useCompany } from '../context/CompanyContext';
import { Warehouse, Scale, ShieldCheck, Truck, Users, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';
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
            color: "border-orange-200 bg-orange-50 text-brand-orange"
        },
        {
            title: "On-Site Heavy-Duty Hydra Crane",
            description: "Convenient in-house lifting and handling support for heavy and oversized materials.",
            icon: Truck,
            stat: "MOBILE HYDRA CRANE",
            color: "border-amber-200 bg-amber-50 text-amber-600"
        },
        {
            title: "50-Ton Weighbridge",
            description: "Reliable on-site weighing facility for efficient vehicle and cargo management.",
            icon: Scale,
            stat: "50-TON CAPACITY",
            color: "border-blue-200 bg-blue-50 text-blue-600"
        },
        {
            title: "24/7 CCTV Monitored Gated Security",
            description: "Continuous surveillance and controlled access for enhanced protection of your goods.",
            icon: ShieldCheck,
            stat: "24/7 SURVEILLANCE",
            color: "border-emerald-200 bg-emerald-50 text-emerald-600"
        },
        {
            title: "Union-Free Loading Docks & In-House Labour Crew",
            description: "Faster, organized loading and unloading supported by an in-house team, reducing operational delays and simplifying logistics.",
            icon: Users,
            stat: "NO UNION DELAYS",
            color: "border-purple-200 bg-purple-50 text-purple-600"
        }
    ];

    return (
        <div className="bg-white text-slate-900 min-h-screen font-sans">
            
            {/* Header Banner */}
            <div className="relative py-20 bg-slate-50 border-b border-slate-200 overflow-hidden blueprint-grid-pattern text-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-mono font-bold uppercase tracking-wider mb-3">
                        <Warehouse className="w-3.5 h-3.5" /> INDUSTRIAL STORAGE EXCELLENCE
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-slate-900 mb-4">
                        ABOUT {company?.name || 'BIGB WAREHOUSE PARK'}
                    </h1>
                    <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
                        {company?.tagline || 'More Than Storage. A Complete Space for Your Business to Store, Handle & Move with Confidence.'}
                    </p>
                    <div className="mt-6 h-1.5 w-24 bg-brand-orange mx-auto rounded-full"></div>
                </div>
            </div>

            {/* Main Overview Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Left: Interactive Real-World Image */}
                    <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-xl border-2 border-brand-orange/30 group">
                        <img
                            src={bigbWarehouseImg}
                            alt="BigB Warehouse Park Kerala Exterior"
                            loading="lazy"
                            className="w-full h-[450px] sm:h-[520px] object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95 contrast-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
                        
                        <div className="absolute bottom-6 left-6 right-6 bg-slate-950/80 backdrop-blur-md p-5 rounded-xl border border-brand-orange/40 shadow-xl">
                            <div className="flex items-center justify-between text-xs font-mono mb-1">
                                <span className="text-brand-orange font-bold">KERALA LOGISTICS HUB</span>
                                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                    OPERATIONAL
                                </span>
                            </div>
                            <div className="text-sm font-bold text-gray-200">
                                {company?.description || 'High-bay industrial facility with 50-Ton weighbridge & heavy dock access in Parippally, Kerala.'}
                            </div>
                        </div>
                    </div>

                    {/* Right: Core Introduction Content */}
                    <div className="lg:col-span-6 space-y-6">
                        <div className="inline-flex items-center gap-2 text-brand-orange font-mono text-xs uppercase tracking-widest font-extrabold">
                            <span className="w-2 h-2 bg-brand-orange rounded-full"></span>
                            WELCOME TO {company?.name || 'BIGB WAREHOUSE PARK'}
                        </div>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tight leading-tight">
                            {company?.tagline || 'Modern Storage & Hassle-Free Logistics Destination'}
                        </h2>

                        <p className="text-slate-700 leading-relaxed text-base sm:text-lg font-medium">
                            {company?.about_text || (
                                <>
                                    <strong className="text-brand-orange">BIGB Warehouse Park</strong> is a modern, professionally managed warehousing destination designed to support businesses with secure storage, efficient handling, and hassle-free logistics. Built with state-of-the-art infrastructure and essential on-site facilities, BIGB provides the space and support businesses need to store, move, and manage goods with confidence.
                                </>
                            )}
                        </p>

                        <p className="text-slate-600 leading-relaxed text-sm sm:text-base border-l-4 border-brand-orange pl-4 italic">
                            From high-capacity storage and heavy-duty material handling to weighing, loading, and round-the-clock security, every facility is thoughtfully designed to make day-to-day warehouse operations smoother and more efficient.
                        </p>

                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl shadow-sm">
                                <div className="text-brand-orange font-mono font-black text-xl sm:text-2xl">50,000+ SQ. FT.</div>
                                <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-0.5">High-Bay Capacity</div>
                            </div>
                            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl shadow-sm">
                                <div className="text-emerald-600 font-mono font-black text-xl sm:text-2xl">100% UNION-FREE</div>
                                <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-0.5">Uninterrupted Loading</div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            {/* Key Facilities Section */}
            <div className="bg-slate-50 py-24 border-y border-slate-200 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="text-center mb-16">
                        <span className="text-brand-orange font-mono text-xs uppercase tracking-widest font-extrabold">INFRASTRUCTURE EXCELLENCE</span>
                        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tight mt-2">
                            KEY WAREHOUSE FACILITIES
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base mt-3">
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
                                    className="bg-white border border-slate-200/80 hover:border-brand-orange/60 rounded-2xl p-8 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-xl hover:-translate-y-1 relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/5 rounded-bl-full pointer-events-none"></div>

                                    <div>
                                        <div className="flex items-center justify-between mb-6">
                                            <div className={`w-14 h-14 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm ${fac.color}`}>
                                                <IconComponent className="w-7 h-7" />
                                            </div>
                                            <span className="text-[10px] font-mono font-extrabold uppercase px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
                                                {fac.stat}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-black text-slate-900 mb-3 uppercase tracking-wide group-hover:text-brand-orange transition-colors">
                                            {fac.title}
                                        </h3>

                                        <p className="text-slate-600 text-sm leading-relaxed font-normal">
                                            {fac.description}
                                        </p>
                                    </div>

                                    <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-mono font-bold text-emerald-600">
                                        <CheckCircle2 className="w-4 h-4" />
                                        <span>INCLUDED ON-SITE</span>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Extra Hydra Crane Highlight Card */}
                        <div className="bg-white border border-slate-200/80 hover:border-brand-orange/60 rounded-2xl p-8 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/5 rounded-bl-full pointer-events-none"></div>

                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-14 h-14 rounded-xl border border-orange-200 bg-orange-50 text-brand-orange flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm">
                                        <Truck className="w-7 h-7" />
                                    </div>
                                    <span className="text-[10px] font-mono font-extrabold uppercase px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
                                        HEAVY LIFTING
                                    </span>
                                </div>

                                <h3 className="text-xl font-black text-slate-900 mb-3 uppercase tracking-wide group-hover:text-brand-orange transition-colors">
                                    HYDRA CRANE LIFTING SUPPORT
                                </h3>

                                <p className="text-slate-600 text-sm leading-relaxed font-normal">
                                    On-site mobile Hydra Crane ready for immediate heavy equipment and oversized cargo placement without external contractor delays.
                                </p>
                            </div>

                            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-600">
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span>INCLUDED ON-SITE</span>
                                </div>
                                <Link
                                    to="/facilities"
                                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-brand-orange uppercase hover:text-orange-600 transition-colors"
                                >
                                    <span>EXPLORE</span> <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Closing Tagline Banner */}
            <div className="py-14 sm:py-20 bg-white relative border-t border-slate-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-brand-orange/60 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 px-5 py-9 sm:px-10 sm:py-12 md:p-14 text-center shadow-2xl">
                        {/* Ambient Glow & Accent Bar */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-orange to-transparent"></div>
                        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-40 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none"></div>

                        <div className="relative z-10 space-y-4 sm:space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse"></span>
                                BIGB WAREHOUSE PARK
                            </div>

                            <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-snug sm:leading-tight max-w-4xl mx-auto">
                                MORE THAN STORAGE. A COMPLETE SPACE FOR YOUR BUSINESS TO <span className="text-brand-orange">STORE, HANDLE & MOVE</span> WITH CONFIDENCE.
                            </h2>

                            <p className="text-slate-300 max-w-2xl mx-auto text-xs sm:text-base leading-relaxed font-normal">
                                Contact our facility operations team today to discuss space availability, weight requirements, or custom logistics setup.
                            </p>

                            <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none mx-auto">
                                <Link
                                    to="/contact"
                                    className="w-full sm:w-auto cta-light-sweep bg-brand-orange hover:bg-orange-600 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-black uppercase tracking-wider text-xs sm:text-sm transition-all flex items-center justify-center gap-2.5 shadow-xl shadow-brand-orange/20 border border-orange-400 active:scale-95"
                                >
                                    <span>BOOK SPACE / ENQUIRE NOW</span>
                                    <ArrowRight className="w-4 h-4 shrink-0" />
                                </Link>
                                <Link
                                    to="/facilities"
                                    className="w-full sm:w-auto bg-slate-800/90 hover:bg-slate-800 border border-slate-700 hover:border-brand-orange/60 text-slate-200 hover:text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm transition-all flex items-center justify-center gap-2 backdrop-blur-sm active:scale-95"
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

