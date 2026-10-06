const PageMap = {
  template: `
    <q-page class="map-page">
      <q-btn flat round dense icon="my_location" class="map-locate-btn" @click="fitAlgeria" title="Reset view" />
      <div id="aqua-map" class="aqua-map"></div>
    </q-page>
  `,
  setup() {
    let map = null;
    const algeriaBounds = [
      [18.968147, -8.6845],
      [37.2962, 11.9994]
    ];

    const fitAlgeria = () => {
      if (map && window.L) {
        map.fitBounds(window.L.latLngBounds(algeriaBounds));
      }
    };

    let resizeObserver = null;

    Vue.onMounted(() => {
      Vue.nextTick(() => {
        if (!window.L) {
          console.error('Leaflet library not loaded');
          return;
        }

        const container = document.getElementById('aqua-map');
        if (!container || map) return;

        // Re-render the map when the drawer opens/closes (container resizes)
        resizeObserver = new ResizeObserver(() => {
          if (map) map.invalidateSize();
        });
        resizeObserver.observe(container);

        const terrain = window.L.tileLayer('https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
          attribution: '&copy; Google Maps',
          maxZoom: 20,
          subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        });

        const satellite = window.L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
          attribution: '&copy; Google Maps',
          maxZoom: 20,
          subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        });

        map = window.L.map(container, {
          zoomControl: false,
          attributionControl: true,
          layers: [terrain],
          maxBounds: algeriaBounds,
          minZoom: 5,
          maxZoom: 18
        });

        window.L.control.zoom({ position: 'topright' }).addTo(map);
        window.L.control.layers({ Terrain: terrain, Satellite: satellite }, null, {
          position: 'topright',
          collapsed: false
        }).addTo(map);

        map.fitBounds(algeriaBounds);
        map.on('click', (event) => {
          const { lat, lng } = event.latlng;
          window.L.marker([lat, lng])
            .addTo(map)
            .bindPopup(`Lat: ${lat.toFixed(6)}<br>Lng: ${lng.toFixed(6)}`)
            .openPopup();
        });
      });
    });

    Vue.onBeforeUnmount(() => {
      if (resizeObserver) {
        resizeObserver.disconnect();
        resizeObserver = null;
      }
      if (map) {
        map.remove();
        map = null;
      }
    });

    return {
      fitAlgeria
    };
  }
};

if (typeof window !== 'undefined') {
  window.PageMap = PageMap;
}
