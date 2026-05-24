import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


import { queryKeys } from "../../services/query-keys";
import {
    adicionarEntradaIngrediente,
    calcularVolumePorTipo,
    criarIngrediente,
    listarIngredientes,
    registrarSaidaIngrediente
} from "../../services/ingredient.service";
import type { CriarIngredienteRequest, MovimentarIngredienteRequest } from "../../types/ingredient.type";
import { getApiErrorMessage } from "../../utils/api-error";

export function useIngredientsQuery() {
  return useQuery({
    queryKey: queryKeys.ingredients.all,
    queryFn: listarIngredientes,
  });
}

export function useVolumeByTypeQuery() {
  return useQuery({
    queryKey: queryKeys.ingredients.volume,
    queryFn: calcularVolumePorTipo,
  });
}

export function useCreateIngredientMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CriarIngredienteRequest) => criarIngrediente(data),
    onSuccess: () => {
      toast.success("Ingrediente cadastrado com sucesso.");

      void queryClient.invalidateQueries({
        queryKey: queryKeys.ingredients.all,
      });

      void queryClient.invalidateQueries({
        queryKey: queryKeys.ingredients.volume,
      });

      void queryClient.invalidateQueries({
        queryKey: queryKeys.history.all,
      });

      void queryClient.invalidateQueries({
        queryKey: ["compartments"],
      });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}

export function useAddIngredientEntryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: MovimentarIngredienteRequest;
    }) => adicionarEntradaIngrediente(id, data),
    onSuccess: () => {
      toast.success("Entrada registrada com sucesso.");

      void queryClient.invalidateQueries({
        queryKey: queryKeys.ingredients.all,
      });

      void queryClient.invalidateQueries({
        queryKey: queryKeys.ingredients.volume,
      });

      void queryClient.invalidateQueries({
        queryKey: queryKeys.history.all,
      });

      void queryClient.invalidateQueries({
        queryKey: ["compartments"],
      });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}

export function useRegisterIngredientExitMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: MovimentarIngredienteRequest;
    }) => registrarSaidaIngrediente(id, data),
    onSuccess: () => {
      toast.success("Saída registrada com sucesso.");

      void queryClient.invalidateQueries({
        queryKey: queryKeys.ingredients.all,
      });

      void queryClient.invalidateQueries({
        queryKey: queryKeys.ingredients.volume,
      });

      void queryClient.invalidateQueries({
        queryKey: queryKeys.history.all,
      });

      void queryClient.invalidateQueries({
        queryKey: ["compartments"],
      });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}