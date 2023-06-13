"use client"

import { CarCard, CustomFilter, SearchBar, ShowMore } from '@/components'
import Hero from '@/components/Hero'
import { fuels, manufacturers, yearsOfProduction } from '@/constants'
import { fetchCars } from '@/utils'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default async function Home() {
  // const allCars = await fetchCars({
  //   manufacturer: searchParams.manufacturer || '',
  //   year: searchParams.year || 2023,
  //   fuel: searchParams.fuel || '',
  //   limit: searchParams.limit || 10,
  //   model: searchParams.model || '',
  // })

  const [allCars, setAllCars] = useState([])
  const [loading, setLoading] = useState(false)

   // search states
   const [manufacturer, setManufacturer] = useState("")
   const [model, setModel] = useState("")

  // filter states
  const [fuel, setFuel] = useState("")
  const [year, setYear] = useState(2023)

  // pagination states
  const [limit, setLimit ] = useState(10);

  const getCars = async () => {
      setLoading(true);
      try{
        const result = await fetchCars({
            manufacturer: manufacturer || '',
            year: year || 2023,
            fuel: fuel || '',
            limit: limit || 10,
            model: model || '',
        })
  
        setAllCars(result)
      }catch(err){
        console.log(err)
      }finally{
        setLoading(false);
      }     
  }

  useEffect(()=> {
    getCars();
  }, [fuel, year, limit, manufacturer, model])
 
  console.log(allCars)
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;
  return (
    <main className="overflow-hidden">
      <Hero />

      <div className='mt-12 padding-x padding-y max-width' id="discover">
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>
            Popular Rides
          </h1>
          <p>Let the search begin</p>
        </div>

        <div className='home__filters'>
          <SearchBar setManufacturer={setManufacturer} setModel={setModel}/>

          <div className='home__filter-container'>
            <CustomFilter title='fuel' options={fuels} setFilter={setFuel}/>
            <CustomFilter title='year' options={yearsOfProduction} setFilter={setYear}/>
          </div>
        </div>

        {allCars.length > 0 ? (
          <section>
            <div className='home__cars-wrapper'>
              {allCars?.map((car)=> (
                  <CarCard car={car}/>
              ))}
            </div>
                
            {loading && (
              <div className='mt-16 w-full flex-center'>
                <Image src="/loader.svg" alt="loader" width={50} height={50} className='object-contain'></Image>
              </div>
            )}

            <ShowMore
              pageNumber={limit / 10}
              isNext = {limit > allCars.length}
              setLimit={setLimit}
            ></ShowMore>
          </section>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>Oops, no result</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main> 
  )
}
