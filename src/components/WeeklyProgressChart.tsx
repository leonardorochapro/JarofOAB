import React, { useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export interface DailyProgressPoint {
  dateKey: string;
  dayLabel: string;
  fullDateLabel: string;
  count: number;
  isToday: boolean;
}

interface WeeklyProgressChartProps {
  completedAt: Record<string, string>;
}

export function getLocalDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const SHORT_WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: DailyProgressPoint }>;
}

const GlassTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (!active || !payload || payload.length === 0) return null;
  const point = payload[0].payload;

  return (
    <div className="rounded-2xl bg-white/90 backdrop-blur-xl border border-white/95 px-3.5 py-2.5 shadow-[0_12px_28px_-8px_rgba(15,23,42,0.16)]">
      <div className="text-[11px] font-medium text-slate-500 capitalize">
        {point.fullDateLabel}
      </div>
      <div className="text-sm font-semibold text-slate-900 tabular-nums mt-0.5">
        {point.count === 0
          ? 'Nenhum tópico'
          : point.count === 1
          ? '1 tópico concluído'
          : `${point.count} tópicos concluídos`}
      </div>
    </div>
  );
};

export const WeeklyProgressChart: React.FC<WeeklyProgressChartProps> = ({
  completedAt,
}) => {
  const { chartData, weekTotal, dailyAverage } = useMemo(() => {
    const countsByDate: Record<string, number> = {};
    for (const dateKey of Object.values(completedAt)) {
      if (typeof dateKey === 'string' && dateKey.length === 10) {
        countsByDate[dateKey] = (countsByDate[dateKey] ?? 0) + 1;
      }
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const points: DailyProgressPoint[] = [];
    let total = 0;

    for (let offset = 6; offset >= 0; offset--) {
      const d = new Date(today);
      d.setDate(today.getDate() - offset);
      const dateKey = getLocalDateKey(d);
      const count = countsByDate[dateKey] ?? 0;
      total += count;

      const isToday = offset === 0;
      const dayLabel = isToday ? 'Hoje' : SHORT_WEEKDAYS[d.getDay()];
      const fullDateLabel = d.toLocaleDateString('pt-BR', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
      });

      points.push({
        dateKey,
        dayLabel,
        fullDateLabel,
        count,
        isToday,
      });
    }

    return {
      chartData: points,
      weekTotal: total,
      dailyAverage: (total / 7).toFixed(1).replace('.', ','),
    };
  }, [completedAt]);

  return (
    <div className="pt-6 mt-6 border-t border-slate-900/[0.06] space-y-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <h3 className="text-sm font-semibold text-slate-900 tracking-tight">
            Histórico da semana
          </h3>
          <span className="text-xs text-slate-500">
            · Tópicos concluídos por dia (últimos 7 dias)
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 tabular-nums">
          <span className="font-semibold text-slate-800">
            {weekTotal} {weekTotal === 1 ? 'tópico' : 'tópicos'}
          </span>
          <span aria-hidden="true">·</span>
          <span>Média {dailyAverage}/dia</span>
        </div>
      </div>

      <div className="h-40 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 8, right: 6, left: -16, bottom: 0 }}
            barCategoryGap="24%"
          >
            <defs>
              <linearGradient id="oabBarToday" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.95} />
                <stop offset="100%" stopColor="#b91c1c" stopOpacity={0.95} />
              </linearGradient>
              <linearGradient id="oabBarPast" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f87171" stopOpacity={0.75} />
                <stop offset="100%" stopColor="#dc2626" stopOpacity={0.68} />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke="rgba(15, 23, 42, 0.06)"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="dayLabel"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
              dy={6}
            />

            <YAxis
              allowDecimals={false}
              domain={[0, (dataMax: number) => Math.max(dataMax + 1, 4)]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }}
              width={34}
            />

            <Tooltip
              content={<GlassTooltip />}
              cursor={{ fill: 'rgba(15, 23, 42, 0.035)', radius: 10 }}
            />

            <Bar
              dataKey="count"
              maxBarSize={36}
              radius={[10, 10, 4, 4]}
              background={{ fill: 'rgba(15, 23, 42, 0.035)', radius: 10 }}
            >
              {chartData.map((entry) => (
                <Cell
                  key={entry.dateKey}
                  fill={
                    entry.count === 0
                      ? 'transparent'
                      : entry.isToday
                      ? 'url(#oabBarToday)'
                      : 'url(#oabBarPast)'
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
