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
      name: 'image',
      type: 'image',
      description: 'Square thumbnail next to the title.',
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
    defineField({
      name: 'featured',
      type: 'boolean',
      description: 'Adds a "Featured" badge.',
      initialValue: false,
    }),
    orderRankField({type: 'project'}),
  ],
  preview: {
    select: {title: 'title', subtitle: 'description', media: 'image'},
  },
})
