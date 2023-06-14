import Link from "next/link";
import Image from "next/image";
import CustomButton from "./CustomButton";

const NavBar = () => {
  return (
    <header className="w-full absolute z-10">
        <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
            <Link href="/" className="flex justify-center items-center">
                <Image 
                  src="/carLogo.png"
                  alt="FrenetiCar"
                  width={145}
                  height={40}
                  className="object-contain" 
                />
            </Link>
            
            <CustomButton
              title="Sign In"
              btnType="button"
              containerStyles="text-emerald-600 rounded-full bg-white min-w-[130px] border-solid border-2 border-emerald-300"></CustomButton>
        </nav>
    </header>
    
  )
}

export default NavBar