import SideNav from '@/app/ui/sidenav';
export const experimental_ppr = true;
import Header from '@/app/ui/header';

export default function Layout({ children }) {
    return (

        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">

            <div className="w-full flex-none w-64">
                <SideNav />


            </div>
            <div className='w-full'>
                <Header />

            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
            </div>
        </div>

    );
}