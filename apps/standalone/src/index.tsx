import React from 'react';
import { createRoot } from 'react-dom/client';
import { IntlProvider } from 'react-intl';
import { getLocale } from '@koku/i18n';
// eslint-disable-next-line no-restricted-imports
import messages from 'locales/data.json';
import { Welcome } from '@koku/components/components/page/welcome';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  const locale = getLocale();
  const localeMessages = (messages as any)[locale] || (messages as any).en || {};
  root.render(
    <IntlProvider locale={locale} messages={localeMessages}>
      <Welcome />
    </IntlProvider>
  );
}


