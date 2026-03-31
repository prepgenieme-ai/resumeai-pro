type Status = 'applied' | 'shortlisted' | 'interview' | 'hired' | 'rejected' | 'active' | 'closed'
const styles: Record<Status, string> = {
  applied:     'bg-gray-100 text-gray-700',
  shortlisted: 'bg-gray-800 text-white',
  interview:   'bg-gray-200 text-gray-900',
  hired:       'bg-black text-white',
  rejected:    'bg-gray-100 text-gray-400',
  active:      'bg-black text-white',
  closed:      'bg-gray-100 text-gray-500',
}
export default function Badge({ status }: { status: Status }) {
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${styles[status]}`}>{status}</span>
}
