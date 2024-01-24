import Pagination from '@/app/ui/tokens/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/tokens/table';
import { GenerateToken } from '@/app/ui/tokens/buttons';
import { aliFont } from '@/app/ui/fonts';
import { TokenTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchTokensPages } from '@/app/lib/token/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tokens',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchTokensPages(query);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${aliFont.className} text-2xl`}>Tokens</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search domain token..." />
        <GenerateToken />
      </div>
      <Suspense key={query + currentPage} fallback={<TokenTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
