import type { Metadata } from "next";
import "./globals.css";
import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/constants";
import GSAPProvider from "@/components/GSAPProvider";
import SequenceProvider from "@/components/SequenceProvider";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: `${BRAND_NAME} — Architecture Studio`,
  description: BRAND_TAGLINE,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* suppressHydrationWarning: browser extensions (e.g. ColorZilla adds
          cz-shortcut-listen) mutate <body> before hydration — harmless, so we
          silence the attribute mismatch React would otherwise warn about. */}
      <body suppressHydrationWarning>
        <GSAPProvider>
          <SequenceProvider>
            <Loader />
            <Navbar />
            {children}
            <WhatsAppButton />
          </SequenceProvider>
        </GSAPProvider>
      </body>
    </html>
  );
}
