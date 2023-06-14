"use client"

import { SearchManufacturerProps } from '@/types'
import { Combobox, Transition } from '@headlessui/react'
import Image from 'next/image'
import { useState, Fragment } from 'react'
import { manufacturers } from '@/constants'

const SearchManufacturer = ({ selected, setSelected}: SearchManufacturerProps) => {
    // storing the search query
    const [query, setQuery ] = useState("")
    // Filter the manufacturers based on the search query
    const filteredManufacturers = query === "" ? manufacturers : manufacturers.filter((item) => (
        item.toLowerCase() // convert manufacturer name to lowercase
        .replace(/\s+/g,"") // remove whitespace from manufacturer name
        .includes(query.toLowerCase() // check if the manufacturer name includes the search query
        .replace(/\s+/g, "")
        )
    ))

  return (
    <div className='search-manufacturer'>
        <Combobox value={selected} onChange={setSelected}>
            <div className='relative w-full'>
                {/* Button for the combobox. Click on the icon to see the complete dropdown */}
                <Combobox.Button className="absolute top-[15px]">
                    <Image
                        src="/bmw.svg"
                        width={20}
                        height={20}
                        className="ml-4"
                        alt="carLogo"
                    />
                </Combobox.Button>

                {/* Input field for searching */}
                <Combobox.Input 
                    className="search-manufacturer__input"
                    placeholder='BMW...'
                    displayValue={(manufacturer: string)=> manufacturer}
                    onChange={(e)=>setQuery(e.target.value)} // Update the search query when the input changes
                />

                {/* Transition for displaying the options */}
                <Transition
                    as={Fragment} // group multiple elements without introducing an additional DOM node i.e., <></>
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={()=> setQuery('')} // Reset the search query after the transition completes
                >
                    <Combobox.Options className="search-manufacturer__options" static>
                        {/* Display the filtered manufacturers as options */}
                        {filteredManufacturers.map((item)=> (
                            <Combobox.Option
                                key={item}
                                className={({active}) => `relative search-manufacturer__option ${active ? 'bg-emerald-500 text-white': 'text-gray-700'}`}
                                value={item}
                            >
                                {({ selected, active }) => (
                                    <>
                                        {/* Display the manufacturer name */}
                                        <span
                                            className={`block truncate ${ selected ? 'font-bold ' : 'font-normal'}`}
                                        >
                                            {item}
                                        </span>

                                        {/* Show an active blue background color if the option is selected */}
                                        {selected ? (
                                            <span
                                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${ active ? 'text-white' : 'text-teal-500'}`}    
                                            >                                               
                                            </span>) :null}
                                    </>
                                 )}
                            </Combobox.Option>
                        ))}
                    </Combobox.Options>
                </Transition>
            </div>
        </Combobox>
    </div>
  )
}

export default SearchManufacturer