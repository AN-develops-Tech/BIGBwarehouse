import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Warehouse, Scale, Truck, ParkingCircle, CheckCircle, CheckCircle2, RotateCcw, PhoneCall, Zap, ShieldCheck, Layers, Users } from 'lucide-react';
import { useCompany } from '../context/CompanyContext';
import { facilitiesData } from '../data/facilitiesData';
import { galleryData } from '../data/galleryData';
import CtaBanner from '../components/CtaBanner';

// Import photorealistic warehouse visual assets
import bigbWarehouseImg from '../assets/images/bigb_warehouse.png';
import orangeHydraCraneImg from '../assets/images/orange_hydra_crane.png';
import interiorImg from '../assets/images/interior.png';
import weighbridgeImg from '../assets/images/weighbridge.png';
import loadingDocksImg from '../assets/images/loading_docks.png';
import parkingYardImg from '../assets/images/parking_yard.png';
import laborOpsImg from '../assets/images/labor_ops.png';
import hydraCraneImg from '../assets/images/hydra_crane.png';

const Home = () => {
    const { company } = useCompany();
    const [facilities] = useState(facilitiesData);
    const [gallery] = useState(galleryData);
    const [flippedCards, setFlippedCards] = useState({});

    const toggleFlip = (index) => {
        setFlippedCards((prev) => (prev[index] ? {} : { [index]: true }));
    };

    // Hero slideshow sequence featuring official BigB Warehouse Park facilities
    const heroSlides = [
        {
            image: (company?.hero_image_display && company.hero_image_display.trim()) ||
                   (company?.hero_image && company.hero_image.trim()) ||
                   (company?.hero_image_url && company.hero_image_url.trim()) ||
                   bigbWarehouseImg,
            title: company?.name || "BIGB WAREHOUSE PARK",
            subtitle: company?.hero_subtitle || "State-of-the-art high-bay industrial warehouse facility & logistics hub"
        },
        {
            image: orangeHydraCraneImg,
            title: "POWER | PRECISION | PERFORMANCE",
            subtitle: "LIFTING YOUR TOMORROW - Heavy Industrial Hydra Crane Solutions for Machinery & Bulk Cargo Unloading"
        },
        {
            image: interiorImg,
            title: "High-Bay Steel Storage Racks",
            subtitle: "Polished epoxy concrete aisles & electric forklift operations"
        },
        {
            image: loadingDocksImg,
            title: "Active Heavy Loading Docks",
            subtitle: "Hydraulic dock levelers with automated roll-up shutters"
        },
        {
            image: weighbridgeImg,
            title: "50-Ton Heavy Duty Weighbridge",
            subtitle: "Digital weight monitor platform with safety guardrails"
        },
        {
            image: parkingYardImg,
            title: "Logistics Trailer Parking Yard",
            subtitle: "Spacious staging yard for heavy trailers and 18-wheelers"
        }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(slideInterval);
    }, [heroSlides.length]);



    const coreFacilities = [
        {
            title: "HIGH-BAY WAREHOUSE",
            desc: "Spacious heavy-duty warehouse bays with high ceiling clearance suitable for pallet racking and bulk storage.",
            icon: <Warehouse className="w-9 h-9" />,
            image: interiorImg,
            stat: "50,000+ SQ. FT.",
            specs: [
                "30 Ft clear vertical ceiling height",
                "Epoxy heavy-duty load-bearing flooring",
                "Industrial fire hydrants & safety sensors",
                "Wide bays for forklift pallet maneuvering"
            ]
        },
        {
            title: "50-TON WEIGHBRIDGE",
            desc: "In-house heavy capacity weighbridge for accurate truck gross & tare weight verification.",
            icon: <Scale className="w-9 h-9" />,
            image: weighbridgeImg,
            stat: "50-TON CAPACITY",
            specs: [
                "50 Metric Ton max load capacity",
                "12-Meter heavy industrial scale platform",
                "Instant digital readout & printed slips",
                "Govt Legal Metrology certified & calibrated"
            ]
        },
        {
            title: "HYDRA CRANE LIFTING",
            desc: "On-site heavy mobile Hydra Crane for fast loading, unloading, and precision machinery placement.",
            icon: <Truck className="w-9 h-9" />,
            image: hydraCraneImg,
            stat: "HEAVY LIFTING",
            specs: [
                "Heavy-duty mobile hydraulic crane on-site",
                "Telescopic boom for precision positioning",
                "Certified professional crane operator",
                "Rapid turnaround for coils, sheets & machines"
            ]
        },
        {
            title: "LOADING & UNLOADING DOCKS",
            desc: "Dedicated dock bays with hydraulic levelers and fork-lift assistance for rapid cargo turnaround.",
            icon: <Truck className="w-9 h-9" />,
            image: loadingDocksImg,
            stat: "24/7 BAY ACCESS",
            specs: [
                "Dedicated multi-truck dock bays",
                "Hydraulic dock levelers for seamless entry",
                "Weather-protected canopy loading zones",
                "Forklift & pallet truck accessibility"
            ]
        },
        {
            title: "LOGISTICS PARKING YARD",
            desc: "Secure paved parking and trailer staging yard with wide turning radii and perimeter fencing.",
            icon: <ParkingCircle className="w-9 h-9" />,
            image: parkingYardImg,
            stat: "AMPLE TRUCK BAYS",
            specs: [
                "Spacious paved truck staging yard",
                "Accommodates multi-axle trailers & 18-wheelers",
                "24/7 CCTV surveillance & perimeter lighting",
                "Direct NH-66 highway entry & exit points"
            ]
        },
    ];

    const fallbackGalleryItems = [
        { id: 1, title: "High-Bay Pallet Racks", category: "Warehouse", image: interiorImg },
        { id: 2, title: "50-Ton Industrial Scale", category: "Facilities", image: weighbridgeImg },
        { id: 3, title: "Hydraulic Dock Levelers", category: "Loading", image: loadingDocksImg },
        { id: 4, title: "Trailer Staging Yard", category: "Parking", image: parkingYardImg },
        { id: 5, title: "Logistics Fulfillment Team", category: "Facilities", image: laborOpsImg },
    ];

    const displayGallery = gallery.length > 0 ? gallery : fallbackGalleryItems;

    const getFacilityIcon = (iconName) => {
        switch (iconName?.toLowerCase()) {
            case 'scale':
                return <Scale className="w-9 h-9" />;
            case 'truck':
                return <Truck className="w-9 h-9" />;
            case 'parkingcircle':
            case 'parking':
                return <ParkingCircle className="w-9 h-9" />;
            case 'users':
                return <Users className="w-9 h-9" />;
            case 'zap':
            case 'power':
                return <Zap className="w-9 h-9" />;
            case 'shieldcheck':
            case 'shield':
                return <ShieldCheck className="w-9 h-9" />;
            case 'warehouse':
            default:
                return <Warehouse className="w-9 h-9" />;
        }
    };

    const displayCoreFacilities = facilities.length > 0
        ? facilities.map((fac, idx) => {
            const fallback = coreFacilities[idx % coreFacilities.length] || coreFacilities[0];
            return {
                id: fac.id || idx,
                title: fac.title,
                desc: fac.description || fallback.desc,
                icon: fac.icon ? getFacilityIcon(fac.icon) : fallback.icon,
                image: (fac.image_display && fac.image_display.trim()) ||
                       (fac.image && fac.image.trim()) ||
                       (fac.image_url && fac.image_url.trim()) ||
                       fallback.image,
                stat: fac.spec || fallback.stat,
                specs: fac.specs || fallback.specs
            };
        })
        : coreFacilities;

    return (
        <div className="flex flex-col bg-white text-slate-900 font-sans">

            {/* Hero Section with Dynamic Slideshow & Industrial Visual Overlay */}
            <section className="relative min-h-[90vh] flex flex-col justify-between bg-brand-dark overflow-hidden blueprint-grid-pattern border-b border-brand-orange/40">

                {/* Ken-Burns Animated Background Slideshow - 65% Opacity on Mobile, 45% on Desktop */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    {heroSlides.map((slide, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                                index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
                            }`}
                        >
                            <img
                                src={slide.image}
                                alt={slide.title}
                                decoding="async"
                                loading={index === 0 ? "eager" : "lazy"}
                                className={`w-full h-full object-cover opacity-65 md:opacity-[0.45] ${
                                    index === currentSlide ? 'animate-ken-burns' : ''
                                }`}
                            />
                        </div>
                    ))}
                    {/* Mobile Optimized Light Gradient Overlay for Maximum Image Visibility */}
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/70 via-brand-dark/35 to-transparent w-full pointer-events-none"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/75 via-transparent to-brand-dark/25 pointer-events-none"></div>
                </div>

                {/* Hero Main Content - Mobile View Optimized for Unobstructed Background */}
                <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-6 sm:pt-16 pb-6 sm:pb-12 flex-1 flex flex-col justify-center items-start">

                    {/* Primary Title Container - Single Organized Header */}
                    <div className="w-full max-w-2xl lg:max-w-3xl xl:max-w-3xl bg-slate-950/90 sm:bg-slate-950/80 backdrop-blur-md p-5 sm:p-7 lg:p-9 xl:p-10 rounded-2xl border border-brand-orange/40 shadow-2xl mb-4 sm:mb-6 lg:mb-8 transition-all">
                        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                            <div className="h-1 sm:h-1.5 w-6 sm:w-10 bg-brand-orange rounded-full"></div>
                            <span className="text-xs sm:text-sm lg:text-base font-black tracking-widest text-brand-orange uppercase drop-shadow font-mono">
                                BIG B WAREHOUSE PARK
                            </span>
                        </div>
                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white mb-2.5 sm:mb-4 uppercase tracking-tight sm:tracking-wider leading-tight sm:leading-snug drop-shadow-md">
                            {company?.hero_title || 'Heavy-Duty Industrial Storage & Logistics Infrastructure'}
                        </h1>
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-100 font-medium drop-shadow-sm leading-relaxed max-w-2xl">
                            {company?.hero_subtitle || 'Equipped with high-bay clearance, 50-ton weighbridge, active loading bays, 24/7 security, and in-house labor for seamless supply chain operations.'}
                        </p>
                    </div>

                    {/* Hero Action Buttons - Identical Height, 8px Radius, 12px Vertical Spacing on Mobile */}
                    <div className="w-full max-w-2xl lg:max-w-3xl xl:max-w-3xl flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
                        <Link
                            to="/facilities"
                            className="cta-light-sweep bg-brand-orange hover:bg-orange-600 text-white h-12 sm:h-14 px-6 sm:px-8 rounded-[8px] font-black tracking-wider text-xs sm:text-sm uppercase transition-all flex items-center justify-center gap-2 sm:gap-3 shadow-xl border border-orange-400/50 active:scale-[0.98]"
                        >
                            <span>EXPLORE FACILITIES</span>
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </Link>
                        <Link
                            to="/contact"
                            className="bg-slate-950/80 hover:bg-slate-900/90 backdrop-blur-sm border border-gray-300/60 hover:border-brand-orange text-white hover:text-brand-orange h-12 sm:h-14 px-6 sm:px-8 rounded-[8px] font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 sm:gap-3 shadow-xl active:scale-[0.98]"
                        >
                            <PhoneCall className="w-4 h-4 sm:w-5 sm:h-5 text-brand-orange" />
                            <span>CONTACT OPERATORS</span>
                        </Link>
                    </div>

                    {/* Value Proposition Grid - Clear Readability on All Screens */}
                    <div className="mt-5 sm:mt-7 lg:mt-9 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-6 w-full max-w-2xl lg:max-w-3xl xl:max-w-3xl">
                        <div className="bg-slate-950/80 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none p-2.5 sm:p-0 rounded-xl border border-white/10 sm:border-0 flex items-center gap-2 sm:gap-3 drop-shadow-md">
                            <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-brand-orange shrink-0 drop-shadow" />
                            <div>
                                <div className="text-[11px] sm:text-xs lg:text-sm font-mono font-bold text-white uppercase tracking-tight drop-shadow">Strong & Durable</div>
                                <div className="text-[9.5px] sm:text-[10px] lg:text-xs text-slate-200 drop-shadow">Long-Term Performance</div>
                            </div>
                        </div>
                        <div className="bg-slate-950/80 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none p-2.5 sm:p-0 rounded-xl border border-white/10 sm:border-0 flex items-center gap-2 sm:gap-3 drop-shadow-md">
                            <Zap className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-brand-orange shrink-0 drop-shadow" />
                            <div>
                                <div className="text-[11px] sm:text-xs lg:text-sm font-mono font-bold text-white uppercase tracking-tight drop-shadow">High Capacity</div>
                                <div className="text-[9.5px] sm:text-[10px] lg:text-xs text-slate-200 drop-shadow">Tackle Bigger Challenges</div>
                            </div>
                        </div>
                        <div className="bg-slate-950/80 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none p-2.5 sm:p-0 rounded-xl border border-white/10 sm:border-0 flex items-center gap-2 sm:gap-3 drop-shadow-md">
                            <Layers className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-brand-orange shrink-0 drop-shadow" />
                            <div>
                                <div className="text-[11px] sm:text-xs lg:text-sm font-mono font-bold text-white uppercase tracking-tight drop-shadow">Smooth Operation</div>
                                <div className="text-[9.5px] sm:text-[10px] lg:text-xs text-slate-200 drop-shadow">Maximum Efficiency</div>
                            </div>
                        </div>
                        <div className="bg-slate-950/80 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none p-2.5 sm:p-0 rounded-xl border border-white/10 sm:border-0 flex items-center gap-2 sm:gap-3 drop-shadow-md">
                            <Truck className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-brand-orange shrink-0 drop-shadow" />
                            <div>
                                <div className="text-[11px] sm:text-xs lg:text-sm font-mono font-bold text-white uppercase tracking-tight drop-shadow">Trusted in Field</div>
                                <div className="text-[9.5px] sm:text-[10px] lg:text-xs text-slate-200 drop-shadow">Across Multiple Industries</div>
                            </div>
                        </div>
                    </div>

                    {/* Elegant Minimal Carousel Indicators */}
                    <div className="mt-4 sm:mt-6 flex items-center gap-1.5 sm:gap-2 z-10">
                        {heroSlides.map((slide, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentSlide(idx)}
                                aria-label={`Jump to slide ${idx + 1}: ${slide.title}`}
                                className={`transition-all duration-300 rounded-full cursor-pointer ${
                                    idx === currentSlide
                                        ? 'w-6 h-1.5 sm:w-7 sm:h-1.5 bg-brand-orange shadow-[0_0_10px_rgba(240,116,9,0.7)]'
                                        : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
                                }`}
                            />
                        ))}
                    </div>

                </div>

                {/* Live Industrial Metrics Ticker with Clean High-Performance Dark Header */}
                <div className="relative z-10 bg-[#070b12]/95 border-t border-white/10 overflow-hidden py-3 sm:py-3.5 text-xs font-mono tracking-wider uppercase text-white">
                    <div className="animate-ticker space-x-12 items-center justify-center">
                        <span className="inline-flex items-center gap-2 text-white font-bold">
                            <Zap className="w-4 h-4 text-brand-orange" /> 50,000+ SQ. FT. HIGH-BAY STORAGE
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="inline-flex items-center gap-2 text-white font-bold">
                            <Scale className="w-4 h-4 text-brand-orange" /> 50-TON WEIGHBRIDGE OPERATIONAL
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="inline-flex items-center gap-2 text-white font-bold">
                            <Truck className="w-4 h-4 text-brand-orange" /> 24/7 DOCK LOADING & UNLOADING
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="inline-flex items-center gap-2 text-white font-bold">
                            <ShieldCheck className="w-4 h-4 text-brand-orange" /> CCTV MONITORED GATED SECURITY
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="inline-flex items-center gap-2 text-white font-bold">
                            <Layers className="w-4 h-4 text-brand-orange" /> IN-HOUSE LABORS SUPPORT
                        </span>
                        <span className="text-gray-400">•</span>
                        {/* Duplicate for infinite ticker loop */}
                        <span className="inline-flex items-center gap-2 text-white font-bold">
                            <Zap className="w-4 h-4 text-brand-orange" /> 50,000+ SQ. FT. HIGH-BAY STORAGE
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="inline-flex items-center gap-2 text-white font-bold">
                            <Scale className="w-4 h-4 text-brand-orange" /> 50-TON WEIGHBRIDGE OPERATIONAL
                        </span>
                    </div>
                </div>

            </section>

            {/* Core Facilities Section with Premium White Background */}
            <section className="py-24 bg-white text-slate-900 relative border-b border-gray-200 section-contain">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="text-center mb-16">
                        <div className="inline-block relative">
                            <div className="flex items-center justify-center gap-3 mb-2 text-brand-orange font-mono text-sm uppercase tracking-widest font-bold">
                                <span className="w-2 h-2 rounded-full bg-brand-orange"></span>
                                INFRASTRUCTURE & CAPABILITIES
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tight">
                                OUR WAREHOUSE FACILITIES
                            </h2>
                            <div className="mt-4 h-1.5 w-24 bg-brand-orange mx-auto rounded-full"></div>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
                        {displayCoreFacilities.map((fac, idx) => {
                            const isFlipped = !!flippedCards[idx];
                            return (
                                <div
                                    key={idx}
                                    className="perspective-1000 h-[490px] sm:h-[500px] w-full sm:w-[calc(50%-0.875rem)] lg:w-[calc(33.333%-1.375rem)] max-w-sm sm:max-w-none"
                                >
                                    <div
                                        className={`relative w-full h-full duration-700 transform-style-preserve-3d transition-transform ${isFlipped ? 'rotate-y-180' : ''}`}
                                    >
                                        {/* FRONT FACE */}
                                        <div className="absolute inset-0 h-full backface-hidden bg-slate-50 border border-slate-200/90 rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-xl transition-all duration-300 group">
                                            <div className="relative h-44 sm:h-48 overflow-hidden border-b border-slate-200 shrink-0">
                                                <img
                                                    src={fac.image}
                                                    alt={fac.title}
                                                    decoding="async"
                                                    loading="lazy"
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
                                                <div className="absolute top-3 right-3 bg-slate-900/95 text-white text-[11px] sm:text-xs font-mono font-bold px-2.5 py-1 rounded shadow-sm border border-slate-700 backdrop-blur-sm">
                                                    {fac.stat}
                                                </div>
                                            </div>

                                            <div className="p-5 sm:p-6 flex-1 flex flex-col min-h-0">
                                                <div className="flex-1 flex flex-col grow">
                                                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center mb-3.5 sm:mb-4 text-brand-orange group-hover:scale-105 transition-transform">
                                                        {fac.icon}
                                                    </div>
                                                    <h3 className="text-base sm:text-lg font-black text-slate-900 mb-2 sm:mb-2.5 uppercase tracking-wide group-hover:text-brand-orange transition-colors">
                                                        {fac.title}
                                                    </h3>
                                                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3 sm:line-clamp-none">
                                                        {fac.desc}
                                                    </p>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => toggleFlip(idx)}
                                                    className="mt-auto pt-3 sm:pt-4 border-t border-slate-200 flex items-center justify-between text-xs sm:text-sm font-mono text-brand-orange font-bold hover:text-orange-600 transition-colors w-full text-left cursor-pointer group-hover:translate-x-1 duration-200 py-1"
                                                >
                                                    <span>VIEW DETAILS</span>
                                                    <ArrowRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* BACK FACE */}
                                        <div
                                            onClick={() => toggleFlip(idx)}
                                            className="absolute inset-0 backface-hidden rotate-y-180 bg-slate-950 text-white rounded-2xl border border-brand-orange/40 overflow-hidden flex flex-col justify-between p-5 sm:p-6 shadow-2xl cursor-pointer"
                                        >
                                            <div>
                                                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3.5 sm:mb-4">
                                                    <div className="flex items-center gap-2.5 min-w-0">
                                                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-brand-orange/20 border border-brand-orange/40 flex items-center justify-center text-brand-orange shrink-0">
                                                            {fac.icon}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <span className="text-[10px] font-mono text-brand-orange uppercase font-bold tracking-wider block">
                                                                FACILITY SPECS
                                                            </span>
                                                            <h4 className="text-xs sm:text-sm font-black text-white uppercase tracking-tight truncate">
                                                                {fac.title}
                                                            </h4>
                                                        </div>
                                                    </div>
                                                    <span className="text-[10px] sm:text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-brand-orange text-white shrink-0 ml-2">
                                                        {fac.stat}
                                                    </span>
                                                </div>

                                                <div className="space-y-2 sm:space-y-2.5">
                                                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                                                        KEY CAPABILITIES & DETAILS
                                                    </span>
                                                    {fac.specs?.map((spec, sIdx) => (
                                                        <div
                                                            key={sIdx}
                                                            className="flex items-start gap-2 sm:gap-2.5 bg-slate-900/90 p-2 sm:p-2.5 rounded-lg border border-slate-800/90 text-[11px] sm:text-xs font-mono text-slate-200"
                                                        >
                                                            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-orange shrink-0 mt-0.5" />
                                                            <span className="leading-snug">{spec}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleFlip(idx);
                                                }}
                                                className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs sm:text-sm font-mono text-brand-orange font-bold hover:text-white transition-colors w-full cursor-pointer group/back py-1"
                                            >
                                                <span className="flex items-center gap-1.5">
                                                    <RotateCcw className="w-3.5 h-3.5 transition-transform group-hover/back:-rotate-90 duration-300" />
                                                    BACK TO SUMMARY
                                                </span>
                                                <ArrowRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </section>

            {/* About Section with Photorealistic Warehouse Interior Asset - White Theme */}
            <section className="py-24 bg-white text-slate-900 border-y border-slate-200 section-contain">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* Interactive Photorealistic Interior Image Card */}
                        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl border-2 border-brand-orange/30 hover:border-brand-orange/60 transition-all duration-300 group">
                            {/* Image with adaptive height for seamless mobile, tablet, and desktop viewing */}
                            <div className="relative w-full aspect-[4/3] sm:aspect-[4/3] lg:aspect-auto lg:h-[540px] overflow-hidden bg-slate-900">
                                <img
                                    src={interiorImg}
                                    alt="BigB Warehouse Interior Racks"
                                    decoding="async"
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 text-brand-orange font-mono text-xs uppercase tracking-widest font-extrabold">
                                <span className="w-2 h-2 bg-brand-orange rounded-full"></span>
                                ABOUT BIGB WAREHOUSE PARK
                            </div>

                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tight leading-tight">
                                {company?.tagline || 'Built for Business Storage & High-Efficiency Logistics'}
                            </h2>

                            <p className="text-slate-600 leading-relaxed text-base sm:text-lg font-normal">
                                {company?.about_text || company?.description || 'BigB Warehouse Park is engineered specifically for commercial storage, heavy truck transport, and fast loading operations.'}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                                {[
                                    "High-bay warehouse space",
                                    "50-Ton weighbridge scale",
                                    "24/7 Union-free loading bays",
                                    "Ample truck trailer parking",
                                    "In-house labors",
                                    "Uninterrupted power supply",
                                    "24/7 CCTV & gated security",
                                    "Direct highway connectivity"
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3 bg-slate-50 hover:bg-orange-50/50 p-3.5 rounded-xl border border-slate-200 hover:border-brand-orange/40 transition-all shadow-sm">
                                        <CheckCircle className="text-brand-orange w-5 h-5 shrink-0" />
                                        <span className="text-slate-800 font-semibold text-sm">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-6">
                                <Link
                                    to="/facilities"
                                    className="cta-light-sweep inline-flex bg-brand-orange text-white px-8 py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-orange-600 transition-colors items-center gap-3 shadow-xl"
                                >
                                    EXPLORE ALL FACILITIES <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Photorealistic Warehouse Gallery Preview with White Background */}
            <section className="py-24 bg-white text-slate-900 border-t border-slate-200 section-contain">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

                    <div className="mb-16">
                        <span className="text-brand-orange font-mono text-xs uppercase tracking-widest font-bold">VISUAL TOUR</span>
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tight mt-2">
                            INSIDE THE WAREHOUSE PARK
                        </h2>
                        <div className="mt-4 h-1.5 w-24 bg-brand-orange mx-auto rounded-full"></div>
                    </div>

                    {/* Realistic Photo Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayGallery.map((item, idx) => {
                            const imgSrc = (item.image_display && item.image_display.trim()) || 
                                           (item.image && item.image.trim()) || 
                                           (item.image_url && item.image_url.trim()) || 
                                           interiorImg;
                            return (
                                <div
                                    key={item.id || idx}
                                    className="group relative rounded-xl overflow-hidden border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 aspect-video bg-slate-900 cursor-pointer"
                                >
                                    <img
                                        src={imgSrc}
                                        alt={item.title || "Warehouse Gallery Image"}
                                        decoding="async"
                                        loading="lazy"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end text-left">
                                        <span className="text-brand-orange text-xs font-mono font-bold uppercase tracking-widest">{item.category || "Facility"}</span>
                                        <h3 className="text-white font-black text-lg sm:text-xl uppercase mt-1">{item.title}</h3>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-14">
                        <Link
                            to="/gallery"
                            className="inline-flex border-2 border-brand-orange text-brand-orange bg-transparent px-8 py-4 rounded-xl font-black uppercase tracking-wider hover:bg-brand-orange hover:text-white transition-all items-center gap-3 shadow-md"
                        >
                            VIEW FULL PHOTO GALLERY <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>

                </div>
            </section>

            {/* Industrial Contact Banner Section */}
            <CtaBanner />


        </div>
    );
};

export default Home;
