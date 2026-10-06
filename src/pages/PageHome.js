const PageHome = {
  template: `
    <q-page>
      <div class="ref-form" :dir="lang === 'ar' ? 'rtl' : 'ltr'">
        <div class="ref-tabs">
          <button class="ref-tab" :class="{ active: lang === 'ar' }" @click="lang = 'ar'">العربية</button>
          <button class="ref-tab" :class="{ active: lang === 'fr' }" @click="lang = 'fr'">Français</button>
        </div>

        <div class="ref-card" style="display:flex; gap:16px; direction:ltr;">
          <div class="ref-fields" :dir="lang === 'ar' ? 'rtl' : 'ltr'" style="flex:1 1 50%; min-width:0;">
          <label class="ref-label">{{ L.format }}</label>
          <div class="ref-select-wrap">
            <select class="ref-input" v-model="form.format">
              <option value="dms">{{ L.formatDms }}</option>
              <option value="decimal">{{ L.formatDd }}</option>
              <option value="utm">{{ L.formatUtm }}</option>
            </select>
          </div>

          <label class="ref-label" style="margin-top: 18px;">{{ L.coords }}</label>
          <div class="ref-grid">
            <div>
              <label class="ref-label-sm">{{ L.pointA }}</label>
              <input class="ref-input" placeholder="36.7538 3.0588" v-model="form.pointA">
              <div class="ref-help">{{ L.latlng }}</div>
            </div>
            <div>
              <label class="ref-label-sm">{{ L.pointB }}</label>
              <input class="ref-input" placeholder="36.7548 3.0598" v-model="form.pointB">
              <div class="ref-help">{{ L.latlng }}</div>
            </div>
            <div>
              <label class="ref-label-sm">{{ L.pointC }}</label>
              <input class="ref-input" placeholder="36.7528 3.0608" v-model="form.pointC">
              <div class="ref-help">{{ L.latlng }}</div>
            </div>
            <div>
              <label class="ref-label-sm">{{ L.pointD }}</label>
              <input class="ref-input" placeholder="36.7518 3.0578" v-model="form.pointD">
              <div class="ref-help">{{ L.latlng }}</div>
            </div>
          </div>

          <div class="ref-grid" style="margin-top: 14px;">
            <div>
              <label class="ref-label">{{ L.wilaya }}</label>
              <div class="ref-select-wrap">
                <select class="ref-input" v-model="form.wilaya">
                  <option value="" selected disabled>{{ L.wilayaPh }}</option>
                  <option>Alger</option>
                  <option>Oran</option>
                  <option>Constantine</option>
                </select>
              </div>
            </div>
            <div>
              <label class="ref-label">{{ L.commune }}</label>
              <div class="ref-select-wrap">
                <select class="ref-input" v-model="form.commune">
                  <option value="" selected disabled>{{ L.communePh }}</option>
                  <option>Commune 1</option>
                  <option>Commune 2</option>
                </select>
              </div>
            </div>
          </div>

          <div class="ref-grid" style="margin-top: 14px;">
            <div>
              <label class="ref-label">{{ L.area }}</label>
              <input type="number" class="ref-input" placeholder="2500.00" v-model="form.superficie">
            </div>
            <div>
              <label class="ref-label">{{ L.distance }}</label>
              <input type="number" class="ref-input" placeholder="100" v-model="form.distance">
            </div>
          </div>

          <label class="ref-label" style="margin-top: 14px;">{{ L.description }}</label>
          <textarea class="ref-input" rows="3" :placeholder="L.descriptionPh" v-model="form.description"></textarea>
          </div>
          <div class="ref-map-wrap" style="flex:1 1 50%; min-height:480px; border-radius:10px; overflow:hidden;">
            <div id="home-map" style="width:100%; height:100%; min-height:480px;"></div>
          </div>
        </div>

        <button class="ref-submit" @click="submit">{{ L.save }}</button>
      </div>
    </q-page>
  `,
  setup() {
    const lang = Vue.ref('ar');

    const labels = {
      fr: {
        format: 'Format des coordonnées',
        formatDms: 'Degrés, minutes, secondes (DMS)',
        formatDd: 'Degrés décimaux (DD)',
        formatUtm: 'Système de coordonnées universel (UTM)',
        coords: 'Coordonnées géographiques',
        pointA: 'Point A (Nord-Ouest)',
        pointB: 'Point B (Nord-Est)',
        pointC: 'Point C (Sud-Est)',
        pointD: 'Point D (Sud-Ouest)',
        latlng: 'Latitude Longitude',
        wilaya: 'Wilaya',
        wilayaPh: 'Sélectionner une wilaya',
        commune: 'Commune',
        communePh: 'Sélectionner une commune',
        area: 'Superficie (m²)',
        distance: "Distance voie d'accès",
        description: 'Description',
        descriptionPh: 'Description de la zone...',
        save: 'Sauvegarder'
      },
      ar: {
        format: 'صيغة الإحداثيات',
        formatDms: 'درجات، دقائق، ثوانٍ (DMS)',
        formatDd: 'درجات عشرية (DD)',
        formatUtm: 'نظام الإحداثيات العالمي (UTM)',
        coords: 'الإحداثيات الجغرافية',
        pointA: 'النقطة أ (شمال غرب)',
        pointB: 'النقطة ب (شمال شرق)',
        pointC: 'النقطة ج (جنوب شرق)',
        pointD: 'النقطة د (جنوب غرب)',
        latlng: 'خط العرض خط الطول',
        wilaya: 'الولاية',
        wilayaPh: 'اختر الولاية',
        commune: 'البلدية',
        communePh: 'اختر البلدية',
        area: 'المساحة (م²)',
        distance: 'المسافة عن طريق الوصول',
        description: 'الوصف',
        descriptionPh: 'وصف المنطقة...',
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

    const submit = () => {
      console.log('Form submitted:', { ...form });
      Quasar.Notify.create({ message: lang.value === 'ar' ? 'تم الحفظ' : 'Sauvegardé', color: 'positive' });
      updateMarkers(true);
    };

    let map = null;
    let markers = {};
    let polygon = null;
    const pointKeys = ['pointA', 'pointB', 'pointC', 'pointD'];
    const pointLabels = { pointA: 'A', pointB: 'B', pointC: 'C', pointD: 'D' };

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

    return { form, submit, lang, L };
  }
};

if (typeof window !== 'undefined') {
  window.PageHome = PageHome;
}
