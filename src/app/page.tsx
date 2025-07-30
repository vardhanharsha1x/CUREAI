'use client';

import { useState } from 'react';
import SymptomSelector from '@/components/SymptomSelector';
import ResultsDisplay from '@/components/ResultsDisplay';
import FloatingCTA from '@/components/FloatingCTA';
import { getDiagnosis } from '@/app/actions';
import type { DiagnosisResult } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const [results, setResults] = useState<DiagnosisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [checkTimestamp, setCheckTimestamp] = useState<Date | null>(null);
  const { toast } = useToast();

  const handleDiagnose = async (symptoms: string[]) => {
    setIsLoading(true);
    setResults(null);
    setCheckTimestamp(null);
    try {
      const diagnosisResults = await getDiagnosis(symptoms);
      setResults(diagnosisResults);
      setCheckTimestamp(new Date());
    } catch (error: any) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'failed to get diagnosis. please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setCheckTimestamp(null);
    window.location.reload();
  };

  const LoadingSkeleton = () => (
    <div className="w-full mx-auto py-8 space-y-8 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-8">
           <Card className="shadow-none border-none bg-muted rounded-3xl">
              <CardContent className="p-6">
                <Skeleton className="h-6 w-1/3 mb-4 bg-muted-foreground/30" />
                <Skeleton className="h-10 w-1/2 bg-muted-foreground/30" />
              </CardContent>
            </Card>
          <Card className="shadow-none border-none bg-muted rounded-3xl">
            <CardContent className="p-6 space-y-4">
              <Skeleton className="h-8 w-1/2 bg-muted-foreground/30" />
              <Skeleton className="h-4 w-full bg-muted-foreground/30" />
              <Skeleton className="h-4 w-full bg-muted-foreground/30" />
              <Skeleton className="h-4 w-3/4 bg-muted-foreground/30" />
            </CardContent>
          </Card>
        </div>
        <Card className="h-full shadow-none border-none bg-muted rounded-3xl">
          <CardContent className="p-6 space-y-4">
            <Skeleton className="h-8 w-1/3 bg-muted-foreground/30" />
            <Skeleton className="h-4 w-full bg-muted-foreground/30" />
            <Skeleton className="h-4 w-full bg-muted-foreground/30" />
            <Skeleton className="h-4 w-5/6 bg-muted-foreground/30" />
          </CardContent>
        </Card>
      </div>
      <Card className="shadow-none border-none bg-muted rounded-3xl">
         <CardContent className="p-6">
            <Skeleton className="h-8 w-1/4 mb-6 bg-muted-foreground/30" />
            <div className="space-y-4">
              <div className="flex justify-end">
                <Skeleton className="h-12 w-2/5 rounded-full bg-muted-foreground/30" />
              </div>
              <div className="flex justify-start">
                <Skeleton className="h-24 w-3/5 rounded-3xl bg-muted-foreground/30" />
              </div>
            </div>
         </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {isLoading ? (
        <LoadingSkeleton />
      ) : results ? (
        <>
          <ResultsDisplay results={results} timestamp={checkTimestamp} />
          <FloatingCTA onReset={handleReset} />
        </>
      ) : (
        <SymptomSelector onDiagnose={handleDiagnose} />
      )}
    </div>
  );
}
