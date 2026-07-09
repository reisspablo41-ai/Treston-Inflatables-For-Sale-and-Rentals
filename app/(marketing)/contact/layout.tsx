import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Contact Us | Get a Free Quote',
  description: 'Have questions or ready to book? Reach out to Treston Inflatable for Sale and Rentals for the best event rentals in the DFW Metroplex.',
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
