import { AuthProvider } from "@/components/auth/auth-provider";

export default function AuthLayout({ children }: LayoutProps<"/auth">) {
  return <AuthProvider>{children}</AuthProvider>;
}
