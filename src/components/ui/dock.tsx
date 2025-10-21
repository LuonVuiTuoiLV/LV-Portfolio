'use client';

import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import type { MotionProps } from 'motion/react';
import {
	motion,
	MotionValue,
	useMotionValue,
	useSpring,
	useTransform,
} from 'motion/react';
import React, { PropsWithChildren, useRef } from 'react';

export interface DockProps extends VariantProps<typeof dockVariants> {
	className?: string;
	iconSize?: number;
	iconMagnification?: number;
	disableMagnification?: boolean;
	iconDistance?: number;
	direction?: 'top' | 'middle' | 'bottom';
	children: React.ReactNode;
}

const DEFAULT_SIZE = 30;
const DEFAULT_MAGNIFICATION = 40;
const DEFAULT_DISTANCE = 140;
const DEFAULT_DISABLEMAGNIFICATION = false;
const DEFAULT_CONTAINER_PAD = 6;

const dockVariants = cva(
	'relative z-1 supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 mx-auto flex items-center justify-center gap-2 rounded-[24px] border border-1 backdrop-blur-md neutral-border-alpha-weak page-background'
);

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
	(
		{
			className,
			children,
			iconSize = DEFAULT_SIZE,
			iconMagnification = DEFAULT_MAGNIFICATION,
			disableMagnification = DEFAULT_DISABLEMAGNIFICATION,
			iconDistance = DEFAULT_DISTANCE,
			direction = 'middle',
			...props
		},
		ref
	) => {
		const mouseX = useMotionValue(Infinity);

		const renderChildren = () => {
			return React.Children.map(children, (child) => {
				if (
					React.isValidElement<DockIconProps>(child) &&
					child.type === DockIcon
				) {
					return React.cloneElement(child, {
						...child.props,
						mouseX: mouseX,
						size: iconSize,
						magnification: iconMagnification,
						disableMagnification: disableMagnification,
						distance: iconDistance,
					});
				}
				return child;
			});
		};

		const maxSize = disableMagnification
			? iconSize
			: Math.max(iconSize, iconMagnification);

		return (
			<motion.div
				ref={ref}
				onMouseMove={(e) => mouseX.set(e.pageX)}
				onMouseLeave={() => mouseX.set(Infinity)}
				style={{
					minHeight: maxSize,
					padding: DEFAULT_CONTAINER_PAD,
				}}
				{...props}
				className={cn(dockVariants({ className }), {
					'items-start': direction === 'top',
					'items-center': direction === 'middle',
					'items-end': direction === 'bottom',
				})}
			>
				{renderChildren()}
			</motion.div>
		);
	}
);

Dock.displayName = 'Dock';

export interface DockIconProps
	extends Omit<MotionProps & React.HTMLAttributes<HTMLDivElement>, 'children'> {
	size?: number;
	magnification?: number;
	disableMagnification?: boolean;
	distance?: number;
	mouseX?: MotionValue<number>;
	className?: string;
	children?: React.ReactNode;
	props?: PropsWithChildren;
}

const DockIcon = ({
	size = DEFAULT_SIZE,
	magnification = DEFAULT_MAGNIFICATION,
	disableMagnification,
	distance = DEFAULT_DISTANCE,
	mouseX,
	className,
	children,
	...props
}: DockIconProps) => {
	const ref = useRef<HTMLDivElement>(null);
	const defaultMouseX = useMotionValue(Infinity);

	const distanceCalc = useTransform(mouseX ?? defaultMouseX, (val: number) => {
		const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
		return val - bounds.x - bounds.width / 2;
	});

	const targetSize = disableMagnification ? size : magnification;

	const sizeTransform = useTransform(
		distanceCalc,
		[-distance, 0, distance],
		[size, targetSize, size]
	);

	const scaleSize = useSpring(sizeTransform, {
		mass: 0.1,
		stiffness: 150,
		damping: 12,
	});

	return (
		<motion.div
			ref={ref}
			style={{ height: scaleSize }}
			className={cn(
				'flex cursor-pointer items-center justify-center',
				className
			)}
			{...props}
		>
			{children}
		</motion.div>
	);
};

DockIcon.displayName = 'DockIcon';

export { Dock, DockIcon, dockVariants };
