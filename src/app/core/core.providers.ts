import {
  EnvironmentProviders,
  Provider,
  inject,
  provideAppInitializer,
} from '@angular/core';

import { ThemeService } from './services/theme.service';

export const coreProviders: Array<Provider | EnvironmentProviders> = [
  provideAppInitializer(() => {
    inject(ThemeService);
  }),
];
