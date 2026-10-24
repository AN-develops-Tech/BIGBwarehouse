import React from 'react';

/**
 * Responsive Card Component with hover interaction effects.
 */
export const Card = ({
    title,
    description,
    image,
    icon,
    badge,
    actionText,
    onAction,
    children,
    className = ''
}) => {
    return (
        <div
            className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white border border-slate-200/90 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-brand-orange/60 ${className}`}
        >
            {/* Top orange accent indicator on hover */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-brand-orange opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {children ? (
                children
            ) : (
                <>
                    <div>
                        {image && (
                            <div className="relative -mx-6 -mt-6 mb-5 h-44 overflow-hidden border-b border-slate-100 bg-slate-100">
                                <img
                                    src={image}
                                    alt={title || 'Card thumbnail'}
                                    loading="lazy"
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                {badge && (
                                    <span className="absolute top-3 right-3 rounded-md bg-slate-900/90 px-2.5 py-1 text-xs font-mono font-bold text-white shadow-xs backdrop-blur-sm border border-slate-700">
                                        {badge}
                                    </span>
                                )}
                            </div>
                        )}

                        <div className="flex items-center justify-between mb-4">
                            {icon && (
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-brand-orange border border-orange-200 shadow-xs transition-transform duration-300 group-hover:scale-110">
                                    {icon}
                                </div>
                            )}
                            {!image && badge && (
                                <span className="rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700">
                                    {badge}
                                </span>
                            )}
                        </div>

                        {title && (
                            <h3 className="mb-2 text-lg font-black uppercase tracking-tight text-slate-900 transition-colors duration-200 group-hover:text-brand-orange">
                                {title}
                            </h3>
                        )}

                        {description && (
                            <p className="text-sm leading-relaxed text-slate-600 font-normal">
                                {description}
                            </p>
                        )}
                    </div>

                    {actionText && (
                        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-brand-orange group-hover:translate-x-1 transition-transform">
                            <button
                                type="button"
                                onClick={onAction}
                                className="flex items-center gap-1.5 cursor-pointer hover:text-orange-600 uppercase"
                            >
                                <span>{actionText}</span>
                                <span aria-hidden="true">&rarr;</span>
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

/**
 * Responsive Card Grid Component
 * Uses modern CSS Grid with repeat(auto-fit, minmax(280px, 1fr))
 * Cards stack vertically on small screens and automatically flow into multiple columns on wider screens.
 */
export const CardGrid = ({
    items,
    renderCard,
    children,
    gap = '1.5rem',
    minCardWidth = '280px',
    className = ''
}) => {
    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(${minCardWidth}, 1fr))`,
        gap
    };

    return (
        <div
            style={gridStyle}
            className={`w-full ${className}`}
        >
            {items
                ? items.map((item, idx) =>
                      renderCard ? renderCard(item, idx) : <Card key={item.id || idx} {...item} />
                  )
                : children}
        </div>
    );
};

export default CardGrid;
