export interface CostBreakdown {
  llm: number;
  network: number;
  platform: number;
  synthesizer: number;
  transcriber: number;
}
export interface OrderDetails {
  order_details: string;
}

export interface TelephonyData {
  duration: string;
  to_number: string;
  from_number: string;
  recording_url: string;
  hosted_telephony: boolean;
  provider_call_id: string;
  call_type: "inbound" | "outbound";
  provider: string;
  hangup_by: string;
  hangup_reason: string;
  hangup_provider_code: number;
}

export interface ContextDetails {
  recipient_data: null | unknown;
  recipient_phone_number: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface Execution {
  id: string;
  agent_id: string;
  batch_id: string | null;
  created_at: string;
  updated_at: string;
  scheduled_at: string;
  answered_by_voice_mail: boolean | null;
  conversation_duration: number;
  total_cost: number;
  transcript: string | null;
  cost_breakdown: CostBreakdown;
  extracted_data: OrderDetails | null;
  summary: string | null;
  error_message: string | null;
  status: "completed" | "busy" | "error";
  telephony_data: TelephonyData;
  transfer_call_data: unknown | null;
  context_details: ContextDetails;
  batch_run_details: unknown | null;
}
