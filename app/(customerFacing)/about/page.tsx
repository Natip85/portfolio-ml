"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ x: 0, y: 0, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeIn" }}
        className="relative h-[20vh] sm:h-[40vh]"
      >
        <Image
          src={"https://utfs.io/f/fc3940b1-130d-4a36-93e3-cc744d7a3ad6-1e.jpeg"}
          alt={"img"}
          fill
          className="w-full object-cover"
        />
      </motion.div>
      <div className="flex flex-col gap-10 p-2 my-5">
        <motion.div
          initial={{ x: -200, y: 0, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.6 }}
          className="tracking-wider text-center text-2xl sm:text-4xl md:text-6xl  text-white "
        >
          BIOGRAPHY
        </motion.div>
        <motion.div
          initial={{ y: 200, x: 0, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 1.2 }}
          className="flex flex-col lg:flex-row gap-5  w-full px-5 md:px-20 mx-auto"
        >
          <div className="flex-1 relative aspect-video">
            <Image
              src={
                "https://utfs.io/f/fc3940b1-130d-4a36-93e3-cc744d7a3ad6-1e.jpeg"
              }
              alt={"img"}
              fill
              className="w-full object-cover transition hover:scale-105"
            />
          </div>
          <div className="flex-1 text-white pl-4">
            Adipiscing dictum natoque ipsum accumsan nascetur magna condimentum
            quis hac mus taciti dis habitant urna laoreet vel aenean etiam dolor
            cursus nulla justo et quisque rutrum lobortis nunc eleifend felis
            mauris sagittis vulputate ornare curabitur vehicula dignissim pede
            diam ligula sociosqu semper maximus amet vestibulum integer iaculis
            per ad est
            <br /> <br />
            Adipiscing dictum natoque ipsum accumsan nascetur magna condimentum
            quis hac mus taciti dis habitant urna laoreet vel aenean etiam dolor
            cursus nulla justo et quisque rutrum lobortis nunc eleifend felis
            mauris sagittis vulputate ornare curabitur vehicula dignissim pede
            diam ligula sociosqu semper maximus amet vestibulum integer iaculis
            per ad est Adipiscing dictum natoque ipsum accumsan nascetur magna
            condimentum quis hac mus taciti dis habitant urna laoreet vel aenean
            etiam dolor cursus nulla justo et quisque rutrum lobortis nunc
            mauris sagittis vulputate ornare curabitur vehicula dignissim pede
            diam ligula sociosqu semper maximus amet vestibulum integer iaculis
            per ad est Adipiscing dictum natoque ipsum accumsan nascetur magna
            condimentum quis hac mus taciti dis habitant urna laoreet vel aenean
            etiam dolor cursus nulla justo et quisque rutrum lobortis nunc
            mauris sagittis vulputate ornare curabitur vehicula dignissim pede
            diam ligula sociosqu semper maximus amet vestibulum integer iaculis
            per ad est Adipiscing dictum natoque ipsum accumsan nascetur magna
            condimentum quis hac mus taciti dis habitant urna laoreet vel aenean
            etiam dolor cursus nulla justo et quisque rutrum lobortis nunc
            eleifend felis mauris sagittis vulputate ornare curabitur vehicula
            dignissim pede diam ligula sociosqu semper maximus amet vestibulum
            integer iaculis per ad est <br /> <br /> vulputate ornare curabitur
            vehicula dignissim pede diam ligula sociosqu semper maximus amet
            vestibulum integer iaculis per ad est Adipiscing dictum natoque
            ipsum accumsan nascetur magna condimentum quis hac mus taciti dis
            habitant urna laoreet vel aenean etiam dolor cursus nulla justo et
            qui
          </div>
        </motion.div>
      </div>
    </div>
  );
}
