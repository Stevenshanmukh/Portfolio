import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'Browser tab and search result title.',
      validation: (r) => [r.required(), r.max(70).warning('Search engines cut titles around 60-70 characters.')],
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 3,
      description: 'Search result and social share description.',
      validation: (r) => [r.required(), r.max(160).warning('Search engines cut descriptions around 160 characters.')],
    }),
    defineField({
      name: 'url',
      title: 'Site URL',
      type: 'url',
      description: 'The live address, e.g. https://stevenlagadapati.vercel.app',
      validation: (r) => r.required().uri({scheme: ['https']}),
    }),
    defineField({
      name: 'ogImage',
      title: 'Social share image',
      type: 'image',
      description: 'Shown when the site is shared on social media. 1200×630.',
      options: {hotspot: true},
    }),
    defineField({
      name: 'keywords',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      validation: (r) => r.unique(),
    }),
  ],
  preview: {
    prepare: () => ({title: 'Site settings'}),
  },
})
