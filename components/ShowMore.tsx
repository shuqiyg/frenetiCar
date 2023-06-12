"use client"

import { ShowMoreProps } from "@/types"
import { useRouter } from "next/navigation"
import CustomButton from "./CustomButton"
import { updateSearchParams } from "@/utils"

const ShowMore = ({ pageNumber, isNext, setLimit }: ShowMoreProps) => {
  const router = useRouter()

  const handleNavigation = () => {
    const newLimit = (pageNumber + 1) * 10;
    //use string literal to wrap around newLimit because it's a number and for url param it also takes string
    // const newPathName = updateSearchParams("limit", `${newLimit}`);

    // router.push(newPathName)
    setLimit(newLimit)
  }

  return (
    <div className="w-full flex-center gap-5 mt-10">
        {!isNext && (
            <CustomButton title="Show More" btnType='button' containerStyles="bg-emerald-600 rounded-full text-white" handleClick={handleNavigation}></CustomButton>
        )}
    </div>
  )
}

export default ShowMore