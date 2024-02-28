
import Layout from "@/components/layout";
import "@/styles/globals.css";
import { QueryProviders } from "./providers";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <html lang="ko">
            <body>
                <main>
                    <QueryProviders>
                        <Layout>
                            {children}
                        </Layout>
                    </QueryProviders>
                </main>
            </body>
        </html>
    )
}