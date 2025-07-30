import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, Info, Database, User, MessageCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'privacy policy - cureai',
  description: 'understand how cureai handles your data and protects your privacy.',
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <header className="text-center mb-12">
        <ShieldCheck className="mx-auto h-12 w-12 text-primary" />
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-primary-foreground mt-4 lowercase">
          privacy policy
        </h1>
        <p className="mt-4 text-lg text-muted-foreground lowercase">
          your privacy is important to us.
        </p>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl lowercase">our commitment to your privacy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground lowercase">
          <p>
            at cureai, we are committed to protecting the privacy and security of our users. this policy outlines how we collect, use, and safeguard the information you provide while using our application. our goal is to be transparent about our data practices in a way that is easy to understand.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <Info className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground lowercase">information we collect</h3>
                <p>we only collect the information you voluntarily provide, specifically the symptoms you select for diagnosis and the messages you send to our ai chat assistant. we do not require you to create an account or provide any personal identification information like your name, email address, or location.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <Database className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground lowercase">how we use your data</h3>
                <p>the symptom data and chat messages you provide are sent to our secure ai model to generate responses, such as potential diagnoses, remedies, diet plans, and chat replies. this data is used solely for the purpose of providing the core functionality of the app.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground lowercase">anonymity</h3>
                <p>your usage of the app is anonymous. since we do not collect personal identifiers, the data you provide (symptoms and chat history) is not linked to you personally. your session data is temporary and used only for the context of your current interaction.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <MessageCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground lowercase">data retention and security</h3>
                <p>we do not store your chat history or diagnosis results after you end your session. all interactions are processed in real-time and are not saved in a long-term database. we employ industry-standard security measures to protect the data during transmission to our ai services.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <ShieldCheck className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground lowercase">disclaimer</h3>
                <p>cureai is an informational tool and not a substitute for professional medical advice. the information provided by our ai is for educational purposes only. always consult with a qualified healthcare professional for any medical concerns or before making any health decisions.</p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
