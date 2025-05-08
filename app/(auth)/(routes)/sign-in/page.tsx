import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-8">
      <h1 className="text-2xl font-bold">Sign In</h1>
      <p className="text-muted-foreground">
        This is a demo app without real authentication.
      </p>
      <Button asChild>
        <Link href="/dashboard">Go to Dashboard</Link>
      </Button>
    </div>
  );
}
