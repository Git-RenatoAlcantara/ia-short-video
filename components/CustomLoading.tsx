import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import progressGif from "@/app/public/progresso.gif";
import Image from "next/image";

export function CustomLoading({ loading }: { loading: boolean }) {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent>
        <div className="flex flex-col items-center mt-10">
          <Image alt="Progress Image" src={progressGif}  width={100} height={100}/>
          <h2>Generatinng your video... Do not Refresh</h2>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
