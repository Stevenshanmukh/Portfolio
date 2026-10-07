/**
 * Seeds the dataset with the content in ./data.ts.
 *
 *   npm run seed                             create missing documents, never touch existing ones
 *   npm run seed -- -- --replace             overwrite seeded documents with ./data.ts
 *   npm run seed -- -- --fill                add fields missing from existing documents, keep the rest
 *   npm run seed -- -- --resume=<path.pdf>   also upload a resume PDF to the profile
 *   npm run seed -- -- --assets=<dir>        also upload case-study screenshots named in ./data.ts
 *   npm run seed -- -- --photo=<path>        also upload a profile photo (hotspot set on the face)
 *
 * (The second `--` is how `sanity exec` passes arguments through to the script.)
 *
 * Requires `npx sanity login` first. IDs are fixed (and dot-free, so they stay
 * publicly readable), which makes re-running safe. Files are passed by path
 * rather than kept in the repo, which is public.
 */
import {createReadStream} from 'node:fs'
import {basename, join} from 'node:path'
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

// Arrays of objects need a unique _key per item.
const keyed = <T extends object>(prefix: string, items: T[] = []) =>
  items.map((item, i) => ({_key: `${prefix}-${i + 1}`, ...item}))

// Leave empty strings out instead of storing them.
const compact = <T extends object>(item: T) =>
  Object.fromEntries(Object.entries(item).filter(([, value]) => value !== '')) as Partial<T>

// Case-study screenshots to upload when --assets is passed, by project _id.
const artifacts = new Map<string, NonNullable<(typeof data.projects)[number]['artifact']>>()

const docs: IdentifiedSanityDocumentStub[] = [
  {
    _id: 'profile',
    _type: 'profile',
    ...data.profile,
    proofPoints: keyed('proof', data.profile.proofPoints),
    runTrace: keyed('step', data.profile.runTrace),
    guardrails: keyed('guardrail', data.profile.guardrails),
  },
  {_id: 'siteSettings', _type: 'siteSettings', ...data.siteSettings},
  ...ranked(data.experience).map(({item, orderRank}) => ({
    _id: `experience-${slug(item.company)}`,
    _type: 'experience',
    ...item,
    ...('systems' in item && item.systems ? {systems: keyed('system', item.systems.map(compact))} : {}),
    orderRank,
  })),
  ...ranked(data.projectCategories).map(({item, orderRank}) => ({
    _id: categoryId(item),
    _type: 'projectCategory',
    title: item,
    orderRank,
  })),
  ...ranked(data.projects).map(({item: {categories, artifact, ...project}, orderRank}) => {
    const _id = `project-${slug(project.title)}`
    if (artifact) artifacts.set(_id, artifact)
    return {
      _id,
      _type: 'project',
      ...project,
      slug: {_type: 'slug', current: slug(project.title)},
      categories: categories.map((title) => ({
        _type: 'reference',
        _ref: categoryId(title),
        _key: slug(title),
      })),
      orderRank,
    }
  }),
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

async function uploadArtifact(dir: string, artifact: {file: string; alt: string; caption: string}) {
  const asset = await client.assets.upload('image', createReadStream(join(dir, artifact.file)), {
    filename: artifact.file,
  })
  console.log(`Uploaded ${asset.originalFilename} (${asset._id}).`)
  return {
    _type: 'image',
    asset: {_type: 'reference', _ref: asset._id},
    alt: artifact.alt,
    caption: artifact.caption,
  }
}

async function uploadPhoto(path: string) {
  const asset = await client.assets.upload('image', createReadStream(path), {filename: basename(path)})
  console.log(`Uploaded photo ${asset.originalFilename} (${asset._id}).`)
  return {
    _type: 'image',
    asset: {_type: 'reference', _ref: asset._id},
    // Head-and-shoulders portrait: keep the face in frame when cropped to a circle.
    hotspot: {_type: 'sanity.imageHotspot', x: 0.5, y: 0.38, width: 0.62, height: 0.5},
    crop: {_type: 'sanity.imageCrop', top: 0, bottom: 0, left: 0, right: 0},
  }
}

const arg = (name: string) =>
  process.argv.find((a) => a.startsWith(`--${name}=`))?.slice(`--${name}=`.length)

async function main() {
  const replace = process.argv.includes('--replace')
  const fill = process.argv.includes('--fill')
  const resumePath = arg('resume')
  const assetsDir = arg('assets')
  const photoPath = arg('photo')
  const profileDoc = docs.find((doc) => doc._id === 'profile')!

  if (resumePath) profileDoc.resume = await uploadResume(resumePath)
  if (photoPath) profileDoc.photo = await uploadPhoto(photoPath)

  if (assetsDir) {
    for (const [id, artifact] of artifacts) {
      docs.find((doc) => doc._id === id)!.artifact = await uploadArtifact(assetsDir, artifact)
    }
  }

  const tx = client.transaction()
  for (const doc of docs) {
    if (replace) {
      tx.createOrReplace(doc)
      continue
    }
    tx.createIfNotExists(doc)
    if (fill) {
      const {_id, _type, ...fields} = doc
      tx.patch(_id, (patch) => patch.setIfMissing(fields))
    }
  }
  await tx.commit()
  const verb = replace ? 'Replaced' : fill ? 'Filled' : 'Ensured'
  console.log(`${verb} ${docs.length} documents in ${client.config().dataset}.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
