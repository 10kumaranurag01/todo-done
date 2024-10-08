"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/context/Auth.context";

const LandingPageLink = ({ children }) => {
  const { session } = useAuth();

  return session ? (
    <Link href="/dashboard">
      <Button size="lg" className="text-lg px-8 py-4">
        Go to Dashboard
      </Button>
    </Link>
  ) : (
    <div className="space-x-4">
      <Link href="/auth/login">
        <Button variant="outline" size="lg" className="text-lg px-8 py-4">
          Log In
        </Button>
      </Link>
      <Link href="/auth/register">
        <Button size="lg" className="text-lg px-8 py-4">
          Sign Up for Free
        </Button>
      </Link>
    </div>
  );
};

export default LandingPageLink;
