import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'contact us - cureai',
  description: 'get in touch with the cureai team.',
};

export default function ContactPage() {
  const email = 'support@cureai.com';
  const subject = 'inquiry from cureai user';
  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

  return (
    <div className="container mx-auto max-w-2xl py-24 px-4 flex items-center justify-center min-h-[70vh]">
      <Card className="w-full text-center shadow-2xl">
        <CardHeader>
          <div className="mx-auto bg-primary/20 p-3 rounded-full w-fit mb-4">
            <Mail className="w-10 h-10 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold lowercase">contact us</CardTitle>
          <CardDescription className="lowercase">
            have questions or feedback? we&apos;d love to hear from you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-muted-foreground lowercase">
            the best way to reach us is by email. click the button below to open your mail client.
          </p>
          <Button asChild size="lg" className="lowercase">
            <a href={mailtoLink}>
              <Mail className="mr-2 h-5 w-5" />
              send us an email
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
