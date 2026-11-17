import { useState, useEffect, useCallback, useRef } from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryData } from '../data/galleryData';
import SEO from '../components/SEO';
import bigbWarehouse640 from '../assets/images/bigb_warehouse-640.webp';
import bigbWarehouse1600 from '../assets/images/bigb_warehouse-1600.webp';

const Gallery = () => {
    const images = galleryData;
    const [filter, setFilter] = useState('All');
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const openerRef = useRef(null);
    const closeBtnRef = useRef(null);
    const dialogRef = useRef(null);

    const displayImages = images;
    const categories = ['All', ...new Set(displayImages.map(img => img.category))];
    const filteredImages = filter === 'All' ? displayImages : displayImages.filter(img => img.category === filter);

    const openLightbox = (index, triggerEl) => {
        openerRef.current = triggerEl || document.activeElement;
        setCurrentImageIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    const nextImage = useCallback(() => {
        if (!filteredImages.length) return;
        setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
    }, [filteredImages.length]);

    const prevImage = useCallback(() => {
        if (!filteredImages.length) return;
        setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
    }, [filteredImages.length]);

    // Accessibility: Keyboard navigation (Arrow keys + Escape + Tab trap + focus return)
    useEffect(() => {
        if (!lightboxOpen) return;

        document.body.style.overflow = 'hidden';
        closeBtnRef.current?.focus();

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                closeLightbox();
                return;
            }
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextImage();
                return;
            }
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevImage();
                return;
            }
            if (e.key === 'Tab' && dialogRef.current) {
                const focusables = dialogRef.current.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                if (focusables.length === 0) return;
                const firstEl = focusables[0];
                const lastEl = focusables[focusables.length - 1];

                if (e.shiftKey) {
                    if (document.activeElement === firstEl) {
                        e.preventDefault();
                        lastEl.focus();
                    }
                } else {
                    if (document.activeElement === lastEl) {
                        e.preventDefault();
                        firstEl.focus();
                    }
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleKeyDown);
            openerRef.current?.focus();
        };
    }, [lightboxOpen, nextImage, prevImage]);

    return (
        <div className="bg-white text-slate-900 min-h-screen font-sans selection:bg-brand-orange selection:text-white">
            <SEO routeKey="/gallery" />
            {/* Unified Modern Header Banner */}
            <div className="relative py-16 sm:py-20 bg-slate-50 border-b border-slate-200 overflow-hidden blueprint-grid-pattern text-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-slate-900 mb-3 sm:mb-4">
                        WAREHOUSE PARK GALLERY
                    </h1>
                    <p className="text-sm sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed px-2">
                        Explore photorealistic visual tours of our warehouse storage bays, 50-ton weighbridge, active loading docks, and heavy trailer yard. Highbay system can be done at your requirement.
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
                        const imgThumb = img.thumb || img.image640 ||
                            (img.image_display && img.image_display.trim()) ||
                            (img.image && img.image.trim()) ||
                            (img.image_url && img.image_url.trim()) ||
                            bigbWarehouse640;

                        return (
                            <div
                                key={img.id || index}
                                role="button"
                                tabIndex={0}
                                aria-label={`View photo ${index + 1}: ${img.title}`}
                                onClick={(e) => openLightbox(index, e.currentTarget)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        openLightbox(index, e.currentTarget);
                                    }
                                }}
                                className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 hover:border-brand-orange/60 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between h-full hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                            >
                                {/* Image Container with Crisp 16:10 Aspect Ratio */}
                                <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full bg-slate-100 overflow-hidden shrink-0">
                                    <img
                                        src={imgThumb}
                                        srcSet={img.srcSet || `${imgThumb} 640w`}
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        width={img.width || 1024}
                                        height={img.height || 1024}
                                        alt={img.title}
                                        loading="lazy"
                                        decoding="async"
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
                    ref={dialogRef}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${filteredImages[currentImageIndex]?.title || 'Gallery image'} lightbox`}
                    className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) closeLightbox();
                    }}
                >
                    {/* Close Button */}
                    <button
                        ref={closeBtnRef}
                        type="button"
                        onClick={closeLightbox}
                        className="fixed top-4 right-4 sm:top-6 sm:right-6 text-slate-300 hover:text-white p-2.5 rounded-full bg-slate-900/90 hover:bg-brand-orange transition-all z-30 cursor-pointer shadow-lg active:scale-95"
                        title="Close lightbox (Esc)"
                        aria-label="Close lightbox"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Previous Button */}
                    {filteredImages.length > 1 && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                prevImage();
                            }}
                            className="fixed left-2 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900/80 hover:bg-brand-orange text-white flex items-center justify-center transition-all z-30 cursor-pointer shadow-lg active:scale-90"
                            title="Previous image (Left Arrow)"
                            aria-label="Previous image"
                        >
                            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    )}

                    {/* Next Button */}
                    {filteredImages.length > 1 && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                nextImage();
                            }}
                            className="fixed right-2 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900/80 hover:bg-brand-orange text-white flex items-center justify-center transition-all z-30 cursor-pointer shadow-lg active:scale-90"
                            title="Next image (Right Arrow)"
                            aria-label="Next image"
                        >
                            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    )}

                    <div className="w-full max-w-4xl max-h-[92vh] flex flex-col items-center justify-center my-auto z-20 animate-ios-pop">
                        <div className="relative max-h-[60vh] sm:max-h-[70vh] flex items-center justify-center w-full">
                            <img
                                src={
                                    filteredImages[currentImageIndex].full ||
                                    filteredImages[currentImageIndex].image1600 ||
                                    (filteredImages[currentImageIndex].image_display && filteredImages[currentImageIndex].image_display.trim()) ||
                                    (filteredImages[currentImageIndex].image && filteredImages[currentImageIndex].image.trim()) ||
                                    (filteredImages[currentImageIndex].image_url && filteredImages[currentImageIndex].image_url.trim()) ||
                                    bigbWarehouse1600
                                }
                                width={filteredImages[currentImageIndex].width || 1024}
                                height={filteredImages[currentImageIndex].height || 1024}
                                alt={filteredImages[currentImageIndex].title}
                                decoding="async"
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
