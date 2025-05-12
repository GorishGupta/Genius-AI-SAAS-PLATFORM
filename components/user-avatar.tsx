import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const UserAvatar = () => {
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage src="/testimonials/user-1.jpeg" alt="User avatar" />
      <AvatarFallback>U</AvatarFallback>
    </Avatar>
  );
};
