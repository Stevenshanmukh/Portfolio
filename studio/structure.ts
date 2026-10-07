import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {CogIcon} from '@sanity/icons/Cog'
import {UserIcon} from '@sanity/icons/User'
import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Profile')
        .id('profile')
        .icon(UserIcon)
        .child(S.document().schemaType('profile').documentId('profile')),
      S.listItem()
        .title('Site settings')
        .id('siteSettings')
        .icon(CogIcon)
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      orderableDocumentListDeskItem({type: 'experience', title: 'Experience', S, context}),
      orderableDocumentListDeskItem({type: 'project', title: 'Projects', S, context}),
      orderableDocumentListDeskItem({type: 'projectCategory', title: 'Project categories', S, context}),
      orderableDocumentListDeskItem({type: 'skillCategory', title: 'Skills', S, context}),
      orderableDocumentListDeskItem({type: 'education', title: 'Education', S, context}),
    ])
