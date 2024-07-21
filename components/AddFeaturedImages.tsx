"use client";
import React, { useEffect, useState } from "react";
import { UploadDropzone } from "./uploadthing";
import { ImageType } from "@prisma/client";
import { CheckCircle, Images, Terminal, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import Image from "next/image";
import { Button } from "./ui/button";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { FeaturedImages } from "@prisma/client";
type AddFeaturedImagesProps = {
  featuredImages: FeaturedImages[];
};
export default function AddFeaturedImages({
  featuredImages,
}: AddFeaturedImagesProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [images, setImages] = useState<ImageType[]>();

  useEffect(() => {
    if (featuredImages) {
      setImages(featuredImages.flatMap((img) => img.images));
    }
  }, [featuredImages]);

  async function onSubmit() {
    if (!images || images.length !== 7) return;
    try {
      await axios
        .post("/api/featured-images", {
          images,
        })
        .then(function (response) {
          toast({
            title: "Success!",
            description: `${response.data.message}`,
            variant: "success",
          });
          router.push("/admin");
        })
        .catch(function (error) {
          toast({
            title: "Error!",
            description: `${error}`,
            variant: "destructive",
          });
        });
    } catch (error) {
      console.log(error, "Something went wrong posting images!");
    }
  }
  return (
    <>
      <div className=" rounded-lg border p-5 flex flex-col lg:flex-row  gap-5">
        <div className="flex-1 flex flex-col ">
          <UploadDropzone
            className="border border-secondary flex-grow"
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setImages((prev) => {
                if (prev) {
                  return [...prev, ...res];
                } else {
                  return res;
                }
              });
              setSelectedImages([]);
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
            onUploadBegin={(name) => {
              console.log("Uploading: ", name);
            }}
            onDrop={(acceptedFiles) => {
              setSelectedImages(acceptedFiles);
            }}
          />
        </div>
        <div className="flex-1 text-white">
          <div className="flex flex-col gap-3">
            {selectedImages.length != 7 && images?.length !== 7 && (
              <Alert className="bg-[#191919]">
                <Terminal className="h-4 w-4 " color="white" />
                <AlertTitle className="text-white text-2xl">
                  Heads up!
                </AlertTitle>
                <AlertDescription>
                  <p className="text-destructive text-base">
                    You need to upload exactly 7 images to submit.
                  </p>
                  <p className="text-white">
                    These images will be displayed to users on the feature home
                    page.
                  </p>
                </AlertDescription>
              </Alert>
            )}
            {selectedImages?.map((img, index) => (
              <div key={index} className="flex items-center gap-5">
                <div>
                  <Images />
                </div>
                <div className="flex-1 flex flex-col gap-3">
                  <div className="font-bold">{img.name}</div>
                  <div className="flex items-center gap-5 text-muted-foreground">
                    <span>Size: {img.size}</span>

                    <span className="flex items-center gap-3">
                      Status: selected
                      <CheckCircle className="text-yellow-500" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {images?.map((img, index) => (
              <div key={index} className="flex items-center gap-5">
                <div className="relative aspect-square size-20">
                  <Image src={images[index].url} alt="featured image" fill />
                </div>

                <div className="flex-1 flex flex-col gap-3">
                  <div className="font-bold">{img.name}</div>
                  <div className="flex items-center gap-5 text-muted-foreground">
                    <span>Size: {img.size}</span>

                    {selectedImages.length > 0 && (
                      <span className="flex items-center gap-3">
                        Status: selected
                        <CheckCircle className="text-yellow-500" />{" "}
                      </span>
                    )}
                    {images && (
                      <span className="flex items-center gap-3">
                        Status: success
                        <CheckCircle className="text-green-500" />{" "}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <X
                    onClick={() =>
                      setImages((prev) =>
                        prev ? prev.filter((_, i) => i !== index) : prev
                      )
                    }
                    className="text-destructive hover:text-destructive/70 cursor-pointer"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="my-5 flex items-center justify-between">
        <Button
          onClick={() => {
            setImages(undefined);
            setSelectedImages([]);
          }}
          className="text-destructive hover:bg-destructive hover:text-black"
        >
          Clear images
        </Button>
        <Button
          onClick={onSubmit}
          variant={"outline"}
          disabled={images === undefined || (images && images.length !== 7)}
        >
          Submit
        </Button>
      </div>
    </>
  );
}
