import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function TokenStatus({ status }: { status: boolean }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-green-500 text-white': status,
          'bg-gray-100 text-gray-500': !status,
        },
      )}
    >
      {status ? (
        <>
          Active
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {!status ? (
        <>
          Inactive
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
    </span>
  );
}
