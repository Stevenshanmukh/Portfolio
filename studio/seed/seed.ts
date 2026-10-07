/**
 * Seeds the dataset with the content in ./data.ts.
 *
 *   npm run seed                             create missing documents, never touch existing ones
 *   npm run seed -- -- --replace             overwrite seeded documents with ./data.ts
 *   npm run seed -- -- --resume=<path.pdf>   also upload a resume PDF to the profile
 *
 * (The second `--` is how `sanity exec` passes arguments through to the script.)
 *
 * Requires `npx sanity login` first. IDs are fixed (and dot-free, so they stay
 * publicly readable), which makes re-running safe. The resume is passed by
 * path rather than kept in the repo, which is public.
 */
import {createReadStream} from 'node:fs'
import {basename} from 'node:path'
import type {IdentifiedSanityDocumentStub} from '@sanity/client'
import {LexoRank} from 'lexorank'
import {getCliClient} from 'sanity/cli'
import * as data from './data'

const client = getCliClient({apiVersion: '2026-10-01'})

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

// Same ranking the orderable-document-list plugin uses for "Reset order".
function ranked<T>(items: T[]) {
  let rank = LexoRank.min()
  return items.map((item) => {
    rank = rank.genNext().genNext()
    return {item, orderRank: rank.toString()}
  })
}

const categoryId = (title: string) => `projectCategory-${slug(title)}`

const docs: IdentifiedSanityDocumentStub[] = [
  {_id: 'profile', _type: 'profile', ...data.profile},
  {_id: 'siteSettings', _type: 'siteSettings', ...data.siteSettings},
  ...ranked(data.experience).map(({item, orderRank}) => ({
    _id: `experience-${slug(item.company)}`,
    _type: 'experience',
    ...item,
    orderRank,
  })),
  ...ranked(data.projectCategories).map(({item, orderRank}) => ({
    _id: categoryId(item),
    _type: 'projectCategory',
    title: item,
    orderRank,
  })),
  ...ranked(data.projects).map(({item: {categories, ...project}, orderRank}) => ({
    _id: `project-${slug(project.title)}`,
    _type: 'project',
    ...project,
    categories: categories.map((title) => ({
      _type: 'reference',
      _ref: categoryId(title),
      _key: slug(title),
    })),
    orderRank,
  })),
  ...ranked(data.skillCategories).map(({item, orderRank}) => ({
    _id: `skillCategory-${slug(item.name)}`,
    _type: 'skillCategory',
    ...item,
    orderRank,
  })),
  ...ranked(data.education).map(({item, orderRank}) => ({
    _id: `education-${slug(item.institution)}`,
    _type: 'education',
    ...item,
    orderRank,
  })),
]

async function uploadResume(path: string) {
  const asset = await client.assets.upload('file', createReadStream(path), {
    filename: basename(path),
    contentType: 'application/pdf',
  })
  console.log(`Uploaded resume ${asset.originalFilename} (${asset._id}).`)
  return {_type: 'file', asset: {_type: 'reference', _ref: asset._id}}
}

async function main() {
  const replace = process.argv.includes('--replace')
  const resumePath = process.argv.find((arg) => arg.startsWith('--resume='))?.slice('--resume='.length)

  if (resumePath) {
    const profileDoc = docs.find((doc) => doc._id === 'profile')!
    profileDoc.resume = await uploadResume(resumePath)
  }

  const tx = client.transaction()
  for (const doc of docs) {
    if (replace) tx.createOrReplace(doc)
    else tx.createIfNotExists(doc)
  }
  await tx.commit()
  console.log(`${replace ? 'Replaced' : 'Ensured'} ${docs.length} documents in ${client.config().dataset}.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
