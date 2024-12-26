import SideNavigation from "../_components/SideNavigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-full gap-12 md:grid-cols-[16rem_1fr]">
      <SideNavigation />
      <div>{children}</div>
    </div>
  );
}
