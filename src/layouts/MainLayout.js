const MainLayout = {
  template: `
    <style>
      .menu-item-transition {
        transition: all 0.3s ease;
      }
      .menu-item-transition:hover {
        background-color: rgba(255, 255, 255, 0.1) !important;
      }
    </style>
    <q-layout view="hHh LpR fFf">
      <q-header elevated class="bg-primary text-white">
        <q-toolbar>
          <q-btn flat dense round icon="menu" aria-label="Menu" @click="drawerOpen = !drawerOpen" />
          <q-toolbar-title>Aqua</q-toolbar-title>
          <q-tabs shrink stretch>
            <q-route-tab to="/" exact label="Home" icon="home" />
            <q-route-tab to="/map" label="Map" icon="map" />
          </q-tabs>
          <q-space />
          <div v-if="username" class="text-white q-mr-md">
            <q-icon name="person" class="q-mr-xs" />{{ username }} <span class="text-caption">({{ role }})</span>
          </div>
          <q-btn v-if="username" flat dense round icon="logout" aria-label="Logout" @click="logout" />
        </q-toolbar>
      </q-header>

      <q-drawer v-model="drawerOpen" show-if-above bordered :width="240"
        style="background-color: #00695c; color: white;"
      >
        <q-list padding>
          <q-item-label header class="text-white">Navigation</q-item-label>
          <q-item clickable v-ripple class="menu-item-transition text-white"
            :style="activePath === '/' ? 'background-color: #004d40; border-left: 4px solid #26A69A;' : ''"
            @click="navigateTo('/')">
            <q-item-section avatar>
              <q-icon name="home" color="white" />
            </q-item-section>
            <q-item-section>Home</q-item-section>
          </q-item>
          <q-item clickable v-ripple class="menu-item-transition text-white"
            :style="activePath === '/map' ? 'background-color: #004d40; border-left: 4px solid #26A69A;' : ''"
            @click="navigateTo('/map')">
            <q-item-section avatar>
              <q-icon name="map" color="white" />
            </q-item-section>
            <q-item-section>Map</q-item-section>
          </q-item>
        </q-list>
      </q-drawer>

      <q-page-container class="page-transition-container">
        <router-view v-slot="{ Component }">
          <transition :name="transitionName" mode="out-in" appear>
            <component :is="Component" :key="activePath" />
          </transition>
        </router-view>
      </q-page-container>
    </q-layout>
  `,
  setup() {
    const router = VueRouter.useRouter();
    const route = VueRouter.useRoute();
    const drawerOpen = Vue.ref(true);
    const activePath = Vue.computed(() => route.path || '/');
    const transitionName = Vue.ref('slide-left');
    const routeOrder = {
      '/': 0,
      '/map': 1
    };

    Vue.watch(
      () => route.path,
      (newPath, oldPath) => {
        if (!oldPath) {
          transitionName.value = 'slide-left';
          return;
        }

        const nextOrder = routeOrder[newPath] ?? 0;
        const previousOrder = routeOrder[oldPath] ?? 0;
        transitionName.value = nextOrder >= previousOrder ? 'slide-left' : 'slide-right';
      }
    );

    const navigateTo = (path) => {
      router.push(path);
      if (window.innerWidth < 700) {
        drawerOpen.value = false;
      }
    };

    const username = Vue.ref(localStorage.getItem('aqua_username') || '');
    const role = Vue.ref(localStorage.getItem('aqua_role') || '');

    const logout = () => {
      localStorage.removeItem('aqua_token');
      localStorage.removeItem('aqua_role');
      localStorage.removeItem('aqua_username');
      username.value = '';
      role.value = '';
      router.push('/login');
    };

    return {
      drawerOpen,
      activePath,
      transitionName,
      navigateTo,
      username,
      role,
      logout
    };
  }
};

if (typeof window !== 'undefined') {
  window.MainLayout = MainLayout;
}
