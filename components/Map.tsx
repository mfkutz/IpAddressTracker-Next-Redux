'use client'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L, { LeafletEvent } from 'leaflet'
import { useSelector } from 'react-redux';
import { AppState } from '@/lib/store'
import { useEffect, useRef } from 'react';


L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});


const MapComponent = () => {

    const location = useSelector((state: AppState) => state.location);
    const mapRef = useRef<L.Map | null>(null);

    useEffect(() => {
        if (mapRef.current && location.latitude !== null && location.longitude !== null) {
            mapRef.current.setView([location.latitude, location.longitude], mapRef.current.getZoom());
        }
    }, [location.latitude, location.longitude]);

    if (location.latitude === null || location.longitude === null) {
        return <div className="h-screen justify-center  flex pt-9">
            Waiting for location data...insert IP address
        </div>;
    }

    const handleMapReady = (event: L.LeafletEvent) => {
        mapRef.current = event.target as L.Map;
    };

    return (
        <MapContainer
            center={[location.latitude, location.longitude]}
            zoom={13}
            style={{ height: '100vh', width: '100%' }}
            whenReady={handleMapReady}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[location.latitude, location.longitude]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    );
}

export default MapComponent;