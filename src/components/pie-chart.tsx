"use client";
import React, { forwardRef, useEffect, useRef } from 'react';

interface PieChartProps {
  data: { component: string; percentage: number; cost: number }[];
}

export const PieChart = forwardRef<HTMLCanvasElement, PieChartProps>(({ data }, ref) => {
  const canvasRef = ref || useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('Could not get 2D context');
      return;
    }

    const width = canvas.width;
    const height = canvas.height;
    const radius = Math.min(width, height) / 2;

    let startAngle = -Math.PI / 2; // Start from the top

    // Define colors for each slice
    const colors = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Function to draw slice
    const drawSlice = (angle: number, color: string, label: string, percentage: number) => {
      ctx.beginPath();
      ctx.moveTo(width / 2, height / 2);
      ctx.arc(width / 2, height / 2, radius, startAngle, startAngle + angle);
      ctx.closePath();

      ctx.fillStyle = color;
      ctx.fill();

      // Calculate label position
      const midAngle = startAngle + angle / 2;
      const labelX = width / 2 + (radius * 0.7) * Math.cos(midAngle);
      const labelY = height / 2 + (radius * 0.7) * Math.sin(midAngle);

      // Draw label
      ctx.fillStyle = 'white';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${percentage.toFixed(1)}%`, labelX, labelY);

      startAngle += angle;
    };

    let total = 0;
    data.forEach(item => total += item.percentage);

    data.forEach((item, index) => {
      const sliceAngle = 2 * Math.PI * (item.percentage / total);
      drawSlice(sliceAngle, colors[index % colors.length], item.component, item.percentage);
    });

  }, [data]);

  return (
    <canvas ref={canvasRef} width={400} height={400} />
  );
});

PieChart.displayName = "PieChart";
