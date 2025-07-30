'use client';

import { useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendSignInLinkToEmail,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { LogIn, Eye, EyeOff, Loader, Mail, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const emailSchema = z.object({
  email: z.string().email('invalid email address.'),
});

const authSchema = emailSchema.extend({
  password: z.string().min(6, 'password must be at least 6 characters.'),
});

type AuthFormValues = z.infer<typeof authSchema>;
type EmailFormValues = z.infer<typeof emailSchema>;

export default function AuthPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('signin');
  const [showPassword, setShowPassword] = useState(false);
  
  const authForm = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: { email: '', password: '' },
  });

  const magicLinkForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: '' },
  });

  useEffect(() => {
    if (!authLoading && user) {
      router.push('/');
    }
  }, [user, authLoading, router]);
  
  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <Loader className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (user) {
    return null;
  }

  const handleAuthAction = async (data: AuthFormValues) => {
    setLoading(true);
    try {
      if (activeTab === 'signin') {
        await signInWithEmailAndPassword(auth, data.email, data.password);
        toast({ title: 'Success', description: 'Signed in successfully.' });
        router.push('/');
      } else {
        await createUserWithEmailAndPassword(auth, data.email, data.password);
        toast({ title: 'Success', description: 'Account created successfully. Welcome!' });
        router.push('/');
      }
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleMagicLink = async (data: EmailFormValues) => {
    setLoading(true);
    try {
      const actionCodeSettings = {
        url: `${window.location.origin}`,
        handleCodeInApp: true,
      };
      await sendSignInLinkToEmail(auth, data.email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', data.email);
      toast({ title: 'Check your email', description: 'A magic link has been sent to your email address.' });
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    const email = authForm.getValues('email');
    if (!email) {
      authForm.setError('email', { type: 'manual', message: 'please enter your email to reset password.' });
      return;
    }
    const { error } = emailSchema.safeParse({ email });
    if (error) {
       authForm.setError('email', { type: 'manual', message: 'please enter a valid email address.' });
       return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast({ title: 'Check your email', description: 'A password reset link has been sent.' });
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    } finally {
      setLoading(false);
    }
  };
  
  const passwordInput = (field: any) => (
    <div className="relative">
      <FormField control={authForm.control} name="password" render={({ field }) => (
        <FormItem>
          <FormLabel className="lowercase ml-4 text-muted-foreground">{t('auth.password')}</FormLabel>
          <FormControl>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              {...field}
              className="lowercase pr-12"
            />
          </FormControl>
          <FormMessage className="ml-4"/>
        </FormItem>
      )} />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute inset-y-0 right-0 flex items-center pr-4 pt-6 text-muted-foreground"
      >
        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
      </button>
    </div>
  );

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)] px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Sparkles className="mx-auto h-12 w-12 text-primary mb-4" />
          <h1 className="text-4xl font-bold tracking-tight lowercase">{t(`auth.${activeTab === 'signin' ? 'welcome_back' : 'create_account'}`)}</h1>
          <p className="mt-2 text-lg text-muted-foreground lowercase">{t(`auth.${activeTab === 'signin' ? 'sign_in_prompt' : 'sign_up_prompt'}`)}</p>
        </div>

        <Tabs defaultValue="signin" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin" className="lowercase">{t('auth.sign_in')}</TabsTrigger>
            <TabsTrigger value="signup" className="lowercase">{t('auth.sign_up')}</TabsTrigger>
          </TabsList>
          
          <Form {...authForm}>
            <form onSubmit={authForm.handleSubmit(handleAuthAction)} className="mt-8">
                <div className="space-y-6">
                  <FormField control={authForm.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="lowercase ml-4 text-muted-foreground">{t('auth.email')}</FormLabel>
                      <FormControl><Input placeholder={t('auth.email_placeholder')} {...field} className="lowercase"/></FormControl>
                      <FormMessage className="ml-4"/>
                    </FormItem>
                  )} />
                  {passwordInput(authForm.control.register('password'))}
                </div>
                
                <TabsContent value="signin" className="space-y-4">
                  <div className="text-right">
                    <Button type="button" variant="link" size="sm" onClick={handlePasswordReset} className="lowercase text-xs px-1">
                      {t('auth.forgot_password')}
                    </Button>
                  </div>
                   <Button type="submit" className="w-full h-12 text-base font-semibold lowercase" disabled={loading}>
                    {loading ? t('auth.signing_in') : t('auth.sign_in')}
                  </Button>
                </TabsContent>
                
                <TabsContent value="signup" className="space-y-4">
                   <Button type="submit" className="w-full h-12 text-base font-semibold lowercase mt-4" disabled={loading}>
                    {loading ? t('auth.creating_account') : t('auth.sign_up')}
                  </Button>
                </TabsContent>
            </form>
          </Form>
        </Tabs>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground lowercase">
              {t('auth.or_continue_with')}
            </span>
          </div>
        </div>

        <Card className="bg-muted border-none">
          <CardContent className="pt-6">
             <Form {...magicLinkForm}>
               <form onSubmit={magicLinkForm.handleSubmit(handleMagicLink)} className="space-y-4">
                 <FormField control={magicLinkForm.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">{t('auth.email')}</FormLabel>
                      <FormControl><Input placeholder={t('auth.magic_link_placeholder')} {...field} className="lowercase"/></FormControl>
                      <FormMessage className="ml-4"/>
                    </FormItem>
                  )} />
                <Button type="submit" variant="secondary" className="w-full h-12 text-base font-semibold lowercase" disabled={loading}>
                  <Mail className="mr-2"/>
                  {loading ? t('auth.sending') : t('auth.get_link')}
                </Button>
               </form>
             </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
