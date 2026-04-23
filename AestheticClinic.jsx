import { useState, useEffect, useRef } from 'react'

// ─── Fonts & Global Styles ────────────────────────────────────────────────────

const FONTS_STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');
html { scroll-behavior: smooth; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes slideLeft {
  from { opacity: 0; transform: translateX(60px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes slideRight {
  from { opacity: 0; transform: translateX(-60px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.92); }
  to   { opacity: 1; transform: scale(1); }
}
.animate-fade-up    { animation: fadeUp    0.7s ease forwards; }
.animate-fade-in    { animation: fadeIn    0.7s ease forwards; }
.animate-slide-left { animation: slideLeft 0.7s ease forwards; }
.animate-slide-right{ animation: slideRight 0.7s ease forwards; }
.animate-scale-in   { animation: scaleIn   0.7s ease forwards; }
.anim-hidden { opacity: 0; }
`

// ─── Color Constants ──────────────────────────────────────────────────────────

const ESPRESSO = '#231510'

// ─── Scroll Animation Hook ────────────────────────────────────────────────────

function useScrollReveal(animClass = 'animate-fade-up', delay = 0) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.remove('anim-hidden')
            el.classList.add(animClass)
          }, delay)
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [animClass, delay])
  return ref
}

// ─── Navigation ───────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Home',     href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'About Us', href: '#about' },
  { label: 'Reviews',  href: '#reviews' },
  { label: 'FAQ',      href: '#faq' },
]

// ─── Services Data (real) ─────────────────────────────────────────────────────

const SERVICES = [
  {
    id: 'laser-hair',
    title: 'Laser Hair Removal',
    subtitle: 'Alma laser technology — all skin types',
    image: 'https://images.pexels.com/photos/35103882/pexels-photo-35103882.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'carbon-laser',
    title: 'Carbon Laser Toning',
    subtitle: 'Deep cleanse & skin brightening',
    image: 'https://images.pexels.com/photos/29021129/pexels-photo-29021129.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'tattoo',
    title: 'Laser Tattoo Removal',
    subtitle: 'Safe, effective ink clearance',
    image: 'https://images.pexels.com/photos/35103914/pexels-photo-35103914.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'acne',
    title: 'Acne Treatment',
    subtitle: 'Targeted solutions for clear skin',
    image: 'https://images.pexels.com/photos/3985354/pexels-photo-3985354.jpeg?auto=compress&cs=tinysrgb&w=800',
    isWide: true,
  },
  {
    id: 'ipixel',
    title: 'iPixel Laser Treatment',
    subtitle: 'Skin resurfacing & rejuvenation',
    image: 'https://images.pexels.com/photos/29021130/pexels-photo-29021130.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'prp',
    title: 'GFC PRP Hair Treatment',
    subtitle: 'Clinically proven hair fall reduction',
    image: 'https://images.pexels.com/photos/5069506/pexels-photo-5069506.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
]

// ─── Reviews Data (real from Google Maps) ────────────────────────────────────

const REVIEWS = [
  {
    name: 'Monika Yadav',
    rating: 5,
    text: 'I had severe acne and the doctor provided the best treatment. Now I\'m very happy — all my acne got reduced. So confident now. Highly recommend!',
    tag: 'Acne Treatment',
  },
  {
    name: 'Ranga Dhama',
    rating: 5,
    text: 'I visited for my hair fall problem. Doctor examined and provided GFC PRP treatment. Hair fall reduced in a single session. Highly recommended!',
    tag: 'GFC PRP Treatment',
  },
  {
    name: 'Verified Client',
    rating: 5,
    text: 'Doctor is having very good Alma laser equipment for laser hair removal treatment. Results were excellent.',
    tag: 'Laser Hair Removal',
  },
  {
    name: 'Verified Client',
    rating: 5,
    text: 'Price is also budget friendly. I highly recommend this clinic to anyone looking for quality laser treatments.',
    tag: 'Carbon Laser Toning',
  },
  {
    name: 'Verified Client',
    rating: 5,
    text: 'Good clinic to visit, good ambience, and good service. The staff is very professional and welcoming.',
    tag: 'General',
  },
]

// ─── FAQ Data ─────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    question: 'What laser technology does Aesthetic+ Clinic use?',
    answer: 'We use the Alma laser system — one of the most advanced and trusted platforms for laser hair removal and skin treatments. It is safe for all skin types including Indian skin tones.',
  },
  {
    question: 'Is laser hair removal painful?',
    answer: 'Most clients describe it as a mild snapping sensation. Our Alma laser system has a built-in cooling mechanism that makes the procedure comfortable. No downtime is required.',
  },
  {
    question: 'How many sessions are needed for laser hair removal?',
    answer: 'Typically 6–8 sessions spaced 4–6 weeks apart for optimal results. The exact number depends on your hair type, skin tone, and the treatment area.',
  },
  {
    question: 'Are the treatments safe for Indian skin?',
    answer: 'Absolutely. All our procedures are performed by certified specialists using FDA-approved equipment specifically calibrated for Indian skin tones. We conduct a thorough consultation before any treatment.',
  },
  {
    question: 'How much do treatments cost?',
    answer: 'We are known for being budget-friendly without compromising on quality. Pricing varies by treatment area and type. Call us at 076767 95999 or visit the clinic for a free consultation and transparent pricing.',
  },
  {
    question: 'What should I expect on my first visit?',
    answer: 'Your first visit begins with a detailed skin assessment and consultation. Our specialist will understand your goals and recommend a personalized treatment plan. No procedure is performed without your informed consent.',
  },
]

// ─── About Mosaic Images ──────────────────────────────────────────────────────

const ABOUT_IMAGES = [
  'https://images.pexels.com/photos/10822254/pexels-photo-10822254.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/3985354/pexels-photo-3985354.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/35103916/pexels-photo-35103916.jpeg?auto=compress&cs=tinysrgb&w=600',
]

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar({ scrolled, mobileMenuOpen, setMobileMenuOpen }) {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300${scrolled ? ' shadow-md border-b border-gray-100' : ''}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <span style={{ fontFamily: "'Cormorant Garamond', serif", color: ESPRESSO }} className="text-2xl font-semibold tracking-widest">
          AESTHETIC<span className="text-[#E9D2CA]">+</span>
        </span>
        <div className="hidden md:flex gap-8">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} style={{ fontFamily: "'DM Sans', sans-serif" }}
              className="text-sm text-[#231510] hover:opacity-60 transition-opacity">{link.label}</a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-4">
          <a href="tel:07676795999" style={{ fontFamily: "'DM Sans', sans-serif" }}
            className="text-sm text-[#231510]/70 hover:text-[#231510] transition-colors">076767 95999</a>
          <a href="#book" style={{ fontFamily: "'DM Sans', sans-serif" }}
            className="bg-[#231510] text-white text-sm px-5 py-2 rounded-full hover:opacity-80 transition-opacity">
            Book Appointment
          </a>
        </div>
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={ESPRESSO} strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} style={{ fontFamily: "'DM Sans', sans-serif" }}
              className="text-sm text-[#231510] hover:opacity-60 transition-opacity"
              onClick={() => setMobileMenuOpen(false)}>{link.label}</a>
          ))}
          <a href="tel:07676795999" style={{ fontFamily: "'DM Sans', sans-serif" }}
            className="bg-[#231510] text-white text-sm px-5 py-2 rounded-full text-center hover:opacity-80 transition-opacity">
            Call: 076767 95999
          </a>
        </div>
      )}
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const headRef  = useScrollReveal('animate-slide-right', 0)
  const subRef   = useScrollReveal('animate-fade-up', 150)
  const btnRef   = useScrollReveal('animate-fade-up', 300)
  const imgRef   = useScrollReveal('animate-slide-left', 100)

  return (
    <section id="hero" className="min-h-screen bg-[#FFF0EA] flex items-center pt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span style={{ fontFamily: "'DM Sans', sans-serif" }}
              className="inline-block bg-[#E9D2CA] text-[#231510] text-xs px-4 py-1 rounded-full mb-6">
              ⭐ 4.8 · 317 Reviews · RT Nagar, Bengaluru
            </span>
            <h1 ref={headRef} style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="anim-hidden text-5xl md:text-7xl font-semibold text-[#231510] leading-tight mb-6">
              BENGALURU'S TRUSTED LASER & AESTHETIC CLINIC
            </h1>
            <p ref={subRef} style={{ fontFamily: "'DM Sans', sans-serif" }}
              className="anim-hidden text-base md:text-lg text-[#231510]/70 mb-8 max-w-md">
              Advanced Alma laser treatments for hair removal, carbon toning, tattoo removal, acne & more — at budget-friendly prices.
            </p>
            <div ref={btnRef} className="anim-hidden flex flex-wrap gap-3 mb-8">
              <a href="tel:07676795999" style={{ fontFamily: "'DM Sans', sans-serif" }}
                className="bg-[#231510] text-white px-8 py-3 rounded-full text-sm hover:opacity-80 transition-opacity">
                Call: 076767 95999
              </a>
              <a href="#services" style={{ fontFamily: "'DM Sans', sans-serif" }}
                className="border border-[#231510] text-[#231510] px-6 py-3 rounded-full text-sm hover:bg-[#231510] hover:text-white transition-colors">
                View Services →
              </a>
            </div>
            <div className="flex flex-wrap gap-3">
              {['Laser Hair Removal →', 'Carbon Laser Toning →', 'Tattoo Removal →'].map((pill) => (
                <span key={pill} style={{ fontFamily: "'DM Sans', sans-serif" }}
                  className="border border-[#E9D2CA] bg-white text-[#231510]/70 px-4 py-1.5 rounded-full text-xs">
                  {pill}
                </span>
              ))}
            </div>
          </div>
          <div ref={imgRef} className="anim-hidden">
            <img src="https://images.pexels.com/photos/19239114/pexels-photo-19239114.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Aesthetic+ Clinic laser treatment"
              className="w-full h-[500px] md:h-[600px] object-cover rounded-3xl shadow-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────

function StatsBar() {
  const ref = useScrollReveal('animate-fade-up', 0)
  const stats = [
    { value: '4.8 ⭐', label: 'Google Rating' },
    { value: '317+', label: 'Verified Reviews' },
    { value: 'Alma', label: 'Laser Technology' },
    { value: '6+', label: 'Treatments Offered' },
  ]
  return (
    <section className="bg-[#231510] py-10 px-6">
      <div ref={ref} className="anim-hidden max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-3xl font-semibold text-[#E9D2CA]">{s.value}</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-xs text-white/50 mt-1 uppercase tracking-widest">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Services ─────────────────────────────────────────────────────────────────

function ServiceCard({ service, delay }) {
  const ref = useScrollReveal('animate-scale-in', delay)
  return (
    <div ref={ref}
      className={`anim-hidden relative rounded-2xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl ${service.isWide ? 'md:col-span-2 h-56' : 'h-72'}`}
      style={{ backgroundImage: `url(${service.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-xs text-white/60 uppercase tracking-widest mb-1">{service.subtitle}</p>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-2xl font-semibold text-white">{service.title}</h3>
      </div>
    </div>
  )
}

function Services() {
  const headRef = useScrollReveal('animate-fade-up', 0)
  return (
    <section id="services" className="py-20 px-6 md:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div ref={headRef} className="anim-hidden mb-12">
          <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-xs tracking-widest text-[#231510]/40 uppercase mb-2">(01) SERVICES</p>
          <div className="flex justify-between items-end">
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-4xl md:text-5xl font-semibold text-[#231510]">Our Treatments</h2>
            <a href="tel:07676795999" style={{ fontFamily: "'DM Sans', sans-serif" }}
              className="hidden md:block border border-[#231510] text-[#231510] px-5 py-2 rounded-full text-sm hover:bg-[#231510] hover:text-white transition-colors">
              Book a Session
            </a>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SERVICES.map((s, i) => <ServiceCard key={s.id} service={s} delay={i * 80} />)}
          {/* Promo card */}
          <div className="anim-hidden bg-[#E9D2CA] rounded-2xl p-8 flex flex-col justify-center gap-3 cursor-pointer transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl min-h-[200px]">
            <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-xs tracking-widest text-[#231510]/60 uppercase">Special Offer</p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-2xl text-[#231510]">First-time clients get</p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-5xl font-bold text-[#231510]">20% OFF</p>
            <a href="tel:07676795999" style={{ fontFamily: "'DM Sans', sans-serif" }}
              className="bg-[#231510] text-white px-5 py-2 rounded-full text-sm w-fit hover:opacity-80 transition-opacity">
              Call to Claim →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── About ────────────────────────────────────────────────────────────────────

const VALUE_PROPS = [
  { icon: 'shield', title: 'Alma Laser Technology', description: 'We use the globally trusted Alma laser platform — precise, safe, and effective for all Indian skin tones.' },
  { icon: 'user',   title: 'Personalised Care', description: 'Every client receives a thorough skin assessment before any treatment. Your goals drive your plan.' },
  { icon: 'heart',  title: 'Budget-Friendly Pricing', description: 'Premium laser treatments at prices that don\'t break the bank. Transparent, no hidden costs.' },
]

function About() {
  const leftRef  = useScrollReveal('animate-slide-right', 0)
  const rightRef = useScrollReveal('animate-slide-left', 150)
  return (
    <section id="about" className="py-20 px-6 md:px-16 bg-[#FFF0EA]">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div ref={leftRef} className="anim-hidden">
            <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-xs tracking-widest text-[#231510]/40 uppercase mb-2">(02) ABOUT US</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-4xl md:text-5xl font-semibold text-[#231510] mb-6">
              RT Nagar's Premier Laser Clinic
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-base text-[#231510]/70 mb-10">
              Located at HMT Layout, RT Nagar, Bengaluru, Aesthetic+ Clinic specialises in advanced laser treatments using the Alma laser system. With a 4.8-star rating across 317 reviews, we are trusted by thousands of clients for safe, effective, and affordable aesthetic care.
            </p>
            {VALUE_PROPS.map((prop) => (
              <div key={prop.title} className="flex gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-[#E9D2CA] flex items-center justify-center flex-shrink-0">
                  {prop.icon === 'shield' && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#231510" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>}
                  {prop.icon === 'user'   && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#231510" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
                  {prop.icon === 'heart'  && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#231510" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>}
                </div>
                <div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="font-semibold text-[#231510] mb-1">{prop.title}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-sm text-[#231510]/70">{prop.description}</p>
                </div>
              </div>
            ))}
            <a href="tel:07676795999" style={{ fontFamily: "'DM Sans', sans-serif" }}
              className="inline-block bg-[#231510] text-white px-8 py-3 rounded-full text-sm hover:opacity-80 transition-opacity mt-2">
              Call Us: 076767 95999
            </a>
          </div>
          <div ref={rightRef} className="anim-hidden relative h-[480px] hidden md:block">
            <img src={ABOUT_IMAGES[0]} alt="Clinic treatment" className="absolute top-0 left-0 w-3/5 h-72 object-cover rounded-2xl shadow-lg" />
            <img src={ABOUT_IMAGES[1]} alt="Laser procedure" className="absolute top-16 right-0 w-2/5 h-56 object-cover rounded-2xl shadow-lg" />
            <img src={ABOUT_IMAGES[2]} alt="Skin care" className="absolute bottom-0 left-8 w-2/5 h-48 object-cover rounded-2xl shadow-lg" />
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Reviews ──────────────────────────────────────────────────────────────────

function StarRating({ count = 5 }) {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#E9A800">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  )
}

function ReviewCard({ review, delay }) {
  const ref = useScrollReveal('animate-scale-in', delay)
  return (
    <div ref={ref} className="anim-hidden bg-[#FFF0EA] rounded-2xl p-6 flex flex-col gap-3 border border-[#E9D2CA]">
      <StarRating count={review.rating} />
      <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-sm text-[#231510]/80 leading-relaxed italic">"{review.text}"</p>
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#E9D2CA]">
        <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-sm font-semibold text-[#231510]">{review.name}</p>
        <span style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-xs bg-[#E9D2CA] text-[#231510] px-3 py-1 rounded-full">{review.tag}</span>
      </div>
    </div>
  )
}

function Reviews() {
  const headRef = useScrollReveal('animate-fade-up', 0)
  return (
    <section id="reviews" className="py-20 px-6 md:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div ref={headRef} className="anim-hidden text-center mb-12">
          <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-xs tracking-widest text-[#231510]/40 uppercase mb-2">(03) REVIEWS</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-4xl md:text-5xl font-semibold text-[#231510] mb-3">What Our Clients Say</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-sm text-[#231510]/50">4.8 ⭐ · 317 verified Google reviews</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => <ReviewCard key={i} review={r} delay={i * 100} />)}
        </div>
        <div className="text-center mt-10">
          <a href="https://www.google.com/maps/place/Aesthetic%2B+Clinic/@13.0285683,77.5930551,17z" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
            className="inline-block border border-[#231510] text-[#231510] px-8 py-3 rounded-full text-sm hover:bg-[#231510] hover:text-white transition-colors">
            Read All 317 Reviews on Google →
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function FAQ({ openFaq, setOpenFaq }) {
  const headRef = useScrollReveal('animate-fade-up', 0)
  return (
    <section id="faq" className="py-20 px-6 md:px-16 bg-[#FFF0EA]">
      <div className="max-w-3xl mx-auto">
        <div ref={headRef} className="anim-hidden text-center mb-12">
          <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-xs tracking-widest text-[#231510]/40 uppercase mb-2">(04) FAQ</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-4xl md:text-5xl font-semibold text-[#231510]">Frequently Asked Questions</h2>
        </div>
        {FAQ_ITEMS.map((item, index) => {
          const ref = useScrollReveal('animate-fade-up', index * 80)
          return (
            <div key={index} ref={ref} className="anim-hidden border-b border-[#E9D2CA]">
              <button className="w-full flex justify-between items-center py-5 text-left"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                <span style={{ fontFamily: "'DM Sans', sans-serif" }} className="font-medium text-[#231510] text-base pr-4">{item.question}</span>
                <span className="text-xl text-[#231510] font-light flex-shrink-0">{openFaq === index ? '−' : '+'}</span>
              </button>
              <div className="overflow-hidden transition-all duration-300 ease-in-out"
                style={openFaq === index ? { maxHeight: '300px', opacity: 1 } : { maxHeight: '0px', opacity: 0 }}>
                <div className="pb-5">
                  <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-sm text-[#231510]/70 leading-relaxed">{item.answer}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────

function CTABanner() {
  const ref = useScrollReveal('animate-scale-in', 0)
  return (
    <section id="book" className="py-24 px-6 bg-[#E9D2CA] text-center">
      <div ref={ref} className="anim-hidden max-w-4xl mx-auto">
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }}
          className="text-4xl md:text-6xl italic font-semibold text-[#231510] leading-tight mb-4">
          Your Best Skin Starts Here.
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-[#231510]/70 mb-8 text-base">
          Visit us at HMT Layout, RT Nagar, Bengaluru · Open until 9 PM
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="tel:07676795999" style={{ fontFamily: "'DM Sans', sans-serif" }}
            className="bg-[#231510] text-white px-10 py-4 rounded-full text-sm hover:opacity-80 transition-opacity">
            Call: 076767 95999
          </a>
          <a href="https://wa.me/917676795999" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
            className="border border-[#231510] text-[#231510] px-10 py-4 rounded-full text-sm hover:bg-[#231510] hover:text-white transition-colors">
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const ref = useScrollReveal('animate-fade-up', 0)
  return (
    <footer className="bg-[#231510] text-white py-16 px-6 md:px-16">
      <div ref={ref} className="anim-hidden max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-2xl tracking-widest text-white mb-2">
              AESTHETIC<span className="text-[#E9D2CA]">+</span>
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-sm text-white/50 mb-6">
              Advanced laser & aesthetic treatments in Bengaluru.
            </p>
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((l) => (
                <a key={l.href} href={l.href} style={{ fontFamily: "'DM Sans', sans-serif" }}
                  className="text-sm text-white/50 hover:text-white transition-colors w-fit">{l.label}</a>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="font-semibold text-white mb-4">Services</p>
            <div className="flex flex-col gap-2">
              {SERVICES.map((s) => (
                <p key={s.id} style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-sm text-white/50">{s.title}</p>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="font-semibold text-white mb-4">Contact Us</p>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3 text-sm text-white/60">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span style={{ fontFamily: "'DM Sans', sans-serif" }}>iQURE lab, 479, 6th Main Rd, opp. BMTC Bus Depot, HMT Layout, RT Nagar, Bengaluru 560032</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/60">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.18 6.18l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <a href="tel:07676795999" style={{ fontFamily: "'DM Sans', sans-serif" }} className="hover:text-white transition-colors">076767 95999</a>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/60">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>
                <a href="http://aestheticplusclinic.com" style={{ fontFamily: "'DM Sans', sans-serif" }} className="hover:text-white transition-colors">aestheticplusclinic.com</a>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/60">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span style={{ fontFamily: "'DM Sans', sans-serif" }}>Open daily · Closes 9 PM</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 text-center">
          <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-xs text-white/30">
            © 2024 Aesthetic+ Clinic, Bengaluru. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

// ─── WhatsApp Button ──────────────────────────────────────────────────────────

function WhatsAppButton() {
  return (
    <a href="https://wa.me/917676795999" target="_blank" rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      aria-label="Chat on WhatsApp">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
      </svg>
    </a>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <style>{FONTS_STYLE}</style>
      <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <Navbar scrolled={scrolled} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
        <Hero />
        <StatsBar />
        <Services />
        <About />
        <Reviews />
        <FAQ openFaq={openFaq} setOpenFaq={setOpenFaq} />
        <CTABanner />
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  )
}
