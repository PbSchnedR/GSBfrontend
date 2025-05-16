import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', montant: 1200 },
  { name: 'Fév', montant: 980 },
  { name: 'Mar', montant: 1500 },
  { name: 'Avr', montant: 1100 },
  { name: 'Mai', montant: 1350 },
  { name: 'Juin', montant: 1240 },
];

const SimpleBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip 
          formatter={(value) => [`${value} €`, 'Montant']}
          labelFormatter={(label) => `Mois : ${label}`}
        />
        <Bar 
          dataKey="montant" 
          fill="#8884d8" 
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SimpleBarChart; 