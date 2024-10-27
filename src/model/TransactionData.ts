export interface TransactionData {
  errors: any;
  transaction_response: TransactionResponse;
  response_hash: string;
}

export interface TransactionResponse {
  success: boolean;
  error: string;
  transaction_id: string;
  amount: string;
  currency_code: number;
  credit_card_last_4_digits: string;
  expiry_month: string;
  expiry_year: string;
  user_form_data: UserFormData;
  token: string;
  payment_plan: number;
  total_installments_number: any;
}

export interface UserFormData {
  card_holder_id_number: string;
}
