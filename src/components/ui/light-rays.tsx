'use client';

import { motion } from 'motion/react';
import { useEffect, useState, type CSSProperties } from 'react';

import { cn } from '@/lib/utils';

interface LightRaysProps extends React.HTMLAttributes<HTMLDivElement> {
	ref?: React.Ref<HTMLDivElement>;
	count?: number;
	color?: string;
	blur?: number;
	speed?: number;
	length?: string;
	intensity?: number;
}

type LightRay = {
	id: string;
	left: number;
	rotate: number;
	width: number;
	swing: number;
	delay: number;
	duration: number;
	rayIntensity: number;
};

const createRays = (count: number, cycle: number): LightRay[] => {
	if (count <= 0) return [];

	return Array.from({ length: count }, (_, index) => {
		const left = 5 + Math.random() * 90;
		const rotate = -35 + Math.random() * 70;
		const width = 200 + Math.random() * 300;
		const swing = 1 + Math.random() * 2.5;
		const delay = Math.random() * cycle;
		const duration = cycle * (0.8 + Math.random() * 0.6);
		const rayIntensity = 0.5 + Math.random() * 0.6;

		return {
			id: `${index}-${Math.round(left * 10)}`,
			left,
			rotate,
			width,
			swing,
			delay,
			duration,
			rayIntensity,
		};
	});
};

const Ray = ({
	left,
	rotate,
	width,
	swing,
	delay,
	duration,
	rayIntensity,
}: LightRay) => {
	return (
		<motion.div
			className="pointer-events-none absolute -top-[20%] left-[var(--ray-left)] h-[var(--light-rays-length)] w-[var(--ray-width)] origin-top -translate-x-1/2 rounded-full bg-gradient-to-b from-[color-mix(in_srgb,var(--light-rays-color)_65%,transparent)] via-[color-mix(in_srgb,var(--light-rays-color)_35%,transparent)] to-transparent opacity-0 mix-blend-screen blur-[var(--light-rays-blur)]"
			style={
				{
					'--ray-left': `${left}%`,
					'--ray-width': `${width}px`,
				} as CSSProperties
			}
			initial={{ rotate: rotate, opacity: 0 }}
			animate={{
				opacity: [0, rayIntensity * 0.8, rayIntensity, rayIntensity * 0.6, 0],
				rotate: [
					rotate - swing,
					rotate + swing / 2,
					rotate + swing,
					rotate + swing / 2,
					rotate - swing,
				],
				y: [0, 20, 40, 60, 80],
			}}
			transition={{
				duration: duration,
				repeat: Infinity,
				ease: 'easeInOut',
				delay: delay,
				repeatDelay: duration * 0.15,
			}}
		/>
	);
};

export function LightRays({
	className,
	style,
	count = 10,
	color = '#094074',
	blur = 48,
	speed = 16,
	length = '150vh',
	intensity = 0.75,
	ref,
	...props
}: LightRaysProps) {
	const [rays, setRays] = useState<LightRay[]>([]);
	const cycleDuration = Math.max(speed, 0.1);

	useEffect(() => {
		setRays(createRays(count, cycleDuration));
	}, [count, cycleDuration]);

	return (
		<div
			ref={ref}
			className={cn(
				'pointer-events-none absolute inset-0 isolate overflow-hidden rounded-[inherit]',
				className
			)}
			style={
				{
					'--light-rays-color': color,
					'--light-rays-blur': `${blur}px`,
					'--light-rays-length': length,
					...style,
				} as CSSProperties
			}
			{...props}
		>
			<div className="absolute inset-0 overflow-hidden">
				{/* Glow background layers - tăng intensity */}
				<div
					aria-hidden
					className="absolute inset-0"
					style={
						{
							background: `radial-gradient(circle at 20% 10%, color-mix(in srgb, var(--light-rays-color) ${
								50 * intensity
							}%, transparent), transparent 60%)`,
							opacity: 0.7,
						} as CSSProperties
					}
				/>
				<div
					aria-hidden
					className="absolute inset-0"
					style={
						{
							background: `radial-gradient(circle at 80% 15%, color-mix(in srgb, var(--light-rays-color) ${
								45 * intensity
							}%, transparent), transparent 65%)`,
							opacity: 0.65,
						} as CSSProperties
					}
				/>
				<div
					aria-hidden
					className="absolute inset-0"
					style={
						{
							background: `radial-gradient(circle at 50% 5%, color-mix(in srgb, var(--light-rays-color) ${
								35 * intensity
							}%, transparent), transparent 55%)`,
							opacity: 0.5,
						} as CSSProperties
					}
				/>

				{/* Smoke/Fog effect layers */}
				<div
					aria-hidden
					className="absolute inset-0"
					style={
						{
							background: `radial-gradient(ellipse 800px 600px at 30% 20%, color-mix(in srgb, var(--light-rays-color) ${
								15 * intensity
							}%, transparent), transparent 80%)`,
							opacity: 0.4,
						} as CSSProperties
					}
				/>
				<div
					aria-hidden
					className="absolute inset-0"
					style={
						{
							background: `radial-gradient(ellipse 900px 700px at 70% 25%, color-mix(in srgb, var(--light-rays-color) ${
								12 * intensity
							}%, transparent), transparent 85%)`,
							opacity: 0.35,
						} as CSSProperties
					}
				/>

				{/* Animated rays */}
				{rays.map((ray) => (
					<Ray key={ray.id} {...ray} />
				))}
			</div>
		</div>
	);
}
