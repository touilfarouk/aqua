const PageHome = {
  template: `
    <q-page>


      <div class="ref-form">
        <div class="ref-title">معلومات الزبون</div>
        <div class="ref-card">
          <div class="ref-grid">
            <input class="ref-input" placeholder="الاسم الكامل" v-model="form.name">
            <input class="ref-input" placeholder="الهاتف" v-model="form.phone">
            <div class="ref-select-wrap">
              <select class="ref-input" v-model="form.wilaya">
                <option value="" selected disabled>الولاية</option>
                <option>الجزائر</option>
                <option>وهران</option>
                <option>قسنطينة</option>
              </select>
            </div>
            <div class="ref-select-wrap">
              <select class="ref-input" v-model="form.baladiya">
                <option value="" selected disabled>البلدية</option>
                <option>بلدية 1</option>
                <option>بلدية 2</option>
              </select>
            </div>
          </div>

          <div class="ref-radios">
            <label @click="form.delivery = 'office'">
              توصيل للمكتب
              <span class="ref-dot" :class="{ active: form.delivery === 'office' }"></span>
            </label>
            <label @click="form.delivery = 'home'">
              توصيل للمنزل
              <span class="ref-dot" :class="{ active: form.delivery === 'home' }"></span>
            </label>
          </div>

          <div class="ref-promo-bar">😍 العروض و الخصوم</div>

          <div
            class="ref-offer"
            :class="{ selected: form.offer === 1 }"
            @click="form.offer = 1"
          >
            <span class="ref-badge">OFF 22%-</span>
            <div class="ref-check" :class="{ active: form.offer === 1 }"></div>
            <div class="ref-offer-name">إشتري لون<br>واحد</div>
            <div><span class="ref-free-ship">🚚 توصيل مجاني</span></div>
            <div class="ref-price">دج2200<s>دج3800</s></div>
          </div>

          <div
            class="ref-offer"
            :class="{ selected: form.offer === 2 }"
            @click="form.offer = 2"
          >
            <span class="ref-badge">OFF 30%-</span>
            <div class="ref-check" :class="{ active: form.offer === 2 }"></div>
            <div class="ref-offer-name">اشتري لونين<br>مختلفين</div>
            <div><span class="ref-free-ship">🚚 توصيل مجاني</span></div>
            <div class="ref-price">دج4000<s>دج7600</s></div>
          </div>
        </div>

        <button class="ref-submit" @click="submit">أطلب الان</button>

        <div class="ref-total">
          <span>دج2200</span>
          <span>مجموع</span>
        </div>
      </div>
    </q-page>
  `,
  setup() {
    const form = Vue.reactive({
      name: '',
      phone: '',
      wilaya: '',
      baladiya: '',
      delivery: 'office',
      offer: 1
    });

    const submit = () => {
      console.log('Sample form submitted:', { ...form });
      Quasar.Notify.create({ message: 'تم إرسال الطلب', color: 'positive' });
    };

    return { form, submit };
  }
};

if (typeof window !== 'undefined') {
  window.PageHome = PageHome;
}
