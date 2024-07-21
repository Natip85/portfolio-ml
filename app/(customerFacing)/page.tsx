"use client";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import floating1 from "../../public/images/img_1.jpeg";
import floating2 from "../../public/images/img_2.jpeg";
import floating3 from "../../public/images/test.png";
import floating4 from "../../public/images/img_4.jpeg";
import floating5 from "../../public/images/img_5.jpeg";
import floating6 from "../../public/images/img_5.jpeg";
import floating7 from "../../public/images/img_5.jpeg";
import floating8 from "../../public/images/img_5.jpeg";

export default function Home() {
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

  return (
    <main
      onMouseMove={(e) => {
        manageMouseMove(e);
      }}
      className="main"
    >
      <div ref={plane1} className="plane">
        <Image src={floating1} alt="image" width={300} />
        <Image src={floating2} alt="image" width={300} />
        <Image src={floating7} alt="image" width={225} />
      </div>
      <div ref={plane2} className="plane">
        <Image src={floating4} alt="image" width={250} />
        <Image src={floating6} alt="image" width={200} />
        <Image src={floating8} alt="image" width={225} />
      </div>
      <div ref={plane3} className="plane">
        <Image src={floating3} alt="image" width={150} />
        <Image src={floating5} alt="image" width={200} />
      </div>
      <div className="title">
        <p>Art by</p>
        <h1>MIRY LIVNAT</h1>
      </div>
    </main>
  );
}
