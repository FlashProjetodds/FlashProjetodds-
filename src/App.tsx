/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenType, UserProfile, AppSettings } from './types';
import { DeviceFrame } from './components/common/DeviceFrame';
import { AndroidStatusBar } from './components/common/AndroidStatusBar';
import { AndroidNavigationBar } from './components/common/AndroidNavigationBar';
import { TopHeader } from './components/common/TopHeader';
import { BottomNavigation } from './components/common/BottomNavigation';
import { SideDrawer } from './components/common/SideDrawer';
import { BackendConfigModal } from './components/common/BackendConfigModal';
import { ComposeCodeViewerModal } from './components/screens/ComposeCodeViewerModal';

// Screens
import { SplashScreen } from './components/screens/SplashScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { LoginScreen } from './components/screens/LoginScreen';
import { RegisterScreen } from './components/screens/RegisterScreen';
import { PasswordRecoveryScreen } from './components/screens/PasswordRecoveryScreen';
import { MatchDetailScreen } from './components/screens/MatchDetailScreen';
import { SearchScreen } from './components/screens/SearchScreen';
import { MyBetsScreen } from './components/screens/MyBetsScreen';
import { HistoryScreen } from './components/screens/HistoryScreen';
import { FavoritesScreen } from './components/screens/FavoritesScreen';
import { GamingScreen } from './components/screens/GamingScreen';
import { NotificationsScreen } from './components/screens/NotificationsScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isBackendModalOpen, setIsBackendModalOpen] = useState(false);
  const [isCodeViewerOpen, setIsCodeViewerOpen] = useState(false);
  const [isDeviceMode, setIsDeviceMode] = useState(true);

  // User State adhering to zero fake balance data integrity
  const [user, setUser] = useState<UserProfile>({
    name: 'Jonathan Astro',
    email: 'jonathanastro002@gmail.com',
    phone: '+33 6 12 34 56 78',
    memberSince: 'Membre depuis le 10 oct. 2026',
    balance: 0,
    currency: 'FCFA',
    verified: true,
  });

  // Settings State
  const [settings, setSettings] = useState<AppSettings>({
    language: 'Français',
    theme: 'light',
    pushNotifications: true,
    goalAlerts: true,
    soundAndVibration: true,
    biometricLogin: false,
    dataSaver: false,
  });

  const handleUpdateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const isDarkMode = settings.theme === 'dark';

  // Navigation helper
  const navigateTo = (screen: ScreenType) => {
    setCurrentScreen(screen);
    setIsDrawerOpen(false);
  };

  // Determine if top/bottom bars are shown
  const showTopHeader = ['home', 'direct'].includes(currentScreen);
  const showBottomNav = [
    'home',
    'direct',
    'my_bets',
    'search',
    'gaming',
  ].includes(currentScreen);

  // Status bar should be dark text on light screens, light text on dark screens
  const isStatusBarDark =
    currentScreen === 'splash' ||
    currentScreen === 'match_detail' ||
    isDarkMode;

  return (
    <DeviceFrame
      isDeviceMode={isDeviceMode}
      onToggleDeviceMode={() => setIsDeviceMode(!isDeviceMode)}
      onOpenCodeViewer={() => setIsCodeViewerOpen(true)}
      onOpenBackendConfig={() => setIsBackendModalOpen(true)}
      dark={isDarkMode}
    >
      {/* 1. Android Native Status Bar (9:41, 5G, Wi-Fi, Battery) */}
      <AndroidStatusBar dark={isStatusBarDark} />

      {/* 2. Top Header Bar (when on main dashboard) */}
      {showTopHeader && (
        <TopHeader
          onOpenDrawer={() => setIsDrawerOpen(true)}
          onNavigate={navigateTo}
          user={user}
          unreadCount={3}
          dark={isDarkMode}
        />
      )}

      {/* 3. Main Screen Viewport */}
      <div className="flex-1 flex flex-col min-h-0 relative overflow-hidden">
        {currentScreen === 'splash' && (
          <SplashScreen
            onStart={() => navigateTo('home')}
            onLogin={() => navigateTo('login')}
            onRegister={() => navigateTo('register')}
          />
        )}

        {currentScreen === 'home' && (
          <HomeScreen onNavigate={navigateTo} dark={isDarkMode} />
        )}

        {currentScreen === 'direct' && (
          <HomeScreen onNavigate={navigateTo} dark={isDarkMode} />
        )}

        {currentScreen === 'login' && (
          <LoginScreen
            onNavigate={navigateTo}
            onOpenBackendConfig={() => setIsBackendModalOpen(true)}
          />
        )}

        {currentScreen === 'register' && (
          <RegisterScreen
            onNavigate={navigateTo}
            onOpenBackendConfig={() => setIsBackendModalOpen(true)}
          />
        )}

        {currentScreen === 'forgot_password' && (
          <PasswordRecoveryScreen
            onNavigate={navigateTo}
            onOpenBackendConfig={() => setIsBackendModalOpen(true)}
          />
        )}

        {currentScreen === 'match_detail' && (
          <MatchDetailScreen onNavigate={navigateTo} dark={isDarkMode} />
        )}

        {currentScreen === 'search' && (
          <SearchScreen onNavigate={navigateTo} dark={isDarkMode} />
        )}

        {currentScreen === 'my_bets' && (
          <MyBetsScreen onNavigate={navigateTo} dark={isDarkMode} />
        )}

        {currentScreen === 'history' && (
          <HistoryScreen onNavigate={navigateTo} dark={isDarkMode} />
        )}

        {currentScreen === 'favorites' && (
          <FavoritesScreen onNavigate={navigateTo} dark={isDarkMode} />
        )}

        {currentScreen === 'gaming' && (
          <GamingScreen onNavigate={navigateTo} dark={isDarkMode} />
        )}

        {currentScreen === 'notifications' && (
          <NotificationsScreen onNavigate={navigateTo} dark={isDarkMode} />
        )}

        {currentScreen === 'profile' && (
          <ProfileScreen
            onNavigate={navigateTo}
            user={user}
            dark={isDarkMode}
          />
        )}

        {currentScreen === 'settings' && (
          <SettingsScreen
            onNavigate={navigateTo}
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
            onOpenBackendConfig={() => setIsBackendModalOpen(true)}
            dark={isDarkMode}
          />
        )}
      </div>

      {/* 4. Bottom 5-Tab Navigation Bar */}
      {showBottomNav && (
        <BottomNavigation
          currentScreen={currentScreen}
          onNavigate={navigateTo}
          dark={isDarkMode}
        />
      )}

      {/* 5. Android Native Gesture Bar */}
      <AndroidNavigationBar onHome={() => navigateTo('home')} />

      {/* 6. Side Navigation Drawer */}
      <SideDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onNavigate={navigateTo}
        onOpenBackendConfig={() => setIsBackendModalOpen(true)}
        user={user}
        unreadCount={3}
        dark={isDarkMode}
      />

      {/* 7. Backend Technical Specs Modal */}
      <BackendConfigModal
        isOpen={isBackendModalOpen}
        onClose={() => setIsBackendModalOpen(false)}
      />

      {/* 8. Jetpack Compose Kotlin Code Inspector Modal */}
      <ComposeCodeViewerModal
        isOpen={isCodeViewerOpen}
        onClose={() => setIsCodeViewerOpen(false)}
      />
    </DeviceFrame>
  );
}
