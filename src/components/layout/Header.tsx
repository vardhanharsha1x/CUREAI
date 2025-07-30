'use client';

import { Stethoscope, LogOut, LogIn, Menu } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from '../ThemeToggle';
import { LanguageToggle } from '../LanguageToggle';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

const Header = () => {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    router.push('/auth');
  };

  const navLinks = [
    { href: '/about', label: 'about' },
    { href: '/privacy', label: 'privacy_policy' },
    { href: '/contact', label: 'contact' },
    { href: '/faq', label: 'faq' },
  ];

  return (
    <header className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center">
          <div className="flex-1 flex justify-start">
            <Link href="/" className="flex items-center gap-2.5">
              <Stethoscope className="h-7 w-7 text-primary" />
              <span className="text-xl font-bold tracking-tight lowercase">
                cureai
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex flex-1 justify-center items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <Button
                key={link.label}
                variant="ghost"
                asChild
                className="lowercase font-semibold"
              >
                <Link href={link.href}>{isClient ? t(`header.${link.label}`) : '...'}</Link>
              </Button>
            ))}
          </nav>

          <div className="flex-1 flex justify-end items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            {isClient && (user ? (
              <>
                <Button
                  onClick={handleSignOut}
                  variant="ghost"
                  className="hidden md:flex lowercase"
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  {t('header.sign_out')}
                </Button>
              </>
            ) : (
              <Button asChild variant="ghost" className="hidden md:flex lowercase">
                <Link href="/auth">
                  <LogIn className="mr-2 h-5 w-5" />
                  {t('header.sign_in')}
                </Link>
              </Button>
            ))}

            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                   <SheetHeader className="text-left mb-8">
                    <SheetTitle>
                       <Link href="/" className="flex items-center gap-2.5">
                        <Stethoscope className="h-7 w-7 text-primary" />
                        <span className="text-xl font-bold tracking-tight lowercase">
                          cureai
                        </span>
                      </Link>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="grid gap-4 py-6">
                    {navLinks.map((link) => (
                      <SheetClose asChild key={link.label}>
                        <Button variant="ghost" asChild className="justify-start">
                          <Link href={link.href} className="text-lg lowercase">
                            {isClient ? t(`header.${link.label}`) : '...'}
                          </Link>
                        </Button>
                      </SheetClose>
                    ))}
                    <div className="border-t pt-4 mt-4">
                      {isClient && (user ? (
                        <SheetClose asChild>
                          <Button
                            onClick={handleSignOut}
                            variant="ghost"
                            className="w-full justify-start text-lg lowercase"
                          >
                            <LogOut className="mr-2" />
                            {t('header.sign_out')}
                          </Button>
                        </SheetClose>
                      ) : (
                        <SheetClose asChild>
                          <Button
                            asChild
                            variant="ghost"
                            className="w-full justify-start text-lg lowercase"
                          >
                            <Link href="/auth">
                              <LogIn className="mr-2" />
                              {t('header.sign_in')}
                            </Link>
                          </Button>
                        </SheetClose>
                      ))}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
