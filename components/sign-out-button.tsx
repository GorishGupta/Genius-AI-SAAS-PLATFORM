"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export const SignOutButton = () => {
  const router = useRouter();

  const handleSignOut = () => {
    // For demo purposes, just redirect to the landing page
    router.push("/");
  };

  return (
    <Button
      onClick={handleSignOut}
      variant="ghost"
      size="sm"
      className="flex items-center gap-x-2 text-sm"
    >
      <LogOut className="h-4 w-4" />
      Sign out
    </Button>
  );
};
