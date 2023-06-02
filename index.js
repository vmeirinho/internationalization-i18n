const express = require('express');
const i18next = require('i18next');
const i18nextMiddleware = require('i18next-http-middleware');
const Backend = require('i18next-fs-backend');

const app = express();

i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    backend: {
      loadPath: `${__dirname}/locales/{{lng}}/{{ns}}.json`,
    },
    detection: {
      order: ['header'],
      caches: ['cookie'],
    },
    fallbackLng: 'en',
    preload: ['en', 'es'],
    ns: ['translation'],
    defaultNS: 'translation',
  });

app.use(i18nextMiddleware.handle(i18next));

app.get('/greeting', (req, res) => {
  const greeting = req.t('greeting');
  res.send(greeting);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
