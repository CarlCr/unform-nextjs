import type { NextPage } from 'next'
import Lottie from "react-lottie";
import Animate1Data from "./animation.json";

const Animate1: NextPage = () => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Animate1Data,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <Lottie options={defaultOptions}  />
    )
}

export default Animate1
