import React from 'react';
import { client } from '@/sanity/lib/client';
import { MOCK_PRODUCTS } from '@/sanity/lib/mockData';
import { Eye, Package, Trophy } from 'lucide-react';
import AnalyticsCharts from '@/components/AnalyticsCharts';

export const revalidate = 0; // Disable caching on the analytics dashboard to see live data (dynamic render)

async function getAnalyticsData() {
  // 1. Fetch view metrics from Sanity
  let products: any[] = [];
  let globalViews = 0;
  
  try {
    const data = await client.fetch(`{
      "products": *[_type == "product"] { _id, name, category, viewCount, slug },
      "analytics": *[_type == "siteAnalytics"][0]
    }`);
    
    if (data.products) products = data.products;
    if (data.analytics && data.analytics.globalViews) {
      globalViews = data.analytics.globalViews;
    }
  } catch (error) {
    console.error('Error fetching Sanity analytics:', error);
  }

  // Fallback to mock data if Sanity is empty
  if (!products || products.length === 0) {
    products = MOCK_PRODUCTS;
  }

  return { products, globalViews };
}

export default async function AnalyticsPage() {
  const { products, globalViews } = await getAnalyticsData();

  // Computations
  const totalViews = products.reduce((acc: number, p: any) => acc + (p.viewCount || 0), 0);
  const totalProducts = products.length;

  // Group views by category
  const viewsByCategory: Record<string, number> = {};
  products.forEach((p: any) => {
    viewsByCategory[p.category] = (viewsByCategory[p.category] || 0) + (p.viewCount || 0);
  });

  // Top 5 viewed products
  const topViewed = [...products]
    .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
    .slice(0, 5);

  // Top performing category
  let topCategory = 'None';
  let topCategoryViews = 0;
  Object.entries(viewsByCategory).forEach(([cat, views]) => {
    if (views > topCategoryViews) {
      topCategoryViews = views;
      topCategory = cat;
    }
  });

  // Format category names
  const formatCategory = (cat: string) => {
    return cat
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#E0DDD8] mb-8">
        <div>
          <h1 className="text-3xl font-display font-light text-stone-900">
            Analytics <span className="font-bold text-gold-accent italic">Dashboard</span>
          </h1>
          <p className="text-xs font-sans text-stone-400 uppercase tracking-widest mt-1">
            Store performance &amp; customer engagement report
          </p>
        </div>
      </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Card 0: Global views */}
          <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300 flex items-center space-x-4 border border-stone-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full blur-2xl -mr-10 -mt-10 opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div className="p-3.5 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl text-blue-600 relative z-10 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
            </div>
            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Global Website Views</span>
              <h3 className="text-2xl font-sans font-black text-stone-900 mt-1">{globalViews}</h3>
            </div>
          </div>

          {/* Card 1: Total views */}
          <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300 flex items-center space-x-4 border border-stone-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-stone-100 rounded-full blur-2xl -mr-10 -mt-10 opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div className="p-3.5 bg-gradient-to-br from-stone-50 to-stone-100 rounded-xl text-stone-700 relative z-10 shadow-inner">
              <Eye className="w-5 h-5" />
            </div>
            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Total Catalog Views</span>
              <h3 className="text-2xl font-sans font-black text-stone-900 mt-1">{totalViews}</h3>
            </div>
          </div>

          {/* Card 2: Total products */}
          <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300 flex items-center space-x-4 border border-stone-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-full blur-2xl -mr-10 -mt-10 opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div className="p-3.5 bg-gradient-to-br from-[#FAF8F5] to-amber-50 rounded-xl text-gold-accent relative z-10 shadow-inner">
              <Package className="w-5 h-5" />
            </div>
            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Total Products</span>
              <h3 className="text-2xl font-sans font-black text-stone-900 mt-1">{totalProducts}</h3>
            </div>
          </div>

          {/* Card 3: Top Category */}
          <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300 flex items-center space-x-4 border border-stone-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-full blur-2xl -mr-10 -mt-10 opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div className="p-3.5 bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl text-green-600 relative z-10 shadow-inner">
              <Trophy className="w-5 h-5" />
            </div>
            <div className="overflow-hidden relative z-10">
              <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold truncate block">Top Category</span>
              <h3 className="text-xl font-sans font-black text-stone-900 mt-1 truncate">
                {formatCategory(topCategory)}
              </h3>
            </div>
          </div>
        </div>

        {/* Detailed Performance Section */}
        <AnalyticsCharts 
          topViewedData={topViewed.map(p => ({ name: p.name, views: p.viewCount || 0 }))}
          categoryData={Object.entries(viewsByCategory).map(([name, views]) => ({ name: formatCategory(name), views }))}
        />

    </div>
  );
}
