
import createMiddleware from 'next-intl/middleware';

const middleware = createMiddleware({

  locales: ['en', 'es', 'ru'],


  defaultLocale: 'en'
});

export default middleware;

export const config = {
  matcher: ['/', '/(en|es|ru)/:page*']
};