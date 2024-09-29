import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Header(){
    return (
      <div className="p-3 px-5">
        <div 
        className="flex gap-3 items-center"
        >
            <Image alt="logo" src={'/logo.svg'} width={30} height={30} />
            <h2 className="font-bold text-xl">Ai Short Vid</h2>
        </div>
        <div className="flex gap-3">
          <Button>Dashboard</Button>

        </div>
      </div>
    )
}

