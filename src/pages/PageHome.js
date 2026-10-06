const PageHome = {
  template: `
    <q-page>
      <div class="ref-form" :dir="lang === 'ar' ? 'rtl' : 'ltr'">
        <div class="ref-tabs">
          <button class="ref-tab" :class="{ active: lang === 'ar' }" @click="lang = 'ar'">العربية</button>
          <button class="ref-tab" :class="{ active: lang === 'fr' }" @click="lang = 'fr'">Français</button>
        </div>

        <div class="ref-card">
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
    };

    return { form, submit, lang, L };
  }
};

if (typeof window !== 'undefined') {
  window.PageHome = PageHome;
}
