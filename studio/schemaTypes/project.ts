import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {defineField, defineType} from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    defineField({name: 'title', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'description',
      type: 'text',
      rows: 4,
      description: 'Card text. Cut off after 5 lines.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'longDescription',
      title: 'Long description',
      type: 'text',
      rows: 8,
      description: 'Shown in the "show more" pop-up. Falls back to the description.',
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'projectCategory'}]}],
      validation: (r) => [r.unique(), r.min(1).warning('Projects without a category only show under "All".')],
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      validation: (r) => r.unique(),
    }),
    defineField({
      name: 'caseStudy',
      title: 'Case study',
      type: 'boolean',
      description: 'Shown as a large case study at the top of the projects section. Three reads best.',
      initialValue: false,
    }),
    defineField({
      name: 'context',
      type: 'string',
      description:
        'Optional line under the title, e.g. "Built at Blue Forest Digital. Client work, so there is no public repo."',
      hidden: ({document}) => !document?.caseStudy,
    }),
    defineField({
      name: 'actsOn',
      title: 'Acts on',
      type: 'string',
      description: 'Optional. With Guardrail and Result, shown as a summary panel when there is no screenshot.',
      hidden: ({document}) => !document?.caseStudy,
    }),
    defineField({
      name: 'guardrail',
      type: 'string',
      hidden: ({document}) => !document?.caseStudy,
    }),
    defineField({
      name: 'result',
      type: 'string',
      hidden: ({document}) => !document?.caseStudy,
    }),
    defineField({
      name: 'caseStudyPoints',
      title: 'Case study points',
      type: 'array',
      of: [{type: 'string'}],
      description:
        'Key facts listed in the case study. Without an artifact image, these fill the visual column instead.',
      hidden: ({document}) => !document?.caseStudy,
    }),
    defineField({
      name: 'artifact',
      type: 'image',
      description: 'A real screenshot or diagram for the case study.',
      hidden: ({document}) => !document?.caseStudy,
      fields: [
        defineField({name: 'alt', title: 'Alt text', type: 'string', description: 'What the image shows, for screen readers.'}),
        defineField({name: 'caption', type: 'string'}),
      ],
    }),
    defineField({
      name: 'image',
      type: 'image',
      description: 'Optional square thumbnail. Not shown on the current design.',
      options: {hotspot: true},
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
      validation: (r) => r.uri({scheme: ['https']}),
    }),
    defineField({
      name: 'demoUrl',
      title: 'Demo URL',
      type: 'url',
      validation: (r) => r.uri({scheme: ['https', 'http']}),
    }),
    orderRankField({type: 'project'}),
  ],
  preview: {
    select: {title: 'title', subtitle: 'description', media: 'image'},
  },
})
