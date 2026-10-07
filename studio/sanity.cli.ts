import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'pnwv3t0x',
    dataset: 'production',
  },
  deployment: {
    // Hosted at https://stevenlagadapati.sanity.studio
    appId: 'codhdca86smrt8t1swkc47md',
    autoUpdates: true,
  },
  typegen: {
    // The website's queries live outside the studio folder.
    path: '../lib/sanity/queries.ts',
    schema: './schema.json',
    generates: '../lib/sanity/sanity.types.ts',
    overloadClientMethods: false,
  },
})
