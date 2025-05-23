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

// Function to convert numbers to words
function numberToWords(num: number | null): string {
  if (num === null) return "";
  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];

  if (num === 0) return "Zero";

  function convertLessThanThousand(n: number): string {
    if (n < 10) return ones[n];
    if (n < 20) return teens[n - 10];
    const ten = Math.floor(n / 10);
    const one = n % 10;
    return tens[ten] + (one > 0 ? " " + ones[one] : "");
  }

  let result = "";

  if (num >= 10000000) {
    result += convertLessThanThousand(Math.floor(num / 10000000)) + " Crore ";
    num %= 10000000;
  }

  if (num >= 100000) {
    result += convertLessThanThousand(Math.floor(num / 100000)) + " Lakh ";
    num %= 100000;
  }

  if (num >= 1000) {
    result += convertLessThanThousand(Math.floor(num / 1000)) + " Thousand ";
    num %= 1000;
  }

  if (num >= 100) {
    result += ones[Math.floor(num / 100)] + " Hundred ";
    num %= 100;
  }

  if (num > 0) {
    if (result !== "") result += "and ";
    result += convertLessThanThousand(num);
  }

  return result.trim();
}

export default function Home() {
  const [area, setArea] = useState<number | null>(null);
  const [costPerSqFt, setCostPerSqFt] = useState<number | null>(null);
  const [totalCost, setTotalCost] = useState<number | null>(null);
  const [costBreakdown, setCostBreakdown] = useState<CostData[]>([]);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const constructionCostRef = useRef<HTMLDivElement>(null);
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
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Estimate Your Construction Budget with Toolify
        </h1>
        <p className="text-lg text-muted-foreground">
          Get a detailed cost breakdown for your construction project.
        </p>
      </section>

      {/* How to Use Calculator Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">How to Use the Construction Cost Estimator</h2>
        <ol className="list-decimal pl-6 text-muted-foreground">
          <li>Enter the total built-up area in square feet.</li>
          <li>Enter the cost per square foot in INR.</li>
          <li>View the total estimated cost and detailed cost breakdown.</li>
          <li>Share the estimate with others.</li>
        </ol>
      </section>

      {/* Construction Cost Estimator Section */}
      <div ref={constructionCostRef} id="constructionCostSection">
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
      </div>

      {totalCost !== null && (
        <Card className="w-[90%] md:w-[75%] lg:w-[60%] mx-auto mt-6">
          <CardHeader className="space-y-1 p-5">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Cost Breakdown</CardTitle>
                <CardDescription>Detailed cost breakdown for each component.</CardDescription>
              </div>
              <div>
               <CardTitle className="text-md ">
                  Total: ₹{totalCost.toFixed(2)}
                  <br />
                  (In Words: {numberToWords(totalCost)} Rupees)
                </CardTitle>
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
      {/* About Section */}
      <section id="aboutSection" className="mt-12 w-[90%] md:w-[75%] lg:w-[60%] mx-auto">
        <h2 className="text-2xl font-semibold mb-4">About Toolify</h2>
        <p className="text-muted-foreground">
          Toolify is a comprehensive construction cost estimation tool designed to help you plan your budget effectively.
          By providing detailed cost breakdowns and easy-to-use features, Toolify empowers you to make informed decisions
          and manage your construction project with confidence.
        </p>
      </section>
      {/* Contact Us Section */}
      <section id="contactSection" className="mt-12 w-[90%] md:w-[75%] lg:w-[60%] mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="text-muted-foreground">
          If you have any questions or need assistance, feel free to reach out to us. Email: <a href="mailto:contact@toolwebsite.in">contact@toolwebsite.in</a> place Bangalore, India.
        </p>
      </section>
    </div>
  );
}
