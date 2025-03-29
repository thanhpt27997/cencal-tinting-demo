import {NextRequest, NextResponse} from 'next/server'
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  const {searchParams} = new URL(req.url)
  const years = searchParams.get('years')
  const makes = searchParams.get('makes')
  const models = searchParams.get('models')
  const vehicleTypes = searchParams.get('vehicleTypes')


  const filters: any = {}
  if (years) {
    filters.year = parseInt(years)
  }
  if (makes) {
    filters.make = makes
  }
  if (models) {
    filters.model = models
  }
  if (vehicleTypes) {
    filters.vehicle_type = vehicleTypes
  }


  const vehicles = await prisma.vehicle.findMany({
    where: filters,
    select: {year: true, make: true, model: true, vehicle_type: true},
    orderBy: {year: 'desc'},
  })

  return NextResponse.json(vehicles)
}


export async function POST(req: NextRequest) {
  const body = await req.json()
  const {year, make, model, vehicle_type} = body

  if (!year || !make || !model || !vehicle_type) {
    return NextResponse.json({error: 'All fields are required'}, {status: 400})
  }

  const newVehicle = await prisma.vehicle.create({
    data: {year, make, model, vehicle_type},
  })

  return NextResponse.json(newVehicle, {status: 201})
}
