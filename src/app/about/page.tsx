'use client';

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="container py-10">
      <Card className="w-[90%] md:w-[75%] lg:w-[60%] mx-auto">
        <CardHeader className="space-y-1 p-5">
          <CardTitle className="text-2xl">About Toolify</CardTitle>
          <CardDescription>Learn more about our construction cost estimator.</CardDescription>
        </CardHeader>
        <CardContent className="p-5">
          <section className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
            <p>
              At Toolify, our mission is to simplify the construction budgeting process. We provide
              an easy-to-use tool that helps homeowners estimate the costs involved in building their
              dream homes.
            </p>
          </section>

          <Separator className="my-4"/>

          <section className="mb-4">
            <h2 className="text-xl font-semibold mb-2">How It Works</h2>
            <p>
              Our Construction Cost Estimator uses a predefined cost breakdown to estimate the
              total cost based on the area and cost per square foot. This provides a detailed
              estimate for each component of the construction.
            </p>
          </section>

          <Separator className="my-4"/>

          <section>
            <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
            <p>
              If you have any questions or need assistance, feel free to reach out to us.
            </p>
            <Button asChild>
              <Link href="mailto:contact@example.com">contact@example.com</Link>
            </Button>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
