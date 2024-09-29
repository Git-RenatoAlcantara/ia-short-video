import { Header } from "./_components/Header"

function DashboardLayout({ children }: {  children: React.ReactNode}){
    return (
        <div>
        <div>
            <Header />
        {children}
        </div>
        </div>
    )
}

export default DashboardLayout