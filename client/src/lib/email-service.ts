import emailjs from '@emailjs/browser';

interface OrderEmailData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  productName: string;
  productPrice: string;
  notes?: string;
}

export async function sendOrderEmail(orderData: OrderEmailData): Promise<boolean> {
  try {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'default_service_id';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'default_template_id';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'default_public_key';

    const templateParams = {
      to_email: orderData.customerEmail,
      customer_name: orderData.customerName,
      customer_phone: orderData.customerPhone,
      customer_address: orderData.customerAddress,
      product_name: orderData.productName,
      product_price: orderData.productPrice,
      order_notes: orderData.notes || 'None',
      from_name: 'ShopEase Store',
    };

    const result = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      publicKey
    );

    console.log('Email sent successfully:', result);
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
}
