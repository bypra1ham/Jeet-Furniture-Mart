import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'kquifbiv',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: false
});

client.fetch('*[_type == "product"][0]._id').then(id => {
  console.log('Found ID:', id);
  return client.delete(id);
}).then(console.log).catch(e => console.error('Delete error:', e.message));
