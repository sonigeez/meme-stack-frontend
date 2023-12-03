import '#/styles/globals.css';
import { AddressBar } from '#/ui/address-bar';
import { GlobalNav } from '#/ui/global-nav';
import { Analytics } from '@vercel/analytics/react';



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="[color-scheme:dark]">
      <head>
        <title> Meme Stack</title>
        <meta name="description" content="Meme Stack" />
      </head>
      <body className="bg-gray-1100 overflow-y-scroll bg-[url('/grid.svg')] pb-36">
        <GlobalNav />
        <div className="lg:pl-64">
          <div className="mx-auto max-w-5xl space-y-8 px-2 pt-20 lg:px-8 lg:py-8">
            <div className="bg-vc-border-gradient rounded-lg p-px shadow-lg shadow-black/20">
              <div className="rounded-lg bg-black">
                <AddressBar />
              </div>
            </div>
            <div className="bg-vc-border-gradient rounded-lg p-px shadow-lg shadow-black/20">
              <div className="rounded-lg bg-black p-3.5 lg:p-6">{children}</div>
              <Analytics />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
