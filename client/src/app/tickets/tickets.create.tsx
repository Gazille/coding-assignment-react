import { useForm } from 'antd/es/form/Form';
import { Button, Card, Checkbox, Form, Input, Select } from 'antd';
import { useGetUsers, usePostTicket } from './hooks';
import { User } from '@acme/shared-models';
import { NavigateFunction } from 'react-router-dom';

const TicketCreate = (props: { navigate?: NavigateFunction }) => {
  const { data: usersList } = useGetUsers();
  const { mutateAsync } = usePostTicket();
  const [form] = useForm();

  const handleCreateTicket = async (values: any) => {
    const response = await mutateAsync(values);
    if (response.status === 201) {
      props.navigate && props.navigate('/');
    }
  };

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Card>
        <Form
          form={form}
          onFinish={handleCreateTicket}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item name="description" required label="Description">
            <Input.TextArea />
          </Form.Item>
          {/* <Form.Item name="assignId" label="Assign">
            <Select
              options={usersList?.data.map((user: User) => ({
                value: user.id,
                label: user.name,
              }))}
            />
          </Form.Item>
          <Form.Item
            name="isComplete"
            valuePropName="checked"
            label="Completed"
          >
            <Checkbox />
          </Form.Item> */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <Button onClick={() => props.navigate && props.navigate('/')}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default TicketCreate;
