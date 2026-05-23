import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "../../services/query-keys";
import { getHealthCheck } from "../../services/health.service";

export function useHealthCheckQuery() {
  return useQuery({
    queryKey: queryKeys.health,
    queryFn: getHealthCheck,
    retry: 1,
  });
}