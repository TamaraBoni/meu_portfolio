import Cabecalho from "@/components/Cabecalho/Cabecalho";
import Rodape from "@/components/Rodape/Rodape";
import type { Metadata } from "next";
import "@/app/globals.css";
export const metadata: Metadata = {
  title: "Meu Portfólio",
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br">
      <body>
        <Cabecalho />

        <div className="home">
          {children}
          <Rodape />
        </div>
      </body>
    </html>
  );
}
