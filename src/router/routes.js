const routes = [
  {
    path: '/',
    component: window.MainLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: window.PageHome
      },
      {
        path: 'map',
        name: 'map',
        component: window.PageMap
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: window.PageLogin
  },
  {
    path: '/:catchAll(.*)*',
    name: 'not-found',
    component: {
      template: '<q-page class="q-pa-md"><div class="text-h6">Page not found</div></q-page>'
    }
  }
];

export default routes;

export function createAppRouter(basePath = '/aqua/') {
  const router = createRouter({
    history: createWebHashHistory(basePath),
    routes,
    scrollBehavior() {
      return { top: 0 };
    }
  });

  router.beforeEach((to) => {
    const token = localStorage.getItem('aqua_token');
    if (to.name !== 'login' && !token) {
      return { name: 'login' };
    }
    if (to.name === 'login' && token) {
      return { path: '/' };
    }
    return true;
  });

  return router;
}
