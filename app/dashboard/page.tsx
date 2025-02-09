"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { X } from "lucide-react";
import type { Execution } from "@/types/types";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const AGENT_ID = process.env.NEXT_PUBLIC_AGENT_ID;

type SidebarAction = "transcript" | "recording";

export default function ExecutionsDashboard() {
  const [executions, setExecutions] = useState<Execution[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // State for the sidebar
  const [selectedExecution, setSelectedExecution] = useState<Execution | null>(
    null
  );
  const [selectedAction, setSelectedAction] = useState<SidebarAction | null>(
    null
  );

  useEffect(() => {
    const fetchExecutions = async () => {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      };

      try {
        const response = await fetch(
          `https://api.bolna.dev/agent/${AGENT_ID}/executions`,
          options
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Execution[] = await response.json();
        setExecutions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchExecutions();
  }, []);

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString();
  };

  const formatDuration = (seconds: number): string => {
    return `${seconds.toFixed(1)}s`;
  };

  const formatCost = (cost: number | string): string => {
    const parsedCost = typeof cost === "string" ? parseFloat(cost) : cost;
    return `$${parsedCost.toFixed(3)}`;
  };

  const getStatusColor = (status: Execution["status"]): string => {
    const statusColors: Record<Execution["status"], string> = {
      completed: "bg-green-500",
      busy: "bg-yellow-500",
      error: "bg-red-500",
    };
    return statusColors[status] || "bg-gray-500";
  };

  const handleTranscriptClick = (execution: Execution) => {
    setSelectedExecution(execution);
    setSelectedAction("transcript");
  };

  const handleRecordingClick = (execution: Execution) => {
    setSelectedExecution(execution);
    setSelectedAction("recording");
  };

  const closeSidebar = () => {
    setSelectedExecution(null);
    setSelectedAction(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="container mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Execution Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Execution ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {executions.map((execution) => (
                  <TableRow key={execution.id}>
                    <TableCell className="font-mono text-sm">
                      {execution.id.substring(0, 8)}...
                    </TableCell>
                    <TableCell>
                      {execution.telephony_data?.call_type || "N/A"}
                    </TableCell>
                    <TableCell>
                      {formatDuration(execution.conversation_duration)}
                    </TableCell>
                    <TableCell>{formatDate(execution.created_at)}</TableCell>
                    <TableCell>
                      {formatCost(execution.total_cost / 100)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={getStatusColor(execution.status)}
                      >
                        {execution.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {execution.telephony_data?.recording_url && (
                          <button
                            className="text-blue-500 hover:text-blue-700"
                            onClick={() => handleRecordingClick(execution)}
                          >
                            Recording
                          </button>
                        )}
                        {execution.transcript && (
                          <button
                            className="text-green-500 hover:text-green-700"
                            onClick={() => handleTranscriptClick(execution)}
                          >
                            Transcript
                          </button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar component */}
      {selectedExecution && selectedAction && (
        <Sidebar
          isOpen={Boolean(selectedExecution)}
          execution={selectedExecution}
          action={selectedAction}
          onClose={closeSidebar}
        />
      )}
    </div>
  );
}

interface SidebarProps {
  isOpen: boolean;
  execution: Execution;
  action: SidebarAction;
  onClose: () => void;
}

function Sidebar({ isOpen, execution, action, onClose }: SidebarProps) {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-full sm:w-1/3 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 h-full overflow-y-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Execution Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X />
          </button>
        </div>

        {action === "transcript" && (
          <>
            {/* Summary and Transcript for transcript action */}
            <div className="mt-4">
              <h3 className="text-xl font-semibold">Summary</h3>
              <p className="mt-3 whitespace-pre-wrap border rounded-lg p-4">
                {execution.summary || "No summary available"}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold">Transcript</h3>
              <p className="mt-2 whitespace-pre-wrap border rounded-lg p-4">
                {execution.transcript || "No transcript available"}
              </p>
            </div>
          </>
        )}

        {action === "recording" && (
          // Only the recording is shown for recording action.
          <div className="mt-6 border rounded-lg p-4">
            <h3 className="text-xl font-semibold ">Recording</h3>
            {execution.telephony_data?.recording_url ? (
              <>
                <audio
                  controls
                  src={execution.telephony_data.recording_url}
                  className="w-full mt-2"
                />
                <p className="mt-2 text-sm text-blue-500">
                  <a
                    href={execution.telephony_data.recording_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open in new tab
                  </a>
                </p>
              </>
            ) : (
              <p>No recording available</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
