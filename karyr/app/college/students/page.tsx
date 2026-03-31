'use client'
import { useState, useRef } from 'react'
import { Search, Upload, Plus, X, Download } from 'lucide-react'

type Student = {
  id: string; name: string; email: string; course: string; gradYear: number
  city: string; skills: string[]; apps: number; status: 'active' | 'inactive'
}

const initialStudents: Student[] = [
  { id:'1', name:'Alex Kumar', email:'alex@iitd.ac.in', course:'B.Tech CSE', gradYear:2025, city:'Delhi', skills:['Python','React','ML'], apps:12, status:'active' },
  { id:'2', name:'Priya Singh', email:'priya@iitd.ac.in', course:'B.Tech ECE', gradYear:2025, city:'Mumbai', skills:['VLSI','Python'], apps:7, status:'active' },
  { id:'3', name:'Rohit Verma', email:'rohit@iitd.ac.in', course:'M.Tech AI', gradYear:2025, city:'Bangalore', skills:['TensorFlow','PyTorch'], apps:9, status:'active' },
  { id:'4', name:'Ananya Nair', email:'ananya@iitd.ac.in', course:'MBA', gradYear:2025, city:'Chennai', skills:['Product','Strategy'], apps:15, status:'active' },
  { id:'5', name:'Dev Patel', email:'dev@iitd.ac.in', course:'B.Tech CSE', gradYear:2026, city:'Pune', skills:['Java','Spring'], apps:4, status:'active' },
  { id:'6', name:'Sneha Iyer', email:'sneha@iitd.ac.in', course:'B.Tech IT', gradYear:2026, city:'Bangalore', skills:['SQL','Tableau'], apps:6, status:'inactive' },
  { id:'7', name:'Karan Shah', email:'karan@iitd.ac.in', course:'B.Tech Mech', gradYear:2025, city:'Ahmedabad', skills:['CAD','AutoCAD'], apps:2, status:'active' },
  { id:'8', name:'Meera Gupta', email:'meera@iitd.ac.in', course:'B.Tech CSE', gradYear:2026, city:'Jaipur', skills:['Python','Statistics','R'], apps:8, status:'active' },
]

export default function CollegeStudents() {
  const [students, setStudents] = useState<Student[]>(initialStudents)
  const [search, setSearch] = useState('')
  const [yearFilter, setYearFilter] = useState('All')
  const [showAdd, setShowAdd] = useState(false)
  const [showCSV, setShowCSV] = useState(false)
  const [newStudent, setNewStudent] = useState({ name:'', email:'', course:'', gradYear:'2025', city:'' })
  const fileRef = useRef<HTMLInputElement>(null)

  const set = (k: string, v: string) => setNewStudent(s => ({ ...s, [k]: v }))

  const filtered = students.filter(s => {
    const q = search.toLowerCase()
    return (s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q) || s.course.toLowerCase().includes(q)) &&
      (yearFilter === 'All' || s.gradYear === Number(yearFilter))
  })

  const addStudent = (e: React.FormEvent) => {
    e.preventDefault()
    const s: Student = {
      id: Date.now().toString(), name: newStudent.name, email: newStudent.email,
      course: newStudent.course, gradYear: Number(newStudent.gradYear), city: newStudent.city,
      skills: [], apps: 0, status: 'active'
    }
    setStudents(p => [s, ...p])
    setNewStudent({ name:'', email:'', course:'', gradYear:'2025', city:'' })
    setShowAdd(false)
  }

  const handleCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const lines = (ev.target?.result as string).split('\n').filter(Boolean)
      const newStudents: Student[] = lines.slice(1).map((line, i) => {
        const [name, email, course, gradYear, city] = line.split(',').map(s => s.trim())
        return { id: `csv-${i}`, name: name||'', email: email||'', course: course||'', gradYear: Number(gradYear)||2025, city: city||'', skills:[], apps:0, status:'active' }
      }).filter(s => s.name)
      setStudents(p => [...newStudents, ...p])
      setShowCSV(false)
    }
    reader.readAsText(file)
  }

  return (
    <div className="p-6 max-w-6xl">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="page-title">Students</h1>
          <p className="text-gray-500 text-sm mt-1">{students.length} students registered · {students.filter(s=>s.status==='active').length} active</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowCSV(!showCSV)} className="btn-secondary text-sm flex items-center gap-2"><Upload size={15}/>Import CSV</button>
          <button onClick={() => setShowAdd(!showAdd)} className="btn-primary text-sm flex items-center gap-2"><Plus size={15}/>Add Student</button>
        </div>
      </div>

      {/* CSV import panel */}
      {showCSV && (
        <div className="card p-5 mb-5 border-l-4 border-l-black">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-black text-sm">Import students via CSV</h3>
              <p className="text-xs text-gray-500 mt-0.5">CSV format: name, email, course, graduation_year, city</p>
            </div>
            <button onClick={() => setShowCSV(false)}><X size={16} className="text-gray-400 hover:text-black"/></button>
          </div>
          <div className="flex gap-3 items-center">
            <input ref={fileRef} type="file" accept=".csv" onChange={handleCSV} className="hidden"/>
            <button onClick={() => fileRef.current?.click()} className="btn-primary text-sm px-4 py-2 flex items-center gap-2"><Upload size={14}/>Choose CSV file</button>
            <a href="#" className="text-xs text-black underline flex items-center gap-1"><Download size={12}/>Download template</a>
          </div>
        </div>
      )}

      {/* Add student form */}
      {showAdd && (
        <div className="card p-5 mb-5 border-l-4 border-l-black">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-black text-sm">Add student manually</h3>
            <button onClick={() => setShowAdd(false)}><X size={16} className="text-gray-400 hover:text-black"/></button>
          </div>
          <form onSubmit={addStudent} className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div><label className="label">Full name</label><input className="input-field" placeholder="Student name" required value={newStudent.name} onChange={e=>set('name',e.target.value)}/></div>
            <div><label className="label">Email</label><input type="email" className="input-field" placeholder="student@college.edu" required value={newStudent.email} onChange={e=>set('email',e.target.value)}/></div>
            <div><label className="label">Course</label><input className="input-field" placeholder="B.Tech CSE" required value={newStudent.course} onChange={e=>set('course',e.target.value)}/></div>
            <div>
              <label className="label">Grad year</label>
              <select className="select-field" value={newStudent.gradYear} onChange={e=>set('gradYear',e.target.value)}>
                {[2024,2025,2026,2027,2028].map(y=><option key={y}>{y}</option>)}
              </select>
            </div>
            <div><label className="label">City</label><input className="input-field" placeholder="City" value={newStudent.city} onChange={e=>set('city',e.target.value)}/></div>
            <div className="flex items-end">
              <button type="submit" className="btn-primary text-sm px-5 py-2.5 w-full">Add Student</button>
            </div>
          </form>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
          <input className="input-field pl-9" placeholder="Search by name, email, or course..." value={search} onChange={e=>setSearch(e.target.value)}/>
        </div>
        <div className="flex gap-2">
          {['All','2024','2025','2026','2027'].map(y => (
            <button key={y} onClick={() => setYearFilter(y)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${yearFilter===y?'bg-black text-white':'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{y}</button>
          ))}
        </div>
      </div>

      {/* Students table */}
      <div className="card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Student</th>
              <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Course</th>
              <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Skills</th>
              <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Applications</th>
              <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map(s => (
              <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600 text-xs flex-shrink-0">
                      {s.name.split(' ').map(n=>n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-black">{s.name}</div>
                      <div className="text-xs text-gray-400">{s.email}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 hidden sm:table-cell">
                  <div className="text-sm text-gray-700">{s.course}</div>
                  <div className="text-xs text-gray-400">{s.gradYear} · {s.city}</div>
                </td>
                <td className="p-4 hidden md:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {s.skills.slice(0,2).map(sk=><span key={sk} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{sk}</span>)}
                    {s.skills.length === 0 && <span className="text-xs text-gray-300">—</span>}
                  </div>
                </td>
                <td className="p-4">
                  <span className="font-display font-bold text-black">{s.apps}</span>
                  <span className="text-xs text-gray-400 ml-1">apps</span>
                </td>
                <td className="p-4">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${s.status==='active'?'bg-black text-white':'bg-gray-100 text-gray-500'}`}>
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <div className="text-3xl mb-2">🎓</div>
            <div className="text-sm">No students found.</div>
          </div>
        )}
      </div>
    </div>
  )
}
