export interface PhoneNumber {
  id: string;
  humanized_created_at: string;
  created_at: string;
  humanized_updated_at: string;
  updated_at: string;
  renewal_at: string;
  phone_number: string;
  agent_id: string;
  price: string;
  telephony_provider: string;
  rented: boolean;
}

export interface Agent {
  id: string;
  agent_name: string;
  agent_welcome_message: string;
  created_at: string;
  updated_at: string;
}
