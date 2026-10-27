
import { useEffect, useRef, useState } from "react";
import {
  FaceLandmarker,
  FilesetResolver,
} from "@mediapipe/tasks-vision";

function FaceDetection() {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const [status, setStatus] = useState("Loading model...");

  useEffect(() => {
    let stream;
    let animationId;
    let active = true;

    async function startDetection() {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );

        const landmarker =
          await FaceLandmarker.createFromOptions(vision, {
            baseOptions: {
              modelAssetPath:
                "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
            },
            runningMode: "VIDEO",
            numFaces: 1,
            outputFaceBlendshapes: true,
          });

        if (!active) {
          landmarker.close();
          return;
        }

        landmarkerRef.current = landmarker;

        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        if (!active) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        videoRef.current.srcObject = stream;
        await videoRef.current.play();

        setStatus("Camera running");

        function detect() {
          if (!active || !videoRef.current) return;

          const video = videoRef.current;

          if (
            video.readyState >= 2 &&
            video.currentTime > 0
          ) {
            const result = landmarker.detectForVideo(
              video,
              performance.now()
            );

            if (result.faceLandmarks.length > 0) {
              setStatus("Face detected");

              const expressions =
                result.faceBlendshapes?.[0]?.categories ?? [];

              console.log(
                expressions.map(({ categoryName, score }) => ({
                  expression: categoryName,
                  score: score.toFixed(3),
                }))
              );
            } else {
              setStatus("No face detected");
            }
          }

          animationId = requestAnimationFrame(detect);
        }

        detect();
      } catch (error) {
        console.error(error);
        setStatus("Camera or model failed to load");
      }
    }

    startDetection();

    return () => {
      active = false;
      cancelAnimationFrame(animationId);

      stream?.getTracks().forEach((track) => track.stop());
      landmarkerRef.current?.close();
      landmarkerRef.current = null;
    };
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "30px" }}>
      <h1>Face Expression Detection</h1>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{
          width: "100%",
          maxWidth: "600px",
          borderRadius: "16px",
          transform: "scaleX(-1)",
        }}
      />

      <h3>{status}</h3>
      <p>Expression scores dekhne ke liye browser console kholo.</p>
    </div>
  );
}

export default FaceDetection;
