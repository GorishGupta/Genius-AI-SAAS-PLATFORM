import { MobileSidebar } from "./mobile-sidebar";
import { UserProfileDropdown } from "./user-profile-dropdown";

export const Navbar = async () => {
  // Temporarily hardcode these values until auth is set up
  const apiLimitCount = 0;
  const isPro = false;

  return (
    <div className="flex items-center p-4">
      <MobileSidebar apiLimitCount={apiLimitCount} isPro={isPro} />

      <div className="flex w-full justify-end items-center gap-x-3">
        <UserProfileDropdown />
      </div>
    </div>
  );
};
