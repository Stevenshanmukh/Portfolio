import {defineArrayMember, defineField, defineType} from 'sanity'

// Step kinds the hero's run trace understands. Must match RUN_KINDS in
// components/sections/RunTrace.tsx (the website).
const RUN_KINDS = ['read', 'check', 'plan', 'approve', 'write']

export const profile = defineType({
  name: 'profile',
  title: 'Profile',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'about', title: 'About'},
    {name: 'contact', title: 'Contact & files'},
  ],
  fields: [
    defineField({name: 'name', type: 'string', group: 'hero', validation: (r) => r.required()}),
    defineField({
      name: 'role',
      type: 'string',
      group: 'hero',
      description: 'Shown next to your name at the top of the page.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'headline',
      type: 'string',
      group: 'hero',
      description:
        'The big line in the hero. Write it as two sentences: the first is what you build, the second (shown dimmer) is what makes it different.',
      validation: (r) => r.max(110).warning('Long headlines wrap to many lines on phones.'),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero description',
      type: 'text',
      rows: 3,
      group: 'hero',
      description: 'One or two sentences under the headline.',
      validation: (r) => [r.required(), r.max(220).warning('Keep the hero intro short.')],
    }),
    defineField({
      name: 'availability',
      type: 'string',
      group: 'hero',
      description: 'e.g. "Open to new opportunities". Leave empty to hide the badge.',
    }),
    defineField({
      name: 'proofPoints',
      title: 'Proof points',
      type: 'array',
      group: 'hero',
      description: 'Up to four real numbers shown under the hero text.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'proofPoint',
          fields: [
            defineField({name: 'value', type: 'string', description: 'e.g. "~25"', validation: (r) => r.required()}),
            defineField({
              name: 'label',
              type: 'string',
              description: 'e.g. "client accounts on automated reporting"',
              validation: (r) => r.required(),
            }),
          ],
          preview: {select: {title: 'value', subtitle: 'label'}},
        }),
      ],
      validation: (r) => r.max(4),
    }),
    defineField({
      name: 'runTraceTitle',
      title: 'Run trace title',
      type: 'string',
      group: 'hero',
      description: 'Which agent the hero animation depicts, e.g. "Slides reporting agent".',
    }),
    defineField({
      name: 'runTrace',
      title: 'Run trace steps',
      type: 'array',
      group: 'hero',
      description:
        'The illustrative agent run animated in the hero. Steps play in order; the "approve" step waits for sign-off before turning green. Use exactly one.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'runStep',
          fields: [
            defineField({
              name: 'kind',
              type: 'string',
              options: {list: RUN_KINDS, layout: 'radio', direction: 'horizontal'},
              validation: (r) => r.required(),
            }),
            defineField({name: 'text', type: 'string', validation: (r) => r.required().max(60)}),
          ],
          preview: {select: {title: 'text', subtitle: 'kind'}},
        }),
      ],
      validation: (r) =>
        r.custom((steps?: {kind?: string}[]) => {
          if (!steps?.length) return true
          const approvals = steps.filter((step) => step.kind === 'approve').length
          return approvals === 1 || 'Use exactly one "approve" step.'
        }),
    }),
    defineField({
      name: 'tagline',
      type: 'string',
      group: 'about',
      description: 'One line shown in the footer.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'aboutDescription',
      title: 'About description',
      type: 'text',
      rows: 6,
      group: 'about',
      description: 'A short bio at the top of the "How I build agents" section.',
    }),
    defineField({
      name: 'guardrails',
      type: 'array',
      group: 'about',
      description: 'The rules your agents follow, each tied to real work. Four reads best.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'guardrail',
          fields: [
            defineField({name: 'label', type: 'string', description: 'Short tag, e.g. "read-only"', validation: (r) => r.required()}),
            defineField({name: 'title', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'body', type: 'text', rows: 2, validation: (r) => r.required()}),
            defineField({name: 'seenIn', title: 'Seen in', type: 'string', description: 'Where this guardrail ships, e.g. "WordPress MCP gateway"'}),
          ],
          preview: {select: {title: 'title', subtitle: 'label'}},
        }),
      ],
    }),
    defineField({
      name: 'photo',
      type: 'image',
      group: 'about',
      description: 'Shown small next to your name in the hero. Set the hotspot on your face.',
      options: {hotspot: true},
    }),
    defineField({
      name: 'certifications',
      title: 'Certifications & awards',
      type: 'array',
      of: [{type: 'string'}],
      group: 'about',
      validation: (r) => r.unique(),
    }),
    defineField({name: 'email', type: 'string', group: 'contact', validation: (r) => r.required().email()}),
    defineField({name: 'location', type: 'string', group: 'contact'}),
    defineField({
      name: 'resume',
      type: 'file',
      group: 'contact',
      description: 'PDF. The Resume buttons only appear once this is uploaded.',
      options: {accept: 'application/pdf'},
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
      group: 'contact',
      validation: (r) => r.required().uri({scheme: ['https']}),
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
      group: 'contact',
      validation: (r) => r.required().uri({scheme: ['https']}),
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'role', media: 'photo'},
  },
})
