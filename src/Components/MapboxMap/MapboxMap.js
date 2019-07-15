import React, { useState, useEffect, useRef } from 'react';
import MapGL, { Marker, GeolocateControl } from 'react-map-gl';
import CityPin from '../Utils/city-pin';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useTranslation } from 'react-i18next';
import queryString from 'query-string';

export default ({
  viewport,
  setViewport,
  displayedPoints,
  history,
  location,
}) => {
  const { t, i18n } = useTranslation();
  const map = useRef(null);
  const [mapStyle, setMapStyle] = useState(
    'mapbox://styles/strawshield/cjxx7z1sf04rm1dl7bjryf4xf'
  );

  useEffect(() => {
    if (i18n.language && i18n.language !== 'fi') {
      setMapStyle('mapbox://styles/strawshield/cjxx3eh3t2oib1cpm9fxw4i9j');
    } else {
      setMapStyle('mapbox://styles/strawshield/cjxx7z1sf04rm1dl7bjryf4xf');
    }
  }, [i18n.language]);

  const _renderMarker = () => {
    return (
      displayedPoints &&
      displayedPoints.map((point, index) => {
        const pinSize =
          queryString.parse(location.search).name === point.properties.name
            ? 50
            : 20;
        return (
          <Marker
            key={`marker-${index}`}
            longitude={point.geometry.coordinates[0]}
            latitude={point.geometry.coordinates[1]}
          >
            <CityPin
              size={pinSize}
              onClick={() => {
                history.push(`/map?name=${point.properties.name}`);
              }}
            />
          </Marker>
        );
      })
    );
  };

  return (
    <React.Fragment>
      <MapGL
        ref={map}
        {...viewport}
        onViewportChange={viewport => setViewport(viewport)}
        mapStyle={mapStyle}
        mapboxApiAccessToken={process.env.REACT_APP_ACCESSTOKEN}
        className="map"
      >
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
        {_renderMarker()}
      </MapGL>
      <h2>{t('Greetings')}</h2>
    </React.Fragment>
  );
};
