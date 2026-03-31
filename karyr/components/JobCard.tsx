import { MapPin, Clock, DollarSign, Bookmark } from 'lucide-react'
import Link from 'next/link'

export interface Job {
  id: string
  title: string
  company: string
  location: string
  type: 'Full-time' | 'Part-time' | 'Internship' | 'Contract'
  salary?: string
  logo: string
  tags: string[]
  posted: string
  featured?: boolean
}

const typeColors: Record<string, string> = {
  'Internship':  'bg-gray-100 text-gray-700',
  'Full-time':   'bg-black text-white',
  'Part-time':   'bg-gray-200 text-gray-800',
  'Contract':    'bg-gray-800 text-white',
}

export default function JobCard({ job }: { job: Job }) {
  return (
    <div className={`card p-5 group cursor-pointer relative ${job.featured ? 'ring-1 ring-black' : ''}`}>
      {job.featured && (
        <span className="absolute top-4 right-4 text-xs font-semibold bg-black text-white px-2.5 py-1 rounded-full">
          Featured
        </span>
      )}

      <div className="flex items-start gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-xl font-bold text-gray-700 flex-shrink-0">
          {job.logo}
        </div>
        <div className="min-w-0">
          <h3 className="font-display font-semibold text-black text-base group-hover:text-gray-600 transition-colors truncate">
            {job.title}
          </h3>
          <p className="text-sm text-gray-500">{job.company}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-gray-400">
        <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
        <span className="flex items-center gap-1"><Clock size={12} /> {job.posted}</span>
        {job.salary && <span className="flex items-center gap-1"><DollarSign size={12} /> {job.salary}</span>}
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${typeColors[job.type]}`}>{job.type}</span>
        {job.tags.slice(0, 2).map((tag) => (
          <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{tag}</span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <Link href="/signup" className="text-xs font-semibold text-black hover:text-gray-600 transition-colors">
          Apply now →
        </Link>
        <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-black transition-colors">
          <Bookmark size={14} />
        </button>
      </div>
    </div>
  )
}
