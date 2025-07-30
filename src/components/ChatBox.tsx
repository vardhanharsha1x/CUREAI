'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { getChatResponse } from '@/app/actions';
import type { ChatMessage } from '@/lib/types';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Send, MessageSquarePlus, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import AiResponseFormatter from './AiResponseFormatter';
import { useTranslation } from 'react-i18next';

const formSchema = z.object({
  message: z.string().min(1, 'message cannot be empty.'),
});

const TypingIndicator = () => (
  <div className="flex items-center space-x-1.5 p-2">
    <span className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse [animation-delay:-0.3s]"></span>
    <span className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse [animation-delay:-0.15s]"></span>
    <span className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse"></span>
  </div>
);

interface ChatBoxProps {
  diagnosis: string;
}

const ChatBox = ({ diagnosis }: ChatBoxProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isResponding, setIsResponding] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const form = useForm<{ message: string }>({
    resolver: zodResolver(formSchema),
    defaultValues: { message: '' },
  });

  useEffect(() => {
    const handleInitialMessage = async () => {
      setIsLoading(true);
      const initialMessage = `i have been diagnosed with ${diagnosis}. what should i know?`;
      try {
        const response = await getChatResponse(initialMessage, []);
        setMessages([
          { role: 'user', content: initialMessage },
          { role: 'assistant', content: response.response },
        ]);
        setSuggestedQuestions(response.suggestedQuestions);
      } catch (error) {
        setMessages([{ role: 'assistant', content: 'sorry, i had trouble getting started. please try asking a question.' }]);
      } finally {
        setIsLoading(false);
      }
    };
    handleInitialMessage();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [diagnosis]);


  useEffect(() => {
    if (scrollAreaRef.current) {
      setTimeout(() => {
        scrollAreaRef.current?.scrollTo({
          top: scrollAreaRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }, 100);
    }
  }, [messages, isResponding]);

  const handleSubmit = async (values: { message: string }) => {
    const userMessage: ChatMessage = { role: 'user', content: values.message };
    const currentHistory = [...messages, userMessage];
    setMessages(currentHistory);
    form.reset();
    setIsResponding(true);
    setSuggestedQuestions([]);

    const response = await getChatResponse(values.message, messages);
    
    setMessages([
      ...currentHistory,
      { role: 'assistant', content: response.response },
    ]);
    setSuggestedQuestions(response.suggestedQuestions);
    setIsResponding(false);
  };

  const handleSuggestedQuestion = (question: string) => {
    form.setValue('message', question);
    handleSubmit({ message: question });
  };
  
  const ChatSkeleton = () => (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Skeleton className="h-12 w-3/5 rounded-3xl bg-muted" />
      </div>
       <div className="flex items-start gap-3">
         <Skeleton className="h-10 w-10 rounded-full bg-muted" />
         <Skeleton className="h-24 w-4/5 rounded-3xl bg-muted" />
      </div>
       <div className="flex items-start gap-3">
         <Skeleton className="h-10 w-10 rounded-full bg-muted" />
         <Skeleton className="h-10 w-3/5 rounded-3xl bg-muted" />
      </div>
    </div>
  );
  
  return (
    <Card className="h-full flex flex-col border-none bg-muted rounded-3xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 lowercase">
          <MessageSquarePlus className="text-primary h-7 w-7" />
          <span className="text-xl font-bold">{t('results.ai_assistant')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col gap-4 overflow-hidden">
        <div className="flex-grow flex flex-col gap-4 overflow-hidden h-full">
          <ScrollArea className="flex-grow pr-4 h-[400px]" ref={scrollAreaRef}>
            {isLoading ? (
              <ChatSkeleton />
            ) : (
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={cn('flex items-start gap-3', {
                      'justify-end': msg.role === 'user',
                    })}
                  >
                    {msg.role === 'assistant' && (
                      <Avatar className="h-10 w-10 self-start flex-shrink-0">
                        <AvatarFallback className="bg-secondary text-secondary-foreground lowercase font-bold">
                          <Sparkles className="h-5 w-5"/>
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        'max-w-sm md:max-w-md lg:max-w-lg rounded-3xl px-5 py-3 text-base',
                        {
                          'bg-primary text-primary-foreground rounded-br-lg':
                            msg.role === 'user',
                          'bg-background rounded-bl-lg': msg.role === 'assistant',
                        }
                      )}
                    >
                      {msg.role === 'assistant' ? (
                        <AiResponseFormatter text={msg.content} />
                      ) : (
                        <p className="lowercase m-0">{msg.content}</p>
                      )}
                    </div>
                  </div>
                ))}
                {isResponding && (
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10 self-start flex-shrink-0">
                      <AvatarFallback className="bg-secondary text-secondary-foreground lowercase font-bold">
                        <Sparkles className="h-5 w-5"/>
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-background rounded-3xl px-4 py-2 rounded-bl-lg">
                      <TypingIndicator />
                    </div>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>

          {!isLoading && (
            <>
              <div className="flex flex-wrap gap-2 py-2">
                {suggestedQuestions.map((q, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestedQuestion(q)}
                    disabled={isResponding}
                    className="lowercase rounded-full"
                  >
                    {q}
                  </Button>
                ))}
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="flex items-center gap-2 pt-4 border-t"
                >
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="flex-grow">
                        <FormControl>
                          <Textarea
                            placeholder={t('results.ask_follow_up')}
                            className="resize-none lowercase text-base bg-background h-14 rounded-3xl border-0 focus-visible:ring-2 focus-visible:ring-primary"
                            rows={1}
                            {...field}
                            onKeyDown={(e) => {
                              if (e.key === 'enter' && !e.shiftKey) {
                                e.preventDefault();
                                form.handleSubmit(handleSubmit)();
                              }
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button type="submit" size="icon" disabled={isResponding} className="h-14 w-14 rounded-full">
                    <Send className="h-6 w-6" />
                  </Button>
                </form>
              </Form>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatBox;
