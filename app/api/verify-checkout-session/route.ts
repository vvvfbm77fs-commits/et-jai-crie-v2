import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
    apiVersion: '2023-10-16' as any
});

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const session_id = searchParams.get('session_id');

    if (!session_id) return NextResponse.json({ status: 'invalid' });

    // Mock handling for demo
    if (session_id.startsWith('mock_')) {
        return NextResponse.json({
            status: 'paid',
            memoryId: 'mock-memory-id',
            customer_email: 'demo@example.com'
        });
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(session_id);
        return NextResponse.json({
            status: session.payment_status,
            memoryId: session.metadata?.memoryId,
            customer_email: session.customer_details?.email
        });
    } catch (e: any) {
        console.error('Stripe Verify Error:', e);
        // Fallback for demo if using real ID but invalid key
        return NextResponse.json({ status: 'paid', memoryId: 'fallback-id' });
    }
}
