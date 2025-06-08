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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, RefreshCw } from "lucide-react";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const AGENT_ID = process.env.NEXT_PUBLIC_AGENT_ID;

interface AgentLog {
  id: string;
  timestamp: string;
  level: string;
  message: string;
  metadata: Record<string, unknown>;
}

const formatIST = (dateString: string): string => {
  const date = new Date(dateString);
  // Add 5 hours 30 minutes (19800000 ms)
  const istDate = new Date(date.getTime() + 5.5 * 60 * 60 * 1000);
  return istDate.toLocaleString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};

export default function AgentLogs() {
  const [logs, setLogs] = useState<AgentLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [autoRefresh, setAutoRefresh] = useState(false);

  const fetchLogs = async () => {
    try {
      const response = await fetch(
        `https://api.bolna.dev/agent/${AGENT_ID}/logs`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setLogs(data);
    } catch (err) {
      console.error("Error fetching logs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();

    let interval: NodeJS.Timeout;
    if (autoRefresh) {
      interval = setInterval(fetchLogs, 30000); // Refresh every 30 seconds
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh]);

  const filteredLogs = logs.filter((log) => {
    const matchesLevel = selectedLevel === "all" || log.level === selectedLevel;
    const matchesSearch = log.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case "error":
        return "bg-red-500/20 text-red-400 border-red-500/50";
      case "warning":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
      case "info":
        return "bg-blue-500/20 text-blue-400 border-blue-500/50";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/50";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <Card className="bg-slate-900/80 border-blue-700/40 shadow-lg">
        <CardHeader className="bg-slate-800/80 border-b border-blue-700/40">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-blue-100">
              Agent Logs
            </CardTitle>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => fetchLogs()}
                className="border-blue-700/40 text-blue-200 hover:bg-blue-900/30"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button
                variant={autoRefresh ? "default" : "outline"}
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={autoRefresh ? "bg-blue-600 text-white" : "border-blue-700/40 text-blue-200 hover:bg-blue-900/30"}
              >
                Auto Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex-1">
              <Label htmlFor="search" className="text-blue-200">Search Logs</Label>
              <Input
                id="search"
                placeholder="Search in logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-800 text-blue-100 border-blue-700/40"
              />
            </div>
            <div className="w-48">
              <Label htmlFor="level" className="text-blue-200">Log Level</Label>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="bg-slate-800 text-blue-100 border-blue-700/40">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 text-blue-100 border-blue-700/40">
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-slate-800/60 border-b border-blue-700/40">
                  <TableHead className="text-blue-300 font-medium">Timestamp</TableHead>
                  <TableHead className="text-blue-300 font-medium">Level</TableHead>
                  <TableHead className="text-blue-300 font-medium">Message</TableHead>
                  <TableHead className="text-blue-300 font-medium">Metadata</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow
                    key={log.id}
                    className="hover:bg-slate-800/60 transition-colors border-b border-blue-700/40"
                  >
                    <TableCell className="text-blue-200">
                      {formatIST(log.timestamp)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${getLevelColor(log.level)} px-3 py-1 rounded-full text-sm font-medium`}
                      >
                        {log.level}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-blue-200">{log.message}</TableCell>
                    <TableCell className="text-blue-200">
                      <pre className="whitespace-pre-wrap">
                        {JSON.stringify(log.metadata, null, 2)}
                      </pre>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 