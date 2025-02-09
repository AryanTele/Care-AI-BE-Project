"use client";

import { useState } from "react";
// import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

export default function OutboundCall() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        agent_id: process.env.NEXT_PUBLIC_AGENT_ID,
        recipient_phone_number: phoneNumber,
        from_number: "+19876543007",
        user_data: {
          variable1: "value1",
          variable2: "value2",
          variable3: "some phrase as value",
        },
      }),
    };

    try {
      const response = await fetch("https://api.bolna.dev/call", options);
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        router.push(`/dashboard/call-info/${data.execution_id}`);
      } else {
        throw new Error(data.message || "Failed to initiate call");
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Initiate Outbound Call</h1>
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <Label htmlFor="phoneNumber">Recipient Phone Number</Label>
          <Input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+10123456789"
            required
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Initiating Call..." : "Call"}
        </Button>
      </form>
    </div>
  );
}
