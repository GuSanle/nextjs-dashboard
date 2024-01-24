import Form from '@/app/ui/tokens/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Token Generate',
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Tokens', href: '/dashboard/tokens' },
          {
            label: 'Generate Token',
            href: '/dashboard/tokens/generate',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
