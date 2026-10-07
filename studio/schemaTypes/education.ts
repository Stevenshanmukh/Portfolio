import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {defineField, defineType} from 'sanity'

export const education = defineType({
  name: 'education',
  title: 'Education',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    defineField({name: 'institution', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'degree', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'period', type: 'string', description: 'e.g. "2022 - 2024"'}),
    defineField({name: 'status', type: 'string', description: 'Small badge, e.g. "Graduating Soon"'}),
    defineField({name: 'description', type: 'text', rows: 3}),
    defineField({
      name: 'skills',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      validation: (r) => r.unique(),
    }),
    orderRankField({type: 'education'}),
  ],
  preview: {
    select: {title: 'institution', subtitle: 'degree'},
  },
})
