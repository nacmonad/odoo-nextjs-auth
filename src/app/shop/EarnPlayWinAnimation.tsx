'use client';

//import "./styles.css";
import * as React from "react";
import { useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { getIndex, useFlubber } from "@/utils/useFlubber";

const earn = ["M55.332612,68.027215H60.351429V69.321194H57.209501V70.284443H60.124053V71.520543H57.209501V72.715303H60.44238V74.08783H55.332612Z",
"m 65.180077,73.087373 h -2.133204 l -0.293522,1.000457 h -1.914096 l 2.277898,-6.060615 h 2.042254 l 2.277898,6.060615 h -1.959571 z m -0.392741,-1.310514 -0.669727,-2.17868 -0.665592,2.17868 z",
"m 68.061556,74.08783 v -6.060615 h 3.121257 q 0.868165,0 1.327052,0.148828 0.458887,0.148829 0.740007,0.553972 0.28112,0.401009 0.28112,0.979786 0,0.504362 -0.214975,0.872298 -0.214974,0.363802 -0.591178,0.591179 -0.239779,0.144694 -0.657325,0.239778 0.334864,0.111622 0.487826,0.223243 0.103353,0.07441 0.297656,0.318327 0.198438,0.243912 0.264584,0.376204 l 0.905371,1.757 H 71.906284 L 70.905828,72.235746 Q 70.715658,71.876077 70.56683,71.76859 70.364258,71.62803 70.107943,71.62803 h -0.165364 v 2.4598 z m 1.881023,-3.60495 h 0.789616 q 0.128157,0 0.496094,-0.08268 0.186035,-0.03721 0.30179,-0.190169 0.11989,-0.152963 0.11989,-0.3514 0,-0.293523 -0.186036,-0.450619 -0.186035,-0.157096 -0.698665,-0.157096 h -0.822689 z",
"m 74.634801,68.027215 h 1.748731 l 2.282032,3.352768 v -3.352768 h 1.765268 v 6.060615 h -1.765268 l -2.26963,-3.327964 v 3.327964 h -1.761133 z"];

const play = ["M55.369819,74.08783V68.027215H57.656986Q58.260567,68.027215,58.579294,68.085095Q59.025778,68.159505,59.327569,68.470349Q59.629359,68.677056,59.81126,69.05326Q59.997295,69.429465,59.997295,69.879083Q59.997295,70.652163,59.505336,71.189598Q59.013376,71.722899,57.327667,71.722899H55.773239V74.186833ZM56.571258,70.908694H58.138088Q58.915302,70.908694,59.141897,70.619306Q59.368492,70.329918,59.368492,69.804885Q59.368492,69.424546,59.174189,69.155829Q58.983019,68.883977,58.468856,68.797161Q58.266284,68.743421,57.720581,68.743421H56.170287Z",
"m 60.983949,74.08783 v -6.060615 h 0.802019 v 5.345412 H 64.7708 v 0.715203 z", 
"m 65.060188,74.08783 2.327507,-6.060615 h 0.86403 l 2.48047,6.060615 h -0.91364 l -0.706934,-1.835548 h -2.534213 l -0.665593,1.835548 z m 1.748731,-2.488738 h 2.054655 L 68.231055,69.92064 q -0.289388,-0.764811 -0.429948,-1.256771 -0.115756,0.58291 -0.326596,1.157553 z",
"m 72.451987,74.08783 v -2.567287 l -2.335775,-3.493328 h 0.975651 l 1.19476,1.82728 q 0.330729,0.51263 0.615983,1.02526 0.272852,-0.475423 0.661458,-1.070736 l 1.174089,-1.781804 h 0.934311 l -2.418458,3.493328 v 2.567287 z"];

const win = ["M54.712495,68.027215H56.490165L57.130953,71.413056L58.065263,68.027215H59.838799L60.773243,71.413056L61.414031,68.027215H63.183467L61.848148,74.08783H59.0126L57.950131,70.27204L56.887663,74.08783H55.052115Z", 
"m 63.877831,68.027215 h 1.876888 v 6.060615 h -1.876888 z", 
"m 67.110709,68.027215 h 1.748731 l 2.282033,3.352768 v -3.352768 h 1.765267 v 6.060615 h -1.765267 l -2.26963,-3.327964 v 3.327964 h -1.761134 z", 
"M 0, 0"];

const paths = [earn, play, win, earn]

const colors = [
//   "#00cc88",
//   "#0099ff",
//  "#ff0055",
   "#8855ff",
  "#ee4444",
  "#ffcc00",
  "#8855ff",
];

export default function LoadingAnimation() {
  const [pathIndex1, setPathIndex1] = useState(0);
  const progress = useMotionValue(pathIndex1);
  const fill = useTransform(progress, paths.map(getIndex), colors);
  
  const path1 = useFlubber(progress, paths.map(p=>p[0]));
  const path2 = useFlubber(progress, paths.map(p=>p[1]));
  const path3 = useFlubber(progress, paths.map(p=>p[2]));
  const path4 = useFlubber(progress, paths.map(p=>p[3]));


  React.useEffect(() => {
    const animation = animate(progress, pathIndex1, {
      duration: 1.2,
      ease: "easeInOut",
      onComplete: () => {
        if (pathIndex1 === paths.length - 1) {
          progress.set(0);
          setPathIndex1(1);
        } else {
          setPathIndex1(pathIndex1 + 1);
        }
      }
    });

    return () => animation.stop();
  }, [pathIndex1]);

  return (
        <svg width="400" height="400">
        <g transform="translate(-150 -200) scale(3 3)">
            <motion.path fill={fill} d={path1} />
        </g>
        <g transform="translate(-150 -200) scale(3 3)">
            <motion.path fill={fill} d={path2} />
        </g>
        <g transform="translate(-150 -200) scale(3 3)">
            <motion.path fill={fill} d={path3} />
        </g>
        <g transform="translate(-150 -200) scale(3 3)">
            <motion.path fill={fill} d={path4} />
        </g>
    </svg>
  );
}
