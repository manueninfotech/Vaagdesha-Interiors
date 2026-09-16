import { useState } from "react";
import {
  Outlet,
  NavLink,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";

import {
  PlusCircle,
  FolderOpen,
  Menu,
  X,
  LogOut,
} from "lucide-react";

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const handleLogout = () => {
  localStorage.removeItem("vaagdesha_token");
  localStorage.removeItem("vaagdesha_user");

  setMobileMenuOpen(false);

  navigate("/admin/login", {
    replace: true,
  });
};
  const token = localStorage.getItem("vaagdesha_token");

if (!token) {
  return (
    <Navigate
      to="/admin/login"
      replace
      state={{ from: location }}
    />
  );
}

  const navItems = [
    {
      label: "Create Pdf",
      path: "/admin/create-project",
      icon: PlusCircle,
    },
    {
      label: "Pdf List",
      path: "/admin/projects",
      icon: FolderOpen,
    },
  ];

  const isItemActive = (item) => {
    const isCreatePdf =
      item.path === "/admin/create-project";

    return (
      location.pathname === item.path ||
      (isCreatePdf &&
        location.pathname === "/admin")
    );
  };

  const handleNavigation = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F5EFE6] text-[#3E3E3E]">

      {/* =====================================================
          DESKTOP SIDEBAR
      ====================================================== */}

      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-[#E5D9CC] bg-white lg:block">

        {/* LOGO */}
        <div className="flex h-20 items-center border-b border-[#E5D9CC] px-6">
          <div>
            <p className="font-serif text-xl text-[#5A0F14]">
              Vaagdesha
            </p>

            <p className="mt-0.5 text-[9px] uppercase tracking-[0.3em] text-[#B08D57]">
              Interiors
            </p>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="space-y-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isItemActive(item);

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition ${
                  active
                    ? "bg-[#5A0F14] text-white"
                    : "text-[#6D5C4D] hover:bg-[#F5EFE6] hover:text-[#5A0F14]"
                }`}
              >
                <Icon size={18} />

                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 border-t border-[#E5D9CC] p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-[#6D5C4D] transition hover:bg-[#F5EFE6] hover:text-[#5A0F14]"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>


      {/* =====================================================
          MOBILE TOP BAR
      ====================================================== */}

      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#E5D9CC] bg-white px-4 lg:hidden">

        {/* MOBILE LOGO */}
        <div>
          <p className="font-serif text-lg leading-none text-[#5A0F14]">
            Vaagdesha
          </p>

          <p className="mt-1 text-[8px] uppercase tracking-[0.3em] text-[#B08D57]">
            Interiors
          </p>
        </div>


        {/* MENU BUTTON */}
        <button
          type="button"
          onClick={() =>
            setMobileMenuOpen(true)
          }
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E5D9CC] bg-[#F8F4EE] text-[#5A0F14] transition hover:bg-[#F5EFE6]"
          aria-label="Open navigation menu"
        >
          <Menu size={22} />
        </button>
      </header>


      {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}

      {mobileMenuOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() =>
            setMobileMenuOpen(false)
          }
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
        />
      )}


      {/* =====================================================
          MOBILE SIDEBAR / DRAWER
      ====================================================== */}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[280px] max-w-[85vw] border-r border-[#E5D9CC] bg-white shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          mobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >

        {/* MOBILE DRAWER HEADER */}

        <div className="flex h-20 items-center justify-between border-b border-[#E5D9CC] px-5">

          <div>
            <p className="font-serif text-xl text-[#5A0F14]">
              Vaagdesha
            </p>

            <p className="mt-0.5 text-[9px] uppercase tracking-[0.3em] text-[#B08D57]">
              Interiors
            </p>
          </div>


          {/* CLOSE BUTTON */}

          <button
            type="button"
            onClick={() =>
              setMobileMenuOpen(false)
            }
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#6D5C4D] transition hover:bg-[#F5EFE6] hover:text-[#5A0F14]"
            aria-label="Close navigation menu"
          >
            <X size={21} />
          </button>
        </div>


        {/* MOBILE NAVIGATION */}

        <nav className="space-y-2 p-4">

          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isItemActive(item);

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={handleNavigation}
                className={`flex items-center gap-4 rounded-xl px-4 py-4 text-sm transition ${
                  active
                    ? "bg-[#5A0F14] text-white shadow-sm"
                    : "text-[#6D5C4D] hover:bg-[#F5EFE6] hover:text-[#5A0F14]"
                }`}
              >
                <Icon size={20} />

                <span className="font-medium">
                  {item.label}
                </span>
              </NavLink>
            );
          })}

        </nav>

        {/* MOBILE DRAWER FOOTER */}

        <div className="absolute bottom-0 left-0 right-0 border-t border-[#E5D9CC] px-5 py-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-[#6D5C4D] transition hover:bg-[#F5EFE6] hover:text-[#5A0F14]"
        >
          <LogOut size={19} />
          <span className="font-medium">
            Logout
          </span>
        </button>

        <p className="mt-3 px-4 text-[9px] uppercase tracking-[0.2em] text-[#A49588]">
          Vaagdesha Interiors
        </p>
      </div>

      </aside>


      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <main className="min-h-screen lg:ml-64">
        <Outlet />
      </main>

    </div>
  );
}