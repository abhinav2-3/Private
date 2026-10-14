import type { Metadata } from "next";
import { fontTitle, fontBody, fontHand } from "@/config/fonts";
import "./theme.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Birthday Photo Album | Keepsake Memory Book",
  description: "An interactive, personalized flip-book photo album celebrating cherished memories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontTitle.variable} ${fontBody.variable} ${fontHand.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-body selection:bg-accent selection:text-paper">
        {children}
      </body>
    </html>
  );
}
