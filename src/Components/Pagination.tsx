import { useMemo } from 'react';

export function Pagination({
  usersPerPage,
  totalUsers,
  onPageTap,
}: {
  usersPerPage: number;
  totalUsers: number;
  onPageTap: (pageNumber: number) => void;
}) {
  const pageNumbers = useMemo(() => {
    const numbers = [];

    for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
      numbers.push(i);
    }

    return numbers;
  }, [totalUsers, usersPerPage]);

  return (
    <nav>
      <ul>
        {pageNumbers.map((number) => (
          <li key={number} style={{ display: 'inline-block' }}>
            <button
              onClick={() => {
                onPageTap(number);
              }}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
