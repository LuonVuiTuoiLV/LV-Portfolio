'use client';

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { person, social } from '@/resources';
import { Icon, Row, Text } from '@once-ui-system/core';
import Link from 'next/link';
import styles from './Footer.module.scss';
import { Dock, DockIcon } from './ui';

export const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<Row
			as="footer"
			fillWidth
			padding="8"
			horizontal="center"
			s={{ direction: 'column' }}
		>
			<Row
				className={styles.mobile}
				maxWidth="m"
				paddingY="8"
				paddingX="16"
				gap="16"
				horizontal="between"
				vertical="center"
				s={{
					direction: 'column',
					horizontal: 'center',
					align: 'center',
				}}
			>
				<Text variant="body-default-s" onBackground="neutral-strong">
					<Text onBackground="neutral-weak">© {currentYear} /</Text>
					<Text paddingX="4">{person.name}</Text>
				</Text>
				<Row gap="16">
					<TooltipProvider>
						<Dock direction="middle">
							{social.map((item) =>
								item.link ? (
									<DockIcon key={item.name}>
										<Tooltip>
											<TooltipTrigger asChild>
												<Link
													href={item.link}
													aria-label={item.name}
													target="_blank"
													rel="noopener noreferrer"
													style={{
														display: 'flex',
														alignItems: 'center',
														justifyContent: 'center',
														width: '40px',
														height: '40px',
														borderRadius: '50%',
														transition: 'all 0.2s',
													}}
												>
													<Icon
														name={item.icon}
														size="s"
														onBackground="neutral-strong"
													/>
												</Link>
											</TooltipTrigger>
											<TooltipContent>
												<p>{item.name}</p>
											</TooltipContent>
										</Tooltip>
									</DockIcon>
								) : null
							)}
						</Dock>
					</TooltipProvider>
				</Row>
			</Row>
			<Row height="80" hide s={{ hide: false }} />
		</Row>
	);
};
