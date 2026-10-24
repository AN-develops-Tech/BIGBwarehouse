const SectionTitle = ({ title, subtitle, align = 'center' }) => {
    return (
        <div className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
            {subtitle && <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
            <div className={`h-1.5 w-20 bg-brand-orange mt-5 rounded-full ${align === 'center' ? 'mx-auto' : ''}`}></div>
        </div>
    );
};

export default SectionTitle;
