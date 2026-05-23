import type { CriarIngredienteRequest, IngredienteResponse, MovimentarIngredienteRequest, VolumePorTipoResponse } from "../types/ingredient.type";
import { api } from "./api";

export async function listarIngredientes(): Promise<IngredienteResponse[]> {
  const response = await api.get<IngredienteResponse[]>("/ingredientes");

  return response.data;
}

export async function buscarIngredientePorId(
  id: number,
): Promise<IngredienteResponse> {
  const response = await api.get<IngredienteResponse>(`/ingredientes/${id}`);

  return response.data;
}

export async function criarIngrediente(
  data: CriarIngredienteRequest,
): Promise<IngredienteResponse> {
  const response = await api.post<IngredienteResponse>("/ingredientes", data);

  return response.data;
}

export async function adicionarEntradaIngrediente(
  id: number,
  data: MovimentarIngredienteRequest,
): Promise<IngredienteResponse> {
  const response = await api.post<IngredienteResponse>(
    `/ingredientes/${id}/entrada`,
    data,
  );

  return response.data;
}

export async function registrarSaidaIngrediente(
  id: number,
  data: MovimentarIngredienteRequest,
): Promise<IngredienteResponse> {
  const response = await api.post<IngredienteResponse>(
    `/ingredientes/${id}/saida`,
    data,
  );

  return response.data;
}

export async function calcularVolumePorTipo(): Promise<VolumePorTipoResponse[]> {
  const response = await api.get<VolumePorTipoResponse[]>("/ingredientes/volume");

  return response.data;
}