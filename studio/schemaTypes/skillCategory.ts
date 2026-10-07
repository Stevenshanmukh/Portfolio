import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {defineField, defineType} from 'sanity'

// Must match `iconMap` in components/sections/SkillsSection.tsx (the website).
// To add an icon, add it in both places.
const ICONS = ['Code', 'Brain', 'Database', 'BarChart3', 'Wrench', 'Cloud', 'Cpu', 'Layers', 'Plug']

export const skillCategory = defineType({
  name: 'skillCategory',
  title: 'Skill category',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    defineField({name: 'name', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'icon',
      type: 'string',
      options: {list: ICONS, layout: 'dropdown'},
      initialValue: 'Code',
      validation: (r) => r.required(),
    }),
    defineField({name: 'description', type: 'text', rows: 2}),
    defineField({
      name: 'items',
      title: 'Skills',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      validation: (r) => [r.unique(), r.min(1)],
    }),
    orderRankField({type: 'skillCategory'}),
  ],
  preview: {
    select: {title: 'name', subtitle: 'icon'},
  },
})
