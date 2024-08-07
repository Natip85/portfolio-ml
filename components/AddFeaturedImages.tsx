"use client";
import React, { useEffect, useState } from "react";
import { UploadDropzone } from "./uploadthing";
import { ImageType } from "@prisma/client";
import { CheckCircle, Images, Loader2, Terminal, Trash2 } from "lucide-react";
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
  const [isClearingAll, setIsClearingAll] = useState(false);
  const [images, setImages] = useState<ImageType[]>();

  useEffect(() => {
    if (featuredImages) {
      setImages(featuredImages.flatMap((img) => img.images));
    }
  }, [featuredImages]);

  async function onSubmit() {
    if (!images || images.length !== 8) return;
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
          router.refresh();
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

  async function handleDelete(img: ImageType, index: number) {
    if (!img) return;
    try {
      await axios.post("/api/uploadthing/delete", {
        img,
        index,
      });
      if (images && images.length > 0) {
        await axios.delete(`/api/featured-images/delete`, {
          data: { index },
        });
      }
      toast({
        title: "Success!",
        description: "Image deleted successfully.",
        variant: "success",
      });
    } catch (error) {
      console.error("Error deleting image:", error);
      toast({
        title: "Error",
        description: "Failed to delete image.",
        variant: "destructive",
      });
    }
  }
  async function handleClearAll() {
    try {
      if (!images) return;
      setIsClearingAll(true);
      const imageKeys = images.map((img) => img.key);

      await axios.post("/api/uploadthing/delete-many", { imageKeys });

      if (images && images.length > 0) {
        await axios.delete(`/api/featured-images/delete-many`);
      }
      toast({
        title: "Success!",
        description: "All images removed.",
        variant: "success",
      });
      setIsClearingAll(false);
    } catch (error) {
      console.error("Error deleting all image:", error);
      toast({
        title: "Error",
        description: "Failed to delete all image.",
        variant: "destructive",
      });
      setIsClearingAll(false);
    }
  }
  return (
    <>
      <div className=" rounded-lg  p-5 flex flex-col lg:flex-row  gap-5">
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
            {selectedImages.length != 8 && images?.length !== 8 && (
              <Alert className="bg-[#191919]">
                <Terminal className="h-4 w-4 " color="white" />
                <AlertTitle className="text-white text-2xl">
                  Heads up!
                </AlertTitle>
                <AlertDescription>
                  <p className="text-destructive text-base">
                    You need to upload exactly 8 images to submit.
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
                <div className="text-white">{index + 1}.</div>
                <div className="relative aspect-square size-20">
                  <Image src={images[index].url} alt="featured image" fill />
                </div>

                <div className="flex-1 flex flex-col gap-3">
                  <div className="font-bold">{img.name}</div>
                  <div className="flex items-center gap-5 text-muted-foreground">
                    <span>Size: {img.size}</span>

                    {images && (
                      <span className="flex items-center gap-3">
                        Status: success
                        <CheckCircle className="text-green-500" />{" "}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <Trash2
                    onClick={() => {
                      setImages((prev) =>
                        prev ? prev.filter((_, i) => i !== index) : prev
                      );
                      handleDelete(img, index);
                    }}
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
          disabled={isClearingAll}
          onClick={() => {
            handleClearAll();
            setSelectedImages([]);
            setImages(undefined);
          }}
          className="text-destructive bg-destructive/10 hover:bg-destructive hover:text-black"
        >
          {isClearingAll ? (
            <div className="flex items-center gap-3">
              <span> Removing all images</span>
              <Loader2 className="size-5 animate-spin text-white" />
            </div>
          ) : (
            <div>Remove all images</div>
          )}
        </Button>
        <Button
          onClick={onSubmit}
          variant={"outline"}
          disabled={images === undefined || (images && images.length !== 8)}
        >
          Submit
        </Button>
      </div>
    </>
  );
}
