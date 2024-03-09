import { useForm } from 'antd/es/form/Form';
import { Button, Card, Checkbox, Form, Input, Select } from 'antd';
import {
  useDeleteCompleted,
  useGetTicketDetail,
  useGetUsers,
  usePutAssignTicket,
  usePutCompletedTicket,
  usePutUnAssignTicket,
} from './hooks';
import { User } from '@acme/shared-models';
import { NavigateFunction, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

const TicketEdit = (props: { navigate?: NavigateFunction }) => {
  const { data: usersList } = useGetUsers();
  const { mutateAsync: getTicketDetail } = useGetTicketDetail();
  const { mutateAsync: completedTicket } = usePutCompletedTicket();
  const { mutateAsync: deleteCompletedTicket } = useDeleteCompleted();
  const { mutateAsync: assignTicket } = usePutAssignTicket();
  const { mutateAsync: unAssignTicket } = usePutUnAssignTicket();

  const [form] = useForm();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getTicketDetail({ id: Number(id) }).then(({ data }) => {
        form.setFieldsValue({
          id: data.id,
          description: data.description,
          assigneeId: data.assigneeId,
          completed: data.completed,
        });
      });
    }
  }, [form, getTicketDetail, id]);

  const handleCompleted = (e: CheckboxChangeEvent) => {
    const value = e.target.checked;
    value
      ? completedTicket({ id: Number(id) })
      : deleteCompletedTicket({ id: Number(id) });
  };

  const handleAssign = (value: number) => {
    value
      ? assignTicket({ id: Number(id), userId: value })
      : unAssignTicket({ id: Number(id) });
  };

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Card>
        <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
          <Form.Item name="description" required label="Description">
            <Input.TextArea disabled />
          </Form.Item>
          <Form.Item name="assigneeId" label="Assign">
            <Select
              allowClear
              options={usersList?.data.map((user: User) => ({
                value: user.id,
                label: user.name,
              }))}
              onChange={handleAssign}
            />
          </Form.Item>
          <Form.Item name="completed" valuePropName="checked" label="Completed">
            <Checkbox onChange={(e) => handleCompleted(e)} />
          </Form.Item>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <Button onClick={() => props.navigate && props.navigate('/')}>
              Back
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default TicketEdit;
