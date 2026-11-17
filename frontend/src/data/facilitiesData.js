import interior640 from '../assets/images/interior-640.webp';
import interior1024 from '../assets/images/interior-1024.webp';
import interior1600 from '../assets/images/interior-1600.webp';

import weighbridge640 from '../assets/images/weighbridge-640.webp';
import weighbridge1024 from '../assets/images/weighbridge-1024.webp';
import weighbridge1600 from '../assets/images/weighbridge-1600.webp';

import loadingDocks640 from '../assets/images/loading_docks-640.webp';
import loadingDocks1024 from '../assets/images/loading_docks-1024.webp';
import loadingDocks1600 from '../assets/images/loading_docks-1600.webp';

import parkingYard640 from '../assets/images/parking_yard-640.webp';
import parkingYard1024 from '../assets/images/parking_yard-1024.webp';
import parkingYard1600 from '../assets/images/parking_yard-1600.webp';

import laborOps640 from '../assets/images/labor_ops-640.webp';
import laborOps1024 from '../assets/images/labor_ops-1024.webp';
import laborOps1600 from '../assets/images/labor_ops-1600.webp';

import hydraCrane640 from '../assets/images/hydra_crane-640.webp';
import hydraCrane1024 from '../assets/images/hydra_crane-1024.webp';
import hydraCrane1600 from '../assets/images/hydra_crane-1600.webp';

export const facilitiesData = [
    {
        id: 1,
        title: "High-Bay Warehouse Storage",
        description: "Spacious heavy-duty warehouse bays with 30ft ceiling clearance and epoxy concrete flooring. Highbay system can be done at your requirement.",
        icon: "Warehouse",
        image: interior1024,
        image640: interior640,
        image1024: interior1024,
        image1600: interior1600,
        srcSet: `${interior640} 640w, ${interior1024} 1024w, ${interior1600} 1600w`,
        width: 1024,
        height: 1024,
        spec: "50,000+ SQ. FT. HIGH BAY",
        badgeColor: "bg-blue-100 text-blue-800 border-blue-200"
    },
    {
        id: 2,
        title: "In-House 50-Ton Weighbridge",
        description: "Dedicated heavy-duty 50-ton digital weighbridge scale on-site for fast, accurate gross & tare weight verification of all arriving and departing trucks.",
        icon: "Scale",
        image: weighbridge1024,
        image640: weighbridge640,
        image1024: weighbridge1024,
        image1600: weighbridge1600,
        srcSet: `${weighbridge640} 640w, ${weighbridge1024} 1024w, ${weighbridge1600} 1600w`,
        width: 1024,
        height: 1024,
        spec: "50-TON WEIGHBRIDGE SCALE",
        badgeColor: "bg-amber-100 text-amber-800 border-amber-200"
    },
    {
        id: 3,
        title: "Union-Free Loading & Unloading",
        description: "100% union-interference-free operations. Enjoy smooth, uninterrupted 24/7 dock loading and unloading without external labor disputes or operational halts.",
        icon: "ShieldCheck",
        image: loadingDocks1024,
        image640: loadingDocks640,
        image1024: loadingDocks1024,
        image1600: loadingDocks1600,
        srcSet: `${loadingDocks640} 640w, ${loadingDocks1024} 1024w, ${loadingDocks1600} 1600w`,
        width: 1024,
        height: 1024,
        spec: "NO UNION INTERFERENCE",
        badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200"
    },
    {
        id: 4,
        title: "Hydra Crane Heavy Lifting Services",
        description: "On-site heavy industrial mobile Hydra Crane equipped for fast loading, unloading, and precision placement of heavy machinery, equipment, and bulk cargo.",
        icon: "Truck",
        image: hydraCrane1024,
        image640: hydraCrane640,
        image1024: hydraCrane1024,
        image1600: hydraCrane1600,
        srcSet: `${hydraCrane640} 640w, ${hydraCrane1024} 1024w, ${hydraCrane1600} 1600w`,
        width: 1024,
        height: 576,
        spec: "ON-SITE HYDRA CRANE",
        badgeColor: "bg-orange-100 text-orange-800 border-orange-200"
    },
    {
        id: 5,
        title: "In-House Labors",
        description: "Dedicated trained in-house labor workforce available for rapid cargo handling, loading & unloading, and inventory stacking.",
        icon: "Users",
        image: laborOps1024,
        image640: laborOps640,
        image1024: laborOps1024,
        image1600: laborOps1600,
        srcSet: `${laborOps640} 640w, ${laborOps1024} 1024w, ${laborOps1600} 1600w`,
        width: 1024,
        height: 1024,
        spec: "IN-HOUSE LABORS",
        badgeColor: "bg-purple-100 text-purple-800 border-purple-200"
    },
    {
        id: 6,
        title: "Heavy Truck & Trailer Parking Yard",
        description: "Expansive asphalt staging yard designed with wide turning radii for 18-wheeler articulated trailers, high-mast LED floodlights, and 24/7 security gates.",
        icon: "ParkingCircle",
        image: parkingYard1024,
        image640: parkingYard640,
        image1024: parkingYard1024,
        image1600: parkingYard1600,
        srcSet: `${parkingYard640} 640w, ${parkingYard1024} 1024w, ${parkingYard1600} 1600w`,
        width: 1024,
        height: 1024,
        spec: "AMPLE PARKING YARD",
        badgeColor: "bg-slate-100 text-slate-800 border-slate-200"
    }
];
