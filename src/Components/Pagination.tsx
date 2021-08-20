import { useMemo } from 'react';
import { PageButton } from '../Utils/styles';

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
            <PageButton
              onClick={() => {
                onPageTap(number);
              }}
            >
              {number}
            </PageButton>
          </li>
        ))}
      </ul>
    </nav>
  );
}
