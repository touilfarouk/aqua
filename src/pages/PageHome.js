const PageHome = {
  template: `
    <q-page class="q-pa-lg">
      <div class="starter-page">
        <div class="text-h5 text-weight-medium">Home</div>
      </div>
    </q-page>
  `
};

if (typeof window !== 'undefined') {
  window.PageHome = PageHome;
}
