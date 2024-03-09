import { Ticket, User } from '@acme/shared-models';
import { Button, Checkbox, Table } from 'antd';
import { NavigateFunction } from 'react-router-dom';
import { useGetTickets, useGetUsers } from './hooks';

export interface TicketsProps {
  tickets?: Ticket[];
  navigate?: NavigateFunction;
}

export function Tickets(props: TicketsProps) {
  const { data: usersList, isLoading: isLoadingGetUsers } = useGetUsers();
  const { data: ticketList, isLoading: isLoadingGetTickets } = useGetTickets();

  const generateColumns = () => {
    return [
      {
        title: 'Id',
        dataIndex: 'id',
        render: (value: number) => (
          <p
            style={{ cursor: 'pointer', color: '#4096ff', margin: 0 }}
            onClick={() => props.navigate && props.navigate(`/${value}`)}
          >
            {value}
          </p>
        ),
      },
      {
        title: 'Description',
        dataIndex: 'description',
      },
      {
        title: 'Is Completed',
        dataIndex: 'completed',
        render: (value: boolean) => {
          return <Checkbox checked={value} disabled />;
        },
        onFilter: (value: unknown, record: Ticket) => {
          return record.completed === value;
        },
        filters: [
          {
            text: 'Complete',
            value: true,
          },
          {
            text: 'Uncomplete',
            value: false,
          },
        ],
      },
      {
        title: 'Assign',
        dataIndex: 'assigneeId',
        render: (value: number) => {
          return usersList?.data.find((user: User) => user.id === value)?.name;
        },
        filterSearch: true,
        onFilter: (value: unknown, record: Ticket) => {
          return record.assigneeId === value;
        },
        filters: usersList?.data.map((user: User) => ({
          text: user.name,
          value: user.id,
        })),
      },
    ];
  };

  const columns = generateColumns();

  return (
    <>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: 16,
        }}
      >
        <Button
          type="primary"
          onClick={() => props.navigate && props.navigate('/tickets/create')}
        >
          Add Ticket
        </Button>
      </div>
      <Table
        dataSource={ticketList?.data || []}
        columns={columns}
        loading={isLoadingGetUsers || isLoadingGetTickets}
        rowKey="id"
      />
    </>
  );
}

export default Tickets;
