import React from 'react';
import { /*withScriptjs,*/ withGoogleMap, GoogleMap } from 'react-google-maps';
import HeatmapLayer from 'react-google-maps/lib/components/visualization/HeatmapLayer';

let GMap = withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={5}
    defaultCenter={{ lat: 65.21, lng: 12.4917 }}
  >
    <HeatmapLayer data={
      props.results.reduce((data, obj) => {
        if (obj.hasOwnProperty('lat') && obj.hasOwnProperty('long')) {
          data.push(new google.maps.LatLng(obj.lat, obj.long));
        }
        return data;
      },[])
    } />
  </GoogleMap>
);

export default GMap;
