import React, { useState } from "react";
import real from "@/app/public/real.jpeg";
import cartoon from "@/app/public/cartoon.jpeg";
import comic from "@/app/public/comic.jpeg";
import waterColor from "@/app/public/watercolor.jpeg";
import gta from "@/app/public/gta.jpeg";

import Image from "next/image";
import { cn } from "@/lib/utils";

export function SelectStyle({
  onUserSelect,
}: {
  onUserSelect: (str1: string, str2: string) => void;
}) {
  const styleOptions = [
    {
      name: "Realistic",
      image: real,
    },
    {
      name: "Cartoon",
      image: cartoon,
    },
    {
      name: "Comic",
      image: comic,
    },
    {
      name: "WaterColor",
      image: waterColor,
    },
    {
      name: "GTA",
      image: gta,
    },
  ];

  const [selectedOption, setSelectedOption] = useState<string>();

  return (
    <div className="mt-7">
      <h2 className="font-bold text-2xl text-primary">Style</h2>
      <p className="text-gray-500">Select your video style</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-3">
        {styleOptions.map((item, index) => (
          <div
            className={cn(
              `relative hover:scale-105 transition-all cursor-pointer rounded-xl border-3 border-primary`,
              selectedOption === item.name && "border-3 border-primary"
            )}
          >
            <Image
              alt="StyleImage"
              src={item.image}
              width={90}
              height={110}
              className="h-[16rem] object-fill rounded-lg w-full"
              onClick={() => {
                setSelectedOption(item.name);
                onUserSelect("imageStyle", item.name);
              }}
            />
            <h2 className="absolute text-white text-center rounded-b-lg p-1 bg-black bottom-0 w-full">
              {item.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
