import interiorImg from '../assets/images/interior.png';
import weighbridgeImg from '../assets/images/weighbridge.png';
import loadingDocksImg from '../assets/images/loading_docks.png';
import parkingYardImg from '../assets/images/parking_yard.png';
import laborOpsImg from '../assets/images/labor_ops.png';
import powerElectricityImg from '../assets/images/power_electricity.png';
import hydraCraneImg from '../assets/images/hydra_crane.png';

export const facilitiesData = [
    {
        id: 1,
        title: "High-Bay Warehouse Storage",
        description: "Spacious heavy-duty warehouse bays with 30ft ceiling clearance, epoxy concrete flooring, and high pallet racking capacity suitable for commercial inventory.",
        icon: "Warehouse",
        image: interiorImg,
        spec: "50,000+ SQ. FT. HIGH BAY",
        badgeColor: "bg-blue-100 text-blue-800 border-blue-200"
    },
    {
        id: 2,
        title: "In-House 50-Ton Weighbridge",
        description: "Dedicated heavy-duty 50-ton digital weighbridge scale on-site for fast, accurate gross & tare weight verification of all arriving and departing trucks.",
        icon: "Scale",
        image: weighbridgeImg,
        spec: "50-TON WEIGHBRIDGE SCALE",
        badgeColor: "bg-amber-100 text-amber-800 border-amber-200"
    },
    {
        id: 3,
        title: "Union-Free Loading & Unloading",
        description: "100% union-interference-free operations. Enjoy smooth, uninterrupted 24/7 dock loading and unloading without external labor disputes or operational halts.",
        icon: "ShieldCheck",
        image: loadingDocksImg,
        spec: "NO UNION INTERFERENCE",
        badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200"
    },
    {
        id: 4,
        title: "Hydra Crane Heavy Lifting Services",
        description: "On-site heavy industrial mobile Hydra Crane equipped for fast loading, unloading, and precision placement of heavy machinery, equipment, and bulk cargo.",
        icon: "Truck",
        image: hydraCraneImg,
        spec: "ON-SITE HYDRA CRANE",
        badgeColor: "bg-orange-100 text-orange-800 border-orange-200"
    },
    {
        id: 5,
        title: "In-House Labors",
        description: "Dedicated trained in-house labor workforce available for rapid cargo handling, loading & unloading, and inventory stacking.",
        icon: "Users",
        image: laborOpsImg,
        spec: "IN-HOUSE LABORS",
        badgeColor: "bg-purple-100 text-purple-800 border-purple-200"
    },
    {
        id: 6,
        title: "Ample Industrial Power & Electricity",
        description: "Uninterrupted 3-phase high-voltage electrical grid connection with high-capacity power backup to ensure continuous 24/7 operational lighting and machinery function.",
        icon: "Zap",
        image: powerElectricityImg,
        spec: "3-PHASE AMPLE POWER",
        badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200"
    },
    {
        id: 7,
        title: "Heavy Truck & Trailer Parking Yard",
        description: "Expansive asphalt staging yard designed with wide turning radii for 18-wheeler articulated trailers, high-mast LED floodlights, and 24/7 security gates.",
        icon: "ParkingCircle",
        image: parkingYardImg,
        spec: "AMPLE PARKING YARD",
        badgeColor: "bg-slate-100 text-slate-800 border-slate-200"
    }
];

