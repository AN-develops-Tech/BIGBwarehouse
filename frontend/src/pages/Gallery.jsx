import { useState, useEffect } from 'react';
import { X, ZoomIn } from 'lucide-react';
import api from '../api/axios';

import heroImg from '../assets/images/hero.png';
import interiorImg from '../assets/images/interior.png';
import weighbridgeImg from '../assets/images/weighbridge.png';
import loadingDocksImg from '../assets/images/loading_docks.png';
import parkingYardImg from '../assets/images/parking_yard.png';
import laborOpsImg from '../assets/images/labor_ops.png';

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
        { id: 6, title: "Logistics Fulfillment & Safety Team", category: "Facilities", description: "High-visibility safety gear team managing inventory scanning and cargo handling.", image: laborOpsImg },
    ];

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const res = await api.get('/gallery/');
                const fetched = res.data.results || res.data || [];
                setImages(fetched.length > 0 ? fetched : defaultGalleryImages);
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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white text-brand-orange font-mono text-xl pt-20">
                LOADING PHOTO GALLERY...
            </div>
        );
    }

    const openLightbox = (index) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        document.body.style.overflow = 'unset';
    };

    return (
        <div className="bg-white text-slate-900 min-h-screen font-sans">
            {/* Header */}
            <div className="py-20 bg-slate-50 border-b border-slate-200 text-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <span className="text-brand-orange font-mono text-xs uppercase tracking-widest font-extrabold">VISUAL INSPECTION</span>
                    <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-slate-900 mt-2 mb-4">
                        WAREHOUSE PARK GALLERY
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto font-normal">
                        Photorealistic visual tour of our high-bay storage bays, 50-ton weighbridge, and logistics docks.
                    </p>
                    <div className="mt-4 h-1.5 w-24 bg-brand-orange mx-auto rounded-full"></div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2.5 rounded-lg font-mono text-xs uppercase tracking-wider transition-all duration-300 ${filter === cat
                                ? 'bg-brand-orange text-white shadow-lg font-bold border border-orange-400'
                                : 'bg-slate-100 text-slate-700 border border-slate-200 hover:border-brand-orange hover:text-brand-orange hover:bg-orange-50/50'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Photo Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredImages.map((img, index) => {
                        const imgSrc = (img.image_display && img.image_display.trim()) || 
                                       (img.image && img.image.trim()) || 
                                       (img.image_url && img.image_url.trim()) || 
                                       heroImg;
                        return (
                            <div
                                key={img.id || index}
                                className="group relative cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-slate-900 shadow-sm hover:shadow-2xl aspect-video transition-all"
                                onClick={() => openLightbox(index)}
                            >
                                <img
                                    src={imgSrc}
                                    alt={img.title || "Gallery Item"}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <span className="text-brand-orange text-xs font-mono font-bold uppercase">{img.category}</span>
                                            <h3 className="text-white font-black text-lg uppercase mt-1">{img.title}</h3>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-brand-orange/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                            <ZoomIn className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {filteredImages.length === 0 && (
                    <div className="text-center py-20 text-slate-500 font-mono text-lg">NO IMAGES FOUND FOR THIS CATEGORY.</div>
                )}
            </div>

            {/* Lightbox Modal */}
            {lightboxOpen && filteredImages[currentImageIndex] && (
                <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
                    <button
                        onClick={closeLightbox}
                        className="absolute top-6 right-6 text-gray-400 hover:text-brand-orange transition-colors"
                    >
                        <X className="w-10 h-10" />
                    </button>

                    <div className="w-full max-w-5xl flex flex-col items-center">
                        <img
                            src={
                                (filteredImages[currentImageIndex].image_display && filteredImages[currentImageIndex].image_display.trim()) ||
                                (filteredImages[currentImageIndex].image && filteredImages[currentImageIndex].image.trim()) ||
                                (filteredImages[currentImageIndex].image_url && filteredImages[currentImageIndex].image_url.trim()) ||
                                heroImg
                            }
                            alt={filteredImages[currentImageIndex].title}
                            className="max-h-[75vh] object-contain rounded-xl shadow-2xl border border-brand-orange/40"
                        />
                        <div className="text-center mt-6 steel-glass-card p-6 rounded-xl max-w-2xl border border-brand-orange/40">
                            <span className="text-brand-orange text-xs font-mono font-bold uppercase">{filteredImages[currentImageIndex].category}</span>
                            <h3 className="text-white font-black text-2xl uppercase mt-1">{filteredImages[currentImageIndex].title}</h3>
                            {filteredImages[currentImageIndex].description && (
                                <p className="text-gray-300 mt-2 text-sm leading-relaxed">{filteredImages[currentImageIndex].description}</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;

