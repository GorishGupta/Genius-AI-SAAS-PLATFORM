import {
  Code,
  Facebook,
  Github,
  ImageIcon,
  Instagram,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  Twitter,
  VideoIcon,
} from "lucide-react";

export const MAX_FREE_COUNTS = 5 as const;

export const TESTIMONIALS = [
  {
    name: "Gorish",
    image: "/testimonials/user-1.jpg",
    title: "Student",
    description:
      "This application has significantly faster and Easy to use.",
  },
  {
    name: "Kapil",
    image: "/testimonials/user-2.png",
    title: "Student",
    description:
      "As a student, this app has been a lifesaver for organizing my tasks and schedules.",
  },
  {
    name: "Ritesh Aggarwal",
    image: "/testimonials/user-3.png",
    title: "Entrepreneur",
    description:
      "The efficiency and reliability of this tool are unparalleled. Highly recommended!",
  },
  {
    name: "Parag Aggarwal",
    image: "/testimonials/user-4.png",
    title: "(Former CEO) X",
    description: "Incredible features and user-friendly design. Love it!",
  },
] as const;

export const TOOLS = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversation",
  },
    {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/image",
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: "/code",
  },
] as const;

export const ROUTES = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  ...TOOLS,
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    color: null,
  },
] as const;

export const FOOTER_LINKS = [
  {
    name: "Facebook",
    icon: Facebook,
    link: "https://facebook.com",
  },
  {
    name: "Twitter",
    icon: Twitter,
    link: "https://twitter.com",
  },
  {
    name: "Instagram",
    icon: Instagram,
    link: "https://instagram.com",
  },
  {
    name: "Github",
    icon: Github,
    link: "https://github.com",
  },
];
