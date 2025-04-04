import React, { createContext, useContext, useState } from "react";

// Sidebar 상태를 위한 Context 생성
const SidebarContext = createContext();

// Sidebar 상태를 제공하는 Provider 컴포넌트
export const SidebarProvider = ({ children }) => {
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
export const useSidebar = () => {
  return useContext(SidebarContext);
};
