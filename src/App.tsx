/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { IslandProvider, useIsland } from './context/IslandContext';
import { Navbar, TabType } from './components/Navbar';
import { BirthdayBanner } from './components/BirthdayBanner';
import { JournalView } from './components/JournalView';
import { StoryModeView } from './components/StoryModeView';
import { VillagersView } from './components/VillagersView';
import { CalendarView } from './components/CalendarView';
import { MissionsAndShopView } from './components/MissionsAndShopView';
import { OnboardingModal } from './components/OnboardingModal';
import { AuthModal } from './components/AuthModal';
import { TotakekeConcertModal } from './components/TotakekeConcertModal';

function MainApp() {
  const [activeTab, setActiveTab] = useState<TabType>('journal');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const { profile } = useIsland();

  // If first time visit with default name, offer onboarding modal once
  useEffect(() => {
    const hasPrompted = localStorage.getItem('acnh_onboarding_shown');
    if (!hasPrompted) {
      setIsProfileModalOpen(true);
      localStorage.setItem('acnh_onboarding_shown', 'true');
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8eb] text-[#4e342e]">
      {/* Birthday Celebration or Reminder Banner */}
      <BirthdayBanner onOpenProfile={() => setIsProfileModalOpen(true)} />

      {/* Top Navbar adhering to Top Bar Contract */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* Main Responsive Content Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 pt-6">
        {activeTab === 'journal' && <JournalView />}
        {activeTab === 'story' && <StoryModeView />}
        {activeTab === 'villagers' && <VillagersView />}
        {activeTab === 'calendar' && <CalendarView />}
        {activeTab === 'missions' && <MissionsAndShopView />}
      </main>

      {/* Modals */}
      <OnboardingModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <TotakekeConcertModal />

      {/* Quiet Footer */}
      <footer className="mt-auto py-6 border-t border-[#e5dec9] bg-[#fbf8eb]/70 text-center text-xs text-stone-500 hidden md:block">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="flex items-center gap-1.5 justify-center">
            <span>🍃</span>
            <span>NookPedia · Diario Personal & Guía de Isla para Animal Crossing: New Horizons</span>
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="hover:text-stone-800 underline transition-colors"
            >
              Ajustes de Isla ({profile.islandName})
            </button>
            <span>·</span>
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="hover:text-stone-800 underline transition-colors"
            >
              Sincronización en la Nube
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <IslandProvider>
      <MainApp />
    </IslandProvider>
  );
}
