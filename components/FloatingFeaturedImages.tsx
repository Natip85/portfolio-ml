"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ImageType } from "@prisma/client";
export default function FloatingFeaturedImages({
  images,
}: {
  images: ImageType[];
}) {
  console.log("THESE????", images);

  const plane1 = useRef(null);
  const plane2 = useRef(null);
  const plane3 = useRef(null);
  let requestAnimationFrameId: any = null;
  let xForce = 0;
  let yForce = 0;
  const easing = 0.08;
  const speed = 0.01;

  const manageMouseMove = (e: any) => {
    const { movementX, movementY } = e;
    xForce += movementX * speed;
    yForce += movementY * speed;

    if (requestAnimationFrameId == null) {
      requestAnimationFrameId = requestAnimationFrame(animate);
    }
  };

  const lerp = (start: number, target: number, amount: number) =>
    start * (1 - amount) + target * amount;

  const animate = () => {
    xForce = lerp(xForce, 0, easing);
    yForce = lerp(yForce, 0, easing);
    gsap.set(plane1.current, { x: `+=${xForce}`, y: `+=${yForce}` });
    gsap.set(plane2.current, {
      x: `+=${xForce * 0.5}`,
      y: `+=${yForce * 0.5}`,
    });
    gsap.set(plane3.current, {
      x: `+=${xForce * 0.25}`,
      y: `+=${yForce * 0.25}`,
    });

    if (Math.abs(xForce) < 0.01) xForce = 0;
    if (Math.abs(yForce) < 0.01) yForce = 0;

    if (xForce != 0 || yForce != 0) {
      requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(requestAnimationFrameId);
      requestAnimationFrameId = null;
    }
  };
  if (images.length !== 8)
    return (
      <div className="text-white">
        Be sure to add featured images in the admin.
      </div>
    );
  return (
    <main
      onMouseMove={(e) => {
        manageMouseMove(e);
      }}
      className="main"
    >
      <div ref={plane1} className="plane">
        <Image src={images[0].url || ""} alt="image" width={300} height={300} />
        <Image src={images[1].url || ""} alt="image" width={300} height={300} />
        <Image src={images[2].url || ""} alt="image" width={185} height={185} />
      </div>
      <div ref={plane2} className="plane">
        <Image src={images[3].url || ""} alt="image" width={250} height={250} />
        <Image src={images[4].url || ""} alt="image" width={200} height={200} />
        <Image src={images[5].url || ""} alt="image" width={225} height={225} />
      </div>
      <div ref={plane3} className="plane">
        <Image src={images[6].url || ""} alt="image" width={150} height={150} />
        <Image src={images[7].url || ""} alt="image" width={200} height={200} />
      </div>
      <div className="title">
        <p>Art by</p>
        <h1>MIRY LIVNAT</h1>
      </div>
    </main>
  );
}
