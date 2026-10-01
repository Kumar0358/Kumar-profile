import portrait from './assets/portrait.jpg'
import lounge from './assets/lounge.jpg'
import image1 from './assets/image1.jpg'
import image2 from './assets/image2.jpg'
import image3 from './assets/image3.jpg'
import image4 from './assets/image4.png'
import image5 from './assets/image5.png'
import image6 from './assets/image6.png'

import image7 from './assets/image7.jpg'
import image8 from './assets/image8.jpg'


export const profile = {
  name: 'Pacharla Kumara Swamy',
  firstName: 'Pacharla',
  lastName: 'Kumara Swamy',
  monogram: 'PKS',
  initial: 'K',
  role: 'Software & Generative AI Developer',
  roleLine: ['Software Developer', 'Generative AI Engineer'],
  tagline: 'Rooted in values, driven by technology — building intelligent systems for the future.',
  location: 'Hyderabad, Telangana',
  availability: 'Open to conversations',
  heroImage: portrait,
  loungeImage: lounge,
  Image1: image1,
  Image2: image2,
  Image3: image3,
  Image4: image4,
  Image5: image5,
  Image6: image6,
  
  Image7: image7,
  Image8: image8,

  mobile: '6303539731',
  fatherMobile: '8179795930',
  ctc: '₹9 LPA',
  education: {
    degree: 'B.Tech · Electrical & Electronics Engineering',
    college: 'JNTU College of Engineering, Anantapur',
  },
  languages: ['Telugu', 'Hindi', 'English', 'Spanish'],
  background: 'Traditional agricultural family',
  nativeAddress:
    'Vengalapalli Village, Kondamarri Post, Chowdepalli Mandal, Chittoor District, Andhra Pradesh',
  company: 'Ajuserv IT Solutions Pvt Ltd',
  companyAddress: '2nd Floor, Plot No 39, Road No 5, Jubilee Hills, Hyderabad, Telangana 500033',
}

/* Scrolling marquee — his working vocabulary */
export const techMarquee = [
  'Python',
  'FastAPI',
  'Generative AI',
  'LangChain',
  'RAG',
  'Azure',
  'PostgreSQL',
  'Machine Learning',
  'REST APIs',
  'Docker',
  'GitHub',
  'AI Automation',
]

/* Bento "at a glance" — mixed tile sizes */
export const bento = {
  focus: { label: 'Current focus', value: 'Generative AI', note: 'assistants · RAG · automation' },
  role: { label: 'Role', value: 'Software & GenAI Developer', note: 'Ajuserv IT Solutions' },
  education: { label: 'Education', value: 'B.Tech — EEE', note: 'JNTU Anantapur' },
  income: { label: 'Annual income', value: '~₹9 LPA' },
  location: { label: 'Based in', value: 'Hyderabad' },
  languages: { label: 'Languages', value: ['Telugu', 'Hindi', 'English', 'Spanish'] },
  roots: {
    label: 'Roots',
    value: 'Agricultural family',
    note: 'Vengalapalli, Chittoor Dist., Andhra Pradesh',
  },
}

export const specializations = [
  'Generative AI',
  'Python Backend',
  'FastAPI',
  'AI Automation',
  'Cloud Integration',
  'Enterprise Applications',
  'AI Assistants',
  'RAG Applications',
]

export type SkillGroup = { label: string; items: string[] }
export const skillGroups: SkillGroup[] = [
  { label: 'Languages & Core', items: ['Python', 'HTML / CSS', 'REST APIs'] },
  { label: 'Generative AI', items: ['Generative AI', 'LangChain', 'RAG Systems', 'AI Assistants'] },
  { label: 'Backend & Data', items: ['FastAPI', 'PostgreSQL', 'Machine Learning'] },
  { label: 'Cloud & Tooling', items: ['Azure', 'Docker', 'GitHub'] },
]

export const experience = {
  role: 'Software & Generative AI Developer',
  company: 'Ajuserv IT Solutions Pvt Ltd',
  location: 'Hyderabad, Telangana',
  period: 'Present',
  points: [
    'Design and build Generative AI solutions — intelligent assistants and RAG-based applications for enterprise use cases.',
    'Develop robust Python backends and scalable APIs with FastAPI for high-performance services.',
    'Engineer enterprise applications with a focus on reliability, maintainability, and clean architecture.',
    'Implement AI automation workflows that streamline operations and reduce manual effort.',
    'Integrate cloud services and modern AI to deliver secure, production-ready systems.',
  ],
}

/* The only genuinely numbered sequence on the page: a chronology */
export const journey = [
  {
    year: 'Roots',
    title: 'Agricultural family beginnings',
    text: 'Grew up in Vengalapalli village in a hardworking farming family, learning simplicity, honesty, and perseverance.',
  },
  {
    year: 'Foundation',
    title: 'School education',
    text: 'Built early discipline and curiosity, with a strong pull toward mathematics and technology.',
  },
  {
    year: 'Engineering',
    title: 'B.Tech — JNTU Anantapur',
    text: 'Earned a degree in Electrical & Electronics Engineering, building a solid technical foundation.',
  },
  {
    year: 'Discovery',
    title: 'Turning to software',
    text: 'Channeled curiosity into software development and self-driven learning in modern programming.',
  },
  {
    year: 'Craft',
    title: 'Building real systems',
    text: 'Began delivering real-world applications, backend systems, and scalable software solutions.',
  },
  {
    year: 'Specialization',
    title: 'Generative AI focus',
    text: 'Specialized in AI assistants, RAG applications, and intelligent automation systems.',
  },
  {
    year: 'Today',
    title: 'Developer at Ajuserv, Hyderabad',
    text: 'Now building AI-powered enterprise software — and still growing every day.',
  },
]

export type FamilyMember = {
  rel: string
  name: string
  note?: string
  tel?: string
  meta?: { k: string; v: string }[]
  children?: string[]
}

export const family: FamilyMember[] = [
  {
    rel: 'Father',
    name: 'Pacharla Narasimhulu',
    tel: '8179795930',
    meta: [{ k: 'Profession', v: 'Farmer' }],
  },
  {
    rel: 'Mother',
    name: 'Pacharla Rajamma',
    note: '(Late)',
    meta: [{ k: 'In memory', v: 'Remembered with love & gratitude' }],
  },
  {
    rel: 'Sister',
    name: 'Lalitha',
    meta: [
      { k: 'Spouse', v: 'Venkataramana' },
      { k: 'Profession', v: 'Self Employed' },
    ],
    children: ['Hadwika', 'Rohan'],
  },
  {
    rel: 'Sister',
    name: 'Kusuma',
    meta: [
      { k: 'Spouse', v: 'Nagendra Babu' },
      { k: 'Profession', v: 'Software Engineer' },
    ],
    children: ['Mayank', 'Devisha', 'Devansh'],
  },
]

export const values = [
  { icon: '🎯', h: 'Discipline', p: 'Consistency and focus in everything I pursue.' },
  { icon: '🌾', h: 'Family Values', p: 'Honouring relationships, elders, and traditions.' },
  { icon: '💪', h: 'Hard Work', p: 'Earning success through honest effort.' },
  { icon: '🤝', h: 'Respect', p: 'Treating everyone with dignity and humility.' },
  { icon: '🛡️', h: 'Responsibility', p: 'Owning my commitments fully and reliably.' },
  { icon: '📚', h: 'Continuous Learning', p: 'Always growing and embracing new skills.' },
  { icon: '💡', h: 'Innovation', p: 'Building creative, intelligent solutions.' },
  { icon: '🌿', h: 'Simplicity', p: 'Living grounded, with clarity and calm.' },
]

export const gallery = [
  { src: profile.heroImage, cap: 'Portrait' },
  { src: profile.loungeImage, cap: 'Off the clock' },
  { src: profile.Image1, cap: 'Off the clock' },
  { src: profile.Image2, cap: 'Off the clock' },
  { src: profile.Image3, cap: 'Off the clock' },
  
  { src: profile.Image4, cap: 'Off the clock' },
  { src: profile.Image5, cap: 'Off the clock' },
  { src: profile.Image6, cap: 'Off the clock' },
  
  { src: profile.Image7, cap: 'Off the clock' },
  { src: profile.Image8, cap: 'Off the clock' },
]

export const nav = [
  { id: 'about', label: 'About' },
  { id: 'glance', label: 'Profile' },
  { id: 'experience', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'journey', label: 'Journey' },
  { id: 'family', label: 'Family' },
  { id: 'contact', label: 'Contact' },
]
