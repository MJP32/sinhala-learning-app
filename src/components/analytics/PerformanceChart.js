import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Analytics.css';

const PerformanceChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="no-data-message">
        <p>No quiz data yet</p>
        <p className="no-data-si">ප්‍රශ්නාවලි දත්ත නැත</p>
        <p className="no-data-hint">Complete some quizzes to see your performance trends!</p>
      </div>
    );
  }

  const chartData = data.map((quiz, index) => ({
    name: quiz.date || `Quiz ${index + 1}`,
    score: quiz.score,
    grade: quiz.gradeId
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          <p className="tooltip-label">{label}</p>
          <p className="tooltip-value">Score: {payload[0].value}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="performance-chart">
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis
            dataKey="name"
            tick={{ fill: '#666', fontSize: 12 }}
            axisLine={{ stroke: '#ddd' }}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: '#666', fontSize: 12 }}
            axisLine={{ stroke: '#ddd' }}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#8d153a"
            strokeWidth={3}
            dot={{ fill: '#8d153a', strokeWidth: 2, r: 5 }}
            activeDot={{ r: 8, fill: '#ff6b35' }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="chart-summary">
        <div className="chart-stat">
          <span className="chart-stat-value">
            {Math.round(data.reduce((acc, q) => acc + q.score, 0) / data.length)}%
          </span>
          <span className="chart-stat-label">Average Score</span>
        </div>
        <div className="chart-stat">
          <span className="chart-stat-value">
            {Math.max(...data.map(q => q.score))}%
          </span>
          <span className="chart-stat-label">Best Score</span>
        </div>
        <div className="chart-stat">
          <span className="chart-stat-value">{data.length}</span>
          <span className="chart-stat-label">Quizzes</span>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;
