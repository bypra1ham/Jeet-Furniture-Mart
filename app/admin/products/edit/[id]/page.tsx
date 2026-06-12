import { client } from '@/sanity/lib/client';
import EditProductForm from './EditProductForm';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const product = await client.fetch(`*[_type == "product" && _id == $id][0] {
    _id,
    name,
    category,
    "description": description[0].children[0].text,
    dimensions,
    material,
    featured,
    "imageUrl": images[0].asset->url
  }`, { id });

  if (!product) {
    notFound();
  }

  return <EditProductForm product={product} />;
}
