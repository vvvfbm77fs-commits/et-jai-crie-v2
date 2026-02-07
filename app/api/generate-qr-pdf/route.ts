import { NextResponse } from 'next/server';
// @ts-ignore
import QRCode from 'qrcode';
import { jsPDF } from 'jspdf';
import { createClient } from '@supabase/supabase-js';

// If logo is needed, you would import/base64 it here
// const logoBase64 = '...'; 

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const memoryId = searchParams.get('memoryId');

    if (!memoryId) return NextResponse.json({ error: 'Missing memoryId' }, { status: 400 });

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

    // Récupérer infos mémoire from DB to personalize PDF
    const { data: memory } = await supabase
        .from('memories')
        .select('firstname, lastname') // Adjust column names if stored differently (e.g. data->identite->prenom)
        .eq('id', memoryId)
        .single();

    // If column-based firstname/lastname not present, check JSON 'data' field
    let name = 'Mémoire';
    if (memory?.firstname) name = `Mémoire de ${memory.firstname}`;
    else if (memory?.data?.identite?.prenom) name = `Mémoire de ${memory.data.identite.prenom}`;

    const memorialUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/memoire/${memoryId}`;

    // Générer QR code
    const qrDataUrl = await QRCode.toDataURL(memorialUrl, { width: 400, margin: 1 });

    // Créer PDF
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    // Typography
    doc.setFont('times', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(26, 26, 46); // #1A1A2E

    // Title
    doc.text(name, 105, 40, { align: 'center' });

    // Divider
    doc.setDrawColor(212, 175, 55); // #D4AF37
    doc.setLineWidth(0.5);
    doc.line(70, 48, 140, 48);

    // QR code
    doc.addImage(qrDataUrl, 'PNG', 55, 60, 100, 100);

    // Instructions
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.setTextColor(80, 80, 80);
    doc.text('Scannez pour accéder à la mémoire', 105, 175, { align: 'center' });

    // URL Text
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text(memorialUrl, 105, 185, { align: 'center' });

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(200, 200, 200);
    doc.text('Commun Vivant - Raconter pour ne rien oublier', 105, 280, { align: 'center' });

    // Retourner PDF Buffer
    const pdfBuffer = doc.output('arraybuffer');

    return new Response(pdfBuffer, {
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="qr-code-${memoryId}.pdf"`
        }
    });
}
