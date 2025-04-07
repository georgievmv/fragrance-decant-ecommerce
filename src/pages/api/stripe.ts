const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import { CartProduct } from '@/types/product';

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_options: [
          { shipping_rate: 'shr_1LkN19BXv4wM8ARay1rSL2qi' },
          { shipping_rate: 'shr_1LkN2aBXv4wM8ARaHyedKT0O' },
        ],
        line_items: req.body.map((item: CartProduct) => {
          return {
            price_data: {
              currency: 'bgn',
              product_data: {
                name: item.name,
                images: [],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.qty,
          };
        }),
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });
      res.status(200).json(session);
    } catch (err: any) {
      console.log(err);
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
