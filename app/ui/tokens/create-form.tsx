'use client';
import { useFormState } from 'react-dom';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { generateToken } from '@/app/lib/token/actions';
import {Select, SelectItem} from "@nextui-org/react";
 
const TOKEN_EXPIRES_IN  = {'oneYear': '31536000000', 'oneMonth': '2592000000'};



export default function Form() {
  const initialState = { message: '', errors: {} };
  const [state, dispatch] = useFormState(generateToken, initialState);

  const expireTypes = [
    { label: '一年', value: TOKEN_EXPIRES_IN['oneYear'] },
    { label: '一个月', value: TOKEN_EXPIRES_IN['oneMonth'] },
  ]
  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Token Domain */}
        <div className="mb-4">
          <label htmlFor="domain" className="mb-2 block text-sm font-medium">
            Input the domain
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="domain"
                name="domain"
                type="string"
                step="0.01"
                placeholder="Input the domain"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="domain-error"
              />
            </div>

            <div id="domain-error" aria-live="polite" aria-atomic="true">
              {state.errors?.domain &&
                state.errors.domain.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="expire" className="mb-2 block text-sm font-medium">
            Expire Type
          </label>
          <div className="relative mt-2 rounded-md">
          <div className="relative">
            <Select isRequired
        label="Expire Type" 
        className="max-w-xs" 
        name="expire"
      >
        {expireTypes.map((expire) => (
          
          <SelectItem key={expire.value}  value={expire.value} >
            {expire.label}
          </SelectItem>
        ))}
      </Select>  
 
      </div>

            <div id="domain-error" aria-live="polite" aria-atomic="true">
              {state.errors?.expire &&
                state.errors.expire.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>



      
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/tokens"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Cenerate Token</Button>
      </div>
    </form>
  );
}
