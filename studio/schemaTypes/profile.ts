import {defineField, defineType} from 'sanity'

export const profile = defineType({
  name: 'profile',
  title: 'Profile',
  type: 'document',
  fields: [
    defineField({name: 'name', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'role',
      type: 'string',
      description: 'Shown under your name in the hero.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'tagline',
      type: 'string',
      description: 'About section heading and footer line.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero description',
      type: 'text',
      rows: 3,
      validation: (r) => [r.required(), r.max(300).warning('Keep the hero intro short.')],
    }),
    defineField({
      name: 'aboutDescription',
      title: 'About description',
      type: 'text',
      rows: 6,
      description: 'Falls back to the hero description when empty.',
    }),
    defineField({name: 'email', type: 'string', validation: (r) => r.required().email()}),
    defineField({name: 'location', type: 'string'}),
    defineField({
      name: 'availability',
      type: 'string',
      description: 'e.g. "Open to new opportunities"',
    }),
    defineField({
      name: 'photo',
      type: 'image',
      description: 'Shown as a circle in the About section. Set the hotspot on your face.',
      options: {hotspot: true},
    }),
    defineField({
      name: 'resume',
      type: 'file',
      description: 'PDF. The Resume buttons only appear once this is uploaded.',
      options: {accept: 'application/pdf'},
    }),
    defineField({
      name: 'certifications',
      title: 'Certifications & awards',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Shown as a list in the About section.',
      validation: (r) => r.unique(),
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
      validation: (r) => r.required().uri({scheme: ['https']}),
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
      validation: (r) => r.required().uri({scheme: ['https']}),
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'role', media: 'photo'},
  },
})
