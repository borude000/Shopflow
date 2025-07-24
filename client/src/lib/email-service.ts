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

interface CancelOrderEmailData {
  customerName: string;
  customerPhone: string;
  productName: string;
  orderId: number;
}

export async function sendOrderEmail(orderData: OrderEmailData): Promise<boolean> {
  try {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !publicKey) {
      console.error('EmailJS credentials not configured');
      return false;
    }

    const templateParams = {
      to_email: 'nikhilborude000@gmail.com',
      customer_name: orderData.customerName,
      customer_email: orderData.customerEmail,
      customer_phone: orderData.customerPhone,
      customer_address: orderData.customerAddress,
      product_name: orderData.productName,
      product_price: orderData.productPrice,
      order_notes: orderData.notes || 'None',
      from_name: 'ShopEase Store',
      message: `New Order Received!
      
Customer Details:
- Name: ${orderData.customerName}
- Email: ${orderData.customerEmail}
- Phone: ${orderData.customerPhone}
- Address: ${orderData.customerAddress}

Product Details:
- Product: ${orderData.productName}
- Price: ${orderData.productPrice}
- Notes: ${orderData.notes || 'None'}`,
    };

    const result = await emailjs.send(
      serviceId,
      'template_default', // Default template
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

export async function sendCancelOrderEmail(cancelData: CancelOrderEmailData): Promise<boolean> {
  try {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !publicKey) {
      console.error('EmailJS credentials not configured');
      return false;
    }

    const templateParams = {
      to_email: 'nikhilborude000@gmail.com',
      customer_name: cancelData.customerName,
      customer_phone: cancelData.customerPhone,
      product_name: cancelData.productName,
      order_id: cancelData.orderId.toString(),
      from_name: 'ShopEase Store',
      message: `Order Cancellation Request!
      
Order Details:
- Order ID: #${cancelData.orderId}
- Product: ${cancelData.productName}

Customer Details:
- Name: ${cancelData.customerName}
- Phone: ${cancelData.customerPhone}

Please process this cancellation request.`,
    };

    const result = await emailjs.send(
      serviceId,
      'template_default', // Default template
      templateParams,
      publicKey
    );

    console.log('Cancellation email sent successfully:', result);
    return true;
  } catch (error) {
    console.error('Failed to send cancellation email:', error);
    return false;
  }
}
