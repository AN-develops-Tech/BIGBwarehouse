import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Warehouse, Scale, Truck, ParkingCircle, CheckCircle, PhoneCall, MessageCircle, Mail, Zap, ShieldCheck, Layers } from 'lucide-react';
import { useCompany } from '../context/CompanyContext';
import api from '../api/axios';

// Import photorealistic warehouse visual assets
import bigbWarehouseImg from '../assets/images/bigb_warehouse.png';
import orangeHydraCraneImg from '../assets/images/orange_hydra_crane.png';
import heroImg from '../assets/images/hero.png';
import interiorImg from '../assets/images/interior.png';
import weighbridgeImg from '../assets/images/weighbridge.png';
import loadingDocksImg from '../assets/images/loading_docks.png';
import parkingYardImg from '../assets/images/parking_yard.png';
import laborOpsImg from '../assets/images/labor_ops.png';
import hydraCraneImg from '../assets/images/hydra_crane.png';

const Home = () => {
    const { company, loading: companyLoading } = useCompany();
    const [facilities, setFacilities] = useState([]);
    const [gallery, setGallery] = useState([]);
    const [loading, setLoading] = useState(true);

    // Hero slideshow sequence featuring official BigB Warehouse Park facilities
    const heroSlides = [
        {
            image: bigbWarehouseImg,
            title: "BIGB WAREHOUSE PARK",
            subtitle: "State-of-the-art high-bay industrial warehouse facility & logistics hub"
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [facRes, galRes] = await Promise.all([
                    api.get('/facilities/'),
                    api.get('/gallery/')
                ]);
                setFacilities(facRes.data.results || facRes.data || []);
                const allImgs = galRes.data.results || galRes.data || [];
                setGallery(allImgs.slice(0, 5));
            } catch (err) {
                console.error('Failed to load data', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (companyLoading || loading) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-brand-dark text-white font-mono">
                <div className="w-12 h-12 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mb-4"></div>
                <div className="text-xl font-bold tracking-widest text-brand-orange">INITIALIZING WAREHOUSE PARK SYSTEMS...</div>
            </div>
        );
    }

    const coreFacilities = [
        {
            title: "HIGH-BAY WAREHOUSE",
            desc: "Spacious heavy-duty warehouse bays with high ceiling clearance suitable for pallet racking and bulk storage.",
            icon: <Warehouse className="w-9 h-9" />,
            image: interiorImg,
            stat: "50,000+ SQ. FT."
        },
        {
            title: "50-TON WEIGHBRIDGE",
            desc: "In-house heavy capacity weighbridge for accurate truck gross & tare weight verification.",
            icon: <Scale className="w-9 h-9" />,
            image: weighbridgeImg,
            stat: "50-TON CAPACITY"
        },
        {
            title: "HYDRA CRANE LIFTING",
            desc: "On-site heavy mobile Hydra Crane for fast loading, unloading, and precision machinery placement.",
            icon: <Truck className="w-9 h-9" />,
            image: hydraCraneImg,
            stat: "HEAVY LIFTING"
        },
        {
            title: "LOADING & UNLOADING DOCKS",
            desc: "Dedicated dock bays with hydraulic levelers and fork-lift assistance for rapid cargo turnaround.",
            icon: <Truck className="w-9 h-9" />,
            image: loadingDocksImg,
            stat: "24/7 BAY ACCESS"
        },
        {
            title: "LOGISTICS PARKING YARD",
            desc: "Secure paved parking and trailer staging yard with wide turning radii and perimeter fencing.",
            icon: <ParkingCircle className="w-9 h-9" />,
            image: parkingYardImg,
            stat: "AMPLE TRUCK BAYS"
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

    return (
        <div className="flex flex-col bg-gray-900 text-gray-100 font-sans">

            {/* Hero Section with Dynamic Slideshow & Industrial Visual Overlay */}
            <section className="relative min-h-[90vh] flex flex-col justify-between bg-brand-dark overflow-hidden blueprint-grid-pattern border-b border-brand-orange/40">

                {/* Ken-Burns Animated Background Slideshow - 65% Opacity on Mobile, 45% on Desktop */}
                {heroSlides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-0' : 'opacity-0 z-0'
                            }`}
                    >
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover animate-ken-burns filter brightness-95 contrast-105 opacity-65 md:opacity-[0.45]"
                        />
                        {/* Mobile Optimized Light Gradient Overlay for Maximum Image Visibility */}
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/70 via-brand-dark/35 to-transparent w-full"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/75 via-transparent to-brand-dark/25"></div>
                    </div>
                ))}

                {/* Hero Main Content - Mobile View Optimized for Unobstructed Background */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-6 sm:pt-16 pb-6 sm:pb-12 flex-1 flex flex-col justify-center">

                    {/* Logo & Headline */}
                    <div className="flex flex-col select-none mb-4 sm:mb-8">
                        <div className="flex items-baseline font-black leading-none drop-shadow-lg">
                            <span className="text-4xl sm:text-6xl md:text-8xl tracking-tight text-white font-extrabold">
                                BIG
                            </span>
                            <span className="text-4xl sm:text-6xl md:text-8xl text-brand-orange tracking-tight animate-logo-b ml-1 font-extrabold drop-shadow-[0_0_15px_rgba(240,116,9,0.8)]">
                                B
                            </span>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 mt-1.5 sm:mt-3">
                            <div className="h-1 sm:h-1.5 w-6 sm:w-10 bg-brand-orange rounded-full"></div>
                            <span className="text-xs sm:text-xl md:text-3xl font-black tracking-widest text-gray-100 uppercase drop-shadow">
                                WAREHOUSE PARK
                            </span>
                        </div>
                    </div>

                    {/* Semi-Transparent Text Container for Mobile Background Visibility */}
                    <div className="bg-slate-950/65 sm:bg-slate-950/80 backdrop-blur-sm sm:backdrop-blur-md p-4 sm:p-8 rounded-xl sm:rounded-2xl border border-brand-orange/40 shadow-2xl max-w-2xl mb-4 sm:mb-8">
                        <h2 className="text-base sm:text-2xl md:text-3xl font-black text-brand-orange mb-1.5 sm:mb-3 uppercase tracking-wider leading-snug drop-shadow-md">
                            {company?.hero_title || 'Heavy-Duty Industrial Storage & Logistics Infrastructure'}
                        </h2>
                        <p className="text-xs sm:text-base md:text-lg text-gray-100 leading-relaxed font-medium drop-shadow-sm">
                            {company?.hero_subtitle || 'Equipped with high-bay clearance, 50-ton weighbridge, active loading bays, 24/7 security, and in-house labor for seamless supply chain operations.'}
                        </p>
                    </div>

                    {/* Hero Buttons - Mobile Flex */}
                    <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 items-stretch sm:items-center">
                        <Link
                            to="/facilities"
                            className="cta-light-sweep bg-brand-orange text-white px-5 sm:px-8 py-3 sm:py-4 rounded-xl font-black tracking-wider text-xs sm:text-sm uppercase hover:bg-orange-600 transition-all flex items-center justify-center gap-2 sm:gap-3 shadow-xl border border-orange-400/50"
                        >
                            EXPLORE FACILITIES <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </Link>
                        <Link
                            to="/contact"
                            className="bg-brand-dark/75 backdrop-blur-sm border border-gray-300/60 text-white px-5 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-xs sm:text-sm hover:border-brand-orange hover:text-brand-orange transition-all flex items-center justify-center gap-2 sm:gap-3"
                        >
                            <PhoneCall className="w-4 h-4 sm:w-5 sm:h-5 text-brand-orange" /> CONTACT OPERATORS
                        </Link>
                    </div>

                    {/* 4 Feature Pillars Ribbon - Compact 2x2 Grid on Mobile for Maximum Background Area */}
                    <div className="mt-4 sm:mt-8 grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 max-w-4xl">
                        <div className="bg-slate-950/70 sm:bg-slate-950/85 backdrop-blur-sm border border-brand-orange/40 p-2.5 sm:p-3.5 rounded-xl flex items-center gap-2 sm:gap-3 shadow-lg">
                            <ShieldCheck className="w-4 h-4 sm:w-6 sm:h-6 text-brand-orange shrink-0" />
                            <div>
                                <div className="text-[11px] sm:text-xs font-mono font-bold text-white uppercase tracking-tight">Strong & Durable</div>
                                <div className="text-[9px] sm:text-[10px] text-gray-300">Long-Term Performance</div>
                            </div>
                        </div>
                        <div className="bg-slate-950/70 sm:bg-slate-950/85 backdrop-blur-sm border border-brand-orange/40 p-2.5 sm:p-3.5 rounded-xl flex items-center gap-2 sm:gap-3 shadow-lg">
                            <Zap className="w-4 h-4 sm:w-6 sm:h-6 text-brand-orange shrink-0" />
                            <div>
                                <div className="text-[11px] sm:text-xs font-mono font-bold text-white uppercase tracking-tight">High Capacity</div>
                                <div className="text-[9px] sm:text-[10px] text-gray-300">Tackle Bigger Challenges</div>
                            </div>
                        </div>
                        <div className="bg-slate-950/70 sm:bg-slate-950/85 backdrop-blur-sm border border-brand-orange/40 p-2.5 sm:p-3.5 rounded-xl flex items-center gap-2 sm:gap-3 shadow-lg">
                            <Layers className="w-4 h-4 sm:w-6 sm:h-6 text-brand-orange shrink-0" />
                            <div>
                                <div className="text-[11px] sm:text-xs font-mono font-bold text-white uppercase tracking-tight">Smooth Operation</div>
                                <div className="text-[9px] sm:text-[10px] text-gray-300">Maximum Efficiency</div>
                            </div>
                        </div>
                        <div className="bg-slate-950/70 sm:bg-slate-950/85 backdrop-blur-sm border border-brand-orange/40 p-2.5 sm:p-3.5 rounded-xl flex items-center gap-2 sm:gap-3 shadow-lg">
                            <Truck className="w-4 h-4 sm:w-6 sm:h-6 text-brand-orange shrink-0" />
                            <div>
                                <div className="text-[11px] sm:text-xs font-mono font-bold text-white uppercase tracking-tight">Trusted in Field</div>
                                <div className="text-[9px] sm:text-[10px] text-gray-300">Across Multiple Industries</div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Live Industrial Metrics Ticker */}
                <div className="relative z-10 bg-black/60 overflow-hidden py-4 text-xs font-mono tracking-wider uppercase text-white">
                    <div className="animate-ticker space-x-12 items-center">
                        <span className="inline-flex items-center gap-2 text-white font-bold">
                            <Zap className="w-4 h-4 text-white" /> 50,000+ SQ. FT. HIGH-BAY STORAGE
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="inline-flex items-center gap-2 text-white font-bold">
                            <Scale className="w-4 h-4 text-white" /> 50-TON WEIGHBRIDGE OPERATIONAL
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="inline-flex items-center gap-2 text-white font-bold">
                            <Truck className="w-4 h-4 text-white" /> 24/7 DOCK LOADING & UNLOADING
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="inline-flex items-center gap-2 text-white font-bold">
                            <ShieldCheck className="w-4 h-4 text-white" /> CCTV MONITORED GATED SECURITY
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="inline-flex items-center gap-2 text-white font-bold">
                            <Layers className="w-4 h-4 text-white" /> IN-HOUSE LABORS SUPPORT
                        </span>
                        <span className="text-gray-400">•</span>
                        {/* Duplicate for infinite ticker loop */}
                        <span className="inline-flex items-center gap-2 text-white font-bold">
                            <Zap className="w-4 h-4 text-white" /> 50,000+ SQ. FT. HIGH-BAY STORAGE
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="inline-flex items-center gap-2 text-white font-bold">
                            <Scale className="w-4 h-4 text-white" /> 50-TON WEIGHBRIDGE OPERATIONAL
                        </span>
                    </div>
                </div>

            </section>

            {/* Core Facilities Section with Premium White Background */}
            <section className="py-24 bg-white text-slate-900 relative border-b border-gray-200">
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

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {coreFacilities.map((fac, idx) => (
                            <div
                                key={idx}
                                className="bg-slate-50 border border-slate-200/90 rounded-xl overflow-hidden group transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1"
                            >
                                <div className="relative h-48 overflow-hidden border-b border-slate-200">
                                    <img
                                        src={fac.image}
                                        alt={fac.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
                                    <div className="absolute top-3 right-3 bg-slate-900 text-white text-xs font-mono font-bold px-2.5 py-1 rounded shadow-sm border border-slate-700">
                                        {fac.stat}
                                    </div>
                                </div>

                                <div className="p-6 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="w-14 h-14 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center mb-5 text-brand-orange group-hover:scale-110 transition-transform">
                                            {fac.icon}
                                        </div>
                                        <h3 className="text-lg font-black text-slate-900 mb-3 uppercase tracking-wide group-hover:text-brand-orange transition-colors">{fac.title}</h3>
                                        <p className="text-slate-600 text-sm leading-relaxed">{fac.desc}</p>
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-mono text-brand-orange font-bold group-hover:translate-x-1 transition-transform">
                                        <span>VIEW DETAILS</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* About Section with Photorealistic Warehouse Interior Asset */}
            <section className="py-24 bg-gray-950 border-y border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* Interactive Photorealistic Interior Image */}
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-brand-orange/40 group">
                            <img
                                src={interiorImg}
                                alt="BigB Warehouse Interior Racks"
                                className="w-full h-[520px] object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

                            {/* Floating Specifications Badge */}
                            <div className="absolute bottom-6 left-6 right-6 steel-glass-card p-5 rounded-xl border border-brand-orange/40">
                                <div className="flex items-center justify-between text-white font-mono text-xs mb-2">
                                    <span className="text-brand-orange font-bold">INSIDE BIGB PARK</span>
                                    <span className="text-emerald-400">STATUS: FORKLIFT ACTIVE</span>
                                </div>
                                <div className="text-sm font-bold text-gray-200">
                                    High-bay pallet storage racks with 30ft vertical clearance & heavy-load epoxy floors.
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 text-brand-orange font-mono text-xs uppercase tracking-widest">
                                <span className="w-2 h-2 bg-brand-orange rounded-full"></span>
                                ABOUT BIGB WAREHOUSE PARK
                            </div>

                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-tight">
                                {company?.tagline || 'Built for Business Storage & High-Efficiency Logistics'}
                            </h2>

                            <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
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
                                    <div key={idx} className="flex items-center gap-3 bg-brand-dark/60 p-3 rounded-lg border border-gray-800">
                                        <CheckCircle className="text-brand-orange w-5 h-5 shrink-0" />
                                        <span className="text-gray-200 font-semibold text-sm">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-6">
                                <Link
                                    to="/facilities"
                                    className="cta-light-sweep inline-flex bg-brand-orange text-white px-8 py-4 rounded font-bold uppercase tracking-wider hover:bg-orange-600 transition-colors items-center gap-3 shadow-xl"
                                >
                                    EXPLORE ALL FACILITIES <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Photorealistic Warehouse Gallery Preview with White Background */}
            <section className="py-24 bg-white text-slate-900 border-t border-slate-200">
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
            <section className="bg-black py-16 border-t border-brand-orange/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-8 bg-brand-dark p-8 sm:p-12 rounded-2xl border border-gray-800 shadow-2xl">

                        <div className="text-white text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase mb-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-glow"></span>
                                IMMEDIATE SPACE AVAILABILITY
                            </div>
                            <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-2">HAVE A WAREHOUSE REQUIREMENT?</h2>
                            <p className="text-brand-orange font-bold text-lg">Contact our facility operations team today.</p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-8">
                            <div className="flex items-center gap-4 text-white">
                                <div className="bg-brand-orange/20 text-brand-orange p-3 rounded-xl border border-brand-orange/50">
                                    <PhoneCall className="w-7 h-7" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 font-mono">DIRECT LINE</p>
                                    <p className="font-bold text-xl text-white">{company?.phone || '+91 7909294488'}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-white">
                                <div className="bg-emerald-950/80 text-emerald-400 p-3 rounded-xl border border-emerald-500/50">
                                    <MessageCircle className="w-7 h-7" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 font-mono">WHATSAPP DESK</p>
                                    <p className="font-bold text-sm text-emerald-400">Available 24/7</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <Link
                                to="/contact"
                                className="cta-light-sweep bg-brand-orange text-white px-8 py-4 rounded-xl font-black text-sm uppercase tracking-wider hover:bg-orange-600 transition-colors shadow-2xl flex items-center gap-2"
                            >
                                SEND ENQUIRY <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>

                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;
