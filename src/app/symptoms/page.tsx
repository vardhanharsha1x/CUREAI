import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { List } from 'lucide-react';
import { symptoms } from '@/lib/symptoms';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'symptoms list - cureai',
  description: 'view the list of symptoms available for diagnosis.',
};

export default function SymptomsPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <header className="text-center mb-12">
        <List className="mx-auto h-12 w-12 text-primary" />
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-primary-foreground mt-4 lowercase">
          available symptoms
        </h1>
        <p className="mt-4 text-lg text-muted-foreground lowercase">
          this is the list of symptoms you can use for diagnosis.
        </p>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl lowercase">symptoms list</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 list-disc pl-5 text-muted-foreground lowercase">
            {symptoms.map((symptom) => (
              <li key={symptom}>{symptom}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
