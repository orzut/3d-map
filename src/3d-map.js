// The URL on your server where CesiumJS's static files are hosted.
window.CESIUM_BASE_URL = '../dist/static/Cesium';

import { Cartesian3, createOsmBuildingsAsync, Ion, Math as CesiumMath, Terrain, Viewer } from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";

async function fetchCesiumAccessToken() {
    const response = await fetch('/cesiumAccessToken');
    const data = await response.json();
    return data.accessToken;
  }

fetchCesiumAccessToken().then(token => {
    Ion.defaultAccessToken = token
    // Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
    const viewer = new Viewer('cesiumContainer', {
        terrain: Terrain.fromWorldTerrain(),
    });    
    
    // Fly the camera to San Francisco at the given longitude, latitude, and height.
    viewer.camera.flyTo({
        destination: Cartesian3.fromDegrees(-122.4175, 37.655, 400),
        orientation: {
        heading: CesiumMath.toRadians(0.0),
        pitch: CesiumMath.toRadians(-15.0),
        }
    });
    
    // Add Cesium OSM Buildings, a global 3D buildings layer.
    createOsmBuildingsAsync().then(buildingTileset => {
        viewer.scene.primitives.add(buildingTileset);
    }).catch(error => {
        console.error('Error loading Cesium OSM Buildings:', error);
    });
}).catch(error => {
    console.error('Error fetching Cesium access token:', error);
});
