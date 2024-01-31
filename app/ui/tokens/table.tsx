import { InvalidateToken } from '@/app/ui/tokens/components/buttons';
import TokenStatus from '@/app/ui/tokens/components/status';
import { fetchFilteredTokens } from '@/app/lib/token/data';
import TokenValue from '@/app/ui/tokens/components/tokenValue';

export default async function TokenTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const tokens = await fetchFilteredTokens(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Domain
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Token
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {tokens?.map((token) => (
                <tr
                  key={token.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{token.domain}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <TokenValue token={token.token}></TokenValue>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {token.expireAt.toISOString().split('T')[0]}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <TokenStatus status={token.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <InvalidateToken id={token.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
