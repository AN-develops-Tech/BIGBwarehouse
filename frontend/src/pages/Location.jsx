import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useCompany } from '../context/CompanyContext';
import SectionTitle from '../components/SectionTitle';

const Location = () => {
    const { company } = useCompany();

    return (
        <div className="pt-20 pb-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle
                    title="Our Location"
                    subtitle="Strategically located for optimal logistics and supply chain efficiency"
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 bg-white rounded-2xl shadow-sm p-4 lg:p-8">

                    <div className="h-[400px] lg:h-auto rounded-xl overflow-hidden shadow-inner">
                        <iframe
                            src={company?.google_maps_url || "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d268.88578880065893!2d76.74759820103648!3d8.804608495159428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sBigB!5e1!3m2!1sen!2sin!4v1788549504015!5m2!1sen!2sin"}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="BigB Warehouse Location"
                        ></iframe>
                    </div>

                    <div className="space-y-8 p-4 lg:p-8 flex flex-col justify-center">

                        <div className="flex items-start gap-4">
                            <div className="bg-blue-100 p-3 rounded-xl text-blue-600 shrink-0">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Address</h3>
                                <p className="text-gray-600 leading-relaxed font-medium">
                                    {company?.address || 'Ezhippuram, ESI Back Road, Parippally, Kerala.'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-blue-100 p-3 rounded-xl text-blue-600 shrink-0">
                                <Clock className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Operating Hours</h3>
                                <p className="text-gray-600">24/7 Operations for registered clients</p>
                                <p className="text-gray-600">Office: Mon - Sat, 9:00 AM - 6:00 PM</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-blue-100 p-3 rounded-xl text-blue-600 shrink-0">
                                <Phone className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Phone</h3>
                                <p className="text-gray-600">{company?.phone || '+91 7909294488'}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-blue-100 p-3 rounded-xl text-blue-600 shrink-0">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
                                <p className="text-gray-600">{company?.email || 'Loading...'}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Location;
