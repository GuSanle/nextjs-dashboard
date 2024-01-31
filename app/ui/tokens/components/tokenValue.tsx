'use client';


export default function TokenValue( { token }: { token: string } ) {
  const copyToken = (token: string) => {
    navigator.clipboard.writeText(token);
  };

  const truncateToken = (token: string, maxLength: number) => {
    if (token.length <= maxLength) {
      return token;
    }
    return token.slice(0, maxLength) + '...';
  };
  return (
  <div
    className="cursor-pointer"
    onClick={() => copyToken( token)}
    title={ token}
  >
    {truncateToken( token, 10)}
  </div>
  )
}
