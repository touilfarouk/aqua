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
    path: '/:catchAll(.*)*',
    name: 'not-found',
    component: {
      template: '<q-page class="q-pa-md"><div class="text-h6">Page not found</div></q-page>'
    }
  }
];

export default routes;

export function createAppRouter(basePath = '/aqua/') {
  return createRouter({
    history: createWebHashHistory(basePath),
    routes,
    scrollBehavior() {
      return { top: 0 };
    }
  });
}
