'use client';

import type { DiagnosisResult } from '@/lib/types';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { HeartPulse, Pill, Salad, AlertTriangle, ShieldCheck, Activity } from 'lucide-react';
import ChatBox from './ChatBox';
import AiResponseFormatter from './AiResponseFormatter';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

interface ResultsDisplayProps {
  results: DiagnosisResult;
  timestamp: Date | null;
}

const CategoryIcon = ({ category }: { category: DiagnosisResult['category'] }) => {
  switch (category) {
    case 'urgent':
      return <AlertTriangle className="h-12 w-12 text-primary" />;
    case 'general':
      return <Activity className="h-12 w-12 text-primary" />;
    case 'minor':
      return <ShieldCheck className="h-12 w-12 text-primary" />;
    default:
      return <HeartPulse className="h-12 w-12 text-primary" />;
  }
};

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, timestamp }) => {
  const { diagnosis, remedy, dietPlan, category } = results;
  const { t } = useTranslation();

  const formattedTimestamp = timestamp
    ? timestamp.toLocaleString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      })
    : null;

  const themeClass = `theme-${category || 'general'}`;

  return (
    <div className={cn("w-full mx-auto py-8 space-y-8", themeClass)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Frame */}
        <div className="space-y-8">
           <Card className="border-none bg-muted rounded-3xl">
              <CardHeader>
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider lowercase">
                  {t('results.likely_diagnosis')}
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <CategoryIcon category={category} />
                  <p className="text-4xl md:text-5xl font-bold lowercase">
                    {diagnosis}
                  </p>
                </div>
                {formattedTimestamp && (
                  <p className="text-xs text-muted-foreground text-right px-2 mt-4 lowercase">
                    {t('results.last_checked', { timestamp: formattedTimestamp })}
                  </p>
                )}
              </CardContent>
            </Card>

          <Card className="border-none bg-muted rounded-3xl">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Pill className="h-7 w-7 text-primary" />
                <CardTitle className="text-xl font-bold lowercase m-0">
                  {t('results.suggested_remedy')}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <AiResponseFormatter text={remedy} />
            </CardContent>
          </Card>
        </div>

        {/* Right Frame */}
        <Card className="h-full border-none bg-muted rounded-3xl">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Salad className="h-7 w-7 text-primary" />
              <CardTitle className="text-xl font-bold lowercase m-0">
                {t('results.recommended_diet')}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <AiResponseFormatter text={dietPlan} />
          </CardContent>
        </Card>
      </div>

      {/* ChatBox below */}
      <div className="w-full">
        <ChatBox diagnosis={diagnosis} />
      </div>
    </div>
  );
};

export default ResultsDisplay;
