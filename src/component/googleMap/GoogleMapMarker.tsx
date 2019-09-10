import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { Marker } from '../googleMap/Marker'

export function GoogleMapMarker() {
  const [center, setCenter] = useState({ lat: 50.3744918, lng: 22.1570696 });
  const [zoom, setZoom] = useState(14);
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyD3GRAEFFAfvQPYYlV2lUOC7rSSvwhejZs' }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        <Marker
          lat={50.3744918}
          lng={22.1570696}
          name="Pierogarnia Jeżowe"
        />
      </GoogleMapReact>
    </div>
  );
}