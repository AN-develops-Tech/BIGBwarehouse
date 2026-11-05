import { useState } from 'react';
import { Warehouse, Scale, ShieldCheck, Truck, ParkingCircle, Users, Zap, CheckCircle2, Maximize2, X } from 'lucide-react';
import { facilitiesData } from '../data/facilitiesData';
import hydraCraneImg from '../assets/images/hydra_crane.png';
import interiorImg from '../assets/images/interior.png';

const ICONS_MAP = {
    Warehouse, Scale, ShieldCheck, Truck, ParkingCircle, Users, Zap, CheckCircle2
};

const Facilities = () => {
    const facilities = facilitiesData;
    const [selectedImage, setSelectedImage] = useState(null);
    const displayFacilities = facilities;

    return (
        <div className="bg-white text-slate-900 min-h-screen font-sans">

            {/* Modern Header Banner */}
            <div className="relative py-20 bg-slate-50 border-b border-slate-200 overflow-hidden blueprint-grid-pattern text-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-slate-900 mb-4">
                        FACILITIES & ADVANTAGES
                    </h1>
                    <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
                        Engineered for maximum supply chain efficiency with on-site Hydra Crane heavy lifting, 50-ton weighbridge, union-free loading docks, abundant power supply, and in-house labor workforce.
                    </p>
                    <div className="mt-6 h-1.5 w-24 bg-brand-orange mx-auto rounded-full"></div>
                </div>
            </div>

            {/* Quick Key Advantages Ribbon */}
            <div className="bg-white border-b border-gray-200 shadow-sm py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col items-center hover:bg-slate-100 transition-colors">
                            <Truck className="w-7 h-7 text-brand-orange mb-2" />
                            <span className="font-black text-sm uppercase text-slate-900">HYDRA CRANE LIFTING</span>
                            <span className="text-xs text-gray-500 mt-0.5">On-Site Heavy Duty Crane</span>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col items-center hover:bg-slate-100 transition-colors">
                            <Scale className="w-7 h-7 text-amber-600 mb-2" />
                            <span className="font-black text-sm uppercase text-slate-900">50-TON WEIGHBRIDGE</span>
                            <span className="text-xs text-gray-500 mt-0.5">In-House Scale Platform</span>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col items-center hover:bg-slate-100 transition-colors">
                            <ShieldCheck className="w-7 h-7 text-emerald-600 mb-2" />
                            <span className="font-black text-sm uppercase text-slate-900">NO UNION INTERFERENCE</span>
                            <span className="text-xs text-gray-500 mt-0.5">Seamless 24/7 Loading</span>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col items-center hover:bg-slate-100 transition-colors">
                            <Zap className="w-7 h-7 text-indigo-600 mb-2" />
                            <span className="font-black text-sm uppercase text-slate-900">AMPLE POWER SUPPLY</span>
                            <span className="text-xs text-gray-500 mt-0.5">3-Phase High Voltage</span>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col items-center hover:bg-slate-100 transition-colors">
                            <Users className="w-7 h-7 text-purple-600 mb-2" />
                            <span className="font-black text-sm uppercase text-slate-900">IN-HOUSE LABORS</span>
                            <span className="text-xs text-gray-500 mt-0.5">Trained Crew Workforce</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Hydra Crane Spotlight Showcase Banner */}
            <div className="hidden lg:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4">
                <div className="bg-[#0b0d17] text-white rounded-3xl overflow-hidden border border-brand-orange/40 shadow-2xl grid grid-cols-1 lg:grid-cols-2 transition-all duration-300">
                    {/* Left Column: Crane image fills full height and width seamlessly */}
                    <div
                        className="relative w-full min-h-[300px] sm:min-h-[380px] lg:min-h-full overflow-hidden cursor-pointer group"
                        onClick={() => setSelectedImage({ url: hydraCraneImg, title: "Hydra Crane Heavy Lifting Services" })}
                    >
                        <img
                            src={hydraCraneImg}
                            alt="Hydra Crane Heavy Lifting Services"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            style={{ objectFit: 'cover' }}
                        />
                        <div className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur-md border border-brand-orange/60 text-brand-orange text-xs font-mono font-bold px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-lg transition-colors group-hover:bg-slate-900 group-hover:border-brand-orange">
                            <Maximize2 className="w-4 h-4" /> CLICK TO EXPAND FULL IMAGE
                        </div>
                    </div>

                    {/* Right Column: Solid dark background (#0b0d17) with refined typography and badges */}
                    <div className="bg-[#0b0d17] p-6 sm:p-10 lg:p-12 flex flex-col justify-center space-y-5">
                        <div className="inline-flex items-center gap-2 self-start bg-brand-orange text-white px-3 py-1 rounded-full text-xs font-mono font-black uppercase tracking-wider shadow-md">
                            FEATURED EQUIPMENT
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                            HYDRA CRANE HEAVY LIFTING SERVICES
                        </h2>
                        <p className="text-slate-200 leading-relaxed text-sm sm:text-base font-normal">
                            Equipped with an on-site heavy-duty industrial mobile Hydra Crane for fast unloading, precision positioning, and heavy machinery handling across the warehouse park.
                        </p>

                        <div className="space-y-3 pt-2 font-mono text-xs sm:text-sm text-slate-200">
                            <div className="flex items-center gap-3.5 bg-white/[0.04] p-3.5 sm:p-4 rounded-xl border border-white/10 transition-colors hover:border-brand-orange/40">
                                <CheckCircle2 className="text-brand-orange w-5 h-5 shrink-0" />
                                <span className="font-bold tracking-wide">HEAVY MACHINERY & CARGO UNLOADING</span>
                            </div>
                            <div className="flex items-center gap-3.5 bg-white/[0.04] p-3.5 sm:p-4 rounded-xl border border-white/10 transition-colors hover:border-brand-orange/40">
                                <CheckCircle2 className="text-brand-orange w-5 h-5 shrink-0" />
                                <span className="font-bold tracking-wide">ON-SITE OPERATOR & RAPID TURNAROUND</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modern Card Grid */}
            <div className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {displayFacilities.map((facility) => {
                            const Icon = ICONS_MAP[facility.icon] || CheckCircle2;
                            const cardImage = (facility.image_display && facility.image_display.trim()) ||
                                              (facility.image && facility.image.trim()) ||
                                              (facility.image_url && facility.image_url.trim()) ||
                                              interiorImg;
                            const badgeStyle = facility.badgeColor || "bg-blue-100 text-blue-800 border-blue-200";

                            return (
                                <div
                                    key={facility.id}
                                    className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                                >
                                    <div
                                        className="relative h-60 overflow-hidden border-b border-gray-100 cursor-pointer"
                                        onClick={() => setSelectedImage({ url: cardImage, title: facility.title })}
                                    >
                                        <img
                                            src={cardImage}
                                            alt={facility.title}
                                            loading="lazy"
                                            decoding="async"
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
                                        
                                        {/* Expand Picture Button Overlay */}
                                        <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-lg flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity font-medium">
                                            <Maximize2 className="w-3.5 h-3.5 text-brand-orange" />
                                            <span>Expand Picture</span>
                                        </div>

                                        {facility.spec && (
                                            <div className={`absolute top-3 right-3 text-xs font-mono font-extrabold px-3 py-1 rounded-full border shadow-sm ${badgeStyle}`}>
                                                {facility.spec}
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-8 flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="w-14 h-14 bg-blue-50 border border-blue-200/80 rounded-xl flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                <Icon className="w-7 h-7" />
                                            </div>
                                            <h3 className="text-xl font-black text-slate-900 mb-3 uppercase tracking-wide group-hover:text-blue-600 transition-colors">
                                                {facility.title}
                                            </h3>
                                            <p className="text-slate-600 leading-relaxed text-sm font-medium">
                                                {facility.description}
                                            </p>
                                        </div>

                                        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs font-mono font-bold text-emerald-600">
                                            <CheckCircle2 className="w-4 h-4" />
                                            <span>OPERATIONAL & AVAILABLE</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>

            {/* Photo Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-5xl w-full bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-gray-800 animate-ios-pop" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-slate-900 text-white">
                            <h3 className="font-black text-lg uppercase tracking-wide text-brand-orange">{selectedImage.title}</h3>
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-2 bg-black flex items-center justify-center max-h-[80vh] overflow-hidden">
                            <img
                                src={selectedImage.url}
                                alt={selectedImage.title}
                                className="max-h-[75vh] w-auto object-contain rounded"
                            />
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Facilities;
