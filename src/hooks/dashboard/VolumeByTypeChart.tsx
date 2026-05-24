import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { INGREDIENT_TYPE_LABEL } from "../../config/domain.config";
import type { VolumePorTipoResponse } from "../../types/ingredient.type";

interface VolumeByTypeChartProps {
  data: VolumePorTipoResponse[];
}

export function VolumeByTypeChart({ data }: VolumeByTypeChartProps) {
  const chartData = data.map((item) => ({
    tipo: INGREDIENT_TYPE_LABEL[item.type],
    quantidade: item.totalQuantity,
  }));

  return (
    <div className="h-80 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-950">
          Volume por tipo
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Total armazenado agrupado por categoria de ingrediente.
        </p>
      </div>

      <ResponsiveContainer width="100%" height="75%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="tipo" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <Tooltip />
          <Bar dataKey="quantidade" radius={[12, 12, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}