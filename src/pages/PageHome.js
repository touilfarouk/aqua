const PageHome = {
  template: `
    <q-page>
      <div class="ref-form" :dir="lang === 'ar' ? 'rtl' : 'ltr'">
        <div class="ref-tabs">
          <button class="ref-tab" :class="{ active: lang === 'ar' }" @click="lang = 'ar'">العربية</button>
          <button class="ref-tab" :class="{ active: lang === 'fr' }" @click="lang = 'fr'">Français</button>
        </div>

        <q-card flat class="ref-card q-pa-md">
          <div class="ref-split">
            <div class="ref-fields" :dir="lang === 'ar' ? 'rtl' : 'ltr'">
              <q-form @submit.prevent="submit">
                <q-select
                  v-model="form.format"
                  :label="L.format"
                  :options="formatOptions"
                  emit-value
                  map-options
                  outlined bg-color="white"
                  class="q-mb-md"
                />

                <div class="ref-section-title">{{ L.coords }}</div>
                <div class="ref-grid">
                  <div>
                    <div class="ref-label-sm">{{ L.latlng }}</div>
                    <q-input v-model="form.pointA" :label="L.pointA" outlined bg-color="white" />
                  </div>
                  <div>
                    <div class="ref-label-sm">{{ L.latlng }}</div>
                    <q-input v-model="form.pointB" :label="L.pointB" outlined bg-color="white" />
                  </div>
                  <div>
                    <div class="ref-label-sm">{{ L.latlng }}</div>
                    <q-input v-model="form.pointC" :label="L.pointC" outlined bg-color="white" />
                  </div>
                  <div>
                    <div class="ref-label-sm">{{ L.latlng }}</div>
                    <q-input v-model="form.pointD" :label="L.pointD" outlined bg-color="white" />
                  </div>
                </div>

                <div class="ref-grid q-mt-md">
                  <q-select
                    v-model="form.wilaya"
                    :label="L.wilaya"
                    :options="['Alger', 'Oran', 'Constantine']"
                    outlined bg-color="white"
                  />
                  <q-select
                    v-model="form.commune"
                    :label="L.commune"
                    :options="['Commune 1', 'Commune 2']"
                    outlined bg-color="white"
                  />
                </div>

                <div class="ref-grid q-mt-md">
                  <q-input v-model="form.superficie" :label="L.area" type="number" outlined bg-color="white" />
                  <q-input v-model="form.distance" :label="L.distance" type="number" outlined bg-color="white" />
                </div>

                <q-input
                  v-model="form.description"
                  :label="L.description"
                  type="textarea"
                  rows="3"
                  outlined bg-color="white"
                  class="q-mt-md"
                />

                <q-btn
                  type="submit"
                  :label="L.save"
                  color="primary"
                  unelevated
                  no-caps
                  size="lg"
                  class="full-width q-mt-md text-h6"
                />
              </q-form>
            </div>

            <div class="ref-map-wrap">
              <div id="home-map" style="width:100%; height:100%; min-height:480px;"></div>
            </div>
          </div>
        </q-card>
      </div>
    </q-page>
  `,
  setup() {
    const lang = Vue.ref('ar');

    const labels = {
      fr: {
        format: 'Format des coordonnées',
        coords: 'Coordonnées géographiques',
        pointA: 'Point A (Nord-Ouest)',
        pointB: 'Point B (Nord-Est)',
        pointC: 'Point C (Sud-Est)',
        pointD: 'Point D (Sud-Ouest)',
        latlng: 'Latitude Longitude',
        wilaya: 'Wilaya',
        commune: 'Commune',
        area: 'Superficie (m²)',
        distance: "Distance voie d'accès",
        description: 'Description',
        save: 'Sauvegarder'
      },
      ar: {
        format: 'صيغة الإحداثيات',
        coords: 'الإحداثيات الجغرافية',
        pointA: 'النقطة أ (شمال غرب)',
        pointB: 'النقطة ب (شمال شرق)',
        pointC: 'النقطة ج (جنوب شرق)',
        pointD: 'النقطة د (جنوب غرب)',
        latlng: 'خط العرض خط الطول',
        wilaya: 'الولاية',
        commune: 'البلدية',
        area: 'المساحة (م²)',
        distance: 'المسافة عن طريق الوصول',
        description: 'الوصف',
        save: 'حفظ'
      }
    };

    const L = Vue.computed(() => labels[lang.value]);

    const form = Vue.reactive({
      format: 'dms',
      pointA: '',
      pointB: '',
      pointC: '',
      pointD: '',
      wilaya: '',
      commune: '',
      superficie: '',
      distance: '',
      description: ''
    });

    const formatOptions = Vue.computed(() =>
      lang.value === 'ar'
        ? [
            { label: 'درجات، دقائق، ثوانٍ (DMS)', value: 'dms' },
            { label: 'درجات عشرية (DD)', value: 'decimal' },
            { label: 'نظام الإحداثيات العالمي (UTM)', value: 'utm' }
          ]
        : [
            { label: 'Degrés, minutes, secondes (DMS)', value: 'dms' },
            { label: 'Degrés décimaux (DD)', value: 'decimal' },
            { label: 'Système de coordonnées universel (UTM)', value: 'utm' }
          ]
    );

    const submit = () => {
      console.log('Form submitted:', { ...form });
      Quasar.Notify.create({ message: lang.value === 'ar' ? 'تم الحفظ' : 'Sauvegardé', color: 'positive' });
      updateMarkers(true);
    };

    let map = null;
    let markers = {};
    let polygon = null;
    const pointKeys = ['pointA', 'pointB', 'pointC', 'pointD'];

    const parsePoint = (value) => {
      if (!value) return null;
      const parts = String(value).trim().split(/[\s,;]+/).map(Number);
      if (parts.length >= 2 && !parts.slice(0, 2).some(isNaN)) {
        return [parts[0], parts[1]];
      }
      return null;
    };

    const updateMarkers = (fit = false) => {
      if (!map || !window.L) return;
      const bounds = [];
      pointKeys.forEach((key) => {
        const latlng = parsePoint(form[key]);
        if (latlng) {
          if (!markers[key]) {
            markers[key] = window.L.marker(latlng).addTo(map).bindPopup(key);
          } else {
            markers[key].setLatLng(latlng);
          }
          bounds.push(latlng);
        } else if (markers[key]) {
          map.removeLayer(markers[key]);
          delete markers[key];
        }
      });
      if (polygon) {
        map.removeLayer(polygon);
        polygon = null;
      }
      if (bounds.length === 4) {
        polygon = window.L.polygon(bounds, { color: '#00695c' }).addTo(map);
      }
      if (fit && bounds.length) {
        map.fitBounds(window.L.latLngBounds(bounds).pad(0.3));
      }
    };

    Vue.watch(
      () => [form.pointA, form.pointB, form.pointC, form.pointD],
      () => updateMarkers(false)
    );

    Vue.onMounted(() => {
      Vue.nextTick(() => {
        const container = document.getElementById('home-map');
        if (!container || !window.L || map) return;
        const terrain = window.L.tileLayer('https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
          maxZoom: 20,
          subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        });
        const satellite = window.L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
          maxZoom: 20,
          subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        });
        map = window.L.map(container, { zoomControl: false, layers: [terrain] });
        window.L.control.zoom({ position: 'topright' }).addTo(map);
        window.L.control.layers({ Terrain: terrain, Satellite: satellite }, null, {
          position: 'topright',
          collapsed: false
        }).addTo(map);
        map.fitBounds([[18.968147, -8.6845], [37.2962, 11.9994]]);
      });
    });

    Vue.onBeforeUnmount(() => {
      if (map) {
        map.remove();
        map = null;
      }
    });

    return { form, submit, lang, L, formatOptions };
  }
};

if (typeof window !== 'undefined') {
  window.PageHome = PageHome;
}
