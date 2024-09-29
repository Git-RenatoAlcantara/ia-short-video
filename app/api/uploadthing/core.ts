import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 import {z} from 'zod'
import sharp from "sharp"
import { DevBundlerService } from "next/dist/server/lib/dev-bundler-service";
import db from "@/lib/prismadb";

const f = createUploadthing();

 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {

  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .input(z.object({ configId: z.string().optional() }))
    .middleware(async ({ input }) => {
      return { input }
    })
    .onUploadComplete(async ({ metadata, file }) => {
        const { configId } = metadata.input

        const res = await fetch(file.url)
        const buffer = await res.arrayBuffer()

        const imgMetadata = await sharp(buffer).metadata()
        const { width, height } = imgMetadata

        if(!configId){
          const configuration = await db.configuration.create({
            data: {
              imgUrl: file.url,
              height: height || 500,
              width: width || 500,
            }
          })
        return { configId: configuration.id };
        }else {
          const updateConfiguration = await db.configuration.update({
            where: {
              id: configId,
            },
            data: {
              croppedImageUrl: file.url
            }
          })

          return { configId: updateConfiguration.id }
        }
        

    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;