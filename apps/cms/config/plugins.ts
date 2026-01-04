export default ({ env }) => ({
  email: {
    config: {
      provider: 'sendmail',
      settings: {
        defaultFrom: 'no-reply@thinkspace.com',
        defaultReplyTo: 'no-reply@thinkspace.com',
      },
    },
  },
  i18n: {
    enabled: true,
    config: {
      defaultLocale: 'th',
      locales: ['th', 'en'],
    },
  },
});
