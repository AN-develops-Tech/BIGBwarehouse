import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Warehouse, Scale, Truck, ParkingCircle, CheckCircle, CheckCircle2, RotateCcw, PhoneCall, Zap, ShieldCheck, Layers, Users, MapPin } from 'lucide-react';
import { useCompany } from '../context/CompanyContext';
import { facilitiesData } from '../data/facilitiesData';
import { galleryData } from '../data/galleryData';
import CtaBanner from '../components/CtaBanner';
import SEO from '../components/SEO';

// Import photorealistic warehouse visual assets
import bigbWarehouse640 from '../assets/images/bigb_warehouse-640.webp';
import bigbWarehouse1024 from '../assets/images/bigb_warehouse-1024.webp';
import bigbWarehouse1600 from '../assets/images/bigb_warehouse-1600.webp';

import hydraCrane640 from '../assets/images/hydra_crane-640.webp';
import hydraCrane1024 from '../assets/images/hydra_crane-1024.webp';
import hydraCrane1600 from '../assets/images/hydra_crane-1600.webp';

import interior640 from '../assets/images/interior-640.webp';
import interior1024 from '../assets/images/interior-1024.webp';
import interior1600 from '../assets/images/interior-1600.webp';

import weighbridge640 from '../assets/images/weighbridge-640.webp';
import weighbridge1024 from '../assets/images/weighbridge-1024.webp';
import weighbridge1600 from '../assets/images/weighbridge-1600.webp';

import loadingDocks640 from '../assets/images/loading_docks-640.webp';
import loadingDocks1024 from '../assets/images/loading_docks-1024.webp';
import loadingDocks1600 from '../assets/images/loading_docks-1600.webp';

import parkingYard640 from '../assets/images/parking_yard-640.webp';
import parkingYard1024 from '../assets/images/parking_yard-1024.webp';
import parkingYard1600 from '../assets/images/parking_yard-1600.webp';

import laborOps640 from '../assets/images/labor_ops-640.webp';
import laborOps1024 from '../assets/images/labor_ops-1024.webp';
import laborOps1600 from '../assets/images/labor_ops-1600.webp';

const CORE_FACILITIES = [
    {
        title: "HIGH-BAY WAREHOUSE",
        desc: "Spacious heavy-duty warehouse bays with high ceiling clearance. Highbay system can be done at your requirement.",
        icon: <Warehouse className="w-9 h-9" />,
        image: interior1024,
        srcSet: `${interior640} 640w, ${interior1024} 1024w, ${interior1600} 1600w`,
        width: 1024,
        height: 1024,
        stat: "50,000+ SQ. FT.",
        specs: [
            "Highbay system can be done at your requirement",
            "30 Ft clear vertical ceiling height",
            "Epoxy heavy-duty load-bearing flooring",
            "Industrial fire hydrants & safety sensors"
        ]
    },
    {
        title: "50-TON WEIGHBRIDGE",
        desc: "In-house heavy capacity weighbridge for accurate truck gross & tare weight verification.",
        icon: <Scale className="w-9 h-9" />,
        image: weighbridge1024,
        srcSet: `${weighbridge640} 640w, ${weighbridge1024} 1024w, ${weighbridge1600} 1600w`,
        width: 1024,
        height: 1024,
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
        image: hydraCrane1024,
        srcSet: `${hydraCrane640} 640w, ${hydraCrane1024} 1024w, ${hydraCrane1600} 1600w`,
        width: 1024,
        height: 576,
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
        image: loadingDocks1024,
        srcSet: `${loadingDocks640} 640w, ${loadingDocks1024} 1024w, ${loadingDocks1600} 1600w`,
        width: 1024,
        height: 1024,
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
        image: parkingYard1024,
        srcSet: `${parkingYard640} 640w, ${parkingYard1024} 1024w, ${parkingYard1600} 1600w`,
        width: 1024,
        height: 1024,
        stat: "AMPLE TRUCK BAYS",
        specs: [
            "Spacious paved truck staging yard",
            "Accommodates multi-axle trailers & 18-wheelers",
            "24/7 CCTV surveillance & perimeter lighting",
            "Direct NH-66 highway entry & exit points"
        ]
    },
];

const FALLBACK_GALLERY_ITEMS = [
    { id: 1, title: "High-Bay Pallet Racks", category: "Warehouse", image: interior1024, thumb: interior640, srcSet: `${interior640} 640w, ${interior1024} 1024w, ${interior1600} 1600w`, width: 1024, height: 1024 },
    { id: 2, title: "50-Ton Industrial Scale", category: "Facilities", image: weighbridge1024, thumb: weighbridge640, srcSet: `${weighbridge640} 640w, ${weighbridge1024} 1024w, ${weighbridge1600} 1600w`, width: 1024, height: 1024 },
    { id: 3, title: "Hydraulic Dock Levelers", category: "Loading", image: loadingDocks1024, thumb: loadingDocks640, srcSet: `${loadingDocks640} 640w, ${loadingDocks1024} 1024w, ${loadingDocks1600} 1600w`, width: 1024, height: 1024 },
    { id: 4, title: "Trailer Staging Yard", category: "Parking", image: parkingYard1024, thumb: parkingYard640, srcSet: `${parkingYard640} 640w, ${parkingYard1024} 1024w, ${parkingYard1600} 1600w`, width: 1024, height: 1024 },
    { id: 5, title: "Logistics Fulfillment Team", category: "Facilities", image: laborOps1024, thumb: laborOps640, srcSet: `${laborOps640} 640w, ${laborOps1024} 1024w, ${laborOps1600} 1600w`, width: 1024, height: 1024 },
];

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

const Home = () => {
    const { company } = useCompany();
    const [facilities] = useState(facilitiesData);
    const [gallery] = useState(galleryData);
    const [flippedCards, setFlippedCards] = useState({});

    const toggleFlip = useCallback((index) => {
        setFlippedCards((prev) => (prev[index] ? {} : { [index]: true }));
    }, []);

    // Hero slideshow sequence featuring official BigB Warehouse Park facilities
    const heroSlides = useMemo(() => [
        {
            image: (company?.hero_image_display && company.hero_image_display.trim()) ||
                   (company?.hero_image && company.hero_image.trim()) ||
                   (company?.hero_image_url && company.hero_image_url.trim()) ||
                   bigbWarehouse1024,
            srcSet: `${bigbWarehouse640} 640w, ${bigbWarehouse1024} 1024w, ${bigbWarehouse1600} 1600w`,
            width: 1024,
            height: 1024,
            title: company?.name || "BIGB WAREHOUSE PARK",
            subtitle: company?.hero_subtitle || "State-of-the-art high-bay industrial warehouse facility & logistics hub"
        },
        {
            image: hydraCrane1024,
            srcSet: `${hydraCrane640} 640w, ${hydraCrane1024} 1024w, ${hydraCrane1600} 1600w`,
            width: 1024,
            height: 576,
            title: "POWER | PRECISION | PERFORMANCE",
            subtitle: "LIFTING YOUR TOMORROW - Heavy Industrial Hydra Crane Solutions for Machinery & Bulk Cargo Unloading"
        },
        {
            image: interior1024,
            srcSet: `${interior640} 640w, ${interior1024} 1024w, ${interior1600} 1600w`,
            width: 1024,
            height: 1024,
            title: "High-Bay Steel Storage Racks",
            subtitle: "Polished epoxy concrete aisles & electric forklift operations. Highbay system can be done at your requirement."
        },
        {
            image: loadingDocks1024,
            srcSet: `${loadingDocks640} 640w, ${loadingDocks1024} 1024w, ${loadingDocks1600} 1600w`,
            width: 1024,
            height: 1024,
            title: "Active Heavy Loading Docks",
            subtitle: "Hydraulic dock levelers with automated roll-up shutters"
        },
        {
            image: weighbridge1024,
            srcSet: `${weighbridge640} 640w, ${weighbridge1024} 1024w, ${weighbridge1600} 1600w`,
            width: 1024,
            height: 1024,
            title: "50-Ton Heavy Duty Weighbridge",
            subtitle: "Digital weight monitor platform with safety guardrails"
        },
        {
            image: parkingYard1024,
            srcSet: `${parkingYard640} 640w, ${parkingYard1024} 1024w, ${parkingYard1600} 1600w`,
            width: 1024,
            height: 1024,
            title: "Logistics Trailer Parking Yard",
            subtitle: "Spacious staging yard for heavy trailers and 18-wheelers"
        }
    ], [company]);

    const [currentSlide, setCurrentSlide] = useState(0);
    const heroRef = useRef(null);
    const [isHeroInView, setIsHeroInView] = useState(true);

    useEffect(() => {
        if (!heroRef.current || typeof IntersectionObserver === 'undefined') return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsHeroInView(entry.isIntersecting);
            },
            { threshold: 0 }
        );

        observer.observe(heroRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(slideInterval);
    }, [heroSlides.length]);



    const displayGallery = useMemo(() => {
        return gallery.length > 0 ? gallery : FALLBACK_GALLERY_ITEMS;
    }, [gallery]);

    const displayCoreFacilities = useMemo(() => {
        return facilities.length > 0
            ? facilities.map((fac, idx) => {
                const fallback = CORE_FACILITIES[idx % CORE_FACILITIES.length] || CORE_FACILITIES[0];
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
            : CORE_FACILITIES;
    }, [facilities]);

    return (
        <div className="flex flex-col bg-white text-slate-900 font-sans">
            <SEO routeKey="/" />

            {/* Hero Section with Dynamic Slideshow & Industrial Visual Overlay */}
            <section ref={heroRef} className="relative min-h-[90vh] lg:min-h-[92vh] flex flex-col justify-between bg-brand-dark overflow-hidden blueprint-grid-pattern border-b border-brand-orange/30">

                {/* Ken-Burns Animated Background Slideshow - High Visual Clarity on All Screens */}
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
                                srcSet={slide.srcSet}
                                sizes="100vw"
                                width={slide.width || 1024}
                                height={slide.height || 1024}
                                alt={slide.title}
                                decoding="async"
                                loading={index === 0 ? "eager" : "lazy"}
                                fetchPriority={index === 0 ? "high" : "auto"}
                                style={{
                                    animationPlayState: isHeroInView ? 'running' : 'paused'
                                }}
                                className={`w-full h-full object-cover object-[center_35%] opacity-90 sm:opacity-85 md:opacity-80 lg:opacity-80 ${
                                    index === currentSlide && isHeroInView ? 'animate-ken-burns' : ''
                                }`}
                            />
                        </div>
                    ))}
                    {/* Directional Contrast Scrim: Dark on left to anchor text, completely clear on right to showcase warehouse architecture */}
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-brand-dark/55 to-transparent w-full pointer-events-none"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/85 via-transparent to-brand-dark/25 pointer-events-none"></div>
                    <div className="md:hidden absolute inset-0 bg-brand-dark/30 pointer-events-none"></div>
                </div>

                {/* Hero Main Content - Left-Aligned on Large Screens, Perfectly Balanced across All Devices */}
                <div className="relative z-10 w-full max-w-6xl xl:max-w-7xl mr-auto px-5 sm:px-6 lg:px-12 xl:px-16 pt-6 sm:pt-12 lg:pt-14 pb-5 sm:pb-6 flex-1 flex flex-col justify-between">

                    {/* Main Headline & Narrative Block */}
                    <div className="max-w-3xl my-auto py-2 sm:py-6">
                        {/* Architectural Main Heading - Responsive across all screens */}
                        <h1 className="text-[36px] sm:text-3.5xl md:text-4xl lg:text-5xl xl:text-[52px] font-black text-white uppercase tracking-tight leading-[1.06] sm:leading-[1.06] mb-3 sm:mb-3 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                            BIG<span className="text-brand-orange">B</span> <br />
                            <span className="whitespace-nowrap">WAREHOUSE <span className="text-brand-orange">PARK</span></span>
                        </h1>

                        {/* Supporting Headline */}
                        <p className="text-[16px] sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-100 tracking-tight leading-snug mb-3 sm:mb-4 drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">
                            Strategically Located. Built for Business.
                        </p>

                        {/* Description & Location */}
                        <div className="mb-5 sm:mb-6 max-w-xl sm:max-w-2xl">
                            {/* Liquid-Glassmorphism Card Container */}
                            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-white/[0.08] via-slate-950/40 to-slate-950/60 backdrop-blur-md border border-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_8px_32px_rgba(0,0,0,0.37)] space-y-2 sm:space-y-2.5">
                                <p className="text-[14px] sm:text-[15px] md:text-base text-gray-100 font-medium leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                    Strategically located in Parippally, at the border of Thiruvananthapuram and Kollam districts, Kerala.
                                </p>
                                <p className="text-[14px] sm:text-[15px] md:text-base text-gray-100 font-medium leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                    Flexible high-bay warehousing solutions designed to meet your business and storage requirements.
                                </p>
                            </div>

                            <div className="pt-2.5 sm:pt-3 flex items-center gap-1.5 text-[12px] sm:text-xs font-mono font-bold tracking-wider text-slate-200 uppercase drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                                <MapPin className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-brand-orange shrink-0" />
                                <span>PARIPPALLY | THIRUVANANTHAPURAM – KOLLAM</span>
                            </div>
                        </div>

                        {/* Hero Action Buttons - Positioned lower with comfortable separation */}
                        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center mt-3.5 sm:mt-4">
                            <Link
                                to="/facilities"
                                className="cta-light-sweep bg-brand-orange hover:bg-orange-600 text-white h-12 sm:h-12 px-6 rounded-lg font-black tracking-wider text-[13px] sm:text-sm uppercase transition-all flex items-center justify-center gap-2 shadow-xl shadow-orange-500/20 border border-orange-400/50 active:scale-[0.98]"
                            >
                                <span>EXPLORE FACILITIES</span>
                                <ArrowRight className="w-4 h-4 shrink-0" />
                            </Link>
                            <Link
                                to="/contact"
                                className="bg-slate-950/80 hover:bg-slate-900/90 backdrop-blur-sm border border-white/20 hover:border-brand-orange text-white hover:text-brand-orange h-12 sm:h-12 px-6 rounded-lg font-bold text-[13px] sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xl active:scale-[0.98]"
                            >
                                <PhoneCall className="w-4 h-4 text-brand-orange shrink-0" />
                                <span>CONTACT OPERATORS</span>
                            </Link>
                        </div>
                    </div>

                    {/* Bottom Features & Carousel Section - Left-Aligned with content boundary */}
                    <div className="w-full max-w-5xl xl:max-w-6xl mt-4 sm:mt-6 lg:mt-8">
                        {/* Industrial Feature Highlights Strip (Mobile 2x2, Tablet 2-Col, Desktop 4-Col) */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 w-full pt-3 sm:pt-4 border-t border-white/10">
                            <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl bg-slate-950/60 backdrop-blur-md border border-white/10 shadow-lg">
                                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-brand-orange/15 border border-brand-orange/30 flex items-center justify-center shrink-0">
                                    <ShieldCheck className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-brand-orange" />
                                </div>
                                <div className="min-w-0">
                                    <div className="text-[10px] sm:text-xs font-mono font-bold text-white uppercase tracking-tight leading-tight">BUILT FOR DURABILITY</div>
                                    <div className="text-[9px] sm:text-[11px] text-gray-300 leading-tight truncate">Long-term Performance</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl bg-slate-950/60 backdrop-blur-md border border-white/10 shadow-lg">
                                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-brand-orange/15 border border-brand-orange/30 flex items-center justify-center shrink-0">
                                    <Zap className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-brand-orange" />
                                </div>
                                <div className="min-w-0">
                                    <div className="text-[10px] sm:text-xs font-mono font-bold text-white uppercase tracking-tight leading-tight">HIGH-BAY STORAGE</div>
                                    <div className="text-[9px] sm:text-[11px] text-gray-300 leading-tight truncate">Optimised Vertical Space</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl bg-slate-950/60 backdrop-blur-md border border-white/10 shadow-lg">
                                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-brand-orange/15 border border-brand-orange/30 flex items-center justify-center shrink-0">
                                    <Layers className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-brand-orange" />
                                </div>
                                <div className="min-w-0">
                                    <div className="text-[10px] sm:text-xs font-mono font-bold text-white uppercase tracking-tight leading-tight">OPERATIONAL EFFICIENCY</div>
                                    <div className="text-[9px] sm:text-[11px] text-gray-300 leading-tight truncate">Designed for Seamless Operations</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl bg-slate-950/60 backdrop-blur-md border border-white/10 shadow-lg">
                                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-brand-orange/15 border border-brand-orange/30 flex items-center justify-center shrink-0">
                                    <Truck className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-brand-orange" />
                                </div>
                                <div className="min-w-0">
                                    <div className="text-[10px] sm:text-xs font-mono font-bold text-white uppercase tracking-tight leading-tight">MULTI-INDUSTRY READY</div>
                                    <div className="text-[9px] sm:text-[11px] text-gray-300 leading-tight truncate">Solutions Across Industries</div>
                                </div>
                            </div>
                        </div>

                        {/* Carousel Slideshow Indicators */}
                        <div className="flex items-center gap-2 mt-3 sm:mt-5 z-10">
                            {heroSlides.map((slide, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentSlide(idx)}
                                    aria-label={`Jump to slide ${idx + 1}: ${slide.title}`}
                                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                                        idx === currentSlide
                                            ? 'w-7 h-1.5 bg-brand-orange shadow-[0_0_10px_rgba(240,116,9,0.7)]'
                                            : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
                                    }`}
                                />
                            ))}
                        </div>
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
                            <Layers className="w-4 h-4 text-brand-orange" /> IN-HOUSE LABOUR SUPPORT
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
                                        role="button"
                                        tabIndex={0}
                                        aria-pressed={isFlipped}
                                        aria-label={`${fac.title} - ${isFlipped ? 'Specifications active. Press Space or Enter to view summary.' : 'Summary active. Press Space or Enter to view specifications.'}`}
                                        onClick={() => toggleFlip(idx)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault();
                                                toggleFlip(idx);
                                            }
                                        }}
                                        className={`relative w-full h-full duration-700 transform-style-preserve-3d transition-transform rounded-2xl cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 ${isFlipped ? 'rotate-y-180' : ''}`}
                                    >
                                        {/* FRONT FACE */}
                                        <div
                                            aria-hidden={isFlipped}
                                            className="absolute inset-0 h-full backface-hidden bg-slate-50 border border-slate-200/90 rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-xl transition-all duration-300 group"
                                        >
                                            <div className="relative h-44 sm:h-48 overflow-hidden border-b border-slate-200 shrink-0">
                                                <img
                                                    src={fac.image}
                                                    srcSet={fac.srcSet}
                                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                    width={fac.width || 1024}
                                                    height={fac.height || 1024}
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

                                                <div className="mt-auto pt-3 sm:pt-4 border-t border-slate-200 flex items-center justify-between text-xs sm:text-sm font-mono text-brand-orange font-bold hover:text-orange-600 transition-colors w-full text-left group-hover:translate-x-1 duration-200 py-1">
                                                    <span>VIEW DETAILS</span>
                                                    <ArrowRight className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* BACK FACE */}
                                        <div
                                            aria-hidden={!isFlipped}
                                            className="absolute inset-0 backface-hidden rotate-y-180 bg-slate-950 text-white rounded-2xl border border-brand-orange/40 overflow-hidden flex flex-col justify-between p-5 sm:p-6 shadow-2xl"
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

                                            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs sm:text-sm font-mono text-brand-orange font-bold hover:text-white transition-colors w-full group/back py-1">
                                                <span className="flex items-center gap-1.5">
                                                    <RotateCcw className="w-3.5 h-3.5 transition-transform group-hover/back:-rotate-90 duration-300" />
                                                    BACK TO SUMMARY
                                                </span>
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
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
                                    src={interior1024}
                                    srcSet={`${interior640} 640w, ${interior1024} 1024w, ${interior1600} 1600w`}
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    width="1024"
                                    height="1024"
                                    alt="BigB Warehouse Interior high-bay racking and storage bays"
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
                                    "Highbay system can be done at your requirement",
                                    "50-Ton weighbridge scale",
                                    "24/7 Union-free loading bays",
                                    "Ample truck trailer parking",
                                    "In-house labour",
                                    "On-site Hydra Crane lifting",
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
                                           interior1024;
                            return (
                                <div
                                    key={item.id || idx}
                                    className="group relative rounded-xl overflow-hidden border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 aspect-video bg-slate-900 cursor-pointer"
                                >
                                    <img
                                        src={item.thumb || item.image640 || imgSrc}
                                        srcSet={item.srcSet}
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        width={item.width || 1024}
                                        height={item.height || 1024}
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
