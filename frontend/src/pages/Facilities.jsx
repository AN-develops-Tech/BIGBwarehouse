import { useEffect, useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import api from '../api/axios';
import { Warehouse, Scale, ShieldCheck, Truck, ParkingCircle, Users, Zap, CheckCircle2, Award, Sparkles, Maximize2, X } from 'lucide-react';

import interiorImg from '../assets/images/interior.png';
import weighbridgeImg from '../assets/images/weighbridge.png';
import loadingDocksImg from '../assets/images/loading_docks.png';
import parkingYardImg from '../assets/images/parking_yard.png';
import laborOpsImg from '../assets/images/labor_ops.png';
import powerElectricityImg from '../assets/images/power_electricity.png';
import hydraCraneImg from '../assets/images/hydra_crane.png';

const ICONS_MAP = {
    Warehouse, Scale, ShieldCheck, Truck, ParkingCircle, Users, Zap, CheckCircle2
};

const Facilities = () => {
    const [facilities, setFacilities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    const defaultFacilities = [
        {
            id: 1,
            title: "High-Bay Warehouse Storage",
            description: "Spacious heavy-duty warehouse bays with 30ft ceiling clearance, epoxy concrete flooring, and high pallet racking capacity suitable for commercial inventory.",
            icon: "Warehouse",
            image: interiorImg,
            spec: "50,000+ SQ. FT. HIGH BAY",
            badgeColor: "bg-blue-100 text-blue-800 border-blue-200"
        },
        {
            id: 2,
            title: "In-House 50-Ton Weighbridge",
            description: "Dedicated heavy-duty 50-ton digital weighbridge scale on-site for fast, accurate gross & tare weight verification of all arriving and departing trucks.",
            icon: "Scale",
            image: weighbridgeImg,
            spec: "50-TON WEIGHBRIDGE SCALE",
            badgeColor: "bg-amber-100 text-amber-800 border-amber-200"
        },
        {
            id: 3,
            title: "Union-Free Loading & Unloading",
            description: "100% union-interference-free operations. Enjoy smooth, uninterrupted 24/7 dock loading and unloading without external labor disputes or operational halts.",
            icon: "ShieldCheck",
            image: loadingDocksImg,
            spec: "NO UNION INTERFERENCE",
            badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200"
        },
        {
            id: 4,
            title: "Hydra Crane Heavy Lifting Services",
            description: "On-site heavy industrial mobile Hydra Crane equipped for fast loading, unloading, and precision placement of heavy machinery, equipment, and bulk cargo.",
            icon: "Truck",
            image: hydraCraneImg,
            spec: "ON-SITE HYDRA CRANE",
            badgeColor: "bg-orange-100 text-orange-800 border-orange-200"
        },
        {
            id: 5,
            title: "In-House Labors",
            description: "Dedicated trained in-house labor workforce available for rapid cargo handling, loading & unloading, and inventory stacking.",
            icon: "Users",
            image: laborOpsImg,
            spec: "IN-HOUSE LABORS",
            badgeColor: "bg-purple-100 text-purple-800 border-purple-200"
        },
        {
            id: 6,
            title: "Ample Industrial Power & Electricity",
            description: "Uninterrupted 3-phase high-voltage electrical grid connection with high-capacity power backup to ensure continuous 24/7 operational lighting and machinery function.",
            icon: "Zap",
            image: powerElectricityImg,
            spec: "3-PHASE AMPLE POWER",
            badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200"
        },
        {
            id: 7,
            title: "Heavy Truck & Trailer Parking Yard",
            description: "Expansive asphalt staging yard designed with wide turning radii for 18-wheeler articulated trailers, high-mast LED floodlights, and 24/7 security gates.",
            icon: "ParkingCircle",
            image: parkingYardImg,
            spec: "AMPLE PARKING YARD",
            badgeColor: "bg-slate-100 text-slate-800 border-slate-200"
        }
    ];

    useEffect(() => {
        const fetchFacilities = async () => {
            try {
                const res = await api.get('/facilities/');
                const data = res.data.results || res.data || [];
                setFacilities(data.length > 0 ? data : defaultFacilities);
            } catch (err) {
                setFacilities(defaultFacilities);
            } finally {
                setLoading(false);
            }
        };
        fetchFacilities();
    }, []);

    const displayFacilities = facilities.length > 0 ? facilities : defaultFacilities;

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 text-blue-600 font-mono text-xl pt-20">
                LOADING WAREHOUSE FACILITIES...
            </div>
        );
    }

    return (
        <div className="bg-gray-50 text-slate-900 min-h-screen font-sans">

            {/* Modern Header Banner */}
            <div className="relative py-20 bg-gray-900 text-white border-b border-gray-800 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 bg-brand-orange/20 border border-brand-orange/50 text-brand-orange px-4 py-1.5 rounded-full text-xs font-mono mb-4 uppercase tracking-wider font-bold">
                        <Sparkles className="w-4 h-4" /> MODERN LOGISTICS INFRASTRUCTURE
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
                        FACILITIES & ADVANTAGES
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto font-normal leading-relaxed">
                        Engineered for maximum supply chain efficiency with on-site Hydra Crane heavy lifting, 50-ton weighbridge, union-free loading docks, abundant power supply, and in-house labor workforce.
                    </p>
                </div>
            </div>

            {/* Quick Key Advantages Ribbon */}
            <div className="bg-white border-b border-gray-200 shadow-sm py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                        <div className="p-4 bg-orange-50/80 rounded-xl border border-brand-orange/50 flex flex-col items-center hover:bg-orange-100 transition-colors shadow-sm">
                            <Truck className="w-7 h-7 text-brand-orange mb-2" />
                            <span className="font-black text-sm uppercase text-brand-orange">HYDRA CRANE LIFTING</span>
                            <span className="text-xs text-orange-700 font-bold mt-0.5">On-Site Heavy Duty Crane</span>
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4">
                <div className="bg-slate-950 text-white rounded-3xl overflow-hidden border-2 border-brand-orange/50 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-7 relative h-[380px] sm:h-[450px] overflow-hidden cursor-pointer group" onClick={() => setSelectedImage({ url: hydraCraneImg, title: "Hydra Crane Heavy Lifting Services" })}>
                        <img
                            src={hydraCraneImg}
                            alt="Hydra Crane Heavy Lifting Services"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-slate-950/80"></div>
                        <div className="absolute bottom-4 left-4 bg-slate-900/90 border border-brand-orange/60 text-brand-orange text-xs font-mono font-bold px-3 py-1.5 rounded-xl flex items-center gap-2">
                            <Maximize2 className="w-4 h-4" /> CLICK TO EXPAND FULL IMAGE
                        </div>
                    </div>

                    <div className="lg:col-span-5 p-8 sm:p-10 space-y-5">
                        <div className="inline-flex items-center gap-2 bg-brand-orange text-white px-3 py-1 rounded-full text-xs font-mono font-black uppercase tracking-wider shadow-md">
                            FEATURED EQUIPMENT
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                            HYDRA CRANE HEAVY LIFTING SERVICES
                        </h2>
                        <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                            Equipped with an on-site heavy-duty industrial mobile Hydra Crane for fast unloading, precision positioning, and heavy machinery handling across the warehouse park.
                        </p>

                        <div className="space-y-3 pt-2 font-mono text-xs text-gray-200">
                            <div className="flex items-center gap-3 bg-slate-900 p-3 rounded-xl border border-slate-800">
                                <CheckCircle2 className="text-brand-orange w-5 h-5 shrink-0" />
                                <span className="font-bold">HEAVY MACHINERY & CARGO UNLOADING</span>
                            </div>
                            <div className="flex items-center gap-3 bg-slate-900 p-3 rounded-xl border border-slate-800">
                                <CheckCircle2 className="text-brand-orange w-5 h-5 shrink-0" />
                                <span className="font-bold">ON-SITE OPERATOR & RAPID TURNAROUND</span>
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
                            const cardImage = facility.image || interiorImg;
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
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-5xl w-full bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-gray-800" onClick={e => e.stopPropagation()}>
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
