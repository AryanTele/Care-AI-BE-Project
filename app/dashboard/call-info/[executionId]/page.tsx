"use client";

import { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface CallInfo {
  message: string;
  status: string;
  execution_id: string;
}

export default function CallInfo() {
  const [callInfo, setCallInfo] = useState<CallInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const executionId = params.executionId as string;

  useEffect(() => {
    const fetchCallInfo = async () => {
      try {
        // In a real application, you would fetch the call info from your backend
        // For this example, we'll simulate a API call with the data we have
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
        setCallInfo({
          message: "done",
          status: "queued",
          execution_id: executionId,
        });
      } catch (error) {
        console.error("Failed to fetch call info:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (executionId) {
      fetchCallInfo();
    }
  }, [executionId]);

  if (isLoading) {
    return <div>Fetching call information...</div>;
  }

  if (!callInfo) {
    return <div>Failed to load call information.</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Call Information</h1>
      <Card>
        <CardHeader>
          <CardTitle>Execution ID: {callInfo.execution_id}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Status:</strong> {callInfo.status}
          </p>
          <p>
            <strong>Message:</strong> {callInfo.message}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
