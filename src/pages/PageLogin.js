const API_BASE = window.AQUA_API_BASE || 'http://localhost/aqua_api';

const PageLogin = {
  template: `
    <q-layout view="hHh lpR fFf">
      <q-page-container>
        <q-page class="login-page flex flex-center">
          <q-card class="login-card" flat bordered>
        <q-card-section class="text-center">
          <div class="text-h5 text-primary text-weight-bold">Aqua</div>
          <div class="text-caption text-grey-7">Connectez-vous à votre compte</div>
        </q-card-section>
        <q-card-section>
          <q-form @submit.prevent="login">
            <q-input
              v-model="username"
              label="Nom d'utilisateur"
              outlined
              bg-color="white"
              class="q-mb-md"
            />
            <q-input
              v-model="password"
              label="Mot de passe"
              type="password"
              outlined
              bg-color="white"
              class="q-mb-md"
            />
            <div v-if="errorMsg" class="text-negative q-mb-md">{{ errorMsg }}</div>
            <q-btn
              type="submit"
              label="Se connecter"
              color="primary"
              unelevated
              no-caps
              size="lg"
              class="full-width"
              :loading="loading"
            />
          </q-form>
        </q-card-section>
          </q-card>
        </q-page>
      </q-page-container>
    </q-layout>
  `,
  setup() {
    const router = VueRouter.useRouter();
    const username = Vue.ref('');
    const password = Vue.ref('');
    const loading = Vue.ref(false);
    const errorMsg = Vue.ref('');

    const login = async () => {
      errorMsg.value = '';
      if (!username.value || !password.value) {
        errorMsg.value = 'Veuillez renseigner tous les champs';
        return;
      }
      loading.value = true;
      try {
        const res = await fetch(`${API_BASE}/utilisateurs/login.php`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: username.value, password: password.value })
        });
        const data = await res.json();
        if (data.reponse === 'true') {
          localStorage.setItem('aqua_token', data.token);
          localStorage.setItem('aqua_role', data.role || '');
          localStorage.setItem('aqua_username', username.value);
          router.push('/');
        } else {
          errorMsg.value = data.message || 'Échec de la connexion';
        }
      } catch (e) {
        errorMsg.value = 'Erreur réseau: ' + e.message;
      } finally {
        loading.value = false;
      }
    };

    return { username, password, loading, errorMsg, login };
  }
};

if (typeof window !== 'undefined') {
  window.PageLogin = PageLogin;
}
