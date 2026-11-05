import { useState } from 'react';
import { Mail, Phone, MapPin, Loader2, CheckCircle2, AlertCircle, Clock, Navigation } from 'lucide-react';
import { useCompany } from '../context/CompanyContext';
import WhatsAppIcon from '../components/WhatsAppIcon';

const Contact = () => {
    const { company } = useCompany();

    const [formData, setFormData] = useState({
        full_name: '',
        company_name: '',
        phone: '',
        email: '',
        requirement: '',
        message: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [waLink, setWaLink] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        const targetPhone = company?.whatsapp?.replace(/\D/g, '') || '917909294488';
        const formattedMsg = `*NEW ENQUIRY - BIGB WAREHOUSE PARK*%0A%0A` +
            `👤 *Name:* ${encodeURIComponent(formData.full_name)}%0A` +
            `🏢 *Company:* ${encodeURIComponent(formData.company_name || 'N/A')}%0A` +
            `📞 *Phone:* ${encodeURIComponent(formData.phone)}%0A` +
            `✉️ *Email:* ${encodeURIComponent(formData.email)}%0A` +
            `📦 *Requirement:* ${encodeURIComponent(formData.requirement)}%0A` +
            `💬 *Message:* ${encodeURIComponent(formData.message ? formData.message : 'None')}`;

        const webUrl = `https://wa.me/${targetPhone}?text=${formattedMsg}`;
        setWaLink(webUrl);

        try {
            setSuccess(true);
            // Open WhatsApp securely in new tab with noopener, noreferrer
            window.open(webUrl, '_blank', 'noopener,noreferrer');
        } catch (err) {
            console.error('Enquiry dispatch error:', err);
            setSuccess(true);
            window.open(webUrl, '_blank', 'noopener,noreferrer');
        } finally {
            setSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phone') {
            const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
            setFormData({
                ...formData,
                phone: digitsOnly
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleResetForm = () => {
        setFormData({
            full_name: '',
            company_name: '',
            phone: '',
            email: '',
            requirement: '',
            message: ''
        });
        setSuccess(false);
        setWaLink(null);
    };

    const mapIframeSrc = company?.google_maps_url || "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d268.88578880065893!2d76.74759820103648!3d8.804608495159428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sBigB!5e1!3m2!1sen!2sin!4v1788549504015!5m2!1sen!2sin";

    return (
        <div className="bg-slate-50 text-slate-900 min-h-screen font-sans">
            {/* Unified Modern Header Banner */}
            <div className="relative py-20 bg-slate-50 border-b border-slate-200 overflow-hidden blueprint-grid-pattern text-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-slate-900 mb-4">
                        CONTACT & LOCATION
                    </h1>
                    <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
                        Connect with our facility operations team for quick space booking, weighbridge slots, and heavy crane scheduling.
                    </p>
                    <div className="mt-6 h-1.5 w-24 bg-brand-orange mx-auto rounded-full"></div>
                </div>
            </div>

            {/* Main Contact Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">

                    {/* Contact Info Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-sm h-full flex flex-col justify-between">
                            <div>
                                <span className="text-brand-orange font-mono text-xs uppercase tracking-widest font-extrabold">OPERATIONAL DESK</span>
                                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mt-1 mb-8 pb-4 border-b border-slate-100">
                                    REACH OUT TODAY
                                </h3>

                                <div className="space-y-7">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-orange-50 border border-orange-200 p-3.5 rounded-2xl text-brand-orange shrink-0">
                                            <Phone className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wide">Phone Line</h4>
                                            <a href={`tel:${(company?.phone || '+91 7909294488').replace(/\s+/g, '')}`} className="text-slate-900 font-bold mt-1 text-base hover:text-brand-orange block font-mono">
                                                {company?.phone || '+91 7909294488'}
                                            </a>
                                            <p className="text-xs text-slate-400 mt-0.5 font-mono">Direct Facility Support</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl text-emerald-600 shrink-0">
                                            <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wide">WhatsApp Desk</h4>
                                            <a href={`https://wa.me/${(company?.whatsapp || '+91 7909294488').replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-bold mt-1 text-base hover:underline block font-mono">
                                                {company?.whatsapp || '+91 7909294488'}
                                            </a>
                                            <p className="text-xs text-slate-400 mt-0.5 font-mono">24/7 Fast Response</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="bg-slate-100 border border-slate-200 p-3.5 rounded-2xl text-slate-700 shrink-0">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wide">Email</h4>
                                            <a href={`mailto:${company?.email || 'contact@bigbwarehouse.com'}`} className="text-slate-700 font-mono text-sm hover:text-brand-orange block mt-1">
                                                {company?.email || 'contact@bigbwarehouse.com'}
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="bg-slate-100 border border-slate-200 p-3.5 rounded-2xl text-slate-700 shrink-0">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wide">Physical Address</h4>
                                            <p className="text-slate-600 mt-1 leading-relaxed text-sm">
                                                {company?.address || 'Ezhippuram, ESI Back Road, Parippally, Kollam District, Kerala - 691574.'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="bg-slate-100 border border-slate-200 p-3.5 rounded-2xl text-slate-700 shrink-0">
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wide">Operating Hours</h4>
                                            <p className="text-slate-600 text-sm mt-1">Mon - Sat: 9:00 AM - 6:00 PM</p>
                                            <p className="text-xs text-brand-orange font-bold uppercase mt-0.5">24/7 Gated Security & Docks</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-200/90">
                            <span className="text-brand-orange font-mono text-xs uppercase tracking-widest font-extrabold">ENQUIRY FORM</span>
                            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight mt-1 mb-2">SEND US A MESSAGE</h3>
                            <p className="text-slate-600 mb-8 text-sm">Fill out your requirements below for instant review by our operations dispatch.</p>

                            {success && (
                                <div className="mb-8 bg-emerald-50 text-emerald-900 p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-emerald-200 shadow-sm animate-fade-in">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                                        <div>
                                            <strong className="block font-bold text-base">Enquiry Sent Successfully!</strong>
                                            <span className="text-xs sm:text-sm text-emerald-800">
                                                Your requirement is recorded, and WhatsApp chat has been prepared.
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                        {waLink && (
                                            <a
                                                href={waLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
                                            >
                                                <WhatsAppIcon className="w-4 h-4" /> Open WhatsApp
                                            </a>
                                        )}
                                        <button
                                            type="button"
                                            onClick={handleResetForm}
                                            className="px-4 py-2.5 rounded-xl border border-emerald-300 text-emerald-800 hover:bg-emerald-100/60 font-mono text-xs font-bold uppercase transition-colors"
                                        >
                                            Send Another
                                        </button>
                                    </div>
                                </div>
                            )}

                            {error && (
                                <div className="mb-8 bg-red-50 text-red-800 p-4 rounded-xl flex items-start gap-3 border border-red-200 animate-fade-in">
                                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                                    <div>
                                        <strong className="block font-bold text-sm">Submission Error</strong>
                                        <span className="text-xs">{error}</span>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-2">Full Name *</label>
                                        <input
                                            type="text"
                                            name="full_name"
                                            value={formData.full_name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all text-sm bg-slate-50 focus:bg-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-2">Company Name</label>
                                        <input
                                            type="text"
                                            name="company_name"
                                            value={formData.company_name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all text-sm bg-slate-50 focus:bg-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-2">Email Address *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all text-sm bg-slate-50 focus:bg-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-2">Phone Number *</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            maxLength={10}
                                            minLength={10}
                                            pattern="[0-9]{10}"
                                            required
                                            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all font-mono text-sm bg-slate-50 focus:bg-white"
                                        />
                                
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-2">Requirement Type *</label>
                                    <select
                                        name="requirement"
                                        value={formData.requirement}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all bg-slate-50 focus:bg-white text-sm"
                                    >
                                        <option value="" disabled>Select your primary requirement</option>
                                        <option value="High-Bay Warehouse Space">High-Bay Warehouse Space</option>
                                        <option value="50-Ton Weighbridge">50-Ton Weighbridge Scale Usage</option>
                                        <option value="Hydra Crane Heavy Lifting">Hydra Crane Heavy Lifting Support</option>
                                        <option value="Loading Docks & Labor">Union-Free Loading Docks & Labor</option>
                                        <option value="Truck Parking Yard">Heavy Truck & Trailer Parking Yard</option>
                                        <option value="Other">Custom Commercial Logistics Enquiry</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-2">Additional Message (Optional)</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all text-sm resize-none bg-slate-50 focus:bg-white"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="cta-light-sweep w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-black py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2.5 disabled:opacity-70 disabled:cursor-not-allowed text-sm uppercase tracking-wider cursor-pointer active:scale-[0.99]"
                                >
                                    {submitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            <span>Submitting Enquiry...</span>
                                        </>
                                    ) : (
                                        <>
                                            <WhatsAppIcon className="w-5 h-5 text-white" />
                                            <span>Submit Enquiry & Chat on WhatsApp</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Google Map Section */}
                <div className="mt-16 bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200/90">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-5 border-b border-slate-100">
                        <div>
                            <div className="inline-flex items-center gap-2 text-brand-orange font-bold text-xs uppercase tracking-wider mb-1">
                                <Navigation className="w-4 h-4" /> GEOGRAPHIC NAVIGATION
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">OUR LOCATION ON MAP</h2>
                            <p className="text-slate-600 text-sm mt-1">Ezhippuram, ESI Back Road, Parippally, Kerala.</p>
                        </div>
                        <a
                            href="https://maps.google.com/?q=BigB+Warehouse+Park+Parippally"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-xl shadow transition-colors text-xs font-mono uppercase tracking-wider shrink-0"
                        >
                            <MapPin className="w-4 h-4 text-brand-orange" /> Open in Google Maps
                        </a>
                    </div>

                    <div className="h-[450px] w-full rounded-2xl overflow-hidden shadow-inner border border-slate-200">
                        <iframe
                            src={mapIframeSrc}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="BigB Warehouse Park Location Map"
                        ></iframe>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Contact;
