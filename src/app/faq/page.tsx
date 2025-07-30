'use client';

import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { HelpCircle, ChevronDown } from 'lucide-react';
import type { Metadata } from 'next';

// metadata can't be exported from a client component. 
// we can define it here, but it should be in a parent layout or page if needed for seo.
/*
export const metadata: metadata = {
  title: 'faq - cureai',
  description: 'frequently asked questions about cureai and its features.',
};
*/


const allFaqs = [
  // fever
  {
    question: 'what kind of diet is recommended for someone with a fever?',
    answer: 'for a fever, it’s best to consume light, easily digestible foods like soups, broths, and boiled vegetables. stay hydrated with water, herbal teas, and fruit juices. avoid heavy, oily, and spicy foods.',
  },
  {
    question: 'what are some home remedies for a mild fever?',
    answer: 'a lukewarm bath, staying in a cool room, and applying a cold compress to the forehead can help reduce fever. rest is crucial for recovery.',
  },
  {
    question: 'when should i see a doctor for a fever?',
    answer: 'you should consult a doctor if your fever is very high (above 103°f or 39.4°c), lasts more than three days, or is accompanied by severe symptoms like a stiff neck, rash, or difficulty breathing.',
  },
  // cough
  {
    question: 'what can i do to soothe a persistent cough?',
    answer: 'gargling with warm salt water, drinking honey and lemon tea, and using a humidifier can help soothe a cough. over-the-counter cough syrups may also provide relief.',
  },
  {
    question: 'are there any foods i should avoid with a cough?',
    answer: 'it\'s often recommended to avoid dairy products, which can thicken mucus, as well as cold and fried foods that may irritate the throat.',
  },
  // shortness of breath
  {
    question: 'what immediate steps can i take if i feel short of breath?',
    answer: 'try to stay calm, sit down, and practice pursed-lip breathing (breathing in through your nose and out slowly through pursed lips). if it\'s severe or doesn\'t improve, seek medical attention immediately.',
  },
  // fatigue
  {
    question: 'how can i combat fatigue when i\'m feeling unwell?',
    answer: 'prioritize rest and sleep. ensure you are eating nutritious meals to provide your body with energy. gentle stretching can also help, but avoid strenuous activities.',
  },
  // muscle or body aches
  {
    question: 'what are the best remedies for muscle and body aches?',
    answer: 'a warm bath with epsom salts, gentle massage, and over-the-counter pain relievers can help alleviate muscle aches. ensure you are well-hydrated.',
  },
  // headache
  {
    question: 'how can i relieve a headache without medication?',
    answer: 'resting in a quiet, dark room, applying a cold or warm compress to your head, and gentle neck stretches can be effective. staying hydrated is also very important.',
  },
  {
    question: 'what diet changes can help with frequent headaches?',
    answer: 'avoiding triggers like caffeine, alcohol, and processed foods can help. eating regular, balanced meals and staying hydrated are key to preventing some types of headaches.',
  },
  // loss of taste or smell
  {
    question: 'is there anything i can do to regain my sense of taste or smell?',
    answer: 'smell training, which involves sniffing a sequence of strong scents (like lemon, cloves, rose, and eucalyptus) daily, has been shown to help some people. recovery time varies.',
  },
  // sore throat
  {
    question: 'what is the most effective way to soothe a sore throat?',
    answer: 'gargling with warm salt water is highly effective. drinking warm liquids like herbal tea with honey and sucking on throat lozenges can also provide significant relief.',
  },
  // congestion or runny nose
  {
    question: 'what are some natural ways to clear a congested nose?',
    answer: 'steam inhalation (e.g., from a hot shower or a bowl of hot water) and using a saline nasal spray are great natural methods to relieve congestion.',
  },
  // nausea or vomiting
  {
    question: 'what should i eat or drink if i am feeling nauseous?',
    answer: 'stick to the brat diet (bananas, rice, applesauce, toast). ginger tea or ginger ale can also help settle the stomach. sip fluids slowly to stay hydrated.',
  },
  {
    question: 'when is vomiting a sign of a serious issue?',
    answer: 'seek medical help if vomiting is persistent for more than a day, if you see blood in the vomit, or if it is accompanied by severe abdominal pain or dehydration.',
  },
];


const ITEMS_PER_PAGE = 5;

export default function FaqPage() {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + ITEMS_PER_PAGE);
  };

  const visibleFaqs = allFaqs.slice(0, visibleCount);

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <header className="text-center mb-12">
        <HelpCircle className="mx-auto h-12 w-12 text-primary" />
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-primary-foreground mt-4 lowercase">
          frequently asked questions
        </h1>
        <p className="mt-4 text-lg text-muted-foreground lowercase">
          find answers to common questions about symptoms, remedies, and our app.
        </p>
      </header>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {visibleFaqs.map((faq, index) => (
          <AccordionItem value={`item-${index}`} key={index} className="bg-card border-b-0 rounded-lg shadow-sm">
            <AccordionTrigger className="px-6 text-left hover:no-underline lowercase">
              <span className="font-semibold text-card-foreground">{faq.question}</span>
            </AccordionTrigger>
            <AccordionContent className="px-6 text-muted-foreground lowercase">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {visibleCount < allFaqs.length && (
        <div className="text-center mt-12">
          <Button onClick={handleLoadMore} size="lg" className="lowercase">
            <ChevronDown className="mr-2 h-5 w-5" />
            load more
          </Button>
        </div>
      )}
    </div>
  );
}
