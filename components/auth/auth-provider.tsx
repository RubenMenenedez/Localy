"use client";

import { NeonAuthUIProvider } from "@neondatabase/auth/react/ui";
import { useMessages } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { authClient } from "@/lib/auth/client";

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const messages = useMessages();

  return (
    <NeonAuthUIProvider
      authClient={authClient}
      navigate={router.push}
      replace={router.replace}
      onSessionChange={() => router.refresh()}
      social={{ providers: ["google"] }}
      redirectTo="/dashboard"
      Link={Link}
      localization={messages.auth}
    >
      {children}
    </NeonAuthUIProvider>
  );
}
