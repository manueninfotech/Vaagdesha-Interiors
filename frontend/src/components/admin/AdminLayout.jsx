import {
  Outlet,
  NavLink,
  useLocation,
} from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  FolderOpen,
  Settings,
} from "lucide-react";

export default function AdminLayout() {
  const location = useLocation();
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

  return (
    <div className="min-h-screen bg-[#F5EFE6] text-[#3E3E3E]">
      
      {/* SIDEBAR */}
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

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => {
                  const isCreatePdf =
                    item.path === "/admin/create-project";

                  const shouldHighlight =
                    isActive ||
                    (isCreatePdf &&
                      location.pathname === "/admin");

                  return `flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition ${
                    shouldHighlight
                      ? "bg-[#5A0F14] text-white"
                      : "text-[#6D5C4D] hover:bg-[#F5EFE6] hover:text-[#5A0F14]"
                  }`;
                }}
              >
                <Icon size={18} />

                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

      </aside>

      {/* MAIN CONTENT */}
      <main className="min-h-screen lg:ml-64">
        <Outlet />
      </main>

    </div>
  );
}