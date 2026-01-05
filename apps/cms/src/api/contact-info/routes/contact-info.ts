export default {
  routes: [
    {
      method: 'GET',
      path: '/contact-info',
      handler: 'contact-info.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/contact-info',
      handler: 'contact-info.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/contact-info',
      handler: 'contact-info.delete',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
