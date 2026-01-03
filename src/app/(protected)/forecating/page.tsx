'use client';

import { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  ChefHat,
  ArrowRight,
  Download,
  Calendar,
  MoreHorizontal
} from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';

// --- MOCK DATA ---
const chartData = [
  { time: '10 AM', actual: 12, predicted: 15 },
  { time: '11 AM', actual: 25, predicted: 28 },
  { time: '12 PM', actual: 45, predicted: 50 },
  { time: '1 PM', actual: 0, predicted: 85 }, // Future data
  { time: '2 PM', actual: 0, predicted: 60 },
  { time: '3 PM', actual: 0, predicted: 40 },
  { time: '4 PM', actual: 0, predicted: 55 },
];

const predictionItems = [
  {
    id: '1',
    name: 'Spicy Chicken Burger',
    sku: 'BUR-001',
    yesterdaySold: 120,
    predictedToday: 145,
    trend: '+21%',
    status: 'critical', 
    missingIngredients: ['Chicken Patties (-25)', 'Spicy Sauce (500ml)'],
  },
  {
    id: '2',
    name: 'Cheese Kottu',
    sku: 'KOT-004',
    yesterdaySold: 85,
    predictedToday: 90,
    trend: '+5%',
    status: 'ok',
    missingIngredients: [],
  },
  {
    id: '3',
    name: 'Iced Milo',
    sku: 'BEV-012',
    yesterdaySold: 200,
    predictedToday: 180,
    trend: '-10%',
    status: 'warning',
    missingIngredients: ['Milk (2L)'],
  },
];

// Custom Tooltip for SaaS look
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-zinc-900 border border-border p-3 rounded-lg shadow-xl text-xs">
        <p className="font-semibold text-foreground mb-2">{label}</p>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-orange-500"></span>
          <span className="text-muted-foreground">Predicted:</span>
          <span className="font-mono font-bold text-foreground">{payload[0].value}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-slate-400"></span>
          <span className="text-muted-foreground">Actual:</span>
          <span className="font-mono font-bold text-foreground">{payload[1].value}</span>
        </div>
      </div>
    );
  }
  return null;
};

export default function ForecastingPage() {
  return (
    <div className="flex flex-col gap-6 p-6 md:p-8 max-w-[1600px] mx-auto w-full">
      
      {/* 1. PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 border-b border-border/40 pb-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Demand Intelligence
          </h2>
          <p className="text-sm text-muted-foreground">
            AI-driven sales forecasts and inventory requirements for <span className="font-medium text-foreground">Today, Oct 24</span>.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9 gap-2">
            <Download className="h-4 w-4" /> Report
          </Button>
          <Button size="sm" className="h-9 gap-2 bg-orange-600 hover:bg-orange-700 text-white shadow-sm">
            <CheckCircle2 className="h-4 w-4" />
            Auto-Generate PO
          </Button>
        </div>
      </div>

      {/* 2. KPI GRID */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm border-border/60">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Predicted Revenue
            </CardTitle>
            <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-full">
                <TrendingUp className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums">LKR 145,200</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <span className="text-emerald-600 font-medium">+12%</span> from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/60">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Prep Readiness
            </CardTitle>
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                <ChefHat className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end mb-1">
                <div className="text-2xl font-bold tabular-nums">85%</div>
                <span className="text-xs font-medium text-amber-600 mb-1">Attention Needed</span>
            </div>
            <Progress value={85} className="h-1.5 bg-muted" indicatorClassName="bg-blue-600" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        
        {/* 3. MAIN CHART (Span 4 columns) */}
        <Card className="col-span-4 shadow-sm border-border/60">
          <CardHeader>
            <div className="flex items-center justify-between">
                <div>
                    <CardTitle className="text-base font-semibold">Hourly Demand Forecast</CardTitle>
                    <CardDescription className="text-xs">
                    AI prediction vs. historical data
                    </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-normal gap-1.5 py-1">
                        <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_6px_rgba(249,115,22,0.6)]"></span>
                        Predicted
                    </Badge>
                    <Badge variant="outline" className="font-normal gap-1.5 py-1 text-muted-foreground">
                        <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                        Yesterday
                    </Badge>
                </div>
            </div>
          </CardHeader>
          <CardContent className="pl-0 pr-4">
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                  <XAxis
                    dataKey="time"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    fontSize={11}
                    tick={{ fill: '#64748b' }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    fontSize={11}
                    tickFormatter={(value) => `${value}`}
                    tick={{ fill: '#64748b' }}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#f97316', strokeWidth: 1, strokeDasharray: '4 4' }} />
                  
                  {/* Actual (Yesterday) - Secondary Data */}
                  <Area
                    type="monotone"
                    dataKey="actual"
                    stroke="#94a3b8"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    fill="transparent"
                    activeDot={{ r: 4, fill: '#94a3b8' }}
                  />

                  {/* Predicted (AI) - Primary Data (Orange) */}
                  <Area
                    type="monotone"
                    dataKey="predicted"
                    stroke="#f97316"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorPredicted)"
                    activeDot={{ r: 6, strokeWidth: 0, fill: '#f97316' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* 4. STOCK AUDIT SIDE PANEL (Span 3 columns) */}
        <Card className="col-span-3 shadow-sm border-border/60 flex flex-col">
          <CardHeader className="pb-3 border-b border-border/40 bg-muted/10">
            <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    Inventory Risks
                </CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex-1 overflow-auto">
            <div className="divide-y divide-border/40">
              {predictionItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-3 p-4 hover:bg-muted/20 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-foreground">{item.name}</span>
                            <span className="text-[10px] text-muted-foreground font-mono bg-muted px-1 rounded">{item.sku}</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                            Est. Demand: <span className="font-mono font-medium text-foreground">{item.predictedToday}</span> units
                        </div>
                    </div>
                    
                    {item.trend.startsWith('+') ? (
                        <Badge variant="outline" className="text-green-600 bg-green-50 border-green-100 font-mono text-[10px]">
                            {item.trend}
                        </Badge>
                    ) : (
                        <Badge variant="outline" className="text-slate-500 bg-slate-50 border-slate-100 font-mono text-[10px]">
                            {item.trend}
                        </Badge>
                    )}
                  </div>

                  {/* Missing Ingredients Warning Box */}
                  {item.missingIngredients.length > 0 ? (
                    <div className="bg-red-50/50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-md p-2.5">
                      <p className="text-[11px] font-bold text-red-700 dark:text-red-400 flex items-center mb-1.5 uppercase tracking-wide">
                        <AlertTriangle className="w-3 h-3 mr-1.5" />
                        Insufficient Stock
                      </p>
                      <ul className="space-y-1">
                        {item.missingIngredients.map((ing, i) => (
                          <li key={i} className="text-[11px] text-red-600/90 dark:text-red-400/80 pl-4 relative before:content-['•'] before:absolute before:left-1 before:text-red-400">
                            {ing}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-[11px] text-emerald-600 bg-emerald-50/50 border border-emerald-100 rounded-md px-2.5 py-1.5 w-fit">
                        <CheckCircle2 className="w-3 h-3" /> 
                        Inventory Levels Optimal
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="p-3 border-t border-border/40 bg-muted/5">
            <Button variant="outline" size="sm" className="w-full h-8 text-xs text-muted-foreground hover:text-foreground">
              View Full Forecast Report <ArrowRight className="ml-2 h-3 w-3" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* 5. DETAILED TABLE */}
      <Card className="shadow-sm border-border/60">
        <CardHeader className="pb-0">
          <CardTitle className="text-base font-semibold">Forecast Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40 text-xs uppercase tracking-wider">
                <TableHead className="pl-6 h-10">Menu Item</TableHead>
                <TableHead className="text-right h-10">Yesterday</TableHead>
                <TableHead className="text-right h-10 text-orange-600 font-bold">Predicted (AI)</TableHead>
                <TableHead className="h-10">Inventory Status</TableHead>
                <TableHead className="text-right h-10 pr-6">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {predictionItems.map((item) => (
                <TableRow key={item.id} className="group hover:bg-muted/30">
                  <TableCell className="pl-6 font-medium text-sm">
                    {item.name}
                    <div className="text-xs text-muted-foreground font-normal">{item.sku}</div>
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm text-muted-foreground">
                    {item.yesterdaySold}
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm font-bold text-orange-600">
                    {item.predictedToday}
                  </TableCell>
                  <TableCell>
                    {item.status === 'critical' ? (
                      <Badge variant="destructive" className="font-normal text-[10px] uppercase">Shortage</Badge>
                    ) : item.status === 'warning' ? (
                        <Badge variant="outline" className="font-normal text-[10px] uppercase border-amber-200 text-amber-700 bg-amber-50">Risk</Badge>
                    ) : (
                      <Badge variant="outline" className="font-normal text-[10px] uppercase border-emerald-200 text-emerald-700 bg-emerald-50">Ready</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <Button variant="ghost" size="sm" className="h-8 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}