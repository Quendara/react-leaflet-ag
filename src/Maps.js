import React, { Component } from "react";
import { Map, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

import MarkerClusterGroup from "react-leaflet-markercluster";

import { TourMockData } from "./tourdata";
import { TourMockData2 } from "./tourdata";


import {toGeoJSON}  from "./toGeoJSON"

import "react-leaflet-markercluster/dist/styles.min.css";

// type State = {
//   lat: number,
//   lng: number,
//   zoom: number,
// }

// const ccords = TourMock.features.geometry;

const convertGeoJsonToTrack = geoJSON => {
  const coords = geoJSON.features[0].geometry.coordinates;
  const tourName = geoJSON.features[0].properties.name;
  const time = geoJSON.features[0].properties.time;

  const track = {
    name: tourName,
    time: time,
    trackCoords: [],
    color: "green"
  };

  coords.map((item, index) => {
    if (index % 4 === 0) {
      // reduce data
      track.trackCoords.push([item[1], item[0]]);
    }

    if (index % 500 === 0) {
      // markerArr.push([item[1], item[0]]);
    }
  });

  return track;
};

const getRandNumber = (min, max) => {
  const number = Math.random() * Math.floor(max);
  return number;
};

// fake data generator
const getRandPositions = (count, position) => {
  const [first, second] = position;

  return Array.from({ length: count }, (v, k) => k).map(k => [
    first + getRandNumber(0, 1),
    second + getRandNumber(0, 1)
  ]);
};

class SimpleMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tracks: [],
      markerArr: [], // getRandPositions(10, position);
      centerPosition: [],
      zoom: 11
    };



    this.state.tracks.push(convertGeoJsonToTrack(TourMockData));
    this.state.tracks.push(convertGeoJsonToTrack(TourMockData2));
    // this.state.tracks.push(convertGeoJsonToTrack(TourMockData3));

    this.state.tracks[1].color = "darkblue"

    // get center of the
    this.state.centerPosition = this.state.tracks[0].trackCoords[0];
  }

  render() {
    const centerPosition = [];

    return (
      <Map center={this.state.centerPosition} zoom={this.state.zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
        />

        {this.state.markerArr.map((item, index) => (
          <Marker key={index} position={item}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
              <hr />
              {item[0]}, {item[1]}
            </Popup>
          </Marker>
        ))}

        {this.state.tracks.map((track, index) => (
          <>
            <Marker position={track.trackCoords[0]}>
              <Popup>
                <b>Tour</b> <br/> {track.name}
                <hr />
                {track.time}
                <hr />
                {track.trackCoords[0]}, {track.trackCoords[1]}
              </Popup>
            </Marker>

            <Polyline color={track.color} positions={track.trackCoords} />
          </>
        ))}
      </Map>
    );
  }
}

export { SimpleMap };
