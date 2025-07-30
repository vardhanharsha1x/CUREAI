
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { symptoms } from '@/lib/symptoms';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Activity, Check, ChevronsUpDown, Info, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { validateSymptoms } from '@/app/actions';

const formSchema = z.object({
  symptom1: z
    .string({ required_error: 'please select a symptom.' })
    .min(1, 'please select a symptom.'),
  symptom2: z
    .string({ required_error: 'please select a symptom.' })
    .min(1, 'please select a symptom.'),
  symptom3: z
    .string({ required_error: 'please select a symptom.' })
    .min(1, 'please select a symptom.'),
  symptom4: z.string().optional(),
});

type SymptomFormValues = z.infer<typeof formSchema>;

interface SymptomSelectorProps {
  onDiagnose: (symptoms: string[]) => void;
}

const SymptomSelector: React.FC<SymptomSelectorProps> = ({ onDiagnose }) => {
  const { t } = useTranslation();
  const [isClient, setIsClient] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [warning, setWarning] = useState<{ open: boolean; reasoning: string }>({
    open: false,
    reasoning: '',
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const form = useForm<SymptomFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symptom1: '',
      symptom2: '',
      symptom3: '',
      symptom4: '',
    },
  });

  const watchFields = form.watch();

  const getAvailableSymptoms = (currentField?: keyof SymptomFormValues) => {
    const selected = Object.values(watchFields).filter(Boolean);
    const currentSymptomValue = currentField
      ? watchFields[currentField]
      : undefined;
    return symptoms.filter(
      (symptom) =>
        !selected.includes(symptom) || symptom === currentSymptomValue
    );
  };

  const proceedWithDiagnosis = () => {
    const data = form.getValues();
    const selected = Object.values(data).filter(
      (value): value is string => !!value
    );
    onDiagnose(selected);
  };

  const onSubmit = async (data: SymptomFormValues) => {
    const selected = Object.values(data).filter(
      (value): value is string => !!value
    );
    
    setIsChecking(true);
    const validationResult = await validateSymptoms(selected);
    setIsChecking(false);

    if (validationResult.areUnusual) {
      setWarning({ open: true, reasoning: validationResult.reasoning });
    } else {
      proceedWithDiagnosis();
    }
  };

  const handleProceed = () => {
    setWarning({ open: false, reasoning: '' });
    proceedWithDiagnosis();
  };

  const handleCancel = () => {
    setWarning({ open: false, reasoning: '' });
  };

  const SymptomCombobox = ({
    field,
    fieldName,
  }: {
    field: any;
    fieldName: keyof SymptomFormValues;
  }) => (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              'w-full justify-between lowercase text-base h-14 border-0 bg-muted focus-visible:ring-2 focus-visible:ring-primary',
              !field.value && 'text-muted-foreground'
            )}
          >
            {field.value
              ? t(`symptoms.${field.value}`)
              : t('symptom_selector.select_symptom')}
            <ChevronsUpDown className="ml-2 h-5 w-5 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput placeholder={t('symptom_selector.search_symptom')} />
          <CommandList>
            <CommandEmpty>
              {t('symptom_selector.no_symptom_found')}
            </CommandEmpty>
            <CommandGroup>
              {getAvailableSymptoms(fieldName).map((symptom) => (
                <CommandItem
                  value={symptom}
                  key={symptom}
                  onSelect={() => {
                    form.setValue(fieldName, symptom, { shouldValidate: true });
                    const trigger = document.activeElement as HTMLElement;
                    if (trigger) trigger.blur();
                  }}
                  className="lowercase"
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      symptom === field.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {t(`symptoms.${symptom}`)}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );

  if (!isClient) {
    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </div>
    );
  }

  return (
    <>
      <AlertDialog open={warning.open} onOpenChange={(open) => setWarning({...warning, open})}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className='lowercase'>{t('validation.unusual_symptoms_title')}</AlertDialogTitle>
            <AlertDialogDescription className='lowercase'>
              {warning.reasoning}
              <br/><br/>
              {t('validation.unusual_symptoms_prompt')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel} className='lowercase'>{t('validation.cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={handleProceed} className='lowercase'>{t('validation.continue')}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight lowercase">
              {t('symptom_selector.title')}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground lowercase">
              {t('symptom_selector.description')}
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Card className="bg-transparent border-0 shadow-none">
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8 p-0">
                  <TooltipProvider>
                    {(
                      ['symptom1', 'symptom2', 'symptom3', 'symptom4'] as const
                    ).map((fieldName, index) => (
                      <FormField
                        key={fieldName}
                        control={form.control}
                        name={fieldName}
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center gap-2">
                              <FormLabel className="lowercase text-sm font-medium text-muted-foreground">
                                {t('symptom_selector.symptom')} {index + 1}{' '}
                                {index >= 3 &&
                                  `(${t('symptom_selector.optional')})`}
                              </FormLabel>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="h-4 w-4 text-muted-foreground/80 cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="text-xs lowercase">
                                    {t('symptom_selector.tooltip')}
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                            <SymptomCombobox
                              field={field}
                              fieldName={fieldName}
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                  </TooltipProvider>
                </CardContent>
              </Card>

              <div className="text-center pt-4">
                <Button
                  type="submit"
                  className="w-full max-w-sm lowercase h-12 text-base font-semibold"
                  size="lg"
                  disabled={isChecking}
                >
                  {isChecking && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                  {isChecking ? t('symptom_selector.checking') : t('symptom_selector.diagnose_illness')}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SymptomSelector;
