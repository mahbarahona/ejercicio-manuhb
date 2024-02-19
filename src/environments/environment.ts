export const environment = {
  api: {
    key: import.meta.env['NG_APP_API_KEY'],
    app_host: import.meta.env['NG_APP_API_HOST'],
    baseURL: import.meta.env['NG_APP_API_BASEURL'],
    resource: {
      jokes: {
        search: '/jokes/search',
        random: '/jokes/random',
        categories: '/jokes/categories',
      },
    },
  },
};
