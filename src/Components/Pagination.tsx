export function Pagination({
  usersPerPage,
  totalUsers,
  paginate,
}: {
  usersPerPage: number;
  totalUsers: number;
  paginate: any;
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul>
        {pageNumbers.map((number) => (
          <li key={number} style={{ display: 'inline-block' }}>
            <button
              onClick={() => {
                paginate(number);
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
