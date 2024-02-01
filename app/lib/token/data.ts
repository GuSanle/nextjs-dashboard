import prisma from '@/prisma/db';
import { Token } from '@prisma/client';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchAllTokens(): Promise<Token[]> {
  try {
    const domainToken = await prisma.token.findMany();
    return domainToken;
  } catch (error) {
    console.error('Failed to fetch domainToken:', error);
    throw new Error('Failed to fetch domainToken.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchTokensPages(query: string) {
  noStore();
  try {
    const count = await prisma.token.count({});

    // const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of tokens.');
  }
}

export async function fetchFilteredTokens(
  query: string,
  currentPage: number,
): Promise<Token[]> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const domainTokens = await prisma.token.findMany({
      skip: offset,
      where: {
        OR: [
          {
            domain: {
              contains: query,
            },
          },
        ],
      },
    });
    return domainTokens;
  } catch (error) {
    console.error('Failed to fetch domainToken:', error);
    throw new Error('Failed to fetch domainToken.');
  }
}
