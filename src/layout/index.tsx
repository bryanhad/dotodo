import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { Toaster } from '@/components/ui/sonner'
import { Outlet } from 'react-router-dom'

export const RootLayout = () => {
    return (
        <div className="h-screen flex flex-col items-center">
            <Navbar />
            <main className="flex-1 w-full max-w-[1240px] flex flex-col items-center">
                <Outlet />
                <Toaster />
            </main>
            <Footer />
        </div>
    )
}
