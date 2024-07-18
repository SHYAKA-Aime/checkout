import React from 'react';
import { Modal, Form, Input, Button, notification } from 'antd';
import { useCheckoutMutation } from '../../store/actions/cart';

interface CheckoutModalProps {
  visible: boolean;
  onClose: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ visible, onClose }) => {
  const [checkout, { isLoading: isCheckingOut }] = useCheckoutMutation();

  const handleCheckoutSubmit = async (values: { street: string; city: string; country: string; zipCode: string }) => {
    try {
      await checkout({ params: values }).unwrap();
      notification.success({ message: 'Checkout successful' });
      onClose();
    } catch (error) {
      console.error('Checkout failed', error);
      notification.error({ message: 'Checkout failed' });
    }
  };

  return (
    <Modal
      title="Checkout"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form layout="vertical" onFinish={handleCheckoutSubmit}>
        <Form.Item
          name="street"
          label="Street"
          rules={[{ required: true, message: 'Please enter your street' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="city"
          label="City"
          rules={[{ required: true, message: 'Please enter your city' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="country"
          label="Country"
          rules={[{ required: true, message: 'Please enter your country' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="zipCode"
          label="Zip Code"
          rules={[{ required: true, message: 'Please enter your zip code' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isCheckingOut}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CheckoutModal;
