import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
    apiVersion: '2023-10-16' as any
});

export async function POST(req: Request) {
    try {
        const { memoryId, packId, email, items } = await req.json();
        const domain = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

        // Validation
        if (!items || items.length === 0) {
            return NextResponse.json({ error: 'No items' }, { status: 400 });
        }

        // Create Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: items.map((item: any) => ({
                price_data: {
                    currency: 'eur',
                    product_data: { name: item.name },
                    unit_amount: Math.round(item.amount), // Ensure integer centimes
                },
                quantity: 1,
            })),
            mode: 'payment',
            success_url: `${domain}/create/confirmation?session_id={CHECKOUT_SESSION_ID}&memory_id=${memoryId}`,
            cancel_url: `${domain}/create/pay?memoryId=${memoryId}&error=cancelled`,
            customer_email: email,
            metadata: {
                memoryId: memoryId || '',
                packId: packId || '',
                type: 'memorial_creation'
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (err: any) {
        console.error('Stripe Session Error:', err);
        // Return mock for dev if no stripe key provided
        if (err.type === 'StripeAuthenticationError' || !process.env.STRIPE_SECRET_KEY) {
            console.warn('Returning MOCK session URL due to missing Stripe Key');
            return NextResponse.json({ url: `/create/confirmation?session_id=mock_session_123&memory_id=${(await req.json()).memoryId || 'mock'}` });
        }
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
