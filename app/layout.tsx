import "./globals.css";

export const metadata = {
  title: "AI Business OS",
  description: "Advanced AI Business Operating System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
