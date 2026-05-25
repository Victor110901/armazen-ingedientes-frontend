import axios from "axios";
import type { ApiErrorResponse } from "../types/api.types";
import { formatQuantitiesInText } from "./formatters";


export function isApiErrorResponse(value: unknown): value is ApiErrorResponse {
  if (!value || typeof value !== "object") {
    return false;
  }

  return "status" in value && "message" in value && "error" in value;
}

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;

    if (isApiErrorResponse(data)) {
      if (data.fieldErrors && data.fieldErrors.length > 0) {
        return formatQuantitiesInText(
          data.fieldErrors.map((fieldError) => fieldError.message).join(" "),
        );
      }

      return formatQuantitiesInText(data.message);
    }

    if (error.response?.status === 404) {
      return "Recurso não encontrado.";
    }

    if (error.response?.status === 500) {
      return "O servidor encontrou um erro interno.";
    }

    if (error.code === "ERR_NETWORK") {
      return "Não foi possível conectar à API. Verifique se o backend está disponível.";
    }
  }

  if (error instanceof Error) {
    return formatQuantitiesInText(error.message);
  }

  return "Ocorreu um erro inesperado.";
}
