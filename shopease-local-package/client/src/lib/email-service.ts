import emailjs from '@emailjs/browser';

// For now, we'll simulate email sending until EmailJS templates are set up
const SIMULATE_EMAIL = true;

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
  if (SIMULATE_EMAIL) {
    // Simulate email sending for demonstration
    console.log('📧 EMAIL SIMULATION - Order Notification:');
    console.log('To: nikhilborude000@gmail.com');
    console.log('Subject: New Order Received - ShopEase Store');
    console.log(`
📦 NEW ORDER RECEIVED!

Customer Details:
👤 Name: ${orderData.customerName}
📧 Email: ${orderData.customerEmail}
📱 Phone: ${orderData.customerPhone}
🏠 Address: ${orderData.customerAddress}

Product Details:
🛍️ Product: ${orderData.productName}
💰 Price: ${orderData.productPrice}
📝 Notes: ${orderData.notes || 'None'}

---
ShopEase Store
    `);
    return true;
  }

  try {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !publicKey) {
      console.error('EmailJS credentials not configured');
      return false;
    }

    // You need to create a template in your EmailJS dashboard first
    // Go to https://dashboard.emailjs.com/admin/templates
    // Create a template with these variables: {{to_name}}, {{from_name}}, {{message}}, {{reply_to}}
    
    const templateParams = {
      to_name: 'Store Owner',
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
      reply_to: orderData.customerEmail,
    };

    const result = await emailjs.send(
      serviceId,
      'YOUR_TEMPLATE_ID', // Replace with your actual template ID
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
  if (SIMULATE_EMAIL) {
    // Simulate email sending for demonstration
    console.log('📧 EMAIL SIMULATION - Cancellation Request:');
    console.log('To: nikhilborude000@gmail.com');
    console.log('Subject: Order Cancellation Request - ShopEase Store');
    console.log(`
❌ ORDER CANCELLATION REQUEST

Order Details:
🆔 Order ID: #${cancelData.orderId}
🛍️ Product: ${cancelData.productName}

Customer Details:
👤 Name: ${cancelData.customerName}
📱 Phone: ${cancelData.customerPhone}

Please process this cancellation request.

---
ShopEase Store
    `);
    return true;
  }

  try {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !publicKey) {
      console.error('EmailJS credentials not configured');
      return false;
    }

    const templateParams = {
      to_name: 'Store Owner',
      from_name: 'ShopEase Store',
      message: `Order Cancellation Request!

Order Details:
- Order ID: #${cancelData.orderId}
- Product: ${cancelData.productName}

Customer Details:
- Name: ${cancelData.customerName}
- Phone: ${cancelData.customerPhone}

Please process this cancellation request.`,
      reply_to: 'noreply@shopease.com',
    };

    const result = await emailjs.send(
      serviceId,
      'YOUR_TEMPLATE_ID', // Replace with your actual template ID
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
