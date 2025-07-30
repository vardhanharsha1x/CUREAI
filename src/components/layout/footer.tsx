'use client';

import { Stethoscope } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

const Footer = () => {
  const { t } = useTranslation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const navLinks = [
    { href: '/about', label: 'about' },
    { href: '/privacy', label: 'privacy_policy' },
    { href: '/contact', label: 'contact' },
    { href: '/faq', label: 'faq' },
  ];

  return (
    <footer className="bg-muted/40 border-t mt-16">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-1 justify-start items-center gap-2.5">
            <Stethoscope className="h-7 w-7 text-primary" />
            <span className="text-lg font-bold tracking-tight lowercase">
              cureai
            </span>
          </div>
          <nav className="flex flex-1 justify-center flex-wrap gap-x-6 gap-y-2 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors lowercase font-medium"
              >
                {isClient ? t(`footer.${link.label}`) : '...'}
              </Link>
            ))}
          </nav>
          <div className="flex-1 flex justify-end">
            <p className="text-sm text-muted-foreground text-right lowercase">
              {isClient ? t('footer.copyright', { year: new Date().getFullYear() }) : '...'}
            </p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground/80 mt-10 text-center lowercase">
          {isClient ? t('footer.disclaimer') : '...'}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
