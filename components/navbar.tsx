import { MobileSidebar } from "./mobile-sidebar";

export const Navbar = async () => {
  // Temporarily hardcode these values until auth is set up
  const apiLimitCount = 0;
  const isPro = false;

  return (
    <div className="flex items-center p-4">
      <MobileSidebar apiLimitCount={apiLimitCount} isPro={isPro} />

      <div className="flex w-full justify-end">
        {/* Placeholder for user button */}
        <div className="h-8 w-8 rounded-full bg-gray-300"></div>
      </div>
    </div>
  );
};
