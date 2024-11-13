import { Request, Response } from 'express';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
export async function getKeys(req: Request, res: Response) {
  res.json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
}

export async function createPaymentIntent(req: Request, res: Response) {
  // TODO: Add info about the user
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: '2024-09-30.acacia' }
  );
  // TODO: calculate the amount dynamically
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'eur',
    customer: customer.id,
  });
  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey:
      'pk_test_51QKhN0BGdZIIwEqpTvbmy5D7LeRkLFwEjQCxuTM5QMbWRyOKLjwchEiTotMDBNRkPvo1N58bXtYXuoyq3j78AE9a00yrjU2HAj',
  });
}
