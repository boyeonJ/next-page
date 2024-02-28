
import Layout from "@/components/layout";
import "@/styles/globals.css";
import { NextProviders } from "./providers";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <html lang="en">
            <body>
                <main>
                    <NextProviders>
                        <Layout>
                            {children}
                        </Layout>
                    </NextProviders>
                </main>
            </body>
        </html>
    )
}