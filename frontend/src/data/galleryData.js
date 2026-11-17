import bigbWarehouse640 from '../assets/images/bigb_warehouse-640.webp';
import bigbWarehouse1024 from '../assets/images/bigb_warehouse-1024.webp';
import bigbWarehouse1600 from '../assets/images/bigb_warehouse-1600.webp';

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

import hydraCrane640 from '../assets/images/hydra_crane-640.webp';
import hydraCrane1024 from '../assets/images/hydra_crane-1024.webp';
import hydraCrane1600 from '../assets/images/hydra_crane-1600.webp';

import laborOps640 from '../assets/images/labor_ops-640.webp';
import laborOps1024 from '../assets/images/labor_ops-1024.webp';
import laborOps1600 from '../assets/images/labor_ops-1600.webp';

export const galleryData = [
    {
        id: 1,
        title: "BigB Warehouse Dusk Exterior",
        category: "Warehouse",
        description: "High-bay LED illuminated exterior view of modern industrial warehouse bays and paved truck yard.",
        image: bigbWarehouse1024,
        thumb: bigbWarehouse640,
        full: bigbWarehouse1600,
        srcSet: `${bigbWarehouse640} 640w, ${bigbWarehouse1024} 1024w, ${bigbWarehouse1600} 1600w`,
        width: 1024,
        height: 1024
    },
    {
        id: 2,
        title: "High-Bay Pallet Racking",
        category: "Warehouse",
        description: "Multi-tier heavy duty industrial steel racking systems with electric forklift operating down aisle.",
        image: interior1024,
        thumb: interior640,
        full: interior1600,
        srcSet: `${interior640} 640w, ${interior1024} 1024w, ${interior1600} 1600w`,
        width: 1024,
        height: 1024
    },
    {
        id: 3,
        title: "50-Ton Heavy Weighbridge",
        category: "Facilities",
        description: "Commercial scale platform with digital LED weight monitoring monitor and safety rails.",
        image: weighbridge1024,
        thumb: weighbridge640,
        full: weighbridge1600,
        srcSet: `${weighbridge640} 640w, ${weighbridge1024} 1024w, ${weighbridge1600} 1600w`,
        width: 1024,
        height: 1024
    },
    {
        id: 4,
        title: "Hydraulic Loading Dock Bays",
        category: "Loading",
        description: "Active loading dock shutter doors with hydraulic dock leveler for container trucks.",
        image: loadingDocks1024,
        thumb: loadingDocks640,
        full: loadingDocks1600,
        srcSet: `${loadingDocks640} 640w, ${loadingDocks1024} 1024w, ${loadingDocks1600} 1600w`,
        width: 1024,
        height: 1024
    },
    {
        id: 5,
        title: "Commercial Trailer Parking Yard",
        category: "Parking",
        description: "Spacious asphalt staging yard for heavy cargo logistics trailers and 18-wheelers.",
        image: parkingYard1024,
        thumb: parkingYard640,
        full: parkingYard1600,
        srcSet: `${parkingYard640} 640w, ${parkingYard1024} 1024w, ${parkingYard1600} 1600w`,
        width: 1024,
        height: 1024
    },
    {
        id: 6,
        title: "Hydra Crane Heavy Equipment Handling",
        category: "Facilities",
        description: "Industrial mobile crane equipment for precision heavy cargo loading and machinery placement.",
        image: hydraCrane1024,
        thumb: hydraCrane640,
        full: hydraCrane1600,
        srcSet: `${hydraCrane640} 640w, ${hydraCrane1024} 1024w, ${hydraCrane1600} 1600w`,
        width: 1024,
        height: 576
    },
    {
        id: 7,
        title: "Logistics Fulfillment & Safety Team",
        category: "Operations",
        description: "High-visibility safety gear team managing inventory scanning and cargo handling.",
        image: laborOps1024,
        thumb: laborOps640,
        full: laborOps1600,
        srcSet: `${laborOps640} 640w, ${laborOps1024} 1024w, ${laborOps1600} 1600w`,
        width: 1024,
        height: 1024
    }
];
