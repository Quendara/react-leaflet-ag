import L from 'leaflet';

 

import L from 'leaflet';

const iconBrief = new L.Icon({
    iconUrl: require('../public/icon.svg'),
    iconRetinaUrl: require('../public/icon.svg'),
    // iconAnchor: null,
    popupAnchor:  [-0, -25],
    // shadowUrl: null,
    // shadowSize: null,
    // shadowAnchor: null,
    iconSize: new L.Point(60, 75),
    // className: 'leaflet-div-icon'
});

const iconPost = new L.Icon({
    iconUrl: require('../public/post.svg'),
    iconRetinaUrl: require('../public/post.svg'),
    // iconAnchor: null,
    popupAnchor:  [-0, -25],
    // shadowUrl: null,
    // shadowSize: null,
    // shadowAnchor: null,
    iconSize: new L.Point(60, 75),
 
});


export { iconBrief };
export { iconPost };
