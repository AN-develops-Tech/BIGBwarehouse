import { useState } from 'react';
import { Mail, Phone, MapPin, Loader2, CheckCircle2, AlertCircle, Clock, Navigation } from 'lucide-react';
import { useCompany } from '../context/CompanyContext';
import WhatsAppIcon from '../components/WhatsAppIcon';
import SectionTitle from '../components/SectionTitle';
import api from '../api/axios';

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

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        setSuccess(true);
        setError(null);

        const targetPhone = company?.whatsapp?.replace(/\D/g, '') || '917909294488';
        const formattedMsg = `*NEW ENQUIRY - BIGB WAREHOUSE PARK*%0A%0A` +
            `👤 *Name:* ${encodeURIComponent(formData.full_name)}%0A` +
            `🏢 *Company:* ${encodeURIComponent(formData.company_name || 'N/A')}%0A` +
            `📞 *Phone:* ${encodeURIComponent(formData.phone)}%0A` +
            `✉️ *Email:* ${encodeURIComponent(formData.email)}%0A` +
            `📦 *Requirement:* ${encodeURIComponent(formData.requirement)}%0A` +
            `💬 *Message:* ${encodeURIComponent(formData.message ? formData.message : 'None')}`;

        const nativeUrl = `whatsapp://send?phone=${targetPhone}&text=${formattedMsg}`;
        const webUrl = `https://wa.me/${targetPhone}?text=${formattedMsg}`;
        setWaLink(webUrl);

        // Record enquiry in backend database
        api.post('/enquiries/', {
            ...formData,
            message: formData.message || 'None'
        }).catch(err => {
            console.warn('Backend enquiry record:', err);
        });

        // Launch native WhatsApp app directly on mobile, fallback to Web on desktop
        try {
            window.location.href = nativeUrl;
        } catch (err) {
            window.location.href = webUrl;
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phone') {
            // Only allow numeric digits and limit to 10 digits max
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

    const mapIframeSrc = company?.google_maps_url || "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d268.88578880065893!2d76.74759820103648!3d8.804608495159428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sBigB!5e1!3m2!1sen!2sin!4v1788549504015!5m2!1sen!2sin";

    return (
        <div className="bg-slate-50 text-slate-900 min-h-screen font-sans">

            {/* Header Banner */}
            <div className="bg-white text-slate-900 py-16 border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-900 mb-4">CONTACT & LOCATION</h1>
                    <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-medium">
                        Get in touch with our operations team or visit BigB Warehouse Park in Parippally, Kerala.
                    </p>
                    <div className="mt-4 h-1.5 w-24 bg-brand-orange mx-auto rounded-full"></div>
                </div>
            </div>

            {/* Main Contact Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Contact Info Sidebar */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-white p-8 rounded-2xl border border-gray-200/80 shadow-md h-full flex flex-col justify-between">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-100">Reach Out Today</h3>

                                <div className="space-y-8">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-blue-100 p-3 rounded-xl text-blue-600 shrink-0">
                                            <Phone className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 text-lg">Phone</h4>
                                            <p className="text-gray-700 font-bold mt-1 text-base">{company?.phone || '+91 7909294488'}</p>
                                            <p className="text-xs text-gray-500 mt-1">Direct Operational Support</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600 shrink-0">
                                            <WhatsAppIcon className="w-6 h-6 text-[#25D366]" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 text-lg">WhatsApp Desk</h4>
                                            <p className="text-emerald-700 font-bold mt-1 text-base">+91 7909294488</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="bg-blue-100 p-3 rounded-xl text-blue-600 shrink-0">
                                            <Mail className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 text-lg">Email</h4>
                                            <p className="text-gray-700 font-medium mt-1">{company?.email || 'contact@bigbwarehouse.com'}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="bg-blue-100 p-3 rounded-xl text-blue-600 shrink-0">
                                            <MapPin className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 text-lg">Address</h4>
                                            <p className="text-gray-700 mt-1 leading-relaxed font-medium">
                                                {company?.address || 'Ezhippuram, ESI Back Road, Parippally, Kerala.'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="bg-blue-100 p-3 rounded-xl text-blue-600 shrink-0">
                                            <Clock className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 text-lg">Operating Hours</h4>
                                            <p className="text-gray-700 font-medium mt-1">Office: Mon - Sat, 9:00 AM - 6:00 PM</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-md border border-gray-200/80">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Send us a message</h3>
                            <p className="text-gray-600 mb-6 text-sm">Fill out the form below to send your enquiry directly to our team via WhatsApp.</p>

                            {success && (
                                <div className="mb-8 bg-green-50 text-green-800 p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-green-200 shadow-sm">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                                        <div>
                                            <strong className="block font-bold">Enquiry Form Submitted!</strong>
                                            <span className="text-sm">Opening WhatsApp message to +91 7909294488...</span>
                                        </div>
                                    </div>
                                    {waLink && (
                                        <a
                                            href={waLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2 shrink-0 shadow-sm transition-colors"
                                        >
                                            <WhatsAppIcon className="w-4 h-4" /> Open WhatsApp Directly
                                        </a>
                                    )}
                                </div>
                            )}

                            {error && (
                                <div className="mb-8 bg-red-50 text-red-800 p-4 rounded-lg flex items-start gap-3 border border-red-200">
                                    <AlertCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
                                    <div>
                                        <strong className="block font-bold">Submission Failed</strong>
                                        <span>{error}</span>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                                        <input
                                            type="text"
                                            name="full_name"
                                            value={formData.full_name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                                        <input
                                            type="text"
                                            name="company_name"
                                            value={formData.company_name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number (10 Digits) *</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            maxLength={10}
                                            minLength={10}
                                            pattern="[0-9]{10}"
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors font-mono"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Must be a valid 10-digit mobile number</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Requirement Type *</label>
                                    <select
                                        name="requirement"
                                        value={formData.requirement}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white"
                                    >
                                        <option value="" disabled>Select a requirement</option>
                                        <option value="Warehouse Space">Warehouse Space</option>
                                        <option value="Loading Facilities">Loading Facilities</option>
                                        <option value="Parking Space">Long-term Parking Space</option>
                                        <option value="Other">Other Enquiry</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Additional Message (Optional)</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                                        placeholder="Tell us more about your specific needs..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-black py-4 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2.5 disabled:bg-emerald-400 disabled:cursor-not-allowed text-base tracking-wide"
                                >
                                    {submitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Preparing WhatsApp Message...
                                        </>
                                    ) : (
                                        <>
                                            <WhatsAppIcon className="w-5 h-5 text-white" />
                                            Send Message via WhatsApp
                                        </>
                                    )}
                                </button>
                            </form>

                        </div>
                    </div>
                </div>

                {/* Google Map Section */}
                <div className="mt-16 bg-white p-6 sm:p-10 rounded-2xl shadow-md border border-gray-200/80">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <div className="inline-flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-1">
                                <Navigation className="w-4 h-4" /> GEOGRAPHIC NAVIGATION
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black text-gray-900 uppercase">OUR LOCATION ON MAP</h2>
                            <p className="text-gray-600 text-sm mt-1">Ezhippuram, ESI Back Road, Parippally, Kerala.</p>
                        </div>
                        <a
                            href="https://maps.google.com/?q=BigB+Warehouse+Park+Parippally"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl shadow transition-colors text-sm shrink-0"
                        >
                            <MapPin className="w-4 h-4" /> Open in Google Maps
                        </a>
                    </div>

                    <div className="h-[450px] w-full rounded-xl overflow-hidden shadow-inner border border-gray-200">
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
