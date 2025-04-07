import { loadStripe } from '@stripe/stripe-js';
import { Stripe } from '@stripe/stripe-js/types/stripe-js';
let stripePromise: Promise<Stripe | null>;
const getStripe = () => {
  if (!stripePromise) {
    if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    }
  }
  return stripePromise;
};

export default getStripe;
