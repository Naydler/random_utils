import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const { to, subject, giver, receiver, wishlist, creatorName, giftPrice, eventDate, location } = await req.json();
        console.log('Parámetros:', { to, subject, giver, receiver, wishlist, creatorName, giftPrice, eventDate, location });

        if (!to || !subject || !giver || !receiver || !wishlist) {
            console.warn('Faltan parámetros requeridos:', { to, subject, giver, receiver, wishlist });
            return NextResponse.json({ message: 'Faltan parámetros requeridos' }, { status: 400 });
        }

        console.log("Parámetros completos");

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const emailText = `¡Hola ${giver}!\n\nTu amigo invisible es: ${receiver}.\n\n¡Diviértete planeando tu regalo! \n\nAquí tienes una pista sobre lo que le gustaría: ${wishlist}.\n\n infomración adicional: \n\nNombre del creador del evento: ${creatorName}\n\nPrecio del regalo: ${giftPrice}\n\nFecha del evento: ${eventDate}\n\nUbicación del evento: ${location}\n\n`;

        try {
            const info = await transporter.sendMail({
                from: '"Secret Santa" <SecretSanta_RandomUtils@gmail.com>',
                to,
                subject,
                text: emailText,
            });

            console.log('Correo enviado:', info);
        } catch (error) {
            console.error('Error al enviar el correo:', error);
            return NextResponse.json({ message: 'Error al enviar el correo', error }, { status: 500 });
        }

        return NextResponse.json({ message: 'Correo enviado correctamente' }, { status: 200 });
    } catch (error) {
        const response = NextResponse.json(
            { message: 'Error al procesar la solicitud', error },
            { status: 500 }
        );
        return response;
    }
}