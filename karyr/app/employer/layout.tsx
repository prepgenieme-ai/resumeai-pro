import EmployerSidebar from '@/components/employer/Sidebar'
export default function EmployerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <EmployerSidebar />
      <div className="flex-1 md:ml-60 mt-14 md:mt-0">{children}</div>
    </div>
  )
}
