"use client";

import {Fragment, useState} from 'react'
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Listbox, Transition } from '@headlessui/react'
import { CustomFilterProps, FilterProps } from '@/types';


const CustomFilter = ({title, options}: CustomFilterProps) => {
  return (
    <div>
        <Listbox>
            <div>
                Listbox.Button>
            </div>
        </Listbox>
    </div>
  )
}

export default CustomFilter