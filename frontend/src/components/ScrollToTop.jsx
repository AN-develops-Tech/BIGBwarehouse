import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    // Whenever the page is refreshed/reloaded, return to the home page
    useEffect(() => {
        try {
            const navEntries = window.performance?.getEntriesByType?.('navigation');
            const isReload = navEntries?.[0]?.type === 'reload' || window.performance?.navigation?.type === 1;
            if (isReload && pathname !== '/') {
                navigate('/', { replace: true });
            }
        } catch {
            // Fallback
        }
    }, [navigate, pathname]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export default ScrollToTop;
