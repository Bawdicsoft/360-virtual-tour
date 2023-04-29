import "./globals.css";

export const metadata = {
  title: "360 virtual tour",
  description: "Generated with next 13",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
