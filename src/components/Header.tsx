'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Fade, Flex, Line, Row, ToggleButton } from '@once-ui-system/core';

import {
	about,
	blog,
	display,
	gallery,
	person,
	routes,
	work,
} from '@/resources';
import styles from './Header.module.scss';
import { AnimatedThemeToggler, Dock, DockIcon } from './ui';

type TimeDisplayProps = {
	timeZone: string;
	locale?: string;
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({
	timeZone,
	locale = 'en-GB',
}) => {
	const [currentTime, setCurrentTime] = useState('');

	useEffect(() => {
		const updateTime = () => {
			const now = new Date();
			const options: Intl.DateTimeFormatOptions = {
				timeZone,
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
				hour12: false,
			};
			const timeString = new Intl.DateTimeFormat(locale, options).format(now);
			setCurrentTime(timeString);
		};

		updateTime();
		const intervalId = setInterval(updateTime, 1000);

		return () => clearInterval(intervalId);
	}, [timeZone, locale]);

	return <>{currentTime}</>;
};

export default TimeDisplay;

export const Header = () => {
	const pathname = usePathname() ?? '';

	return (
		<>
			<Fade
				s={{ hide: true }}
				fillWidth
				position="relative"
				height="80"
				zIndex={1}
			/>

			<Fade
				hide
				s={{ hide: false }}
				fillWidth
				position="relative"
				height="80"
				zIndex={1}
			/>

			<Row
				fitHeight
				className={styles.position}
				position="fixed"
				top="0"
				as="header"
				zIndex={9}
				fillWidth
				padding="8"
				horizontal="center"
				data-border="rounded"
				style={{
					backdropFilter: 'blur(8px)',
				}}
			>
				<Row
					paddingLeft="12"
					fillWidth
					vertical="center"
					textVariant="body-default-s"
				>
					{display.location && <Row s={{ hide: true }}>{person.location}</Row>}
				</Row>

				<Row fillWidth horizontal="center">
					<Row s={{ hide: true }}>
						<Row
							gap="4"
							vertical="center"
							textVariant="body-default-s"
							suppressHydrationWarning
						>
							<Dock direction="middle">
								{routes['/'] && (
									<DockIcon>
										<ToggleButton
											prefixIcon="home"
											href="/"
											selected={pathname === '/'}
										/>
									</DockIcon>
								)}

								<DockIcon>
									<Line background="neutral-alpha-medium" vert maxHeight="24" />
								</DockIcon>

								{routes['/about'] && (
									<DockIcon>
										<ToggleButton
											prefixIcon="person"
											href="/about"
											label={about.label}
											selected={pathname === '/about'}
										/>
									</DockIcon>
								)}

								{routes['/work'] && (
									<DockIcon>
										<ToggleButton
											prefixIcon="grid"
											href="/work"
											label={work.label}
											selected={pathname.startsWith('/work')}
										/>
									</DockIcon>
								)}

								{routes['/blog'] && (
									<DockIcon>
										<ToggleButton
											prefixIcon="book"
											href="/blog"
											label={blog.label}
											selected={pathname.startsWith('/blog')}
										/>
									</DockIcon>
								)}

								{routes['/gallery'] && (
									<DockIcon>
										<ToggleButton
											prefixIcon="gallery"
											href="/gallery"
											label={gallery.label}
											selected={pathname.startsWith('/gallery')}
										/>
									</DockIcon>
								)}

								{display.themeSwitcher && (
									<>
										<DockIcon>
											<Line
												background="neutral-alpha-medium"
												vert
												maxHeight="24"
											/>
										</DockIcon>
										<DockIcon>
											<AnimatedThemeToggler />
										</DockIcon>
									</>
								)}
							</Dock>
						</Row>
					</Row>

					<Row
						hide
						s={{ hide: false }}
						horizontal="center"
						position="fixed"
						bottom="8"
						zIndex={10}
					>
						<Row
							gap="4"
							vertical="center"
							textVariant="body-default-s"
							suppressHydrationWarning
						>
							<Dock direction="middle">
								{routes['/'] && (
									<DockIcon>
										<ToggleButton
											prefixIcon="home"
											href="/"
											selected={pathname === '/'}
										/>
									</DockIcon>
								)}

								<DockIcon>
									<Line background="neutral-alpha-medium" vert maxHeight="24" />
								</DockIcon>

								{routes['/about'] && (
									<DockIcon>
										<ToggleButton
											prefixIcon="person"
											href="/about"
											selected={pathname === '/about'}
										/>
									</DockIcon>
								)}

								{routes['/work'] && (
									<DockIcon>
										<ToggleButton
											prefixIcon="grid"
											href="/work"
											selected={pathname.startsWith('/work')}
										/>
									</DockIcon>
								)}

								{routes['/blog'] && (
									<DockIcon>
										<ToggleButton
											prefixIcon="book"
											href="/blog"
											selected={pathname.startsWith('/blog')}
										/>
									</DockIcon>
								)}

								{routes['/gallery'] && (
									<DockIcon>
										<ToggleButton
											prefixIcon="gallery"
											href="/gallery"
											selected={pathname.startsWith('/gallery')}
										/>
									</DockIcon>
								)}

								{display.themeSwitcher && (
									<>
										<DockIcon>
											<Line
												background="neutral-alpha-medium"
												vert
												maxHeight="24"
											/>
										</DockIcon>
										<DockIcon>
											<AnimatedThemeToggler />
										</DockIcon>
									</>
								)}
							</Dock>
						</Row>
					</Row>
				</Row>

				<Flex fillWidth horizontal="end" vertical="center">
					<Flex
						paddingRight="12"
						horizontal="end"
						vertical="center"
						textVariant="body-default-s"
						gap="20"
					>
						<Flex s={{ hide: true }}>
							{display.time && <TimeDisplay timeZone={person.location} />}
						</Flex>
					</Flex>
				</Flex>
			</Row>
		</>
	);
};
