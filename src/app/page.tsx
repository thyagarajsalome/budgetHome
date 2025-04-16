"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useEffect, useRef, useState } from "react";
import { PieChart } from "@/components/pie-chart";
import { useToast } from "@/hooks/use-toast";
import { Icons } from "@/components/icons";

const MAIN_BREAKDOWN = {
  Foundation: 15,
  Structure: 35,
  Roofing: 10,
  Finishing: 25,
  Interiors: 15,
};

interface CostData {
  component: string;
  percentage: number;
  cost: number;
}

export default function Home() {
  const [area, setArea] = useState<number | null>(null);
  const [costPerSqFt, setCostPerSqFt] = useState<number | null>(null);
  const [totalCost, setTotalCost] = useState<number | null>(null);
  const [costBreakdown, setCostBreakdown] = useState<CostData[]>([]);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (area !== null && costPerSqFt !== null) {
      const calculatedTotalCost = area * costPerSqFt;
      setTotalCost(calculatedTotalCost);

      const breakdown: CostData[] = Object.entries(MAIN_BREAKDOWN).map(([component, percentage]) => ({
        component,
        percentage,
        cost: calculatedTotalCost * (percentage / 100),
      }));
      setCostBreakdown(breakdown);
    } else {
      setTotalCost(null);
      setCostBreakdown([]);
    }
  }, [area, costPerSqFt]);

  const handleAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (isNaN(value) || value <= 0) {
      setArea(null);
    } else {
      setArea(value);
    }
  };

  const handleCostPerSqFtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (isNaN(value) || value <= 0) {
      setCostPerSqFt(null);
    } else {
      setCostPerSqFt(value);
    }
  };

  const handleReset = () => {
    setArea(null);
    setCostPerSqFt(null);
  };

  const handleShare = async () => {
    if (totalCost === null) {
      toast({
        title: "Nothing to share!",
        description: "Please enter area and cost per sq.ft to calculate costs.",
      });
      return;
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: "BudgetHome Construction Cost Estimate",
          text: `Estimated construction cost: INR ${totalCost?.toFixed(2)}`,
          url: document.location.href,
        });
        toast({
          title: "Shared successfully!",
          description: "Construction cost estimate shared.",
        });
      } catch (error: any) {
        toast({
          title: "Sharing failed!",
          description: error.message,
        });
      }
    } else {
      toast({
        title: "Sharing not supported!",
        description: "Web Share API is not supported in your browser.",
      });
    }
  };

  return (
    <div className="container py-10">
      <Card className="w-[90%] md:w-[75%] lg:w-[60%] mx-auto">
        <CardHeader className="space-y-1 p-5">
          <CardTitle className="text-2xl">Construction Cost Estimator</CardTitle>
          <CardDescription>Enter the details to estimate your construction budget.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 p-5">
          <div className="grid gap-2">
            <Label htmlFor="area">Total Built-up Area (sq.ft)</Label>
            <Input type="number" id="area" placeholder="Area in square feet" onChange={handleAreaChange} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="costPerSqFt">Cost per sq.ft (INR)</Label>
            <Input type="number" id="costPerSqFt" placeholder="Cost in INR" onChange={handleCostPerSqFtChange} />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleReset}>
              Reset
            </Button>
            <Button onClick={handleShare} disabled={totalCost === null}>
              Share
            </Button>
          </div>
        </CardContent>
      </Card>

      {totalCost !== null && (
        <Card className="w-[90%] md:w-[75%] lg:w-[60%] mx-auto mt-6">
          <CardHeader className="space-y-1 p-5">
              <div className="flex items-center justify-between">
                  <div>
                      <CardTitle className="text-2xl">Cost Breakdown</CardTitle>
                      <CardDescription>Detailed cost breakdown for each component.</CardDescription>
                  </div>
                  <div>
                      <CardTitle className="text-xl">Total: ₹{totalCost.toFixed(2)}</CardTitle>
                  </div>
              </div>
          </CardHeader>
          <CardContent className="p-5">
            <div className="overflow-x-auto">
              <table className="min-w-full border divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Component</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost (INR)</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {costBreakdown.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.component}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.percentage}%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹ {item.cost.toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Total</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">100%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹ {totalCost.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-center">
              <PieChart data={costBreakdown} ref={chartRef} />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
