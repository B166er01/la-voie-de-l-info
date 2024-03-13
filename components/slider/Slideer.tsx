'use client'

import React, { useRef, useEffect, use, useState } from "react";
import GSAP, { Power1, Power2 } from "gsap";
import { Draggable } from "gsap/Draggable";
// import Link from "next/link";


import { ChevronLeft, ChevronRight } from "lucide-react";
import SliderCard from "../cards/SliderCard";
import { TArticle } from "@/types";


GSAP.registerPlugin(Draggable);

const Slideer= ({ articles }: {articles: TArticle[] | undefined }) => {

    const sliderContainerRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    const [previousContainerWidth, setPreviousContainerWidth] = useState<number | undefined>(undefined);


    const setSliderPosition = (newPosition: number, ease?: any, duration?: number) => {
        if (sliderRef.current) {
            GSAP.to(sliderRef.current, {
                x: newPosition,
                ease,
                duration,
            });
        }
    };

    useEffect(() => {
        const slider = sliderRef.current;
        const edgeOffset = 40;

        if (slider) {
            // Set up Draggable for the slider
            Draggable.create(slider, {
                type: 'x',
                edgeResistance: 0.5,
                onDrag: function () {
                    if (this.x > 0) {
                        this.x = 0;
                        setSliderPosition(0, Power2.easeInOut, 0.4);
                    } else if (
                        this.x <
                        -slider.offsetWidth + sliderContainerRef.current?.offsetWidth! - edgeOffset
                    ) {
                        this.x =
                            -slider.offsetWidth + sliderContainerRef.current?.offsetWidth! - edgeOffset;
                        setSliderPosition(
                            -slider.offsetWidth + sliderContainerRef.current?.offsetWidth! - edgeOffset,
                            Power2.easeInOut,
                            0.5
                        );
                    }
                },
            });

            setSliderPosition(0, Power2.easeInOut, 0.4);
        }
    }, [sliderContainerRef]);

    const slideWidth = 345;
    const edgeOffset = 70;

    const slideLeft = () => {
        const currentPosition = parseFloat(
            getComputedStyle(sliderRef.current!).transform.split(',')[4]
        );
        const newPosition = currentPosition + slideWidth ;

        if (newPosition <= 0) {
            setSliderPosition(newPosition, Power1.easeOut, 0.4);
        } else {
            setSliderPosition(0, Power1.easeOut, 0.3);
        }
    };

    const slideRight = () => {
        const currentPosition = parseFloat(
            getComputedStyle(sliderRef.current!).transform.split(',')[4]
        );
        const newPosition = currentPosition - slideWidth;


        const sliderContainerWidth = sliderContainerRef.current?.offsetWidth!;
        const sliderWidth = sliderRef.current?.offsetWidth!;

        if (sliderWidth + newPosition >= sliderContainerWidth) {
            setSliderPosition(newPosition, Power2.easeInOut, 0.3);
        } else {
            setSliderPosition(
                -(sliderWidth - sliderContainerWidth),
                Power2.easeInOut,
                0.5
            );
        }
    };




    // useEffect(() => {
 

    //     const handleResize = () => {
    //         const sliderContainer = sliderContainerRef.current;
         

    //         if (sliderContainer) {
    //             // Calculate the size difference
    //             const sizeDifference = sliderContainer.offsetWidth - previousContainerWidth!;

    //             // Update the previous container width
                
    //             // Update the container width
       
                
    //             // Perform any other actions you need on resize
    //             // Example: Recalculate and set the slider position based on the size difference
                
    //             let currentPosition = parseFloat(getComputedStyle(sliderRef.current!).transform.split(',')[4]);
       
    //             setSliderPosition(currentPosition + sizeDifference);
    //             setPreviousContainerWidth(sliderContainer.offsetWidth);
    //         }
    //     };

    //     // Attach the event listener when the component mounts
    //     window.addEventListener('resize', handleResize);

    //     // Detach the event listener when the component unmounts to avoid memory leaks
    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     };
    // }, [sliderContainerRef, sliderRef, previousContainerWidth]); // Include necessary dependencies in the dependency array



    return (
        <div className="mt-10 mb-12 mx-6">
            <h2 className="text-3xl">Sports</h2>
            <div className="relative overflow-hidden h-[340px] z-10 w-full my-6 mx-auto px-5" ref={sliderContainerRef}>
                <div className="absolute top-0 flex gap-6 py-3 transition-transform duration-500 ease-out" ref={sliderRef}>
                    {articles?.map((item, i) => (
                        <div key={i}>
                            <SliderCard {...item} />
                        </div>
                    ))}
                </div>
                <div className="absolute bottom-0 left-0 z-40 hidden lg:flex">
                    <button onClick={slideLeft}><ChevronLeft strokeWidth={1} className="w-8 h-8 bg-slate-100" /></button>
                    <button onClick={slideRight}><ChevronRight strokeWidth={1} className="w-8 h-8 bg-slate-100" /></button>



                </div>
            </div>
        </div>
    )
}

export default Slideer