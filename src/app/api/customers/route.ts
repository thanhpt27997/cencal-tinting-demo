import {NextRequest, NextResponse} from 'next/server';
import {Prisma, PrismaClient} from '@prisma/client';
import {ICustomer} from "@/interface/customer.interface";
import CustomerWhereInput = Prisma.CustomerWhereInput;

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body: ICustomer = await req.json();
    const {name, email, phone_number, additional_phone_number, note} = body;

    if (!name) {
      return NextResponse.json({message: 'Name is required'}, {status: 400});
    }

    const newCustomer = await prisma.customer.create({
      data: {
        name, email,
        phone_number,
        additional_phone_number,
        note
      },
    });

    return NextResponse.json(newCustomer, {status: 201});
  } catch (error) {
    console.error(error);
    return NextResponse.json({message: 'Internal Server Error'}, {status: 500});
  }
}

export async function GET(req: NextRequest) {
  const querySearch = req.nextUrl.searchParams.get("searchString") || "";
  const searchCondition = querySearch
    ? {
      OR: [
        {name: {contains: querySearch, mode: "insensitive"}},
        {email: {contains: querySearch, mode: "insensitive"}},
        {phone_number: {contains: querySearch, mode: "insensitive"}},
        {additional_phone_number: {contains: querySearch, mode: "insensitive"}},
      ],
    }
    : {};

  try {
    const customers = await prisma.customer.findMany({
      where: {
        isDeleted: false,
        ...searchCondition
      } as CustomerWhereInput
    });
    return NextResponse.json(customers, {status: 200});
  } catch (error) {
    console.error(error);
    return NextResponse.json({message: 'Internal Server Error'}, {status: 500});
  }
}
