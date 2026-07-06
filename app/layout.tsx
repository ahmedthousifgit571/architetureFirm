import type { Metadata } from "next";
import "./globals.css";
import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/constants";
import GSAPProvider from "@/components/GSAPProvider";
import SequenceProvider from "@/components/SequenceProvider";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: `${BRAND_NAME} — Architecture Studio`,
  description: BRAND_TAGLINE,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <GSAPProvider>
          <SequenceProvider>
            <Loader />
            <Navbar />
            {children}
          </SequenceProvider>
        </GSAPProvider>
      </body>
    </html>
  );
}
