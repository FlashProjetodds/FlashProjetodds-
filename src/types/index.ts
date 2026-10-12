export type ScreenType =
  | 'splash'
  | 'login'
  | 'register'
  | 'forgot_password'
  | 'home'
  | 'direct'
  | 'match_detail'
  | 'search'
  | 'my_bets'
  | 'history'
  | 'favorites'
  | 'gaming'
  | 'notifications'
  | 'profile'
  | 'settings';

export type MatchTab = 'direct' | 'today' | 'upcoming' | 'finished';

export type SportCategory =
  | 'football'
  | 'basketball'
  | 'tennis'
  | 'handball'
  | 'hockey'
  | 'volleyball'
  | 'baseball'
  | 'rugby'
  | 'more';

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  memberSince: string;
  balance: number;
  currency: string;
  verified: boolean;
  avatarUrl?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
  category: 'infos' | 'favoris' | 'system';
  iconType: 'lightning' | 'bell' | 'trophy' | 'gift' | 'alert';
  read: boolean;
}

export interface AppSettings {
  language: string;
  theme: 'light' | 'dark';
  pushNotifications: boolean;
  goalAlerts: boolean;
  soundAndVibration: boolean;
  biometricLogin: boolean;
  dataSaver: boolean;
}
