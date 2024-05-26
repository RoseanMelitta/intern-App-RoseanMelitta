import { useEffect, useState } from 'react';

import { currentEnvironment } from '@constants';

import styles from './users.module.scss';
import { error } from 'console';

type Gender = 'female' | 'male' | '';

type User = {
  gender: Gender;
  login: {
    uuid: string;
  };
  name: {
    first: string;
    last: string;
  };
};

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [gender, setGender] = useState<Gender>('');
  const [pageToGet, setPageToGet] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getUsers = async (page: number, selectedGender: Gender) => {
    setIsLoading(true);
    setError(null);
    try {
      const genderQuery = selectedGender ? `&gender=${selectedGender}` : '';
      const result = await fetch(
        `${currentEnvironment.api.baseUrl}?results=5${genderQuery}&page=${String(page)}`
      );
      const data = await result.json();
      if (data.results) {
        const usersResults = data.results as User[];
        setUsers((oldUsers) => (page === 1 ? usersResults : [...oldUsers, ...usersResults]));
      } else {
        setError('Failed to fetch users');
      }
    } catch (error) {
      setError('Failed to fetch users');
    }
    finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void (async () => {
      await getUsers(pageToGet, gender);
    })();
  }, [pageToGet, gender]);

  return (
    <div>
      <div className={styles.header}>
        <h1>Users</h1>
        <div className={styles.selectContainer}>
          <label htmlFor="gender" className={styles.selectLabel}>Filter by gender:</label>
          <select
            id="gender"
            name="gender"
            className={styles.select}
            onChange={(event) => {
              setGender(event.target.value as Gender);
              setPageToGet(1);
            }}
          >
            <option value="">All</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div>
      </div>
      {isLoading ? (
        <p className={styles.loading}>Loading...</p>
      ) : (
        <div className={styles.user_list}>
          {users.length > 0
            ? users.map((user: User) => (
              <li key={user.login.uuid} className={styles.user_item}>
                <div className={styles.userDetails}>
                  <p className={styles.userName}>{user.name.first} {user.name.last}</p>
                  <p className={styles.userGender}>{user.gender}</p>
                </div>
              </li>
            ))
            : (<p className={styles.no_users}>No users to display</p>)}
        </div>
      )}
      <button
        className={styles.loadButton}
        type="button"
        onClick={() => {
          setPageToGet((v) => v + 1);
        }}
      >
        Load More
      </button>
    </div>
  );
};

export default Users;

// 1. The logo looks tiny on smaller devices.
// 2. TEC theme is not displayed on the app bar instead a green color is seen.
// 3. Users screen does not display any data.
// 4. Load more button style is not working.
// 5. Style issues are encountered on the page - style however you want.
// 6. Additional data is not displayed upon using "Load more" button.
// 7. Users are not filtered by gender and the list does not reset on change select.
// 8. No loading state is displayed when accessing "Users" component.
// 9. On home page user should be able to do the following actions with cards that contain
// 2 fields: Title and Description
//     - See all the cards already added
//     - Add a card
//     - Update a card
//     - Delete a card
