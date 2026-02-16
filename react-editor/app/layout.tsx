import { PuckProvider } from "./PuckContext";
import "./styles.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <PuckProvider>
          {children}
        </PuckProvider>
      </body>
    </html>
  );
}
