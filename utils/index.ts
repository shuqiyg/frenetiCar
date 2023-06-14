// import { headers } from "next/dist/client/components/headers";

import { CarProps, FilterProps } from "@/types";

// const url = 'https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=corolla';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '481a4eec21msh2c22aeb9c94d0dap1e5875jsnb380a12ed6fd',
// 		'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
// 	}
// };

// try {
// 	const response = await fetch(url, options);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }
export async function fetchCars(filters: FilterProps) {
    const { manufacturer, year, model, limit, fuel } = filters;
    const headers = {
		'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY || "",
		'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com',
	}
    const baseUrl = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&model=${model}&year=${year}&limit=${limit}&fuel_type=${fuel}`;

    const response = await fetch(baseUrl, {
        headers: headers,
    })

    const result = await response.json();

    return result;
}

export const deleteSearchParams = (type: string) => {
  // Set the specified search parameter to the given value
  const newSearchParams = new URLSearchParams(window.location.search);

  // Delete the specified search parameter
  newSearchParams.delete(type.toLocaleLowerCase());

  // Construct the updated URL pathname with the deleted search parameter
  const newPathname = `${
    window.location.pathname
  }?${newSearchParams.toString()}`;

  return newPathname;
};

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarProps, angle?:string ) => {
  const url = new URL('https://cdn.imagin.studio/getimage');

  const { make, year, model } = car;

  const modelSubStrings = model.split(" ");
  let refinedModelName;
  console.log("Split: ", modelSubStrings)
  if(modelSubStrings.length > 1){
    refinedModelName = modelSubStrings[0];
  }else{
    refinedModelName = modelSubStrings[0] + " " + modelSubStrings[1]
  }
  url.searchParams.append('customer', 'caterrybrowncompany')
  url.searchParams.append('modelFamily', refinedModelName)
  url.searchParams.append('zoomType', "fullscreen")
  url.searchParams.append('modelYear', `${year}`)
  url.searchParams.append('angle', `${angle}`)
  url.searchParams.append('make', make)
  console.log("Imagin URL: ", url)
  return url;
  // return `${url}`;
}

export const updateSearchParams = (type:string, value:string) => {
  const searchParams = new URLSearchParams(window.location.search);

  searchParams.set(type,value);

  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
}