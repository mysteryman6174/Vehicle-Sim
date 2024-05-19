import React, { useEffect } from "react";

const useRequestAnimationFrame = (callback: (time: number) => void, duration: number) => {
	const requestRef = React.useRef<number>(0);
	const previousTimeRef = React.useRef<number>(0);

	const animate = (time: number) => {
		if (previousTimeRef.current) {
			callback(time - previousTimeRef.current);
		}
		previousTimeRef.current = time;
		requestRef.current = requestAnimationFrame(animate);
	};

	useEffect(() => {
		requestRef.current = requestAnimationFrame(animate);
		const timer = setTimeout(() => {
			cancelAnimationFrame(requestRef.current);
		}, duration);
		return () => {
			clearTimeout(timer);
			cancelAnimationFrame(requestRef.current);
		};
	}, [duration]);

	return requestRef;
};

export default useRequestAnimationFrame;
