import StudentSidebar from '@/components/student/Sidebar'
export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <StudentSidebar />
      <div className="flex-1 md:ml-60 mt-14 md:mt-0">{children}</div>
    </div>
  )
}
