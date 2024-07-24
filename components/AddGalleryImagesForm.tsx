"use client";
import * as z from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useEffect, useRef, useState } from "react";
import { Image as ImageIc, Plus, Trash2 } from "lucide-react";
import { UploadButton } from "./uploadthing";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { GalleryImages, ImageType } from "@prisma/client";
export const AVAILABLE_CATEGORIES = [
  "WATERCOLORS",
  "PASTELS",
  "CHARCOAL",
  "ACRYLICS",
  // "MULTIMEDIACOLLAGE",
];
export const addGalleryImagesSchema = z.object({
  images: z
    .array(
      z.object({
        title: z
          .string()
          .min(3, { message: "Title must be at least 3 characters long" }),
        description: z.string().min(10, {
          message: "Description must be at least 10 characters long",
        }),
        image: z.object({
          key: z.string().min(1, { message: "Must submit an image" }),
          name: z.string(),
          url: z.string(),
          size: z.number(),
          serverData: z.object({
            uploadedBy: z.string(),
          }),
        }),
        category: z.string().min(1, { message: "Please sect a category" }),
      })
    )
    .nonempty(),
});

export default function AddGalleryImagesForm({
  images,
}: {
  images: GalleryImages[];
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [selectedImages, setSelectedImages] = useState<ImageType[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const form = useForm<z.infer<typeof addGalleryImagesSchema>>({
    resolver: zodResolver(addGalleryImagesSchema),
    defaultValues: {
      images: images.flatMap((img) => img.images) || undefined,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "images",
  });
  const isMounted = useRef(false);

  useEffect(() => {
    if (images) {
      const initialImages = images.flatMap((img) =>
        img.images.map((i) => i.image)
      );
      setSelectedImages(initialImages);
    }
  }, []);
  useEffect(() => {
    if (!isMounted.current) {
      if (fields.length === 0) {
        append({
          title: "",
          description: "",
          image: {
            name: "",
            serverData: {
              uploadedBy: "",
            },
            key: "",
            url: "",
            size: 0,
          },
          category: "",
        });
      }
    }
    isMounted.current = true;
  }, [fields.length]);

  const onSubmit = async (data: z.infer<typeof addGalleryImagesSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/gallery-images", data);
      toast({
        title: "Success!",
        description: `${response.data.message}`,
        variant: "success",
      });
      router.push("/admin");
      router.refresh();
    } catch (error: any) {
      toast({
        title: "Error!",
        description: error.response?.data?.error || "Something went wrong!",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  form.watch();
  async function handleDeleteImage(img: ImageType) {
    console.log("ITEM>>>>", img);

    await axios.post("/api/uploadthing/delete", {
      img,
    });
  }
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-white text-2xl md:text-4xl my-10">Gallery images</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-8"
        >
          <ul className="space-y-8">
            {fields.map((item, index) => (
              <li
                key={item.id}
                className="flex justify-between gap-3 border p-3"
              >
                <Button
                  type="button"
                  variant={"link"}
                  onClick={() => {
                    console.log("IMGSTATE>>>", selectedImages);

                    handleDeleteImage(selectedImages[index]);
                    remove(index);
                    setSelectedImages((prevState) => {
                      const updatedState = prevState.filter(
                        (_, i) => i !== index
                      );
                      return updatedState;
                    });
                  }}
                >
                  <Trash2 className="text-destructive hover:text-destructive/70" />
                </Button>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-5">
                    <FormField
                      control={form.control}
                      name={`images.${index}.title`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel htmlFor="title" className="text-white">
                            Title
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="title"
                              {...field}
                              className="text-white"
                            />
                          </FormControl>
                          <FormDescription>
                            Please provide the title of the image. This will be
                            displayed to customers.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`images.${index}.description`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel
                            htmlFor="description"
                            className="text-white"
                          >
                            Description
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="description"
                              {...field}
                              className="text-white"
                            />
                          </FormControl>
                          <FormDescription>
                            Describe the image in detail. This helps customers
                            understand what the image is about.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex gap-3">
                    <FormField
                      control={form.control}
                      name={`images.${index}.category`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel htmlFor="category" className="text-white">
                            Category
                          </FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value);

                                form.setValue(
                                  `images.${index}.category`,
                                  value
                                );
                              }}
                              value={field.value}
                            >
                              <SelectTrigger className=" w-fit text-white">
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                              <SelectContent>
                                {AVAILABLE_CATEGORIES.map((category) => {
                                  return (
                                    <SelectItem key={category} value={category}>
                                      {category}
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormDescription>
                            Choose a category that best describes this artwork.
                            Categories can help make it easier for visitors to
                            find specific types of paintings.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`images.${index}.image`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            {selectedImages && selectedImages.length > index ? (
                              <div className="relative aspect-square size-36 mx-auto">
                                <img
                                  src={selectedImages[index].url}
                                  alt={"gallery image"}
                                  className="object-cover mx-auto w-full h-full"
                                />
                              </div>
                            ) : (
                              <div className="flex flex-col items-center">
                                <ImageIc className="size-14 text-white" />
                                <UploadButton
                                  className="mt-4 ut-button:bg-[#78f7a2] ut-button:ut-readying:bg-[#78f7a2]/50 ut-button:text-black ut-allowed-content:hidden"
                                  endpoint="imageUploader"
                                  onClientUploadComplete={(res) => {
                                    setSelectedImages((prevState) => {
                                      const updatedState = prevState
                                        ? [
                                            ...prevState,
                                            ...res.map((img) => ({
                                              ...img,
                                              index,
                                            })),
                                          ]
                                        : res.map((img) => ({ ...img, index }));
                                      return updatedState;
                                    });
                                    field.onChange(res[0]);
                                    setIsImageLoading(false);
                                  }}
                                  onUploadError={(error) => {
                                    alert(`ERROR! ${error.message}`);
                                  }}
                                  onUploadProgress={() => {
                                    setIsImageLoading(true);
                                  }}
                                />
                              </div>
                            )}
                          </FormControl>
                          <FormMessage className="text-center" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between">
            <Button
              type="button"
              onClick={() =>
                append({
                  title: "",
                  description: "",
                  image: {
                    name: "",
                    serverData: {
                      uploadedBy: "",
                    },
                    key: "",
                    url: "",
                    size: 0,
                  },
                  category: "",
                })
              }
              className="bg-green-800 hover:bg-green-900"
            >
              <Plus className="mr-2" />
              add image
            </Button>
            <Button
              variant={"outline"}
              type="submit"
              disabled={isLoading || isImageLoading}
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
