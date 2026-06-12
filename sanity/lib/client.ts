import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dummy-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  useCdn: true, // CDN enabled for read operations
};

// Standard read-only client utilizing CDN
export const client = createClient(config);

// Write client bypassing CDN, requires editor-level write token for operations like incrementing view counts
export const writeClient = createClient({
  ...config,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
