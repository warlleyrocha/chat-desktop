import { version } from '@/../package.json';

export interface Account {
  name: string;
  initials: string;
  appVersion: string;
}

export const MOCK_ACCOUNT: Account = {
  name: 'Warley Rocha',
  initials: 'WR',
  appVersion: version,
};
