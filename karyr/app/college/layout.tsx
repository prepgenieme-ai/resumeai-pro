import CollegeSidebar from '@/components/college/Sidebar'
export default function CollegeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <CollegeSidebar />
      <div className="flex-1 md:ml-60 mt-14 md:mt-0">{children}</div>
    </div>
  )
}
