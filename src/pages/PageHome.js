const PageHome = {
  template: `
    <q-page>


      <div class="ref-form" style="direction: ltr; text-align: left;">
        <div class="ref-card">
          <label class="ref-label">Format des coordonnées</label>
          <div class="ref-select-wrap">
            <select class="ref-input" v-model="form.format">
              <option value="dms">Degrés, minutes, secondes (DMS)</option>
              <option value="decimal">Degrés décimaux (DD)</option>
              <option value="utm">Système de coordonnées universel (UTM)</option>
            </select>
          </div>

          <label class="ref-label" style="margin-top: 18px;">Coordonnées géographiques</label>
          <div class="ref-grid">
            <div>
              <label class="ref-label-sm">Point A (Nord-Ouest)</label>
              <input class="ref-input" placeholder="36.7538 3.0588" v-model="form.pointA">
              <div class="ref-help">Latitude Longitude</div>
            </div>
            <div>
              <label class="ref-label-sm">Point B (Nord-Est)</label>
              <input class="ref-input" placeholder="36.7548 3.0598" v-model="form.pointB">
              <div class="ref-help">Latitude Longitude</div>
            </div>
            <div>
              <label class="ref-label-sm">Point C (Sud-Est)</label>
              <input class="ref-input" placeholder="36.7528 3.0608" v-model="form.pointC">
              <div class="ref-help">Latitude Longitude</div>
            </div>
            <div>
              <label class="ref-label-sm">Point D (Sud-Ouest)</label>
              <input class="ref-input" placeholder="36.7518 3.0578" v-model="form.pointD">
              <div class="ref-help">Latitude Longitude</div>
            </div>
          </div>

          <div class="ref-grid" style="margin-top: 14px;">
            <div>
              <label class="ref-label">Wilaya</label>
              <div class="ref-select-wrap">
                <select class="ref-input" v-model="form.wilaya">
                  <option value="" selected disabled>Sélectionner une wilaya</option>
                  <option>Alger</option>
                  <option>Oran</option>
                  <option>Constantine</option>
                </select>
              </div>
            </div>
            <div>
              <label class="ref-label">Commune</label>
              <div class="ref-select-wrap">
                <select class="ref-input" v-model="form.commune">
                  <option value="" selected disabled>Sélectionner une commune</option>
                  <option>Commune 1</option>
                  <option>Commune 2</option>
                </select>
              </div>
            </div>
          </div>

          <div class="ref-grid" style="margin-top: 14px;">
            <div>
              <label class="ref-label">Superficie (m²)</label>
              <input type="number" class="ref-input" placeholder="2500.00" v-model="form.superficie">
            </div>
            <div>
              <label class="ref-label">Distance voie d'accès</label>
              <input type="number" class="ref-input" placeholder="100" v-model="form.distance">
            </div>
          </div>

          <label class="ref-label" style="margin-top: 14px;">Description</label>
          <textarea class="ref-input" rows="3" placeholder="Description de la zone..." v-model="form.description"></textarea>
        </div>

        <button class="ref-submit" @click="submit">Sauvegarder</button>
      </div>
    </q-page>
  `,
  setup() {
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
      Quasar.Notify.create({ message: 'Sauvegardé', color: 'positive' });
    };

    return { form, submit };
  }
};

if (typeof window !== 'undefined') {
  window.PageHome = PageHome;
}
