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
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Download,
  ChevronLeft,
  ChevronRight,
  Settings,
  X,
} from "lucide-react";
import type { Execution } from "@/types/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  Phone, 
  Clock, 
  DollarSign, 
  Activity 
} from "lucide-react";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const AGENT_ID = process.env.NEXT_PUBLIC_AGENT_ID;
const ITEMS_PER_PAGE = 10;

type SidebarAction = "transcript" | "recording";

export default function ExecutionsDashboard() {
  const [executions, setExecutions] = useState<Execution[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // State for customization
  const [companyLogo, setCompanyLogo] = useState<string | null>(null);
  const [companyTitle, setCompanyTitle] = useState<string>(
    "Execution Dashboard"
  );
  const [, setLogoFile] = useState<File | null>(null);
  const [tempTitle, setTempTitle] = useState<string>("");

  // State for the sidebar
  const [selectedExecution, setSelectedExecution] = useState<Execution | null>(
    null
  );
  const [selectedAction, setSelectedAction] = useState<SidebarAction | null>(
    null
  );

  // Calculate pagination values
  const totalPages = Math.ceil(executions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentExecutions = executions.slice(startIndex, endIndex);

  useEffect(() => {
    // Load saved customization from localStorage
    const savedLogo = localStorage.getItem("dashboardLogo");
    const savedTitle = localStorage.getItem("dashboardTitle");

    if (savedLogo) setCompanyLogo(savedLogo);
    if (savedTitle) setCompanyTitle(savedTitle);

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

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoFile(file);

      // Preview the image
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === "string") {
          setCompanyLogo(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const saveCustomization = () => {
    // Save the current logo and title to localStorage
    if (companyLogo) localStorage.setItem("dashboardLogo", companyLogo);
    if (tempTitle) {
      setCompanyTitle(tempTitle);
      localStorage.setItem("dashboardTitle", tempTitle);
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
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
      completed: "bg-emerald-500 hover:bg-emerald-600",
      busy: "bg-amber-500 hover:bg-amber-600",
      error: "bg-rose-500 hover:bg-rose-600",
    };
    return statusColors[status] || "bg-gray-500 hover:bg-gray-600";
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

  const exportToCSV = () => {
    // Format current date and time for filename
    const now = new Date();
    const dateString = now
      .toLocaleDateString("en-IN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\//g, "-");

    const timeString = now
      .toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
      .replace(/:/g, "-");

    const filename = `${dateString}_${timeString}.csv`;

    // Prepare data for CSV
    const headers = [
      "Execution ID",
      "Customer Number",
      "Type",
      "Duration",
      "Timestamp",
      "Cost",
      "Status",
    ];

    const csvData = executions.map((execution) => [
      execution.id,
      execution.telephony_data?.call_type || "N/A",
      formatDuration(execution.conversation_duration),
      formatDate(execution.created_at),
      formatCost(execution.total_cost / 100),
      execution.status,
    ]);

    // Create CSV content
    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.join(",")),
    ].join("\n");

    // Create and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            {companyLogo && (
              <img src={companyLogo} alt="Company Logo" className="h-12 w-12 rounded-lg object-cover ring-2 ring-gray-200" />
            )}
            <h1 className="text-3xl font-bold text-gray-900">
              {companyTitle}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={exportToCSV}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-sm"
            >
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-gray-200 text-gray-600 hover:bg-gray-50">
                  <Settings className="mr-2 h-4 w-4" />
                  Customize
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Customize Dashboard</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="logo">Company Logo</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="logo"
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                        className="flex-1"
                      />
                      {companyLogo && (
                        <div className="w-12 h-12 border rounded overflow-hidden">
                          <img
                            src={companyLogo}
                            alt="Logo Preview"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="title">Company Title</Label>
                    <Input
                      id="title"
                      placeholder={companyTitle}
                      defaultValue={companyTitle}
                      onChange={(e) => setTempTitle(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button onClick={saveCustomization}>Save Changes</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border-gray-200 hover:shadow-md transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Calls</p>
                  <h3 className="text-2xl font-bold mt-1 text-gray-900">{executions.length}</h3>
                </div>
                <Phone className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-gray-200 hover:shadow-md transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Average Duration</p>
                  <h3 className="text-2xl font-bold mt-1 text-gray-900">
                    {formatDuration(
                      executions.reduce((acc, curr) => acc + curr.conversation_duration, 0) / 
                      executions.length
                    )}
                  </h3>
                </div>
                <Clock className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-gray-200 hover:shadow-md transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Cost</p>
                  <h3 className="text-2xl font-bold mt-1 text-gray-900">
                    {formatCost(
                      executions.reduce((acc, curr) => acc + curr.total_cost, 0) / 100
                    )}
                  </h3>
                </div>
                <DollarSign className="h-8 w-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-gray-200 hover:shadow-md transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Success Rate</p>
                  <h3 className="text-2xl font-bold mt-1 text-gray-900">
                    {Math.round(
                      (executions.filter(e => e.status === 'completed').length / executions.length) * 100
                    )}%
                  </h3>
                </div>
                <Activity className="h-8 w-8 text-amber-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Table */}
        <Card className="overflow-hidden border-gray-200 bg-white shadow-sm">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle className="text-xl font-semibold text-gray-900">Recent Executions</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-gray-50 border-b border-gray-200">
                    <TableHead className="text-gray-600 font-medium">Execution ID</TableHead>
                    <TableHead className="text-gray-600 font-medium">Customer Number</TableHead>
                    <TableHead className="text-gray-600 font-medium">Type</TableHead>
                    <TableHead className="text-gray-600 font-medium">Duration</TableHead>
                    <TableHead className="text-gray-600 font-medium">Timestamp</TableHead>
                    <TableHead className="text-gray-600 font-medium">Cost</TableHead>
                    <TableHead className="text-gray-600 font-medium">Status</TableHead>
                    <TableHead className="text-gray-600 font-medium">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentExecutions.map((execution) => (
                    <TableRow 
                      key={execution.id}
                      className="hover:bg-gray-50 transition-colors border-b border-gray-200"
                    >
                      <TableCell className="font-medium text-gray-900">{execution.id}</TableCell>
                      <TableCell className="text-gray-700">{execution.telephony_data?.call_type || "N/A"}</TableCell>
                      <TableCell className="text-gray-700">{formatDuration(execution.conversation_duration)}</TableCell>
                      <TableCell className="text-gray-700">{formatDate(execution.created_at)}</TableCell>
                      <TableCell className="text-gray-700">{formatCost(execution.total_cost / 100)}</TableCell>
                      <TableCell>
                        <Badge 
                          className={`${getStatusColor(execution.status)} text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm`}
                        >
                          {execution.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleTranscriptClick(execution)}
                            className="hover:bg-blue-50 text-blue-600"
                          >
                            Transcript
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRecordingClick(execution)}
                            className="hover:bg-purple-50 text-purple-600"
                          >
                            Recording
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-500">
            Showing {startIndex + 1} to {endIndex} of {executions.length} entries
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      {selectedExecution && selectedAction && (
        <Sidebar
          isOpen={true}
          execution={selectedExecution}
          action={selectedAction}
          onClose={closeSidebar}
        />
      )}
    </div>
  );
}

// Sidebar component remains unchanged
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
            <div className="mt-6">
              <h3 className="text-xl font-semibold">Order Details</h3>
              <p className="mt-2 whitespace-pre-wrap border rounded-lg p-4">
                {execution.extracted_data?.order_details ||
                  "No order details available"}
              </p>
            </div>

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
          <div className="mt-6 border rounded-lg p-4">
            <h3 className="text-xl font-semibold">Recording</h3>
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
