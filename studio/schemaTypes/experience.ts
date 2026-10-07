import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {defineArrayMember, defineField, defineType} from 'sanity'

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
      name: 'systems',
      title: 'Systems built',
      type: 'array',
      description:
        'Shown as a table: one row per system you shipped. When this has rows, it replaces the highlights below.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'system',
          fields: [
            defineField({name: 'name', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'actsOn', title: 'Acts on', type: 'string', description: 'The live systems or data it touches.'}),
            defineField({name: 'guardrail', type: 'string', description: 'What keeps it safe. Leave empty if none.'}),
            defineField({name: 'result', type: 'string', description: 'A real outcome or number.'}),
          ],
          preview: {select: {title: 'name', subtitle: 'result'}},
        }),
      ],
    }),
    defineField({
      name: 'highlights',
      type: 'array',
      of: [{type: 'text', rows: 2}],
      description: 'What you built or changed, one item per bullet. Used when "Systems built" is empty.',
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
