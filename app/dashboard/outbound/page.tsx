"use client";

import { useState, useRef, useEffect } from "react";
// import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, PhoneCall, CheckCircle, XCircle, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const AGENT_ID = process.env.NEXT_PUBLIC_AGENT_ID;

export default function OutboundCall() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [callSummary, setCallSummary] = useState<any | null>(null);
  const [callStatus, setCallStatus] = useState<string | null>(null);
  const [statusLoading, setStatusLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  // Poll for call status if we have an execution_id
  useEffect(() => {
    if (callSummary?.execution_id) {
      setStatusLoading(true);
      pollingRef.current = setInterval(async () => {
        try {
          const res = await fetch(
            `https://api.bolna.dev/execution/${callSummary.execution_id}`,
            {
              headers: {
                Authorization: `Bearer ${API_KEY}`,
              },
            }
          );
          const data = await res.json();
          setCallStatus(data.status);
          if (["completed", "failed", "cancelled"].includes(data.status)) {
            clearInterval(pollingRef.current!);
            setStatusLoading(false);
          }
        } catch (err) {
          setError("Failed to fetch call status");
          setStatusLoading(false);
        }
      }, 2000);
      return () => clearInterval(pollingRef.current!);
    }
  }, [callSummary?.execution_id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setCallSummary(null);
    setCallStatus(null);

    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        agent_id: AGENT_ID,
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
      if (response.ok) {
        setCallSummary(data);
        setCallStatus("initiated");
        toast({
          title: "Call Initiated",
          description: `Call to ${phoneNumber} has started!`,
        });
      } else {
        throw new Error(data.message || "Failed to initiate call");
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
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

  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case "initiated":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full bg-blue-800/60 text-blue-200 text-xs font-medium animate-pulse">
            <Loader2 className="w-3 h-3 mr-1 animate-spin" /> Initiated
          </span>
        );
      case "in_progress":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full bg-teal-800/60 text-teal-200 text-xs font-medium animate-pulse">
            <PhoneCall className="w-3 h-3 mr-1 animate-pulse" /> In Progress
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-800/60 text-green-200 text-xs font-medium">
            <CheckCircle className="w-3 h-3 mr-1" /> Completed
          </span>
        );
      case "failed":
      case "cancelled":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full bg-red-800/60 text-red-200 text-xs font-medium">
            <XCircle className="w-3 h-3 mr-1" /> {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg"
      >
        <Card className="bg-slate-900/70 border border-blue-700/30 shadow-xl rounded-2xl backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-blue-100 text-2xl font-bold flex items-center gap-2">
              <PhoneCall className="w-6 h-6 text-blue-400" /> Initiate Outbound Call
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="phoneNumber" className="text-blue-200">
                  Recipient Phone Number
                </Label>
                <Input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+10123456789"
                  required
                  className="bg-slate-800/80 border border-blue-700/30 text-blue-100 placeholder:text-blue-400 focus:ring-2 focus:ring-blue-600"
                  disabled={isLoading}
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading || !phoneNumber}
                className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white shadow-md"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Initiating Call...
                  </span>
                ) : (
                  <span>Call</span>
                )}
              </Button>
              {error && (
                <div className="text-red-400 text-sm mt-2">{error}</div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Call Summary Section */}
        <AnimatePresence>
          {callSummary && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <Card className="bg-slate-900/80 border border-blue-700/40 shadow-lg rounded-2xl backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-blue-100 text-xl font-semibold flex items-center gap-2">
                    <PhoneCall className="w-5 h-5 text-blue-400" /> Call Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2 text-blue-200">
                    <div>
                      <span className="font-semibold">To:</span> {callSummary.recipient_phone_number}
                    </div>
                    <div>
                      <span className="font-semibold">Execution ID:</span> {callSummary.execution_id}
                    </div>
                    <div>
                      <span className="font-semibold">Status:</span> {getStatusBadge(callStatus)}
                      {statusLoading && (
                        <RefreshCw className="w-4 h-4 ml-2 animate-spin inline-block text-blue-400" />
                      )}
                    </div>
                    {callSummary.agent_id && (
                      <div>
                        <span className="font-semibold">Agent ID:</span> {callSummary.agent_id}
                      </div>
                    )}
                    {callSummary.from_number && (
                      <div>
                        <span className="font-semibold">From:</span> {callSummary.from_number}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
