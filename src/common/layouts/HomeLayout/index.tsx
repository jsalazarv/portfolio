import { Outlet } from "react-router-dom";

export function HomeLayout() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-secondary">
      <Outlet />
    </div>
  );
}
