export interface FieldErrorResponse {
  field: string;
  message: string;
}

export interface ApiErrorResponse {
  status: number;
  error: string;
  message: string;
  path: string;
  fieldErrors: FieldErrorResponse[] | null;
  timestamp: string;
}