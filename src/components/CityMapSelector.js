import React, { useRef, useCallback } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

/**
 * City selector with an interactive Leaflet map showing content pins,
 * a dashed route line connecting the cities, and pill buttons.
 *
 * Props:
 *   data       – array of content items (must have `city`, `coordinates`, `name`)
 *   pinColor   – colour string for content pins (e.g. '#4285F4')
 *   selected   – currently selected city name
 *   onSelect   – callback(cityName)
 */

const CITIES = [
  { name: 'Athens',    lat: 37.9755, lng: 23.7348, dates: 'Jun 14–18' },
  { name: 'Nafplio',   lat: 37.5673, lng: 22.7972, dates: 'Jun 18–22' },
  { name: 'Crete',     lat: 35.3387, lng: 25.1335, dates: 'Jun 22–25' },
  { name: 'Santorini', lat: 36.4618, lng: 25.3753, dates: 'Jun 25–28' },
];

const buildMapHTML = (selected, data, pinColor) => {
  // --- Route line connecting the three cities ---
  const routeLine = `L.polyline([${CITIES.map(c => `[${c.lat},${c.lng}]`).join(',')}],{
    color:'rgba(77,166,255,0.45)',weight:2,dashArray:'6,8'
  }).addTo(map);`;

  // --- City label markers (clickable) ---
  const cityMarkers = CITIES.map((c) => {
    const isActive = c.name === selected;
    return `
      L.circleMarker([${c.lat},${c.lng}],{
        radius:${isActive ? 10 : 7},
        fillColor:'${isActive ? '#4da6ff' : 'rgba(255,255,255,0.5)'}',
        color:'#fff',weight:2,
        fillOpacity:${isActive ? 1 : 0.4}
      }).addTo(map)
        .bindTooltip('${c.name}',{permanent:true,direction:'top',offset:[0,-12],
          className:'city-label${isActive ? ' active' : ''}'})
        .on('click',function(){window.ReactNativeWebView.postMessage('${c.name}')});
    `;
  }).join('\n');

  // --- Content pins from the tab data ---
  const contentPins = (data || [])
    .filter((item) => item.coordinates && item.coordinates.lat && item.coordinates.lng)
    .map((item) => {
      const isActive = item.city === selected;
      const opacity = isActive ? 0.9 : 0.15;
      const radius = isActive ? 6 : 4;
      const safeName = (item.name || '').replace(/'/g, "\\'");
      return `L.circleMarker([${item.coordinates.lat},${item.coordinates.lng}],{
        radius:${radius},fillColor:'${pinColor}',color:'${isActive ? '#fff' : 'rgba(255,255,255,0.3)'}',
        weight:${isActive ? 1.5 : 0.5},fillOpacity:${opacity}
      }).addTo(map)${isActive ? `.bindPopup('<b>${safeName}</b>')` : ''};`;
    }).join('\n');

  // --- Compute bounds for the selected city's pins ---
  const selectedPins = (data || []).filter(
    (item) => item.city === selected && item.coordinates && item.coordinates.lat
  );
  const selectedCity = CITIES.find((c) => c.name === selected);
  let fitBoundsJS = '';
  if (selectedPins.length > 1) {
    const coords = selectedPins.map((p) => `[${p.coordinates.lat},${p.coordinates.lng}]`);
    fitBoundsJS = `map.fitBounds([${coords.join(',')}],{padding:[35,35],maxZoom:13});`;
  } else if (selectedCity) {
    fitBoundsJS = `map.setView([${selectedCity.lat},${selectedCity.lng}],12);`;
  }

  return `<!DOCTYPE html>
<html><head>
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"/>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"><\/script>
<style>
  html,body{margin:0;padding:0;height:100%;overflow:hidden;background:#1a1f2e}
  #map{width:100%;height:100%}
  .city-label{
    background:rgba(0,0,0,0.65);color:rgba(255,255,255,0.6);border:none;
    font-size:11px;font-weight:600;padding:2px 7px;border-radius:10px;box-shadow:none;
  }
  .city-label.active{
    background:rgba(77,166,255,0.9);color:#fff;font-size:12px;padding:3px 9px;
  }
  .leaflet-tile-pane{filter:saturate(0.3) brightness(0.4)}
  .leaflet-popup-content b{font-size:12px}
</style>
</head><body>
<div id="map"></div>
<script>
  var map=L.map('map',{zoomControl:false,attributionControl:false})
    .setView([37.2,24.0],7);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18}).addTo(map);
  ${routeLine}
  ${contentPins}
  ${cityMarkers}
  ${fitBoundsJS}
<\/script>
</body></html>`;
};

const CityMapSelector = ({ data = [], pinColor = '#4da6ff', selected = 'Athens', onSelect }) => {
  const webViewRef = useRef(null);

  const handleMessage = useCallback((event) => {
    const cityName = event.nativeEvent.data;
    if (CITIES.some((c) => c.name === cityName)) {
      onSelect(cityName);
    }
  }, [onSelect]);

  return (
    <View style={styles.wrapper}>
      {/* Map */}
      <View style={styles.mapContainer}>
        <WebView
          ref={webViewRef}
          key={selected}
          source={{ html: buildMapHTML(selected, data, pinColor) }}
          style={styles.map}
          scrollEnabled={false}
          onMessage={handleMessage}
          javaScriptEnabled
          originWhitelist={['*']}
        />
      </View>

      {/* City pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.pillRow}
      >
        {CITIES.map((c) => {
          const active = c.name === selected;
          const count = data.filter((i) => i.city === c.name).length;
          return (
            <TouchableOpacity
              key={c.name}
              style={[styles.pill, active && styles.pillActive]}
              onPress={() => onSelect(c.name)}
              activeOpacity={0.7}
            >
              <Text style={[styles.pillName, active && styles.pillNameActive]}>{c.name}</Text>
              <Text style={[styles.pillDates, active && styles.pillDatesActive]}>
                {c.dates} · {count}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 8,
  },
  mapContainer: {
    height: 200,
    marginHorizontal: 16,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  map: {
    flex: 1,
    backgroundColor: '#1a1f2e',
  },
  pillRow: {
    paddingHorizontal: 16,
    paddingTop: 10,
    gap: 8,
  },
  pill: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
  },
  pillActive: {
    backgroundColor: '#4da6ff',
    borderColor: '#4da6ff',
  },
  pillName: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    fontWeight: '700',
  },
  pillNameActive: {
    color: '#ffffff',
  },
  pillDates: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 11,
    fontWeight: '500',
    marginTop: 1,
  },
  pillDatesActive: {
    color: 'rgba(255,255,255,0.85)',
  },
});

export default CityMapSelector;
