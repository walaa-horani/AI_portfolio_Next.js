
import { HeroSection } from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import { TestimonialsSection } from './sections/TestimonialsSection'
import { SkillsSection } from './sections/SkillsSection'
import ContactSection from './sections/ContactSection'
import { ProjectsSection } from './sections/ProjectsSection'

export default function PortfolioContent() {
  return (
    <div>
        
      <HeroSection />
      <AboutSection />
      <TestimonialsSection />
       <SkillsSection />
       <ProjectsSection />
     {/* <ExperienceSection />
      <EducationSection />
   
      <CertificationsSection />
      <AchievementsSection />
      <ServicesSection /> */}
     
      <ContactSection />  
    </div>
  )
}
