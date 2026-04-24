import React from 'react';

type StatsCardProps = {
  title: string;
  value: React.ReactNode;
  icon: React.ReactNode;
  gradient?: string;
};

export const StatsCard = ({ title, value, icon, gradient }: StatsCardProps) => (
  <div className={`relative overflow-hidden rounded-2xl ${gradient} p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}>
    <div className="flex items-center justify-between">
      <div className="text-white">
        <p className="text-sm font-medium opacity-90 mb-1">{title}</p>
        <h3 className="text-3xl font-bold">{value}</h3>
      </div>
      <div className="text-white text-4xl opacity-80">
        {icon}
      </div>
    </div>
    <div className="absolute -right-4 -bottom-4 text-white opacity-10 text-8xl">
      {icon}
    </div>
  </div>
);