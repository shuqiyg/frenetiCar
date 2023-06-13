"use client"

import React, { useState } from "react"
import SearchManufacturer from "./SearchManufacturer"
import Image from "next/image"
import { useRouter } from "next/navigation"

const SearchButton = ({otherClasses}:{otherClasses:string}) => {
    return (
        <button type='submit' className={`-ml-3 z-10 ${otherClasses}`}>
            <Image 
                src="/magnifying-glass.svg" 
                alt="magnifying glass"
                width={40}
                height={40}
                className="object-contain"
            />
        </button>
    )
}
const SearchBar = ({setManufacturer, setModel}) => {
    const [searchManufacturer, setSearchManufacturer] = useState("")
    const [searchmodel, setSearchModel] = useState("")

    const router = useRouter();
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        
        if(searchManufacturer.trim() === '' && searchmodel.trim() === ''){
            return alert("Please provide Brand and Model")
        }

        // updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase())
        setModel(searchmodel);
        setManufacturer(searchManufacturer);
    }

    // const updateSearchParams = (model:string, manufacturer:string) => {
    //     const searchParams = new URLSearchParams(window.location.search);

    //     if(model) {
    //         searchParams.set('model', model);
    //     }else{
    //         searchParams.delete('model')
    //     }

    //     if(manufacturer) {
    //         searchParams.set('manufacturer', manufacturer);
    //     }else{
    //         searchParams.delete('manufacturer')
    //     }

    //     const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
    //     router.push(newPathname)
    // }

    return (
        <form className='searchbar' onSubmit={handleSearch}>
            <div className="searchbar__item">
                <SearchManufacturer
                    selected={searchManufacturer}
                    setSelected={setSearchManufacturer}
                />

                <SearchButton otherClasses="sm:hidden"></SearchButton>
            </div>

            <div className="searchbar__item">
                <Image 
                    src="/model-icon.png"
                    width={25}
                    height={25}
                    className="absolute w-[20px] h-[20px] ml-4"
                    alt="car model"
                />
                <input type="text" name="model" value={searchmodel} onChange={(e)=> setSearchModel(e.target.value)} placeholder="m3" className="searchbar__input" />
                <SearchButton otherClasses="sm:hidden"/>
            </div>
            <SearchButton otherClasses="max-sm:hidden"/>
        </form>
    )
}

export default SearchBar