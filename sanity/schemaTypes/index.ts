import { type SchemaTypeDefinition } from 'sanity'
import profile from './profile'
import project from './project'
import skill from './skill'
import experience from './experience'
import education from './education'
import testimonial from './testimonial'
import certification from './certification'
import achievement from './achievement'
import service from './service'
import contact from './contact'
import siteSettings from './siteSettings'
import navigation from './navigation'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [


    profile,
    project,
    skill,
    experience,
    education,
    testimonial,
    certification,
    achievement,
  
    service,
    contact,
    siteSettings,
    navigation,
  ],
}
