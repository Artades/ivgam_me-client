import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';
import { CreateTestimonialDTO } from '@/dto/testimonial.dto';

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('GET testimonials error:', error);
    return new NextResponse('Ошибка при получении отзывов', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body: CreateTestimonialDTO = await req.json();

    if (!body.name || !body.text) {
      return new NextResponse('Имя и текст обязательны', { status: 400 });
    }

    const newTestimonial = await prisma.testimonial.create({
      data: {
        name: body.name,
        text: body.text,
        avatar: body.avatar || '',
        position: body.position || '',
        rate: body.rate ?? 5,
      },
    });

    return NextResponse.json(newTestimonial, { status: 201 });
  } catch (error) {
    console.error('POST testimonials error:', error);
    return new NextResponse('Ошибка при создании отзыва', { status: 500 });
  }
}
