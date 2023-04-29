"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import VideoPopup from "./VideoPopup";

interface PanoramaProps {}

const Panorama = ({}: PanoramaProps) => {
  const Canvas = useRef<any>(null);
  const [open, setOpen] = useState(false);

  const initializePANOLENS = async () => {
    const THREE = await import("three");
    const PANOLENS = await import("panolens");

    const viewer = new PANOLENS.Viewer({
      container: Canvas.current,
      autoRotate: true,
      autoRotateSpeed: 0.2,
      autoRotateActivationDuration: 5000,
      dwellTime: 1000,
      autoHideInfospot: false,
      controlBar: true,
    });

    const panorama1 = new PANOLENS.ImagePanorama("/assets/panorama1.jpg");
    const panorama2 = new PANOLENS.ImagePanorama("/assets/panorama2.jpg");
    viewer.add(panorama1, panorama2);

    const hotspot1 = createHotspot("/assets/ellipse1.png");
    const hotspot2 = createHotspot("/assets/ellipse2.png");
    const popupHotspot1 = createHotspot("/assets/play-button.png");

    hotspot1.position.set(5000.0, 1000.0, 2800.0);
    hotspot2.position.set(3700.0, 100.0, 6000.0);
    popupHotspot1.position.set(5000.0, -300.0, 2800.0);

    panorama1.add(hotspot1, popupHotspot1);
    panorama2.add(hotspot2);

    hotspot1.addEventListener("click", () => viewer.setPanorama(panorama2));
    hotspot2.addEventListener("click", () => viewer.setPanorama(panorama1));
    popupHotspot1.addEventListener("click", () => setOpen(true));

    function createHotspot(imageUrl: any) {
      const Infospot = new PANOLENS.Infospot(1000, imageUrl);
      Infospot.animated = false;
      return Infospot;
    }
  };

  useMemo(() => {
    if (typeof window !== "undefined") initializePANOLENS();

    return () => {
      Canvas.current?.destroy();
      Canvas.current = null;
    };
  }, [Canvas]);

  return (
    <>
      <div ref={Canvas} className="w-full h-screen overflow-hidden"></div>
      <VideoPopup open={open} setOpen={setOpen} />
    </>
  );
};

export default Panorama;
