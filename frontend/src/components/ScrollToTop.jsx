import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const nav = window.performance && performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
            const isReload = (nav && nav.type === 'reload') || (window.performance && performance.navigation && performance.navigation.type === 1);
            if (isReload && pathname !== '/') {
                navigate('/', { replace: true });
            }
        } catch {}
    }, [navigate, pathname]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export default ScrollToTop;
