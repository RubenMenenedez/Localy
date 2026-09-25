import { AuthProvider } from "@/components/auth/auth-provider";
import { LanguageSelector } from "@/components/i18n/language-selector";

export default function AuthLayout({ children }: LayoutProps<"/auth">) {
  return (
    <AuthProvider>
      <div className="flex justify-end p-4">
        <LanguageSelector />
      </div>
      {children}
    </AuthProvider>
  );
}
