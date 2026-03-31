import { ArrowRight, Users, Building2, Globe, Heart } from 'lucide-react'
import Link from 'next/link'

const team = [
  { name: 'Aisha Mbeki', role: 'Co-founder & CEO', avatar: 'AM', bio: 'Former recruiter at LinkedIn. Passionate about democratizing career access.' },
  { name: 'James Park', role: 'Co-founder & CTO', avatar: 'JP', bio: 'Ex-engineer at Stripe. Built products used by millions of people.' },
  { name: 'Priya Nair', role: 'Head of Design', avatar: 'PN', bio: 'Crafting thoughtful experiences that connect people with opportunity.' },
  { name: 'Omar Hassan', role: 'Head of Growth', avatar: 'OH', bio: 'Scaling platforms from 0 to millions of users through community.' },
]

const values = [
  { icon: '🌍', title: 'Inclusive by design', desc: 'We believe opportunity should not depend on who you know.' },
  { icon: '⚡', title: 'Radically simple', desc: 'We strip away complexity to make applying effortless.' },
  { icon: '🤝', title: 'Human first', desc: 'We design every interaction with empathy at the core.' },
  { icon: '🔒', title: 'Trust & transparency', desc: 'We never sell your data. Your privacy is foundational.' },
]

const milestones = [
  { year: '2021', event: 'Karyr founded in a dorm room at Stanford.' },
  { year: '2022', event: 'Launched beta with 50 universities, 5,000 students.' },
  { year: '2023', event: 'Series A funding. Expanded to 500+ schools and 2,000+ employers.' },
  { year: '2024', event: 'Crossed 200K placements. Launched employer tools.' },
  { year: '2025', event: 'Karyr goes international. Now in 12 countries.' },
]

export default function AboutPage() {
  return (
    <>
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gray-100 rounded-full blur-3xl opacity-80" />
        </div>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 text-sm font-semibold px-4 py-2 rounded-full mb-6 border border-gray-200">
            <Heart size={14} /> Our story
          </div>
          <h1 className="font-display text-5xl sm:text-6xl font-extrabold text-black tracking-tight mb-6">
            We believe everyone deserves a
            <span className="text-gray-400"> great start.</span>
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto">
            Karyr was born from a simple frustration: finding jobs as a student was broken. We're fixing that — one opportunity at a time.
          </p>
        </div>
      </section>

      <section className="border-y border-gray-100 bg-white py-10 mb-20">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { icon: <Users size={20} />, value: '200K+', label: 'Students placed' },
            { icon: <Building2 size={20} />, value: '12K+', label: 'Partner companies' },
            { icon: <Globe size={20} />, value: '12', label: 'Countries' },
            { icon: <Heart size={20} />, value: '95%', label: 'Satisfaction rate' },
          ].map((s, i) => (
            <div key={i}>
              <div className="flex justify-center mb-2 text-black">{s.icon}</div>
              <div className="font-display text-3xl font-bold text-black">{s.value}</div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="section-heading mb-5">Our mission</h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-5">The job search process is broken — it favors those with connections, not those with potential. We built Karyr to level the playing field.</p>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">We connect every student and early-career professional with the employers who will value them most — regardless of where they went to school or who they know.</p>
            <Link href="/signup" className="btn-primary inline-flex items-center gap-2">Join the mission <ArrowRight size={16} /></Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {values.map((v) => (
              <div key={v.title} className="card p-5">
                <div className="text-2xl mb-3">{v.icon}</div>
                <h3 className="font-display font-semibold text-black text-sm mb-2">{v.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-gray-100 py-20 mb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading text-center mb-12">How we got here</h2>
          <div className="relative">
            <div className="absolute left-16 top-0 bottom-0 w-px bg-gray-200" />
            <div className="space-y-8">
              {milestones.map((m) => (
                <div key={m.year} className="flex items-start gap-8">
                  <div className="w-12 flex-shrink-0 text-right">
                    <span className="font-display font-bold text-black text-sm">{m.year}</span>
                  </div>
                  <div className="relative flex-1 pl-6 pb-2">
                    <div className="absolute left-[-4px] top-1 w-2 h-2 bg-black rounded-full" />
                    <p className="text-gray-600 text-sm leading-relaxed">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center mb-12">
          <h2 className="section-heading">The team behind Karyr</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">We're a small team with a big mission.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {team.map((member) => (
            <div key={member.name} className="card p-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-black flex items-center justify-center text-white font-display font-bold text-xl mx-auto mb-4">
                {member.avatar}
              </div>
              <h3 className="font-display font-semibold text-black">{member.name}</h3>
              <p className="text-xs text-gray-500 font-medium mb-3">{member.role}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-black rounded-3xl p-10 sm:p-16 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">Come build with us.</h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-8 text-lg">Whether you're a student, employer, or someone who shares our mission — there's a place for you at Karyr.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/signup" className="bg-white text-black hover:bg-gray-100 font-semibold text-base px-8 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2">
              Get started free <ArrowRight size={16} />
            </Link>
            <Link href="mailto:hello@karyr.com" className="border border-gray-700 text-white hover:bg-gray-900 font-semibold text-base px-8 py-3.5 rounded-xl transition-all">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
