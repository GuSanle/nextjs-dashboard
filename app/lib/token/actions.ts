'use server';

import { z } from 'zod';
import prisma from '@/prisma/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signJwt } from '@/app/lib/utils';

const FormSchema = z.object({
  domain: z.string(),
  id: z.number(),
});

const GenerateToken = FormSchema.omit({ id: true });

type State = {
  errors?: {
    domain?: string[];
  };
  message?: string | null;
};

export async function generateToken(prevState: State, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = GenerateToken.safeParse({
    domain: formData.get('domain'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Generate Token.',
    };
  }

  // Prepare data for insertion into the database
  const { domain } = validatedFields.data;
  // console.log(domain, 'domain');

  // Insert data into the database
  try {
    const respone = await prisma.token.create({
      data: {
        domain,
        token: signJwt(domain),
        expireAt: new Date(
          Date.now() + parseInt(process.env.TOKEN_EXPIRES_IN!),
        ),
      },
    });
    // console.log(respone, 'respone');
  } catch (error) {
    // If a database error occurs, return a more specific error.
    console.log(error, 'error');
    return {
      message: 'Database Error: Failed to Generate Token.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/tokens');
  redirect('/dashboard/tokens');
}

export async function invalidateToken(id: number) {
  try {
    // await sql`DELETE FROM invoices WHERE id = ${id}`;
    await prisma.token.update({
      where: {
        id,
      },
      data: {
        status: false,
      },
    });
    revalidatePath('/dashboard/tokens');
    return { message: 'Invalidate tokens' };
  } catch (error) {
    return { message: 'Database Error: Failed to Invalidate tokens.' };
  }
}
