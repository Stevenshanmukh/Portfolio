import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {defineField, defineType} from 'sanity'

export const projectCategory = defineType({
  name: 'projectCategory',
  title: 'Project category',
  type: 'document',
  description: 'Filter tabs above the projects grid, in this order.',
  orderings: [orderRankOrdering],
  fields: [
    defineField({name: 'title', type: 'string', validation: (r) => r.required()}),
    orderRankField({type: 'projectCategory'}),
  ],
})
