import logoDark from '../assets/images/logo_dark.png';
import logoLight from '../assets/images/logo_light.png';

const Logo = ({ lightTheme = false, className = '' }) => {
  return (
    <div className={`flex items-center select-none ${className}`}>
      <img
        src={lightTheme ? logoLight : logoDark}
        alt="BIG B WAREHOUSE"
        width="348"
        height="434"
        className="h-14 sm:h-16 w-auto object-contain animate-logo-b transition-transform duration-300 drop-shadow-xs"
        loading="eager"
        decoding="async"
      />
    </div>
  );
};

export default Logo;
