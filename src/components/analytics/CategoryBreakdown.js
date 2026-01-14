import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import './Analytics.css';

const CategoryBreakdown = ({ data }) => {
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="no-data-message">
        <p>No category data yet</p>
        <p className="no-data-si">කාණ්ඩ දත්ත නැත</p>
        <p className="no-data-hint">Complete quizzes to see category performance!</p>
      </div>
    );
  }

  const COLORS = ['#8d153a', '#667eea', '#4CAF50', '#FF9800', '#9C27B0', '#00BCD4'];

  const categoryNames = {
    vocabulary: { en: 'Vocabulary', si: 'වචන මාලාව' },
    grammar: { en: 'Grammar', si: 'ව්‍යාකරණ' },
    reading: { en: 'Reading', si: 'කියවීම' },
    writing: { en: 'Writing', si: 'ලිවීම' },
    culture: { en: 'Culture', si: 'සංස්කෘතිය' },
    general: { en: 'General', si: 'සාමාන්‍ය' }
  };

  const chartData = Object.entries(data).map(([category, stats], index) => ({
    name: categoryNames[category]?.en || category,
    nameSi: categoryNames[category]?.si || category,
    value: stats.total,
    correct: stats.correct,
    percentage: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="chart-tooltip">
          <p className="tooltip-label">{data.name}</p>
          <p className="tooltip-value">{data.correct} / {data.value} correct</p>
          <p className="tooltip-percent">{data.percentage}% accuracy</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="category-breakdown">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      <div className="category-list">
        {chartData.map((cat, index) => (
          <div key={cat.name} className="category-item">
            <div className="category-color" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
            <div className="category-info">
              <span className="category-name">{cat.name}</span>
              <span className="category-name-si">{cat.nameSi}</span>
            </div>
            <div className="category-stats">
              <span className="category-percent">{cat.percentage}%</span>
              <span className="category-count">{cat.correct}/{cat.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryBreakdown;
