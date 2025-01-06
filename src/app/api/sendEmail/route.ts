import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const { to, subject, giver, receiver, wishlist, creatorName, giftPrice, eventDate, location } = await req.json();

        if (!to || !subject || !giver || !receiver || !wishlist) {
            console.warn('Faltan parámetros requeridos:', { to, subject, giver, receiver, wishlist });
            return NextResponse.json({ message: 'Faltan parámetros requeridos' }, { status: 400 });
        }


        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const creationDate = new Date().toLocaleString();

        const emailHTML = `
            <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5;">
                <h2 style="color: #4CAF50; text-align: center;">🎅 ¡Amigo Invisible! 🎄</h2>
                <p>¡Hola <strong>${giver}</strong>!</p>
                <p>Tu amigo invisible es: <strong style="color: #FF5722;">${receiver}</strong>.</p>
                <p>¡Diviértete planeando tu regalo! Aquí tienes una pista sobre lo que le gustaría:</p>
                <blockquote style="background-color: #f9f9f9; padding: 10px; border-left: 5px solid #4CAF50;">
                    ${wishlist}
                </blockquote>
                <h3>Información del evento:</h3>
                <ul style="list-style-type: none; padding: 0;">
                    <li><strong>Nombre del creador:</strong> ${creatorName}</li>
                    <li><strong>Precio del regalo:</strong> ${giftPrice}</li>
                    <li><strong>Fecha del evento:</strong> ${eventDate}</li>
                    <li><strong>Ubicación:</strong> ${location}</li>
                    <li><strong>Fecha de creación del sorteo:</strong> ${creationDate}</li>
                </ul>
                <p style="text-align: center;">¡Que tengas un evento lleno de diversión y sorpresas! 🎁</p>
            </div>
        `;

        try {
            const info = await transporter.sendMail({
                from: '"Secret Santa" <SecretSanta_RandomUtils@gmail.com>',
                to,
                subject,
                html: emailHTML, 
            });

        } catch (error) {
            console.error('Error al enviar el correo:', error);
            return NextResponse.json({ message: 'Error al enviar el correo', error }, { status: 500 });
        }

        return NextResponse.json({ message: 'Correo enviado correctamente' }, { status: 200 });
    } catch (error) {
        console.error('Error general:', error);
        return NextResponse.json(
            { message: 'Error al procesar la solicitud', error },
            { status: 500 }
        );
    }
}