const PageHome = {
  template: `
    <q-page>
      <div class="ref-form" :dir="lang === 'ar' ? 'rtl' : 'ltr'">
        <div class="ref-tabs">
          <div class="ref-schedule" :dir="lang === 'ar' ? 'rtl' : 'ltr'">
            <q-input v-model="form.sched_start" :label="L.schedStart" readonly outlined bg-color="white" class="ref-schedule-input" @click="showDebDialog = true" style="cursor: pointer">
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer text-grey-7" @click.stop="showDebDialog = true" />
              </template>
            </q-input>
            <q-dialog v-model="showDebDialog" transition-show="scale" transition-hide="scale">
              <q-card class="bg-white">
                <div class="row no-wrap items-start">
                  <q-date v-model="schedStartDate" mask="YYYY-MM-DD" flat class="col" />
                  <q-time v-model="schedStartTime" mask="HH:mm" format24h flat class="col" />
                </div>
                <q-card-actions align="right">
                  <q-btn :label="L.ok" color="primary" flat @click="showDebDialog = false" />
                </q-card-actions>
              </q-card>
            </q-dialog>
            <q-input v-model="form.sched_end" :label="L.schedEnd" readonly outlined bg-color="white" class="ref-schedule-input" style="cursor: pointer" @click="showFinDialog = true">
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer text-grey-7" @click.stop="showFinDialog = true" />
              </template>
            </q-input>
            <q-dialog v-model="showFinDialog" transition-show="scale" transition-hide="scale">
              <q-card class="bg-white">
                <div class="row no-wrap items-start">
                  <q-date v-model="schedEndDate" mask="YYYY-MM-DD" flat class="col" />
                  <q-time v-model="schedEndTime" mask="HH:mm" format24h flat class="col" />
                </div>
                <q-card-actions align="right">
                  <q-btn :label="L.ok" color="primary" flat @click="showFinDialog = false" />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </div>
          <div>
            <button class="ref-tab" :class="{ active: lang === 'ar' }" @click="lang = 'ar'">العربية</button>
            <button class="ref-tab" :class="{ active: lang === 'fr' }" @click="lang = 'fr'">Français</button>
          </div>
        </div>

        <q-card flat class="ref-card q-pa-md">
          <div class="ref-split">
            <div class="ref-fields" :dir="lang === 'ar' ? 'rtl' : 'ltr'">
              <q-form @submit.prevent="submit">
                <q-stepper v-model="step" ref="stepper" color="primary" animated header-nav done-color="positive" flat>
                  <q-step :name="1" :title="L.step1" icon="info" :done="step > 1">
                    <div class="ref-grid q-mb-md">
                      <q-input v-model="form.nom_zone" :label="L.nomZone" outlined bg-color="white" />
                      <q-select
                        v-model="form.zone"
                        :label="L.zone"
                        :options="['coastal', 'marine']"
                        outlined bg-color="white"
                      />
                    </div>

                    <div class="ref-grid q-mt-md">
                      <q-input v-model="form.wilaya_name_ascii" :label="L.wilaya" outlined bg-color="white" />
                      <q-input v-model="form.commune_name_ascii" :label="L.commune" outlined bg-color="white" />
                    </div>

                    <div class="ref-grid q-mt-md">
                      <q-input v-model="form.code_wilaya" :label="L.codeWilaya" outlined bg-color="white" />
                      <q-input v-model="form.code_commune" :label="L.codeCommune" outlined bg-color="white" />
                    </div>

                    <div class="ref-grid q-mt-md">
                      <q-input v-model="form.code_concession" :label="L.codeConcession" outlined bg-color="white" />
                      <q-select
                        v-model="form.statut"
                        :label="L.statut"
                        :options="['active', 'inactive', 'en_attente']"
                        outlined bg-color="white"
                      />
                    </div>

                    <div class="ref-grid q-mt-md">
                      <q-input v-model="form.superficie" :label="L.area" type="number" outlined bg-color="white" />
                      <q-input v-model="form.distance_voi_acces" :label="L.distance" type="number" outlined bg-color="white" />
                    </div>

                    <q-toggle v-model="form.visible" :label="L.visible" class="q-mt-md" />
                  </q-step>

                  <q-step :name="2" :title="L.step2" icon="place">
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
                        <q-input class="coord-point-A" v-model="form.pointA" :label="L.pointA" outlined bg-color="white" />
                      </div>
                      <div>
                        <div class="ref-label-sm">{{ L.latlng }}</div>
                        <q-input class="coord-point-B" v-model="form.pointB" :label="L.pointB" outlined bg-color="white" />
                      </div>
                      <div>
                        <div class="ref-label-sm">{{ L.latlng }}</div>
                        <q-input class="coord-point-C" v-model="form.pointC" :label="L.pointC" outlined bg-color="white" />
                      </div>
                      <div>
                        <div class="ref-label-sm">{{ L.latlng }}</div>
                        <q-input class="coord-point-D" v-model="form.pointD" :label="L.pointD" outlined bg-color="white" />
                      </div>
                    </div>

                    <q-input
                      v-model="form.description"
                      :label="L.description"
                      type="textarea"
                      rows="3"
                      outlined bg-color="white"
                      class="q-mt-md"
                    />

                    <div class="row q-col-gutter-sm q-mt-md">
                      <div class="col">
                        <q-btn type="submit" :label="L.save" color="primary" unelevated no-caps size="lg" class="full-width text-h6" />
                      </div>
                      <div class="col">
                        <q-btn :label="L.reset" color="warning" unelevated no-caps size="lg" class="full-width text-h6" @click="resetForm" />
                      </div>
                      <div class="col">
                        <q-btn :label="L.cancel" color="negative" unelevated no-caps size="lg" class="full-width text-h6" @click="cancelForm" />
                      </div>
                    </div>
                  </q-step>

                  <template v-slot:navigation>
                    <q-stepper-navigation class="row justify-between">
                      <q-btn v-if="step > 1" flat color="primary" :label="L.back" @click="$refs.stepper.previous()" />
                      <q-space />
                      <q-btn v-if="step < 2" color="primary" :label="L.continue" @click="$refs.stepper.next()" />
                    </q-stepper-navigation>
                  </template>
                </q-stepper>
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
    const step = Vue.ref(1);

    const labels = {
      fr: {
        format: 'Format des coordonnées',
        nomZone: 'Nom de la zone',
        zone: 'Zone',
        coords: 'Coordonnées géographiques',
        pointA: 'Point A (Nord-Ouest)',
        pointB: 'Point B (Nord-Est)',
        pointC: 'Point C (Sud-Est)',
        pointD: 'Point D (Sud-Ouest)',
        latlng: 'Latitude Longitude',
        wilaya: 'Wilaya',
        commune: 'Commune',
        codeWilaya: 'Code Wilaya',
        codeCommune: 'Code Commune',
        visible: 'Visible',
        codeConcession: 'Code Concession',
        area: 'Superficie (m²)',
        distance: "Distance voie d'accès",
        description: 'Description',
        statut: 'Statut',
        schedule: 'Planification',
        schedStart: 'Début',
        schedEnd: 'Fin',
        ok: 'OK',
        step1: 'Informations générales',
        step2: 'Coordonnées',
        back: 'Retour',
        continue: 'Continuer',
        save: 'Sauvegarder',
        reset: 'Réinitialiser',
        cancel: 'Annuler'
      },
      ar: {
        format: 'صيغة الإحداثيات',
        nomZone: 'اسم المنطقة',
        zone: 'المنطقة',
        coords: 'الإحداثيات الجغرافية',
        pointA: 'النقطة أ (شمال غرب)',
        pointB: 'النقطة ب (شمال شرق)',
        pointC: 'النقطة ج (جنوب شرق)',
        pointD: 'النقطة د (جنوب غرب)',
        latlng: 'خط العرض خط الطول',
        wilaya: 'الولاية',
        commune: 'البلدية',
        codeWilaya: 'رمز الولاية',
        codeCommune: 'رمز البلدية',
        visible: 'مرئي',
        codeConcession: 'رمز الامتياز',
        area: 'المساحة (م²)',
        distance: 'المسافة عن طريق الوصول',
        description: 'الوصف',
        statut: 'الحالة',
        schedule: 'الجدولة',
        schedStart: 'البداية',
        schedEnd: 'النهاية',
        ok: 'موافق',
        step1: 'معلومات عامة',
        step2: 'الإحداثيات',
        back: 'رجوع',
        continue: 'متابعة',
        save: 'حفظ',
        reset: 'إعادة تعيين',
        cancel: 'إلغاء'
      }
    };

    const L = Vue.computed(() => labels[lang.value]);

    const form = Vue.reactive({
      format: 'dms',
      nom_zone: '',
      zone: '',
      pointA: '',
      pointB: '',
      pointC: '',
      pointD: '',
      wilaya_name_ascii: '',
      commune_name_ascii: '',
      code_wilaya: '',
      code_commune: '',
      visible: true,
      code_concession: '',
      superficie: '',
      distance_voi_acces: '',
      description: '',
      statut: 'inactive',
      sched_start: '',
      sched_end: ''
    });

    // Quasar native calendar/time pickers feed these, then they merge into form.sched_*
    const schedStartDate = Vue.ref('');
    const schedStartTime = Vue.ref('');
    const schedEndDate = Vue.ref('');
    const schedEndTime = Vue.ref('');
    const showDebDialog = Vue.ref(false);
    const showFinDialog = Vue.ref(false);

    Vue.watch([schedStartDate, schedStartTime], () => {
      form.sched_start = [schedStartDate.value, schedStartTime.value].filter(Boolean).join(' ');
      updateMarkers(false);
    });
    Vue.watch([schedEndDate, schedEndTime], () => {
      form.sched_end = [schedEndDate.value, schedEndTime.value].filter(Boolean).join(' ');
      updateMarkers(false);
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

    const saveDraftAsync = () => {
      const snapshot = JSON.parse(JSON.stringify(form));
      return new Promise((resolve) => {
        setTimeout(() => {
          try {
            localStorage.setItem(
              'concessionDraft',
              JSON.stringify({ ...snapshot, savedAt: new Date().toISOString() })
            );
          } catch (e) {
            console.error('Failed to autosave draft:', e);
          }
          resolve();
        }, 0);
      });
    };

    let autosaveTimer = null;
    Vue.watch(
      form,
      () => {
        clearTimeout(autosaveTimer);
        autosaveTimer = setTimeout(() => {
          saveDraftAsync();
        }, 400);
      },
      { deep: true }
    );

    // Restore any in-progress draft so data survives a page refresh
    try {
      const savedDraft = JSON.parse(localStorage.getItem('concessionDraft') || 'null');
      if (savedDraft && typeof savedDraft === 'object') {
        Object.keys(form).forEach((key) => {
          if (savedDraft[key] !== undefined && savedDraft[key] !== null) {
            form[key] = savedDraft[key];
          }
        });
        // split the stored schedule back into the calendar/time pickers
        const splitSched = (value, dateRef, timeRef) => {
          if (value && typeof value === 'string') {
            const [d, t] = value.split(' ');
            dateRef.value = d || '';
            timeRef.value = t || '';
          }
        };
        splitSched(form.sched_start, schedStartDate, schedStartTime);
        splitSched(form.sched_end, schedEndDate, schedEndTime);
      }
    } catch (e) {
      console.error('Failed to restore draft:', e);
    }

    const submit = async () => {
      console.log('Form submitted:', { ...form });
      // Save to localStorage before sending to the server
      try {
        const drafts = JSON.parse(localStorage.getItem('concessionDrafts') || '[]');
        drafts.push({ ...form, savedAt: new Date().toISOString() });
        await new Promise((resolve) => setTimeout(() => {
          localStorage.setItem('concessionDrafts', JSON.stringify(drafts));
          resolve();
        }, 0));
        localStorage.removeItem('concessionDraft');
        console.log('Saved to localStorage:', drafts);
      } catch (e) {
        console.error('Failed to save to localStorage:', e);
      }
      Quasar.Notify.create({ message: lang.value === 'ar' ? 'تم الحفظ محلياً' : 'Enregistré localement', color: 'positive' });
      updateMarkers(true);
    };

    const resetForm = () => {
      Object.keys(form).forEach((k) => (form[k] = k === 'format' ? 'dms' : k === 'visible' ? true : k === 'statut' ? 'inactive' : ''));
      localStorage.removeItem('concessionDraft');
      step.value = 1;
      updateMarkers(false);
      Quasar.Notify.create({ message: lang.value === 'ar' ? 'تمت إعادة التعيين' : 'Réinitialisé', color: 'warning' });
    };

    const cancelForm = () => {
      resetForm();
      Quasar.Notify.create({ message: lang.value === 'ar' ? 'تم الإلغاء' : 'Annulé', color: 'negative' });
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
      // Hide the concession outside its scheduled window
      const now = new Date();
      const start = form.sched_start ? new Date(form.sched_start.replace(' ', 'T')) : null;
      const end = form.sched_end ? new Date(form.sched_end.replace(' ', 'T')) : null;
      const scheduledOut =
        (start && !isNaN(start) && now < start) || (end && !isNaN(end) && now > end);
      if (!form.visible || scheduledOut) {
        Object.keys(markers).forEach((key) => map.removeLayer(markers[key]));
        markers = {};
        if (polygon) {
          map.removeLayer(polygon);
          polygon = null;
        }
        return;
      }
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

    Vue.watch(() => form.visible, () => updateMarkers(false));

    // Re-evaluate the scheduled visibility every minute
    const scheduleTimer = setInterval(() => updateMarkers(false), 60000);

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
        updateMarkers(true);
      });
    });

    Vue.onBeforeUnmount(() => {
      clearInterval(scheduleTimer);
      if (map) {
        map.remove();
        map = null;
      }
    });

    return { form, submit, resetForm, cancelForm, lang, L, formatOptions, step, schedStartDate, schedStartTime, schedEndDate, schedEndTime, showDebDialog, showFinDialog };
  }
};

if (typeof window !== 'undefined') {
  window.PageHome = PageHome;
}
