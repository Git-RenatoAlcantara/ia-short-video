/*
*
* [References]
* https://console.cloud.google.com/marketplace/product/google/texttospeech.googleapis.com?q=search&referrer=search&hl=pt-BR&project=whatsappapi-61c68
*
*/
"use client";
import { useState } from "react";
import { SelectTopic } from "./_components/SelectTopic";
import { SelectStyle } from "./_components/SelectStyle";
import { SelectDuration } from "./_components/SelectDuration";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { CustomLoading } from "@/components/CustomLoading";

interface FormData {
  duration: string;
  topic: string;
  imageStyle: string;
}
export default function CreateNew() {
  const [formData, setFormData] = useState<FormData>({
    duration: "",
    topic: "",
    imageStyle: "",
  });

  const [ loading, setLoading] = useState<boolean>(false)
  const [videoScript, setVideoScript] = useState()

  const onHandleInputChange = (fieldName: string, fieldValue: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onCreateClickHandler = () => {
    GetVideoScript();
  };
  // Get Video Script
  const GetVideoScript = async () => {
    setLoading(true)
    const prompt =
      "Write a script to generate " +
      formData.duration +
      " video on topic: " +
      formData.topic +
      " along with AI image prompt in " +
      formData.imageStyle +
      " format for each scene and give me result in JSON format with imagePrompt and ContentText as field";

    const result = await axios.post("/api/get-video-script", {
      prompt,
    }).then(resp => {
      console.log(resp.data.result)
      setVideoScript(resp.data.result)
    })

    setLoading(false);
  };

  return (
    <div className="md:px-20">
      <h2 className="font-bold text-4xl text-primary text-center">
        Create New
      </h2>
      <div className="mt-10 shadow-md p-10">
        {/* Select Topic */}
        <SelectTopic onUserSelect={onHandleInputChange} />
        {/* Select Style */}
        <SelectStyle onUserSelect={onHandleInputChange} />
        {/* Duration */}
        <SelectDuration onUserSelect={onHandleInputChange} />
        {/* Create Button */}
        <Button className="mt-10 w-full" onClick={onCreateClickHandler}>
          Create Short Video
        </Button>
      </div>

      <CustomLoading loading={loading} />
    </div>
  );
}
