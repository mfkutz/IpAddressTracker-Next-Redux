'use client'

import { useGetGeoLocQuery } from "@/lib/services/geoLoc"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setLocation } from "@/lib/services/locationSlice"

const GeoLocation = () => {

    const [ip, setIp] = useState('8.8.8.8')
    const [inputValue, setInputValue] = useState('')

    const { data, error, isLoading } = useGetGeoLocQuery(ip, {
        skip: !ip
    })

    const dispatch = useDispatch()

    useEffect(() => {
        if (data) {
            dispatch(setLocation({
                latitude: data.location.lat,
                longitude: data.location.lng,
            }));
        }
    }, [data, dispatch]);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(event.target.value);
    }

    function handleClick(event: React.MouseEvent<HTMLDivElement>) {
        event.preventDefault();
        if (inputValue) {
            setIp(inputValue);
        }
    }

    return (
        <div className="flex flex-col items-center sm:bg-desktopBg bg-mobileBg bg-cover bg-no-repeat h-[280px] relative testz">
            <h1 className="text-2xl sm:text-3xl font-medium mt-7">IP Address Tracker</h1>
            <div className="lg:w-[37%] w-[87.5%] flex items-center justify-center mt-6 relative ">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder="Search for any IP address or domain"
                    className="lg:w-[100%] w-[100%] h-[59px] rounded-2xl px-6 placeholder:text-[14px] lg:placeholder:text-gray-400 sm:placeholder:text-[18px] text-gray-950"
                />
                <div
                    onClick={handleClick}
                    className="bg-black w-[60px] h-full absolute right-[-1.5px] items-center justify-center flex rounded-r-2xl hover:bg-gray-500 cursor-pointer"
                >
                    <Image src='/icon-arrow.svg' alt="arrow" width={11} height={11} />
                </div>
            </div>

            {isLoading && <div>Loading...</div>}
            {error && <div>Error</div>}
            {data && (
                <main className="bg-white flex flex-col lg:w-[77%] w-[88%] lg:flex-row lg:h-[160px] rounded-2xl items-center justify-around absolute lg:bottom-[-73px] bottom-[-170px]  ">
                    <div className="text-gray-900 w-full lg:pt-0 mt-6 lg:mt-0 lg:pl-8 lg:h-[85px] border-r text-center lg:text-left">
                        <h2 className="uppercase font-semibold lg:text-xs text-[0.6rem] tracking-[2px]">Ip address</h2>
                        <p className="lg:text-[25px] text-[22px] font-medium lg:mt-2 lg:max-w-[200px] text-center lg:text-left w-full">{data.ip}</p>
                    </div>
                    <div className="text-gray-900 w-full lg:pt-0 mt-4 lg:mt-0 lg:pl-8 lg:h-[85px] border-r text-center lg:text-left ">
                        <h2 className="uppercase font-semibold lg:text-xs text-[0.6rem] tracking-[2px]">Location</h2>
                        <p className="lg:text-[25px] text-[22px] font-medium lg:mt-2 mt-0 lg:max-w-[200px] text-center lg:text-left w-full leading-6">{data.location.country} {data.location.region} </p>
                    </div>
                    <div className="text-gray-900 w-full lg:pt-0 mt-4 lg:mt-0 lg:pl-8 lg:h-[85px] border-r text-center lg:text-left  ">
                        <h2 className="uppercase font-semibold lg:text-xs text-[0.6rem] tracking-[2px]">Timezone</h2>
                        <p className="lg:text-[25px] text-[22px] font-medium lg:mt-2 lg:max-w-[200px] text-center lg:text-left w-full">{data.location.timezone}</p>
                    </div>
                    <div className="text-gray-900 w-full lg:pt-0 mt-4 lg:mt-0 lg:pl-8 lg:h-[85px] border-r text-center lg:text-left border-l mb-6 lg:mb-0 ">
                        <h2 className="uppercase font-semibold lg:text-xs text-[0.6rem] tracking-[2px]">Isp</h2>
                        <p className="lg:text-[25px] text-[22px] font-medium lg:mt-2 lg:max-w-[200px] text-center lg:text-left w-full">{data.isp}</p>
                    </div>
                </main>
            )}
        </div>
    );
}

export default GeoLocation;