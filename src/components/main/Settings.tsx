import React, { useState, ReactNode } from 'react';
import { Moon, User, Lock, Settings, Bell } from 'lucide-react';
import { FaBook, FaTimes, FaSpinner, FaCog } from 'react-icons/fa';
import CustomDropdown from './SelectDropDown';
import { dict } from '@/lib/dict';

interface SettingsSectionProps {
  title: string;
  icon: ReactNode;
  onOpen: () => void;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, icon, onOpen }) => (
  <div 
    className="border rounded-lg cursor-pointer text-light-text-primary dark:text-dark-text-primary bg-light-surface dark:bg-dark-surface hover:bg-light-background hover:border-light-text-secondary dark:hover:bg-dark-background dark:hover:border-dark-text-secondary transition-all"
    onClick={onOpen}
  >
    <div className="flex items-center space-x-4 p-6">
      <div className="text-light-primary dark:text-dark-primary">{icon}</div>
      <h2 className="text-xl font-medium">{title}</h2>
    </div>
  </div>
);

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-light-primary dark:hover:bg-dark-primary hover:text-white">
            <FaTimes size={12} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const SettingsPage: React.FC = () => {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [dataSharing, setDataSharing] = useState<boolean>(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState<boolean>(false);
  const [notificationEmail, setNotificationEmail] = useState<boolean>(true);
  const [notificationPush, setNotificationPush] = useState<boolean>(true);
  const [selectedLanguage, setSelectedLanguage] = useState("english");

  const handleOpenModal = (modalName: string) => setOpenModal(modalName);
  const handleCloseModal = () => setOpenModal(null);

  const handleSave = (data: any) => {
    console.log("data", data);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      handleCloseModal();
    }, 1000);
  };

  const languageOptions = [
    { value: 'english', label: dict[selectedLanguage].languages.english },
    { value: 'french', label: dict[selectedLanguage].languages.french },
    { value: 'arabic', label: dict[selectedLanguage].languages.arabic },
    { value: 'spanish', label: dict[selectedLanguage].languages.spanish },
    { value: 'italian', label: dict[selectedLanguage].languages.italian },
  ];

  return (
    <div className="p-6 bg-light-background dark:bg-dark-background">
      <div className="flex flex-col w-full">
        {/* Title Section */}
        <div className="mb-4 flex flex-row justify-start items-center text-light-text-primary dark:text-dark-text-primary text-2xl">
          <FaCog className="mr-3" size={20} />
          <span>{dict[selectedLanguage].settings}</span>
        </div>

        {/* Grid Section - Two items per row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <SettingsSection
            title={dict[selectedLanguage].languageSettings}
            icon={<FaBook size={28} />}
            onOpen={() => handleOpenModal('language')}
          />
          <SettingsSection
            title={dict[selectedLanguage].userProfile}
            icon={<User size={28} />}
            onOpen={() => handleOpenModal('profile')}
          />
          <SettingsSection
            title={dict[selectedLanguage].privacySettings}
            icon={<Moon size={28} />}
            onOpen={() => handleOpenModal('privacy')}
          />
          <SettingsSection
            title={dict[selectedLanguage].securitySettings}
            icon={<Lock size={28} />}
            onOpen={() => handleOpenModal('security')}
          />
          <SettingsSection
            title={dict[selectedLanguage].accountSettings}
            icon={<Settings size={28} />}
            onOpen={() => handleOpenModal('account')}
          />
          <SettingsSection
            title={dict[selectedLanguage].notificationSettings}
            icon={<Bell size={28} />}
            onOpen={() => handleOpenModal('notifications')}
          />
        </div>
      </div>

      <Modal isOpen={openModal === 'language'} onClose={handleCloseModal} title={dict[selectedLanguage].languageSettings}>
        <div className="space-y-4">
          <label className="block text-sm font-medium">{dict[selectedLanguage].selectLanguage}</label>
          <div className="mb-6">
            <CustomDropdown
              options={languageOptions}
              value={selectedLanguage}
              onChange={() => setSelectedLanguage(selectedLanguage)}
            />
          </div>
        </div>
        <div className="flex justify-between space-x-3 mt-6">
          <button onClick={handleCloseModal} className="px-4 py-2 text-white bg-dark-background hover:bg-light-secondary rounded-md">
            {dict[selectedLanguage].cancel}
          </button>
          <button onClick={() => handleSave(selectedLanguage)} className="px-4 py-2 text-white bg-dark-primary hover:bg-light-secondary rounded-md" disabled={isLoading}>
            {isLoading ? <FaSpinner className="animate-spin" /> : dict[selectedLanguage].save}
          </button>
        </div>
      </Modal>

      <Modal isOpen={openModal === 'profile'} onClose={handleCloseModal} title={dict[selectedLanguage].userProfile}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">{dict[selectedLanguage].newEmail}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-light-background dark:bg-dark-background border-2 border-gray-300 dark:border-gray-600 rounded-md outline-none focus:border-light-primary dark:focus:border-dark-primary text-light-text-primary dark:text-dark-text-primary focus:ring-primary focus:border-primary"
              placeholder={dict[selectedLanguage].enterNewEmail}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{dict[selectedLanguage].changePassword}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-light-background dark:bg-dark-background border-2 border-gray-300 dark:border-gray-600 rounded-md outline-none focus:border-light-primary dark:focus:border-dark-primary text-light-text-primary dark:text-dark-text-primary focus:ring-primary focus:border-primary"
              placeholder={dict[selectedLanguage].enterNewPassword}
            />
          </div>
        </div>
        <div className="flex justify-between space-x-3 mt-6">
          <button onClick={handleCloseModal} className="px-4 py-2 text-white bg-dark-background hover:bg-light-secondary rounded-md">
            {dict[selectedLanguage].cancel}
          </button>
          <button onClick={handleSave} className="px-4 py-2 text-white bg-dark-primary hover:bg-light-secondary rounded-md" disabled={isLoading}>
            {isLoading ? <FaSpinner className="animate-spin" /> : dict[selectedLanguage].save}
          </button>
        </div>
      </Modal>

      <Modal isOpen={openModal === 'privacy'} onClose={handleCloseModal} title={dict[selectedLanguage].privacySettings}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>{dict[selectedLanguage].dataSharing}</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={dataSharing} onChange={(e) => setDataSharing(e.target.checked)} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-light-primary peer-checked:bg-light-primary dark:bg-gray-600 dark:peer-checked:bg-dark-primary"></div>
              <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-6"></span>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <span>{dict[selectedLanguage].twoFactorAuthentication}</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={twoFactorAuth} onChange={(e) => setTwoFactorAuth(e.target.checked)} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-light-primary peer-checked:bg-light-primary dark:bg-gray-600 dark:peer-checked:bg-dark-primary"></div>
              <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-6"></span>
            </label>
          </div>
        </div>
        <div className="flex justify-between space-x-3 mt-6">
          <button onClick={handleCloseModal} className="px-4 py-2 text-white bg-dark-background hover:bg-light-secondary rounded-md">
            {dict[selectedLanguage].cancel}
          </button>
          <button onClick={handleSave} className="px-4 py-2 text-white bg-dark-primary hover:bg-light-secondary rounded-md" disabled={isLoading}>
            {isLoading ? <FaSpinner className="animate-spin" /> : dict[selectedLanguage].save}
          </button>
        </div>
      </Modal>

      <Modal isOpen={openModal === 'security'} onClose={handleCloseModal} title={dict[selectedLanguage].securitySettings}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>{dict[selectedLanguage].notificationEmail}</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={notificationEmail} onChange={(e) => setNotificationEmail(e.target.checked)} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-light-primary peer-checked:bg-light-primary dark:bg-gray-600 dark:peer-checked:bg-dark-primary"></div>
              <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-6"></span>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <span>{dict[selectedLanguage].notificationPush}</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={notificationPush} onChange={(e) => setNotificationPush(e.target.checked)} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-light-primary peer-checked:bg-light-primary dark:bg-gray-600 dark:peer-checked:bg-dark-primary"></div>
              <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-6"></span>
            </label>
          </div>
        </div>
        <div className="flex justify-between space-x-3 mt-6">
          <button onClick={handleCloseModal} className="px-4 py-2 text-white bg-dark-background hover:bg-light-secondary rounded-md">
            {dict[selectedLanguage].cancel}
          </button>
          <button onClick={handleSave} className="px-4 py-2 text-white bg-dark-primary hover:bg-light-secondary rounded-md" disabled={isLoading}>
            {isLoading ? <FaSpinner className="animate-spin" /> : dict[selectedLanguage].save}
          </button>
        </div>
      </Modal>

      <Modal isOpen={openModal === 'account'} onClose={handleCloseModal} title={dict[selectedLanguage].accountSettings}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>{dict[selectedLanguage].accountPrivacy}</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={dataSharing} onChange={(e) => setDataSharing(e.target.checked)} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-light-primary peer-checked:bg-light-primary dark:bg-gray-600 dark:peer-checked:bg-dark-primary"></div>
              <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-6"></span>
            </label>
          </div>
        </div>
        <div className="flex justify-between space-x-3 mt-6">
          <button onClick={handleCloseModal} className="px-4 py-2 text-white bg-dark-background hover:bg-light-secondary rounded-md">
            {dict[selectedLanguage].cancel}
          </button>
          <button onClick={handleSave} className="px-4 py-2 text-white bg-dark-primary hover:bg-light-secondary rounded-md" disabled={isLoading}>
            {isLoading ? <FaSpinner className="animate-spin" /> : dict[selectedLanguage].save}
          </button>
        </div>
      </Modal>

      <Modal isOpen={openModal === 'notifications'} onClose={handleCloseModal} title={dict[selectedLanguage].notificationSettings}>
        <div className="space-y-4">
          <div className='  grid grid-col-1 gap-4'>
            <div className="flex items-center justify-between">
                <span>{dict[selectedLanguage].notificationEmail}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={notificationEmail} onChange={(e) => setNotificationEmail(e.target.checked)} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:bg-light-primary dark:peer-checked:bg-dark-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
            </div>
            <div className="flex items-center justify-between">
                <span>{dict[selectedLanguage].notificationPush}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={notificationPush} onChange={(e) => setNotificationPush(e.target.checked)} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:bg-light-primary dark:peer-checked:bg-dark-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
            </div>
        </div>
        </div>
        <div className="flex justify-between space-x-3 mt-6">
          <button onClick={handleCloseModal} className="px-4 py-2 text-white bg-dark-background hover:bg-light-secondary rounded-md">
            {dict[selectedLanguage].cancel}
          </button>
          <button onClick={handleSave} className="px-4 py-2 text-white bg-dark-primary hover:bg-light-secondary rounded-md" disabled={isLoading}>
            {isLoading ? <FaSpinner className="animate-spin" /> : dict[selectedLanguage].save}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SettingsPage;
