import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'kquifbiv',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: true,
});

client.fetch(`*[_type == "product"]{_id, name}`).then(res => {
  console.log("Success:", res.length, "items");
}).catch(err => {
  console.error("Error:", err.message);
});
