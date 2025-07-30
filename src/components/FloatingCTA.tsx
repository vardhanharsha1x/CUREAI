'use client';

import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

interface FloatingCTAProps {
  onReset: () => void;
}

const FloatingCTA: React.FC<FloatingCTAProps> = ({ onReset }) => {
  const { t } = useTranslation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (!isClient) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={onReset}
        size="lg"
        className="rounded-full shadow-2xl lowercase"
      >
        <RefreshCw className="mr-2 h-5 w-5" />
        {t('floating_cta.check_another')}
      </Button>
    </div>
  );
};

export default FloatingCTA;
