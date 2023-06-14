"use client";

import {Fragment, useState} from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Listbox, Transition } from '@headlessui/react'
import { CustomFilterProps, FilterProps } from '@/types';
import { updateSearchParams } from '@/utils';


function CustomFilter<T>({options, setFilter}: CustomFilterProps<T>){
  // const router = useRouter()
  const [ menu, setMenu ] = useState(options[0]) // State for storing the selected option

  // const handleSearchParams = (e: {title:string, value:string}) => {
  //   const newPathName = updateSearchParams( title, e.value.toLowerCase());

  //   router.push(newPathName);
  // }
  
  return (
    <div className='w-fit'>
        <Listbox
          value={menu}
          onChange={(e) => {
            setMenu(e)
            setFilter(e.value as unknown as T) //Update the selected option in state(which will pass it back up to the setFilter on page.tsx)
          }}
        >
            <div className='relative w-fit z-10'>
                {/* Button for the listBox */}
                <Listbox.Button className="custom-filter__btn">
                  <span className='block truncate'>{menu.title}</span>
                  <Image 
                    src="/chevron-up-down.svg"
                    width={20}
                    height={20}
                    className='ml-4 object-contain'
                    alt="up down"
                  />
                </Listbox.Button>

                {/* Transition for displaying the options */}
                <Transition
                  as={Fragment} // group multiple elements without introducing an additional DOM node i.e., <></>
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options
                    className="custom-filter__options"
                  >
                    {/* Map over the options and display them as listbox options */}
                    {options.map((option)=> (
                      <Listbox.Option 
                        key={option.title}
                        value={option}
                        className={({active}) => `relative cursor-default select-none py-2 px-4 ${active ? 'bg-emerald-500 text-white' : 'text-gray-900'}`}
                      >
                        {/* Display the option title */}
                        {({selected}) => (
                          <span className={`block truncate ${selected? 'font-medium' : 'font-normal'}`}>
                            {option.title}
                          </span>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    </div>
  )
}

export default CustomFilter