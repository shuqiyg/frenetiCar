"use client"

import Image from "next/image"
import CustomButton from "./CustomButton"

const Hero = () => {

    const handleScroll = () => {

    }
    return (
        <div className="hero">
            <div className="flex01 pt-36 padding-x">
                <h1 className="hero__title">Drive into adventure with us</h1>

                <p className="hero__subtitle">
                    Rent the perfect car for your next journey
                </p>

                <CustomButton
                    title="Explore"
                    containerStyles="bg-emerald-600 text-white rounded-full mt-10"
                    handleClick={handleScroll}
                ></CustomButton>
            </div>
            <div className="hero__image-container">
                <div className="hero__image">
                    <Image src="/bmw_f82.png" alt="f82" fill className="object-contain"></Image>
                </div>
                    
                <div className="hero__image-overlay"></div>
            </div>
         </div>
  )
}

export default Hero 