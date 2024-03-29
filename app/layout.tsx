import '@/app/ui/global.css';
import { monserrat } from './ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${monserrat.className} antialiased`}>
        {children}
        {/* <footer className=' py-10 flex justify-center items-center'>
          Creado por alafama para Empresa Enrique Serra 🤦‍♂️
        </footer> */}
      </body>
    </html>
  );
}
