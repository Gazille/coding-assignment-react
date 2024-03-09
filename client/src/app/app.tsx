import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Ticket, User } from '@acme/shared-models';

import styles from './app.module.css';
import Tickets from './tickets/tickets';
import { QueryClient, QueryClientProvider } from 'react-query';
import TicketCreate from './tickets/tickets.create';
import TicketEdit from './tickets/tickets.edit';

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        keepPreviousData: true,
        retry: 3,
        refetchOnWindowFocus: false,
        retryDelay: 3000,
      },
    },
  });

  // const [tickets, setTickets] = useState([] as Ticket[]);
  // const [users, setUsers] = useState([] as User[]);

  // Very basic way to synchronize state with server.
  // Feel free to use any state/fetch library you want (e.g. react-query, xstate, redux, etc.).
  // useEffect(() => {
  //   async function fetchTickets() {
  //     const data = await fetch('/api/tickets').then();
  //     setTickets(await data.json());
  //   }

  //   async function fetchUsers() {
  //     const data = await fetch('/api/users').then();
  //     setUsers(await data.json());
  //   }

  //   fetchTickets();
  //   fetchUsers();
  // }, []);

  const navigate = useNavigate();

  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles['app']}>
        <h1>Ticketing App</h1>
        <Routes>
          <Route path="/" element={<Tickets navigate={navigate} />} />
          {/* Hint: Try `npx nx g component TicketDetails --project=client --no-export` to generate this component  */}
          <Route path="/:id" element={<TicketEdit navigate={navigate} />} />
          <Route
            path="/tickets/create"
            element={<TicketCreate navigate={navigate} />}
          />
        </Routes>
      </div>
    </QueryClientProvider>
  );
};

export default App;
