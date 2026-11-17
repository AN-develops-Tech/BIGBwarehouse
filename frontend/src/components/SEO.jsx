import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { seoData } from '../data/seoData';
import { companyData } from '../data/companyData';

export default function SEO({ routeKey }) {
    const location = useLocation();
    const currentPath = routeKey || location.pathname;
    const pageSeo = seoData[currentPath] || seoData['404'] || seoData['/'];

    const rawSiteUrl = import.meta.env?.SITE_URL || 'https://bigbwarehouse.in';
    const siteUrl = rawSiteUrl.replace(/\/+$/, '');
    const canonicalPath = pageSeo.canonical || (currentPath === '/404' ? '/' : pageSeo.path || currentPath);
    const canonicalUrl = `${siteUrl}${canonicalPath === '/' ? '' : canonicalPath}`;
    const pageUrl = `${siteUrl}${currentPath === '/' ? '' : currentPath}`;
    const ogImageUrl = `${siteUrl}/og-image.jpg`;

    useEffect(() => {
        if (typeof document !== 'undefined') {
            document.title = pageSeo.title;
        }
    }, [pageSeo.title]);

    const localBusinessSchema = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        'name': companyData.name,
        'url': siteUrl,
        'telephone': companyData.phone,
        'email': companyData.email,
        'image': ogImageUrl,
        'address': {
            '@type': 'PostalAddress',
            'streetAddress': 'Ezhippuram, ESI Back Road',
            'addressLocality': 'Parippally, Kollam',
            'addressRegion': 'Kerala',
            'postalCode': '691574',
            'addressCountry': 'IN'
        },
        'geo': {
            '@type': 'GeoCoordinates',
            'latitude': 8.804608,
            'longitude': 76.747598
        },
        'openingHoursSpecification': [
            {
                '@type': 'OpeningHoursSpecification',
                'dayOfWeek': [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday'
                ],
                'opens': '08:00',
                'closes': '20:00'
            }
        ]
    };

    return (
        <>
            <title>{pageSeo.title}</title>
            <meta name="description" content={pageSeo.description} />
            <link rel="canonical" href={canonicalUrl} />
            {pageSeo.noindex && <meta name="robots" content="noindex" />}

            {/* Open Graph */}
            <meta property="og:title" content={pageSeo.title} />
            <meta property="og:description" content={pageSeo.description} />
            <meta property="og:url" content={pageUrl} />
            <meta property="og:image" content={ogImageUrl} />
            <meta property="og:type" content="website" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={pageSeo.title} />
            <meta name="twitter:description" content={pageSeo.description} />
            <meta name="twitter:image" content={ogImageUrl} />

            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />
        </>
    );
}

