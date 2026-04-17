import React, { useRef, useCallback } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { WebView } from 'react-native-webview';

/**
 * City selector with an interactive Leaflet map + pill buttons.
 *
 * Props:
 *   cities      – [{ name, lat, lng, dates }]  (derived from trip.hotels or hardcoded)
 *   selected    – currently selected city name
 *   onSelect    – callback(cityName)
 */

const CITIES = [
  { name: 'Athens',    lat: 37.9755, lng: 23.7348, dates: 'Jun 14–18' },
  { name: 'Nafplio',   lat: 37.5673, lng: 22.7972, dates: 'Jun 18–23' },
  { name: 'Santorini', lat: 36.4618, lng: 25.3753, dates: 'Jun 23–28' },
];

const buildMapHTML = (selected) => {
  const markers = CITIES.map((c) => {
    const isActive = c.name === selected;
    const color = isActive ? '#4da6ff' : 'rgba(255,255,255,0.6)';
    const radius = isActive ? 10 : 7;
    const fillOpacity = isActive ? 1 : 0.5;
    return `
      L.circleMarker([${c.lat},${c.lng}],{
        radius:${radius},fillColor:'${color}',color:'#fff',weight:2,fillOpacity:${fillOpacity}
      }).addTo(map)
        .bindTooltip('${c.name}',{permanent:true,direction:'top',offset:[0,-10],
          className:'city-label${isActive ? ' active' : ''}'})
        .on('click',function(){window.ReactNativeWebView.postMessage('${c.name}')});
    `;
  }).join('\n');

  // Draw route line connecting the cities
  const routeLine = `L.polyline([${CITIES.map(c => `[${c.lat},${c.lng}]`).join(',')}],{
    color:'rgba(77,166,255,0.5)',weight:2,dashArray:'6,8'
  }).addTo(map);`;

  return `<!DOCTYPE html>
<html><head>
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"/>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"><\/script>
<style>
  html,body{margin:0;padding:0;height:100%;overflow:hidden;background:#1a1f2e}
  #map{width:100%;height:100%}
  .city-label{
    background:rgba(0,0,0,0.7);color:rgba(255,255,255,0.7);border:none;
    font-size:12px;font-weight:600;padding:2px 8px;border-radius:10px;
    box-shadow:none;
  }
  .city-label.active{
    background:rgba(77,166,255,0.9);color:#fff;font-size:13px;
  }
  .leaflet-tile-pane{filter:saturate(0.3) brightness(0.4)}
</style>
</head><body>
<div id="map"></div>
<script>
  var map=L.map('map',{zoomControl:false,attributionControl:false,dragging:false,
    scrollWheelZoom:false,doubleClickZoom:false,touchZoom:false,boxZoom:false})
    .setView([37.2,24.0],7);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18}).addTo(map);
  ${routeLine}
  ${markers}
<\/script>
</body></html>`;
};

const CityMapSelector = ({ selected = 'Athens', onSelect }) => {
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
          source={{ html: buildMapHTML(selected) }}
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
          return (
            <TouchableOpacity
              key={c.name}
              style={[styles.pill, active && styles.pillActive]}
              onPress={() => onSelect(c.name)}
              activeOpacity={0.7}
            >
              <Text style={[styles.pillName, active && styles.pillNameActive]}>{c.name}</Text>
              <Text style={[styles.pillDates, active && styles.pillDatesActive]}>{c.dates}</Text>
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
    height: 180,
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
