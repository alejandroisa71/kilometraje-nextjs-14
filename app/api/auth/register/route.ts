import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import db from '@/libs/db';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    // console.log(data);
    const userFound = await db.usuario.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userFound) {
      return NextResponse.json(
        {
          message: 'Email already exists',
        },
        {
          status: 400,
        },
      );
    }

    const nameFound = await db.usuario.findUnique({
      where: {
        name: data.name,
      },
    });

    if (nameFound) {
      return NextResponse.json(
        {
          message: 'User already exists',
        },
        {
          status: 400,
        },
      );
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await db.usuario.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });

    const { password: _, ...user } = newUser;

    // Puedes personalizar la respuesta según tus necesidades
    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      },
    );
  }
}