import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {defineField, defineType} from 'sanity'

export const experience = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    defineField({name: 'role', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'company', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'companyUrl',
      title: 'Company URL',
      type: 'url',
      description: 'Optional. Makes the company name a link.',
      validation: (r) => r.uri({scheme: ['https']}),
    }),
    defineField({
      name: 'period',
      type: 'string',
      description: 'e.g. "May 2026 – Present"',
      validation: (r) => r.required(),
    }),
    defineField({name: 'location', type: 'string', description: 'e.g. "Remote" or "Deerfield Beach, FL · Hybrid"'}),
    defineField({
      name: 'summary',
      type: 'text',
      rows: 2,
      description: 'One line about the company or team.',
    }),
    defineField({
      name: 'highlights',
      type: 'array',
      of: [{type: 'text', rows: 2}],
      description: 'What you built or changed. One item per bullet.',
    }),
    defineField({
      name: 'skills',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      validation: (r) => r.unique(),
    }),
    orderRankField({type: 'experience'}),
  ],
  preview: {
    select: {title: 'role', subtitle: 'company'},
  },
})
