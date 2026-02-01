import React from "react"
import { Gamepad2, Film, Plane, Phone, Globe, Calendar } from "lucide-react"
import { Card, CardContent, CardTitle } from "@/common/components/ui/card";
import { Badge } from "@/common/components/ui/badge";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#000000] p-4 md:p-8">
      <div className="mx-auto max-w-3xl space-y-4">
        <Card className="bg-[#141414] border border-[#2a2a2a] rounded-2xl">
          <CardContent>
            <CardTitle>Juan Salazar</CardTitle>
          </CardContent>
        </Card>
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-4 items-start">
          {/* Avatar */}
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-3xl overflow-hidden bg-gradient-to-br from-amber-200 to-orange-300 flex-shrink-0">
            <img
              src="https://avatars.githubusercontent.com/u/20529328?s=96&v=4"
              alt="Sunil Kumar Avatar"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bio and Interests */}
          <div className="flex-1 space-y-4">
            {/* Bio Card */}
            <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-5">
              <p className="text-white/90 text-base md:text-lg italic leading-relaxed">
                My name is Juan Salazar, I am a software engineer with 4+ years of experience creating modern, clean, and minimal brands that make a lasting impression.
              </p>
            </div>

            {/* Interests */}
            <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-4 flex flex-wrap items-center gap-3">
              <span className="text-white font-semibold text-sm">Interests</span>
              <div className="flex flex-wrap gap-2">
                <InterestTag icon={<Gamepad2 className="w-4 h-4" />} label="Gaming" />
                <InterestTag icon={<Film className="w-4 h-4" />} label="Film Making" />
                <InterestTag icon={<Plane className="w-4 h-4" />} label="Traveling" />
              </div>
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Freelancer Card */}
          <ExperienceCard
            title="Freelancer"
            role="Logo/Brand Designer"
            period="2021 - now"
            points={[
              "Worked on diverse logo and brand identity projects.",
              "Collaborated with clients from multiple countries.",
              "Developed a versatile design skill set.",
              "Adapted to unique challenges and requirements.",
            ]}
          />

          {/* Meetzed Card */}
          <ExperienceCard
            title="Meetzed"
            role="Graphic Designer"
            period="2020 - 2021"
            points={[
              "Collaboration: Supported Lead Designer on projects.",
              "Branding: Crafted unique brand identities.",
              "Tools: Used Illustrator, Photoshop & InDesign.",
            ]}
          />
        </div>

        {/* Skills and Education Row */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Left Column - Tools and Languages */}
          <div className="space-y-4">
            {/* Design Tools */}
            <SkillCard title="Design Tools">
              <div className="flex gap-2">
                <ToolBadge color="bg-[#FF9A00]" text="Ai" />
                <ToolBadge color="bg-[#31A8FF]" text="Ps" />
                <ToolBadge color="bg-[#FF3366]" text="Id" />
                <ToolBadge color="bg-[#FF61F6]" text="Xd" />
              </div>
            </SkillCard>

            {/* Editing Tools */}
            <SkillCard title="Editing Tools">
              <div className="flex gap-2">
                <ToolBadge color="bg-[#9999FF]" text="Ae" />
                <ToolBadge color="bg-[#9999FF]" text="Pr" />
                <div className="w-8 h-8 rounded-lg bg-[#1a1a1a] flex items-center justify-center">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#FF6B35" />
                    <circle cx="8" cy="10" r="2" fill="white" />
                    <circle cx="16" cy="10" r="2" fill="white" />
                    <circle cx="12" cy="16" r="2" fill="white" />
                  </svg>
                </div>
              </div>
            </SkillCard>

            {/* Languages */}
            <SkillCard title="Languages">
              <div className="flex gap-3">
                <span className="text-2xl">🇮🇳</span>
                <span className="text-2xl">🇬🇧</span>
                <span className="text-2xl">🇺🇸</span>
              </div>
            </SkillCard>
          </div>

          {/* Right Column - Education */}
          <div className="space-y-4">
            <EducationCard
              title="High School"
              subtitle="Humanities"
              location="Delhi Cantonment, India"
              period="2017"
            />
            <EducationCard
              title="Diploma"
              subtitle="Animation and Graphic Design"
              location="Delhi, India"
              period="2017-18"
            />
            <EducationCard
              title="Graduation"
              subtitle="Bachelor of fine Arts"
              location="IGNOU Delhi, India"
              period="2017-21"
            />
          </div>
        </div>

        {/* Portfolio Section */}
        <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-white font-semibold text-sm">Portfolio</span>
            <div className="flex flex-wrap gap-2">
              <PortfolioLink icon="🟡" label="Bento" />
              <PortfolioLink icon={<BehanceIcon />} label="Behance" />
              <PortfolioLink icon={<InstagramIcon />} label="Instagram" />
              <PortfolioLink icon={<YoutubeIcon />} label="Youtube" />
              <PortfolioLink icon={<DribbbleIcon />} label="Dribbble" />
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-white font-semibold text-sm">Details</span>
            <div className="flex flex-wrap gap-2">
              <DetailBadge icon={<Calendar className="w-4 h-4" />} label="26 years" />
              <DetailBadge icon={<Globe className="w-4 h-4" />} label="iamsunilfreelancer.com" />
              <DetailBadge icon={<Phone className="w-4 h-4" />} label="+91 9899052055" />
              <DetailBadge icon="🇮🇳" label="India" />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function InterestTag({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <Badge variant="outline" className="flex items-center gap-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full px-3 py-1.5 text-white/80 text-sm cursor-pointer hover:bg-[#222] transition-colors">
      {icon}
      <span>{label}</span>
    </Badge>
  )
}

function ExperienceCard({
  title,
  role,
  period,
  points,
}: {
  title: string
  role: string
  period: string
  points: string[]
}) {
  return (
    <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-5">
      <div className="flex items-start justify-between mb-1">
        <h3 className="text-white text-xl font-semibold">{title}</h3>
        <span className="text-white/60 text-sm border border-[#2a2a2a] rounded-full px-3 py-1">
          {period}
        </span>
      </div>
      <p className="text-white/50 text-sm mb-4">{role}</p>
      <div className="border-t border-[#2a2a2a] pt-4">
        <ul className="space-y-2">
          {points.map((point, i) => (
            <li key={i} className="text-white/70 text-sm flex items-start gap-2">
              <span className="text-white/40 mt-1">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function SkillCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-4 flex items-center gap-4">
      <span className="text-white font-semibold text-sm border-r border-[#2a2a2a] pr-4">{title}</span>
      {children}
    </div>
  )
}

function ToolBadge({ color, text }: { color: string; text: string }) {
  return (
    <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center text-white text-xs font-bold`}>
      {text}
    </div>
  )
}

function EducationCard({
  title,
  subtitle,
  location,
  period,
}: {
  title: string
  subtitle: string
  location: string
  period: string
}) {
  return (
    <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-4 flex items-start justify-between">
      <div>
        <h4 className="text-white text-lg font-semibold">{title}</h4>
        <p className="text-white/50 text-sm">{subtitle}</p>
        <p className="text-white/40 text-sm">{location}</p>
      </div>
      <span className="text-white/60 text-sm border border-[#2a2a2a] rounded-full px-3 py-1">
        {period}
      </span>
    </div>
  )
}

function PortfolioLink({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full px-3 py-1.5 text-white/80 text-sm cursor-pointer hover:bg-[#222] transition-colors">
      <span className="w-4 h-4 flex items-center justify-center">{icon}</span>
      <span>{label}</span>
    </div>
  )
}

function DetailBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full px-3 py-1.5 text-white/80 text-sm">
      <span className="w-4 h-4 flex items-center justify-center">{icon}</span>
      <span>{label}</span>
    </div>
  )
}

// Social Icons
function BehanceIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#1769FF">
      <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 1.211.958 2.029 2.593 2.029.918 0 1.553-.355 1.847-.864h2.316zm-9.9-3.862c-.109-.645-.309-1.064-.635-1.406-.326-.342-.796-.538-1.399-.538-1.097 0-1.694.673-1.879 1.944h3.913zM9.8 17.85c-.757.348-1.894.58-3.218.58H0V6.57h6.365c2.178 0 3.68 1.062 3.68 2.897 0 1.15-.565 2.006-1.635 2.5v.044c1.417.372 2.19 1.563 2.19 2.962 0 1.047-.449 1.881-1.8 2.877zm-3.43-6.72c.956 0 1.488-.38 1.488-1.1 0-.706-.488-1.02-1.388-1.02H2.87v2.12h3.5zm.312 4.82c1.012 0 1.566-.456 1.566-1.271 0-.785-.537-1.22-1.566-1.22H2.87v2.491h3.812z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="url(#instagram-gradient)">
      <defs>
        <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFDC80" />
          <stop offset="50%" stopColor="#F56040" />
          <stop offset="100%" stopColor="#C13584" />
        </linearGradient>
      </defs>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

function YoutubeIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#FF0000">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

function DribbbleIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#EA4C89">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 6.627 5.374 12 12 12 6.626 0 12-5.373 12-12 0-6.627-5.374-12-12-12zm7.867 17.644c-.246-.08-.615-.18-1.084-.279-.47-.1-1.042-.198-1.702-.285a26.94 26.94 0 00-.274-1.44 15.488 15.488 0 00-.597-1.9c1.056-.292 1.937-.627 2.649-1.003.712-.376 1.247-.787 1.61-1.232a4.56 4.56 0 00.684-1.41 5.88 5.88 0 00.215-1.554c0-.847-.162-1.623-.487-2.33a5.335 5.335 0 00-1.392-1.852 6.503 6.503 0 00-2.177-1.22A8.618 8.618 0 0012 3c-.99 0-1.927.144-2.814.432a6.503 6.503 0 00-2.177 1.22 5.335 5.335 0 00-1.392 1.852c-.325.707-.487 1.483-.487 2.33 0 .546.072 1.063.215 1.554.143.49.365.953.684 1.41.363.445.898.856 1.61 1.232.712.376 1.593.71 2.649 1.003a15.488 15.488 0 00-.597 1.9c-.126.48-.214.963-.274 1.44-.66.087-1.232.185-1.702.285-.47.1-.838.199-1.084.28A9.504 9.504 0 013 12c0-2.372.844-4.398 2.532-6.087C7.22 4.224 9.315 3.381 12 3.381c2.685 0 4.78.843 6.468 2.532C20.156 7.602 21 9.628 21 12a9.504 9.504 0 01-1.133 5.644z" />
    </svg>
  )
}
