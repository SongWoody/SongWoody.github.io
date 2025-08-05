import React, { createContext, useContext, useState } from "react";

interface SidebarContextType {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

// Sidebar 상태를 위한 Context 생성 (초기값은 의도적으로 null로 설정)
const SidebarContext = createContext<SidebarContextType | null>(null);

// Sidebar 상태를 제공하는 Provider 컴포넌트
export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <SidebarContext.Provider value={{ isMenuOpen, toggleMenu }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Sidebar 상태를 사용하는 Hook
export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  if (context === null) {
    throw new Error(
      'useSidebar must be used within a SidebarProvider. ' +
      'Please wrap your component with <SidebarProvider>.'
    );
  }
  return context;
};
