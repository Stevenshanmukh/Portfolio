import {education} from './education'
import {experience} from './experience'
import {profile} from './profile'
import {project} from './project'
import {projectCategory} from './projectCategory'
import {siteSettings} from './siteSettings'
import {skillCategory} from './skillCategory'

export const schemaTypes = [
  profile,
  siteSettings,
  experience,
  project,
  projectCategory,
  skillCategory,
  education,
]

// One fixed document each; _id equals the type name.
export const singletonTypes = new Set(['profile', 'siteSettings'])
