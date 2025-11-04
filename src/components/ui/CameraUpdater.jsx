import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

export function CameraUpdater() {
  const { camera, size } = useThree();
  useEffect(() => {
    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();
  }, [camera, size]);
  return null;
}
