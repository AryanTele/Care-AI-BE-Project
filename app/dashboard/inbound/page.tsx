"use client";
import React from "react";
import { useEffect, useState } from "react";
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
import { Loader2, Phone, Users, MessageSquare } from "lucide-react";
import type { PhoneNumber, Agent } from "@/types/phone-number";

const API_KEY = "bn-85cf021afcd443609883bf8a37a72fef";

export default function InboundCallsDashboard() {
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      };

      try {
        // Fetch phone numbers
        const phoneResponse = await fetch(
          "https://api.bolna.dev/phone-numbers/all",
          options
        );
        if (!phoneResponse.ok) throw new Error("Failed to fetch phone numbers");
        const phoneData: PhoneNumber[] = await phoneResponse.json();
        setPhoneNumbers(phoneData);

        // Fetch agents
        const agentResponse = await fetch(
          "https://api.bolna.dev/v2/agent/all",
          options
        );
        if (!agentResponse.ok) throw new Error("Failed to fetch agents");
        const agentData: Agent[] = await agentResponse.json();
        setAgents(agentData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-400 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      {/* Active Numbers Section */}
      <Card className="bg-slate-900/80 border border-blue-500/30 shadow-xl text-blue-100 rounded-xl">
        <CardHeader className="border-b border-blue-500/30 bg-slate-900/90 rounded-t-xl px-6 pt-6 pb-4">
          <CardTitle className="flex items-center gap-2 text-blue-100">
            <Phone className="h-6 w-6 text-blue-400" />
            Active Phone Numbers
          </CardTitle>
        </CardHeader>
        <CardContent className="bg-slate-900/80 rounded-b-xl px-6 pb-6 pt-2">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-slate-800/60 border-b border-blue-700/40">
                <TableHead className="text-blue-300 font-medium">Phone Number</TableHead>
                <TableHead className="text-blue-300 font-medium">Provider</TableHead>
                <TableHead className="text-blue-300 font-medium">Price</TableHead>
                <TableHead className="text-blue-300 font-medium">Renewal Date</TableHead>
                <TableHead className="text-blue-300 font-medium">Status</TableHead>
                <TableHead className="text-blue-300 font-medium">Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {phoneNumbers.map((number) => (
                <TableRow key={number.id} className="hover:bg-slate-800/60 transition-colors border-b border-blue-700/40">
                  <TableCell className="font-medium text-blue-100">
                    {number.phone_number}
                  </TableCell>
                  <TableCell className="text-blue-200">{number.telephony_provider}</TableCell>
                  <TableCell className="text-blue-200">{number.price}</TableCell>
                  <TableCell className="text-blue-200">{number.renewal_at}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        number.rented ? "bg-emerald-500/80 text-white" : "bg-amber-500/80 text-white"
                      }
                    >
                      {number.rented ? "Rented" : "Available"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-blue-200">{number.humanized_updated_at}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Agents Section */}
      <Card className="bg-slate-900/80 border border-blue-500/30 shadow-xl text-blue-100 rounded-xl">
        <CardHeader className="border-b border-blue-500/30 bg-slate-900/90 rounded-t-xl px-6 pt-6 pb-4">
          <CardTitle className="flex items-center gap-2 text-blue-100">
            <Users className="h-6 w-6 text-teal-400" />
            Available Agents
          </CardTitle>
        </CardHeader>
        <CardContent className="bg-slate-900/80 rounded-b-xl px-6 pb-6 pt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <Card key={agent.id} className="bg-slate-900/90 border border-blue-500/30 shadow-md hover:shadow-xl transition-all duration-300 text-blue-100 rounded-xl">
                <CardContent className="pt-6 bg-slate-900/90 rounded-xl px-4 pb-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-blue-100">
                          {agent.agent_name}
                        </h3>
                        <p className="text-sm text-blue-300">
                          Created: {new Date(agent.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <MessageSquare className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="bg-slate-800/80 p-4 rounded-lg border border-blue-500/20">
                      <p className="text-sm text-blue-200">
                        &quot;{agent.agent_welcome_message}&quot;
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="bg-slate-900/80 border border-blue-500/30 shadow-xl text-blue-100 rounded-xl">
          <CardContent className="pt-8 pb-6 bg-slate-900/80 rounded-xl">
            <div className="flex flex-col items-center space-y-2">
              <p className="text-2xl font-bold text-blue-100">{phoneNumbers.length}</p>
              <p className="text-sm text-blue-300">Total Phone Numbers</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900/80 border border-blue-500/30 shadow-xl text-blue-100 rounded-xl">
          <CardContent className="pt-8 pb-6 bg-slate-900/80 rounded-xl">
            <div className="flex flex-col items-center space-y-2">
              <p className="text-2xl font-bold text-blue-100">{phoneNumbers.filter((n) => n.rented).length}</p>
              <p className="text-sm text-blue-300">Rented Numbers</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900/80 border border-blue-500/30 shadow-xl text-blue-100 rounded-xl">
          <CardContent className="pt-8 pb-6 bg-slate-900/80 rounded-xl">
            <div className="flex flex-col items-center space-y-2">
              <p className="text-2xl font-bold text-blue-100">{agents.length}</p>
              <p className="text-sm text-blue-300">Total Agents</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
