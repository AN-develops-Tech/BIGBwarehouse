import { Link } from 'react-router-dom';
import { Home as HomeIcon, PhoneCall } from 'lucide-react';
import SEO from '../components/SEO';

const NotFound = () => {
  return (
    <div className="bg-slate-50 text-slate-900 min-h-[65vh] flex items-center justify-center font-sans relative py-16 px-4 sm:px-6 lg:px-8">
      <SEO routeKey="404" />
      <div className="max-w-md w-full text-center bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl relative overflow-hidden">

        <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-brand-orange text-xs font-mono font-bold uppercase tracking-wider mb-4 border border-orange-200">
          Error 404
        </span>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight mb-3">
          Page not found
        </h1>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 font-medium">
          The page you are looking for does not exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto cta-light-sweep bg-brand-orange hover:bg-orange-600 text-white h-12 px-6 rounded-xl font-black tracking-wider text-xs uppercase transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 border border-orange-400/50 active:scale-[0.98]"
          >
            <HomeIcon className="w-4 h-4 shrink-0" />
            <span>Home</span>
          </Link>
          <Link
            to="/contact"
            className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white h-12 px-6 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-slate-800 active:scale-[0.98]"
          >
            <PhoneCall className="w-4 h-4 text-brand-orange shrink-0" />
            <span>Contact</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

