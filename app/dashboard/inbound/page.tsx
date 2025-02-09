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
    <div className="container mx-auto p-6 space-y-6">
      {/* Active Numbers Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-6 w-6" />
            Active Phone Numbers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Phone Number</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Renewal Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {phoneNumbers.map((number) => (
                <TableRow key={number.id}>
                  <TableCell className="font-medium">
                    {number.phone_number}
                  </TableCell>
                  <TableCell>{number.telephony_provider}</TableCell>
                  <TableCell>{number.price}</TableCell>
                  <TableCell>{number.renewal_at}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        number.rented ? "bg-green-500" : "bg-yellow-500"
                      }
                    >
                      {number.rented ? "Rented" : "Available"}
                    </Badge>
                  </TableCell>
                  <TableCell>{number.humanized_updated_at}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Agents Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-6 w-6" />
            Available Agents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.map((agent) => (
              <Card key={agent.id}>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="text-lg font-medium">
                          {agent.agent_name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Created:{" "}
                          {new Date(agent.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <MessageSquare className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-2">
              <p className="text-2xl font-bold">{phoneNumbers.length}</p>
              <p className="text-sm text-gray-500">Total Phone Numbers</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-2">
              <p className="text-2xl font-bold">
                {phoneNumbers.filter((n) => n.rented).length}
              </p>
              <p className="text-sm text-gray-500">Rented Numbers</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-2">
              <p className="text-2xl font-bold">{agents.length}</p>
              <p className="text-sm text-gray-500">Total Agents</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
