"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Image
        src={"/images/test.png"}
        alt="Background"
        fill
        priority
        className="opacity-70 object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-50" />
      <div className="z-30  flex flex-col gap-10">
        <motion.div
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="tracking-wider text-center text-2xl sm:text-4xl md:text-6xl my-10 text-white "
        >
          CONTACT
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[2rem] items-center w-[80%] mx-auto">
          <motion.div
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
          >
            <p className="text-white opacity-70 text-[17px]">Get in Touch.</p>
            <h1 className="mt-[0.6rem] p-2 sm:p-0 leading-[3.5rem] text-white text-[27px] md:text-[30px] lg:text-[38px] xl:text-[45px]">
              Let&apos;s make <span className="text-[#156755]">Something</span>{" "}
              brilliant!
            </h1>
            <p className="text-white text-[15px] mt-[1rem] opacity-75">
              Eleifend aptent volutpat malesuada hendrerit tempor aenean
              placerat condimentum nullam velit commodo ullamcorper proin
              bibendum parturient tortor vivamus porttitor congue vestibulum
              egestas sapien dui auctor penatibus semper mollis lectus laoreet
              suspendisse nec inceptos vitae tristique interdum maecenas
              vulputate phasellus urna dolor habitasse sed nostra non diam
              euismod netus faucibus magnis
            </p>
            <a
              href="tel:+972527533703"
              className="block mt-[2rem] mb-[2rem] text-sm text-white  w-fit"
            >
              +972 54 880 8440
            </a>
          </motion.div>
          <motion.div
            initial={{ x: 0, y: 200, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 1 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
