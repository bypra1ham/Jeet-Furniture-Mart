  'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface AnalyticsChartsProps {
  topViewedData: { name: string; views: number }[];
  categoryData: { name: string; views: number }[];
}

const COLORS = ['#C9A84C', '#2E1912', '#E0DDD8', '#A89F91', '#8C7A6B', '#D4C4A8'];

export default function AnalyticsCharts({ topViewedData, categoryData }: AnalyticsChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
      {/* Top Viewed Products Chart */}
      <div className="bg-white rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100 relative overflow-hidden">
        <h2 className="text-sm font-sans font-black uppercase text-stone-950 tracking-wider mb-6 flex items-center space-x-2 relative z-10">
          <span>Top 5 Most Viewed Products</span>
        </h2>
        <div className="h-80 w-full relative z-10">
          {topViewedData.length === 0 ? (
            <div className="flex h-full items-center justify-center text-xs text-stone-400 italic">
              No product views yet.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topViewedData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E0DDD8" opacity={0.5} />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#78716c', fontSize: 12, fontWeight: 500 }} 
                  width={150} 
                />
                <Tooltip 
                  cursor={{ fill: '#FAF8F5', opacity: 0.5 }} 
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px', borderColor: '#E0DDD8', fontSize: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', backdropFilter: 'blur(8px)' }}
                />
                <Bar dataKey="views" fill="#C9A84C" radius={[0, 6, 6, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Views by Category Chart */}
      <div className="bg-white rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100 relative overflow-hidden">
        <h2 className="text-sm font-sans font-black uppercase text-stone-950 tracking-wider mb-6 relative z-10">
          Views by Category
        </h2>
        <div className="h-80 w-full flex items-center justify-center relative z-10">
          {categoryData.length === 0 ? (
            <div className="text-xs text-stone-400 italic">No category views yet.</div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="views"
                  label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                  labelLine={false}
                  stroke="none"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px', borderColor: '#E0DDD8', fontSize: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', backdropFilter: 'blur(8px)' }} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
