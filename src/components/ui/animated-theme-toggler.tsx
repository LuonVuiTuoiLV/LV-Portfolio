'use client';

import { ToggleButton, useTheme } from '@once-ui-system/core';
import { useCallback, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

interface AnimatedThemeTogglerProps
	extends React.ComponentPropsWithoutRef<'button'> {
	duration?: number;
}

export const AnimatedThemeToggler = ({
	className,
	duration = 400,
	...props
}: AnimatedThemeTogglerProps) => {
	const { theme, setTheme, resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const buttonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		setMounted(true);
	}, []);

	const currentTheme = resolvedTheme || theme || 'light';

	const toggleTheme = useCallback(async () => {
		if (!buttonRef.current || !mounted) return;

		const currentTheme = resolvedTheme || theme;
		const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

		if (!document.startViewTransition) {
			setTheme(newTheme);
			return;
		}

		await document.startViewTransition(() => {
			flushSync(() => {
				setTheme(newTheme);
			});
		}).ready;

		const { top, left, width, height } =
			buttonRef.current.getBoundingClientRect();
		const x = left + width / 2;
		const y = top + height / 2;
		const maxRadius = Math.hypot(
			Math.max(left, window.innerWidth - left),
			Math.max(top, window.innerHeight - top)
		);

		document.documentElement.animate(
			{
				clipPath: [
					`circle(0px at ${x}px ${y}px)`,
					`circle(${maxRadius}px at ${x}px ${y}px)`,
				],
			},
			{
				duration,
				easing: 'ease-in-out',
				pseudoElement: '::view-transition-new(root)',
			}
		);
	}, [theme, resolvedTheme, setTheme, mounted, duration]);

	const icon = currentTheme === 'dark' ? 'light' : 'dark';
	const nextTheme = currentTheme === 'light' ? 'dark' : 'light';

	return (
		<ToggleButton
			ref={buttonRef}
			className={className}
			prefixIcon={icon}
			onClick={toggleTheme}
			aria-label={`Switch to ${nextTheme} mode`}
			{...props}
		/>
	);
};
