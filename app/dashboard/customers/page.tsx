import { Metadata } from 'next';
import { auth } from '@/auth';

export const metadata: Metadata = {
  title: 'Customers',
};

export default async function Page() {
  const session = await auth();

  return (
    <>
      <div>name:{session?.user?.name}</div>
      <div>email:{session?.user?.email}</div>
    </>
  );
}
