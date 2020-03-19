import React, { Component } from "react";
import { Map, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import { iconBrief } from "./MarkerIcons";
import { iconPost } from "./MarkerIcons";

import MarkerClusterGroup from "react-leaflet-markercluster";

import { locations } from "./mockPF.js";

import "react-leaflet-markercluster/dist/styles.min.css";

const getRandNumber = (min, max) => {
  const amplitude = max - min;
  const number = +min + Math.random() * amplitude;

  return number; 
};

// fake data generator
const getRandPositions = (count, position) => {
  const [first, second] = position;

  return Array.from({ length: count }, (v, k) => k).map(k => [
    first + getRandNumber(-0.5, 0.5),
    second + getRandNumber(-0.5, 0.5)
  ]);
};

const GeoMap = props => {
  const getIcon = ( icon ) => {
    switch ( icon ) {
      case "Briefkasten":
        return iconBrief;
      default:
        return iconPost;
    } 
  };

  return (
    <Map center={props.centerPosition} zoom={props.zoom}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
      />

      {props.locations.map((item, index) => (
        <Marker
          key={index}
          position={geoLocToPosition(item.geoPosition)}
          icon={ getIcon( item.keyWord ) }
          riseOnHover="true"
          
        >
          <Popup>
            {item.keyWord} .. {item.geoPosition.distance }m
            <hr />
            
            {item.street} {" "} {item.houseNo}  <br />
            {item.zipCode} {" "}
            {item.city}
          </Popup>
        </Marker>
      ))}
    </Map>
  );
};

const geoLocToPosition = loc => {
  return [loc.latitude, loc.longitude];
};

class PostFinder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markerArr: [],
      centerPosition: [51.43236772539065, 8.93732375854481],
      zoom: 11,
      error: ""
    };

    const real = true;
    if (real) {
      this.state.centerPosition = geoLocToPosition(locations.centerOfSearch);

      let arr = [];

      locations.pfLocations.map((item, index) => {
        arr.push(geoLocToPosition(item.geoPosition));
      });
      this.setState({ markerArr: arr });
      this.state.markerArr = locations.pfLocations;
    } else {
      // simulattes
      let arr = getRandPositions(20, this.state.centerPosition);
      this.setState({ markerArr: arr });
      this.state.markerArr = getRandPositions(20, this.state.centerPosition);

      console.log(arr);
    }
  }

  componentDidMount(){

  }

  render() {
    return (
      <GeoMap
        zoom={this.state.zoom}
        centerPosition={this.state.centerPosition}
        locations={this.state.markerArr}
      />
    );
  }
}

export { PostFinder };
