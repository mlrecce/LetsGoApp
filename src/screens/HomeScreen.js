import React, { useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import { trip, see, activities, shop, sleep, eat } from '../content/active';
import { useTripPlan } from '../context/TripPlanContext';
import TripTile from '../components/TripTile';

// One atmospheric Madeira photo per day of the trip
const dayImages = [
  'https://images.unsplash.com/photo-1672446063068-680ca91d7082?w=900&q=70',
  'https://images.unsplash.com/photo-1721241843813-c54b77496005?w=900&q=70',
  'https://images.unsplash.com/photo-1609870445811-7446dbae8b94?w=900&q=70',
  'https://images.unsplash.com/photo-1721241843748-24202060eb45?w=900&q=70',
  'https://images.unsplash.com/photo-1725992245371-a822cff4e2d0?w=900&q=70',
  'https://images.unsplash.com/photo-1689349666953-e8d81553fda2?w=900&q=70',
  'https://images.unsplash.com/photo-1674333362725-84e9996aa6fb?w=900&q=70',
];

/**
 * Landing page — trip summary tiles + map + composed day-by-day itinerary
 * built from the user's selections.
 */

// Build a lookup map of all content items by ID for quick resolution
const buildItemMap = () => {
  const map = {};
  [see, activities, shop, sleep, eat].flat().forEach((item) => {
    map[item.id] = item;
  });
  return map;
};

// Color map per tab
const pinColors = { see: '#4285F4', activities: '#EA4335', eat: '#FBBC04', shop: '#34A853', sleep: '#9334E6' };

// Build Leaflet HTML for the interactive map
const buildMapHTML = () => {
  const pins = [];
  const sources = [
    { items: see, tab: 'see' },
    { items: activities, tab: 'activities' },
    { items: eat, tab: 'eat' },
    { items: shop, tab: 'shop' },
    { items: sleep, tab: 'sleep' },
  ];
  sources.forEach(({ items, tab }) => {
    items.forEach((item) => {
      if (item.coordinates && item.coordinates.lat && item.coordinates.lng) {
        pins.push({ lat: item.coordinates.lat, lng: item.coordinates.lng, name: item.name, tab, color: pinColors[tab] });
      }
    });
  });

  const markersJS = pins.map((p) =>
    `L.circleMarker([${p.lat},${p.lng}],{radius:7,fillColor:'${p.color}',color:'#fff',weight:2,fillOpacity:0.9}).addTo(map).bindPopup('<b>${p.name.replace(/'/g, "\\'")}</b><br/><span style="color:${p.color}">${p.tab}</span>');`
  ).join('\n');

  return `<!DOCTYPE html>
<html><head>
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"/>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<style>
  html,body{margin:0;padding:0;height:100%;overflow:hidden}
  #map{width:100%;height:100%}
  .leaflet-popup-content b{font-size:13px}
  .leaflet-popup-content span{font-size:11px;font-weight:600;text-transform:capitalize}
</style>
</head><body>
<div id="map"></div>
<script>
  var map=L.map('map',{zoomControl:true,attributionControl:false}).setView([32.735,-16.96],11);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18}).addTo(map);
  ${markersJS}
</script>
</body></html>`;
};

const HomeScreen = ({ navigation }) => {
  const plan = useTripPlan();
  const { destination, dates, flights, hotels } = trip;
  const outbound = flights.find((f) => f.direction === 'outbound');
  const mainHotel = hotels[0];
  const itemMap = useMemo(() => buildItemMap(), []);

  const navigateToSection = (screen) => {
    navigation.navigate(screen);
  };

  const totalSelected = plan.getAllSelectedIds().size;
  const mapHTML = useMemo(() => buildMapHTML(), []);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const tabIcon = (tab) => {
    const icons = { see: '👁️', activities: '🎯', shop: '🛍️', sleep: '🛏️', eat: '🍽️', move: '🚗' };
    return icons[tab] || '📌';
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Hero */}
      {destination.heroImage ? (
        <ImageBackground
          source={{ uri: destination.heroImage }}
          style={styles.hero}
        >
          <View style={styles.heroOverlay}>
            <Text style={styles.flag}>{destination.flag}</Text>
            <Text style={styles.destination}>{destination.name}</Text>
            <Text style={styles.country}>{destination.country}</Text>
            <Text style={styles.tagline}>{destination.tagline}</Text>
          </View>
        </ImageBackground>
      ) : (
        <View style={styles.hero}>
          <Text style={styles.flag}>{destination.flag}</Text>
          <Text style={styles.destination}>{destination.name}</Text>
          <Text style={styles.country}>{destination.country}</Text>
          <Text style={styles.tagline}>{destination.tagline}</Text>
        </View>
      )}

      {/* Quick tiles */}
      <View style={styles.grid}>
        <TripTile icon="✈️" title="Flight" subtitle={`${outbound.flightNumber}\n${outbound.departure.city} → ${outbound.arrival.city}`} color="#1a73e8" />
        <TripTile icon="📅" title="Dates" subtitle={`${formatDate(dates.start)} – ${formatDate(dates.end)}\n${dates.nights} nights`} color="#0d652d" />
        <TripTile icon="🏨" title="Hotel" subtitle={mainHotel.name} color="#e8710a" />
        <TripTile icon="📋" title="Planned" subtitle={`${totalSelected} items selected`} color="#9334e6" />
      </View>

      {/* More section with Shop, Move, Settings */}
      <Text style={styles.sectionTitle}>More</Text>
      <View style={styles.moreGrid}>
        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => navigateToSection('Shop')}
        >
          <Text style={styles.moreButtonIcon}>🛍️</Text>
          <Text style={styles.moreButtonLabel}>Shop</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => navigateToSection('Move')}
        >
          <Text style={styles.moreButtonIcon}>🚗</Text>
          <Text style={styles.moreButtonLabel}>Move</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => navigateToSection('Settings')}
        >
          <Text style={styles.moreButtonIcon}>⚙️</Text>
          <Text style={styles.moreButtonLabel}>Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Zoomable Map */}
      <Text style={styles.sectionTitle}>Explore Madeira</Text>
      <View style={styles.mapContainer}>
        <WebView
          style={styles.map}
          originWhitelist={['*']}
          source={{ html: mapHTML }}
          scrollEnabled={false}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          nestedScrollEnabled={true}
        />
        {/* Map legend */}
        <View style={styles.mapLegend}>
          {Object.entries(pinColors).map(([tab, color]) => (
            <View key={tab} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: color }]} />
              <Text style={styles.legendLabel}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Composed itinerary */}
      <Text style={styles.sectionTitle}>Your Trip Plan</Text>
      {totalSelected === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>🗓️</Text>
          <Text style={styles.emptyText}>Browse the tabs below and tap items to add them to your day-by-day plan.</Text>
        </View>
      )}

      {plan.tripDates.map((date, dayIndex) => {
        const daySelections = plan.getItemsForDay(date);
        const itineraryDay = trip.itinerary[dayIndex];
        if (daySelections.length === 0 && totalSelected > 0) return null;

        const bgImage = dayImages[dayIndex % dayImages.length];

        return (
          <View key={date} style={styles.dayBlock}>
            <ImageBackground
              source={{ uri: bgImage }}
              style={styles.dayBgImage}
              imageStyle={styles.dayBgImageInner}
            >
              <View style={styles.dayOverlay}>
                <View style={styles.dayHeader}>
                  <View style={styles.dayBadge}>
                    <Text style={styles.dayNumber}>{dayIndex + 1}</Text>
                  </View>
                  <View style={styles.dayHeaderText}>
                    <Text style={styles.dayTitle}>
                      {itineraryDay?.title || `Day ${dayIndex + 1}`}
                    </Text>
                    <Text style={styles.dayDate}>{formatDate(date)}</Text>
                  </View>
                </View>

                {daySelections.length === 0 ? (
                  <Text style={styles.noItems}>No items planned yet</Text>
                ) : (
                  daySelections.map(({ itemId }) => {
                    const item = itemMap[itemId];
                    if (!item) return null;
                    return (
                      <TouchableOpacity
                        key={itemId}
                        style={styles.planItem}
                        onPress={() => navigation.navigate(
                          item.tab === 'see' ? 'SeeTab' :
                          item.tab === 'activities' ? 'ActivitiesTab' :
                          item.tab === 'shop' ? 'ShopTab' :
                          item.tab === 'sleep' ? 'SleepTab' :
                          item.tab === 'eat' ? 'EatTab' : 'SeeTab',
                          { screen: 'Detail', params: { item } }
                        )}
                      >
                        <Text style={styles.planItemIcon}>{tabIcon(item.tab)}</Text>
                        <View style={styles.planItemInfo}>
                          <Text style={styles.planItemName}>{item.name}</Text>
                          <Text style={styles.planItemMeta}>
                            {[item.costEstimate, item.duration || item.hours].filter(Boolean).join(' · ')}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })
                )}
              </View>
            </ImageBackground>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1f2e' },
  content: { paddingBottom: 32 },

  hero: { backgroundColor: '#1a73e8', paddingTop: 60, paddingBottom: 32, paddingHorizontal: 24, alignItems: 'center' },
  heroOverlay: { paddingTop: 60, paddingBottom: 32, paddingHorizontal: 24, alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.40)' },
  flag: { fontSize: 48 },
  destination: { fontSize: 32, fontWeight: '800', color: '#fff', marginTop: 8 },
  country: { fontSize: 16, color: 'rgba(255,255,255,0.85)', marginTop: 2 },
  tagline: { fontSize: 14, color: 'rgba(255,255,255,0.65)', marginTop: 4, fontStyle: 'italic' },

  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 16, marginTop: -20 },

  moreGrid: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, marginTop: 12, marginBottom: 24, gap: 12 },
  moreButton: { flex: 1, backgroundColor: 'rgba(255,255,255,0.10)', borderRadius: 12, paddingVertical: 16, paddingHorizontal: 12, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)' },
  moreButtonIcon: { fontSize: 28, marginBottom: 6 },
  moreButtonLabel: { fontSize: 13, fontWeight: '600', color: '#e0e0e0' },

  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#ffffff', marginHorizontal: 16, marginTop: 24, marginBottom: 12 },

  mapContainer: { marginHorizontal: 16, marginBottom: 8, borderRadius: 14, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)' },
  map: { width: '100%', height: 300 },
  mapLegend: { flexDirection: 'row', flexWrap: 'wrap', paddingVertical: 10, paddingHorizontal: 12, backgroundColor: 'rgba(0,0,0,0.7)', gap: 4 },
  legendItem: { flexDirection: 'row', alignItems: 'center', marginRight: 14 },
  legendDot: { width: 10, height: 10, borderRadius: 5, marginRight: 5 },
  legendLabel: { fontSize: 11, color: 'rgba(255,255,255,0.75)', fontWeight: '500' },

  emptyState: { alignItems: 'center', padding: 32, marginHorizontal: 16, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 12 },
  emptyIcon: { fontSize: 40, marginBottom: 12 },
  emptyText: { fontSize: 15, color: 'rgba(255,255,255,0.6)', textAlign: 'center', lineHeight: 22 },

  dayBlock: { marginHorizontal: 16, marginBottom: 16, borderRadius: 14, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 },
  dayBgImage: { width: '100%' },
  dayBgImageInner: { borderRadius: 14 },
  dayOverlay: { padding: 16, backgroundColor: 'rgba(0, 0, 0, 0.55)' },
  dayHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  dayBadge: { width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(255,255,255,0.25)', justifyContent: 'center', alignItems: 'center', marginRight: 12, borderWidth: 2, borderColor: 'rgba(255,255,255,0.5)' },
  dayNumber: { color: '#fff', fontWeight: '800', fontSize: 17 },
  dayHeaderText: { flex: 1 },
  dayTitle: { fontSize: 17, fontWeight: '700', color: '#ffffff' },
  dayDate: { fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 2 },

  noItems: { fontSize: 13, color: 'rgba(255,255,255,0.45)', fontStyle: 'italic', marginLeft: 50 },

  planItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 4, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.15)' },
  planItemIcon: { fontSize: 20, marginRight: 12 },
  planItemInfo: { flex: 1 },
  planItemName: { fontSize: 15, fontWeight: '600', color: '#ffffff' },
  planItemMeta: { fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 2 },
});

export default HomeScreen;
