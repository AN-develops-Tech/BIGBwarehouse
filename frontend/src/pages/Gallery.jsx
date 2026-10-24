import { useState, useEffect, useCallback } from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight, Camera, ArrowRight } from 'lucide-react';
import api from '../api/axios';

import heroImg from '../assets/images/hero.png';
import interiorImg from '../assets/images/interior.png';
import weighbridgeImg from '../assets/images/weighbridge.png';
import loadingDocksImg from '../assets/images/loading_docks.png';
import parkingYardImg from '../assets/images/parking_yard.png';
import laborOpsImg from '../assets/images/labor_ops.png';
import hydraCraneImg from '../assets/images/hydra_crane.png';
import powerElectricityImg from '../assets/images/power_electricity.png';

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const defaultGalleryImages = [
        { id: 1, title: "BigB Warehouse Dusk Exterior", category: "Warehouse", description: "High-bay LED illuminated exterior view of modern industrial warehouse bays and paved truck yard.", image: heroImg },
        { id: 2, title: "High-Bay Pallet Racking", category: "Warehouse", description: "Multi-tier heavy duty industrial steel racking systems with electric forklift operating down aisle.", image: interiorImg },
        { id: 3, title: "50-Ton Heavy Weighbridge", category: "Facilities", description: "Commercial scale platform with digital LED weight monitoring monitor and safety rails.", image: weighbridgeImg },
        { id: 4, title: "Hydraulic Loading Dock Bays", category: "Loading", description: "Active loading dock shutter doors with hydraulic dock leveler for container trucks.", image: loadingDocksImg },
        { id: 5, title: "Commercial Trailer Parking Yard", category: "Parking", description: "Spacious asphalt staging yard for heavy cargo logistics trailers and 18-wheelers.", image: parkingYardImg },
        { id: 6, title: "Hydra Crane Heavy Lift Operations", category: "Facilities", description: "Industrial mobile crane equipment for precision heavy cargo loading and machinery placement.", image: hydraCraneImg },
        { id: 7, title: "Dedicated Power Substation & Backup", category: "Facilities", description: "High-capacity electrical distribution system ensuring uninterrupted 24/7 cold and dry logistics.", image: powerElectricityImg },
        { id: 8, title: "Logistics Fulfillment & Safety Team", category: "Operations", description: "High-visibility safety gear team managing inventory scanning and cargo handling.", image: laborOpsImg },
    ];

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const res = await api.get('/gallery/');
                const fetched = res.data.results || res.data || [];
                const activeList = fetched.filter(img => img.is_active !== false);
                setImages(activeList.length > 0 ? activeList : defaultGalleryImages);
            } catch (err) {
                setImages(defaultGalleryImages);
            } finally {
                setLoading(false);
            }
        };
        fetchGallery();
    }, []);

    const displayImages = images.length > 0 ? images : defaultGalleryImages;
    const categories = ['All', ...new Set(displayImages.map(img => img.category))];
    const filteredImages = filter === 'All' ? displayImages : displayImages.filter(img => img.category === filter);

    const openLightbox = (index) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        document.body.style.overflow = 'unset';
    };

    const nextImage = useCallback(() => {
        setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
    }, [filteredImages.length]);

    const prevImage = useCallback(() => {
        setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
    }, [filteredImages.length]);

    // Keyboard navigation (Arrow keys + Escape)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!lightboxOpen) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxOpen, nextImage, prevImage]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white text-brand-orange font-mono text-xl pt-20">
                LOADING PHOTO GALLERY...
            </div>
        );
    }

    return (
        <div className="bg-white text-slate-900 min-h-screen font-sans selection:bg-brand-orange selection:text-white">
            {/* Unified Modern Header Banner */}
            <div className="relative py-16 sm:py-20 bg-slate-50 border-b border-slate-200 overflow-hidden blueprint-grid-pattern text-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-mono font-bold uppercase tracking-wider mb-3">
                        <Camera className="w-3.5 h-3.5" /> VISUAL TOUR & INFRASTRUCTURE
                    </div>
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-slate-900 mb-3 sm:mb-4">
                        WAREHOUSE PARK GALLERY
                    </h1>
                    <p className="text-sm sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed px-2">
                        Explore photorealistic visual tours of our high-bay storage bays, 50-ton weighbridge, active loading docks, and heavy trailer yard.
                    </p>
                    <div className="mt-5 sm:mt-6 h-1.5 w-20 sm:w-24 bg-brand-orange mx-auto rounded-full"></div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-10 sm:py-16">
                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 mb-8 sm:mb-12">
                    {categories.map((cat) => {
                        const count = cat === 'All' ? displayImages.length : displayImages.filter(img => img.category === cat).length;
                        return (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 shadow-xs ${
                                    filter === cat
                                        ? 'bg-brand-orange text-white shadow-md font-bold border border-orange-400 scale-[1.02]'
                                        : 'bg-slate-100 text-slate-700 border border-slate-200 hover:border-brand-orange hover:text-brand-orange hover:bg-orange-50/50'
                                }`}
                            >
                                <span>{cat}</span>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                                    filter === cat ? 'bg-white/20 text-white' : 'bg-slate-200/80 text-slate-600'
                                }`}>
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Photo Grid - Perfectly Aligned, Responsive on all Screens */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
                    {filteredImages.map((img, index) => {
                        const imgSource = (img.image_display && img.image_display.trim()) ||
                            (img.image && img.image.trim()) ||
                            (img.image_url && img.image_url.trim()) ||
                            heroImg;

                        return (
                            <div
                                key={img.id || index}
                                onClick={() => openLightbox(index)}
                                className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 hover:border-brand-orange/60 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between h-full hover:-translate-y-1.5"
                            >
                                {/* Image Container with Crisp 16:10 Aspect Ratio */}
                                <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full bg-slate-100 overflow-hidden shrink-0">
                                    <img
                                        src={imgSource}
                                        alt={img.title}
                                        loading="lazy"
                                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                                    />
                                    {/* Subtle gradient for contrast */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-slate-950/15 opacity-60 group-hover:opacity-30 transition-opacity"></div>

                                    {/* Floating Category Tag */}
                                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono font-bold text-brand-orange border border-slate-200/80 uppercase shadow-xs">
                                        {img.category}
                                    </div>

                                    {/* Floating Zoom Action Badge */}
                                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100 shadow-md">
                                        <ZoomIn className="w-4 h-4 text-brand-orange" />
                                    </div>
                                </div>

                                {/* Structured Card Body with Uniform Alignment */}
                                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 bg-white">
                                    <div>
                                        <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 mb-1">
                                            <span>PHOTO #{String(index + 1).padStart(2, '0')}</span>
                                            <span>•</span>
                                            <span className="uppercase text-brand-orange font-bold">{img.category}</span>
                                        </div>
                                        <h3 className="text-slate-900 font-bold text-sm sm:text-base uppercase tracking-tight group-hover:text-brand-orange transition-colors line-clamp-1 leading-snug">
                                            {img.title}
                                        </h3>
                                        {img.description && (
                                            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-2">
                                                {img.description}
                                            </p>
                                        )}
                                    </div>

                                    {/* Card Footer */}
                                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-slate-600 group-hover:text-brand-orange transition-colors">
                                        <span className="flex items-center gap-1.5">
                                            <ZoomIn className="w-3.5 h-3.5 text-brand-orange" />
                                            <span>EXPAND VIEW</span>
                                        </span>
                                        <span className="text-[11px] font-mono text-slate-400 group-hover:translate-x-1 transition-transform">
                                            →
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {filteredImages.length === 0 && (
                    <div className="text-center py-20 text-slate-500 font-mono text-base bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                        NO IMAGES FOUND FOR THIS CATEGORY.
                    </div>
                )}
            </div>

            {/* Lightbox Modal with Full Keyboard & Arrow Navigation */}
            {lightboxOpen && filteredImages[currentImageIndex] && (
                <div 
                    className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) closeLightbox();
                    }}
                >
                    {/* Close Button */}
                    <button
                        onClick={closeLightbox}
                        className="fixed top-4 right-4 sm:top-6 sm:right-6 text-slate-300 hover:text-white p-2.5 rounded-full bg-slate-900/90 hover:bg-brand-orange transition-all z-30 cursor-pointer shadow-lg active:scale-95"
                        title="Close lightbox (Esc)"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Previous Button */}
                    {filteredImages.length > 1 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                prevImage();
                            }}
                            className="fixed left-2 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900/80 hover:bg-brand-orange text-white flex items-center justify-center transition-all z-30 cursor-pointer shadow-lg active:scale-90"
                            title="Previous image (Left Arrow)"
                        >
                            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    )}

                    {/* Next Button */}
                    {filteredImages.length > 1 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                nextImage();
                            }}
                            className="fixed right-2 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900/80 hover:bg-brand-orange text-white flex items-center justify-center transition-all z-30 cursor-pointer shadow-lg active:scale-90"
                            title="Next image (Right Arrow)"
                        >
                            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    )}

                    <div className="w-full max-w-4xl max-h-[92vh] flex flex-col items-center justify-center my-auto z-20 animate-ios-pop">
                        <div className="relative max-h-[60vh] sm:max-h-[70vh] flex items-center justify-center w-full">
                            <img
                                src={
                                    (filteredImages[currentImageIndex].image_display && filteredImages[currentImageIndex].image_display.trim()) ||
                                    (filteredImages[currentImageIndex].image && filteredImages[currentImageIndex].image.trim()) ||
                                    (filteredImages[currentImageIndex].image_url && filteredImages[currentImageIndex].image_url.trim()) ||
                                    heroImg
                                }
                                alt={filteredImages[currentImageIndex].title}
                                className="max-h-[60vh] sm:max-h-[70vh] max-w-full object-contain rounded-2xl shadow-2xl border border-slate-800"
                            />
                        </div>

                        {/* Image Metadata & Counter */}
                        <div className="text-center mt-3 sm:mt-5 bg-slate-900/90 border border-slate-800 p-4 sm:p-5 rounded-2xl max-w-xl w-full shadow-xl">
                            <div className="flex items-center justify-between text-xs font-mono mb-1">
                                <span className="text-brand-orange font-bold uppercase">{filteredImages[currentImageIndex].category}</span>
                                <span className="text-slate-400">
                                    {currentImageIndex + 1} of {filteredImages.length}
                                </span>
                            </div>
                            <h3 className="text-white font-black text-base sm:text-xl uppercase tracking-wide truncate">{filteredImages[currentImageIndex].title}</h3>
                            {filteredImages[currentImageIndex].description && (
                                <p className="text-slate-300 mt-1.5 text-xs sm:text-sm leading-relaxed line-clamp-3">{filteredImages[currentImageIndex].description}</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;
