import React, { useState } from 'react';
import { HeaderNavbar } from './components/HeaderNavbar';
import { NavigationRail, NavTab } from './components/NavigationRail';
import { DashboardView } from './components/DashboardView';
import { RegistrationView } from './components/RegistrationView';
import { FeeManagementView } from './components/FeeManagementView';
import { ScheduleView } from './components/ScheduleView';
import { AnnouncementsView } from './components/AnnouncementsView';
import { AiAssistantView } from './components/AiAssistantView';
import { DigitalIdCard } from './components/DigitalIdCard';
import { AdminPortalView } from './components/AdminPortalView';
import { AuthScreen } from './components/AuthScreen';

import { initialProfile, initialFeeItems, initialSchedule, initialAnnouncements } from './data/initialData';
import { AppRole, FeeItem, Announcement, RegistrationFormData } from './types';

export default function App() {
  const [role, setRole] = useState<AppRole>('student');
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [isAndroidFrame, setIsAndroidFrame] = useState<boolean>(false);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);

  const [profile, setProfile] = useState(initialProfile);
  const [fees, setFees] = useState<FeeItem[]>(initialFeeItems);
  const [schedule, setSchedule] = useState(initialSchedule);
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);

  const pendingFeeCount = fees.filter(f => f.status === 'Pending' || f.status === 'Overdue').length;

  const handleAuthSuccess = (authUser: any) => {
    setIsAuthenticated(true);
    setShowAuthModal(false);
    setRole(authUser.role);

    if (authUser.role === 'admin') {
      setActiveTab('admin');
    } else {
      setActiveTab('dashboard');
      setProfile(prev => ({
        ...prev,
        name: authUser.name,
        email: authUser.email,
        phone: authUser.phone,
        rollNumber: authUser.rollNumber || prev.rollNumber,
      }));
    }
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setShowAuthModal(true);
  };

  const handlePayFeeSuccess = (feeId: string, method: string, txId: string) => {
    setFees(prev => prev.map(f => {
      if (f.id === feeId) {
        return {
          ...f,
          status: 'Paid',
          paidDate: new Date().toISOString().split('T')[0],
          paymentMethod: method,
          transactionId: txId,
        };
      }
      return f;
    }));
  };

  const handleAddAnnouncement = (notice: Omit<Announcement, 'id'>) => {
    const newNotice: Announcement = {
      ...notice,
      id: `ANN-${Date.now()}`,
    };
    setAnnouncements(prev => [newNotice, ...prev]);
  };

  const handleRegistrationSubmit = (data: RegistrationFormData) => {
    setProfile(prev => ({
      ...prev,
      name: data.fullName,
      email: data.email,
      phone: data.phone,
      department: data.department,
      program: data.program,
      registrationStatus: 'Pending Review',
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Header Bar */}
      <HeaderNavbar
        role={role}
        onToggleRole={(newRole) => {
          setRole(newRole);
          if (newRole === 'admin') setActiveTab('admin');
        }}
        isAndroidFrame={isAndroidFrame}
        onToggleFrame={() => setIsAndroidFrame(!isAndroidFrame)}
        announcements={announcements}
        profile={profile}
        onOpenDigitalId={() => setActiveTab('digital_id')}
        onSelectAnnouncement={(item) => setActiveTab('announcements')}
        onOpenAuth={() => setShowAuthModal(true)}
        isAuthenticated={isAuthenticated}
        onSignOut={handleSignOut}
      />

      {/* Auth Screen Modal */}
      {showAuthModal && (
        <AuthScreen
          onAuthSuccess={handleAuthSuccess}
          onCancel={isAuthenticated ? () => setShowAuthModal(false) : undefined}
        />
      )}

      {/* Frame Container Switcher */}
      <div className={`mx-auto transition-all duration-300 ${
        isAndroidFrame
          ? 'max-w-[420px] my-6 bg-slate-900 border-[8px] border-slate-800 rounded-[40px] shadow-2xl min-h-[820px] overflow-hidden relative'
          : 'max-w-7xl'
      }`}>
        
        {/* Android Frame Camera Notch indicator if in Android frame mode */}
        {isAndroidFrame && (
          <div className="w-full bg-slate-900 py-2 flex items-center justify-center border-b border-slate-800">
            <div className="w-16 h-3 bg-slate-950 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-slate-800" />
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
          
          {/* Sidebar Navigation */}
          {!isAndroidFrame && (
            <NavigationRail
              activeTab={activeTab}
              onChangeTab={setActiveTab}
              role={role}
              pendingRegCount={profile.registrationStatus === 'Pending Review' ? 1 : 0}
              pendingFeeCount={pendingFeeCount}
            />
          )}

          {/* Main View Area */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto pb-20 md:pb-8">
            {activeTab === 'dashboard' && (
              <DashboardView
                profile={profile}
                fees={fees}
                schedule={schedule}
                announcements={announcements}
                onNavigateTab={setActiveTab}
                onPayFee={(fee) => setActiveTab('fees')}
              />
            )}

            {activeTab === 'registration' && (
              <RegistrationView
                onSubmitRegistration={handleRegistrationSubmit}
                userRegistrationStatus={profile.registrationStatus}
              />
            )}

            {activeTab === 'fees' && (
              <FeeManagementView
                fees={fees}
                profile={profile}
                onPayFeeSuccess={handlePayFeeSuccess}
              />
            )}

            {activeTab === 'schedule' && (
              <ScheduleView schedule={schedule} />
            )}

            {activeTab === 'announcements' && (
              <AnnouncementsView
                announcements={announcements}
                role={role}
                onAddAnnouncement={handleAddAnnouncement}
              />
            )}

            {activeTab === 'ai_bot' && (
              <AiAssistantView profile={profile} />
            )}

            {activeTab === 'digital_id' && (
              <DigitalIdCard profile={profile} />
            )}

            {activeTab === 'admin' && (
              <AdminPortalView
                studentProfile={profile}
                onUpdateProfile={setProfile}
                onAddAnnouncement={handleAddAnnouncement}
                onUpdateSchedule={setSchedule}
                onUpdateFees={setFees}
              />
            )}
          </main>

        </div>

        {/* Mobile / Android Navigation Bar inside Android Frame */}
        {isAndroidFrame && (
          <div className="bg-slate-900 border-t border-slate-800 p-2 flex items-center justify-around sticky bottom-0 z-30">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`text-[11px] font-bold py-1 px-3 rounded-xl ${activeTab === 'dashboard' ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-400'}`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab('registration')}
              className={`text-[11px] font-bold py-1 px-3 rounded-xl ${activeTab === 'registration' ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-400'}`}
            >
              Register
            </button>
            <button
              onClick={() => setActiveTab('fees')}
              className={`text-[11px] font-bold py-1 px-3 rounded-xl ${activeTab === 'fees' ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-400'}`}
            >
              Fees
            </button>
            <button
              onClick={() => setActiveTab('ai_bot')}
              className={`text-[11px] font-bold py-1 px-3 rounded-xl ${activeTab === 'ai_bot' ? 'text-teal-400 bg-teal-500/10' : 'text-slate-400'}`}
            >
              AI Assistant
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
