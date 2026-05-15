export interface Account {
  name: string;
  initials: string;
  status: string;
  appVersion: string;
}

export const MOCK_ACCOUNT: Account = {
  name: 'Warley Rocha',
  initials: 'WR',
  status: 'Emoji de Status',
  appVersion: '6.8.2',
};
