import { api } from "./api";

export interface HealthCheckResponse {
  status: string;
  application?: string;
}

export async function getHealthCheck(): Promise<HealthCheckResponse> {
  const response = await api.get<HealthCheckResponse>("/health");

  return response.data;
}