"use client"
import { useState } from 'react'
import Image from 'next/image'
import { CarProps } from '@/types'
import CustomButton from './CustomButton'
import { calculateCarRent, generateCarImageUrl } from '@/utils'
import CarDetails from './CarDetails'

interface CarCardProps {
    car: CarProps
}



const CarCard = ({car}: CarCardProps) => {
  const { make, model, year, transmission, drive, city_mpg, highway_mpg, combination_mpg, cylinders, displacement, fuel_type } = car

  const [modalOpen, setModalOpen] = useState(false);

  const carRent = calculateCarRent(city_mpg, year);

  return (
    <div className='car-card group'>
        <div className='car-card__content'>
            <h2 className='car-card__content-title'>
                {make} {model}
            </h2>
        </div>

        <p className='flex mt-6 text-[34px] font-extrabold'>
            <span className='self-start text-[16px] font-semibold'>
                $
            </span>
            {carRent}
            <span className='self-end text-[16px] font-medium'>
                /day
            </span>
        </p>

        <div className='relative w-full h-40 my-3 object-contain'>
            <Image src={`${generateCarImageUrl(car)}`} alt="car model" fill priority className='object-contain'></Image>
        </div>

        <div className='relative flex w-full mt-2'>
            <div className='flex group-hover:invisible w-full justify-between text-cyan-600'>
                <div className='flex flex-col justify-center items-center gap-2'>
                    {transmission === 'a' ? <><Image src="/steering-wheel.svg" width={25} height={25} alt="steering wheel" />
                    <p className='text-[15px]'>
                        {'Automatic'}
                    </p></> : <><Image src="/6-speed.svg" width={25} height={25} alt="steering wheel" />
                    <p className='text-[15px]'>
                        {'Manual'}
                    </p></>}
                    {/* <Image src="/6-speed.svg" width={25} height={25} alt="steering wheel" />
                    <p className='text-[15px]'>
                        {transmission === 'a' ? 'Automatic' : 'Manual'}
                    </p> */}
                </div>
                <div className='flex flex-col justify-center items-center gap-2'>
                    <Image src="/tire.svg" width={25} height={25} alt="steering wheel" />
                    <p className='text-[15px]'>
                        {drive.toUpperCase()}
                    </p>
                </div>
                <div className='flex flex-col justify-center items-center gap-2'>
                    <Image src="/gas.svg" width={25} height={25} alt="steering wheel" />
                    <p className='text-[15px]'>
                        {combination_mpg} MPG (Combined)
                    </p>
                </div>
            </div>

            <div className='car-card__btn-container'>
                <CustomButton 
                    title="View More"
                    containerStyles='w-full py-[18px] rounded-full bg-emerald-500'
                    textStyle="text-white text-[18px] leading-[22px] font-bold"
                    rightIcon="/right-arrow.svg"
                    handleClick={()=> setModalOpen(true)}
                />
            </div>
        </div>

        <CarDetails 
            modalOpen={modalOpen}
            closeModal={()=>{
                setModalOpen(false)
            }}
            car={car}
        />
    </div>
  )
}

export default CarCard