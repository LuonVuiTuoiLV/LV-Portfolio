import '@/resources/custom.css';
import '@once-ui-system/core/css/styles.css';
import '@once-ui-system/core/css/tokens.css';
import classNames from 'classnames';
import './globals.css';

import { Footer, Header, Providers, RouteGuard } from '@/components';
import { LightRays } from '@/components/ui';
import { baseURL, fonts, home } from '@/resources';
import { Column, Flex, Meta } from '@once-ui-system/core';

export async function generateMetadata() {
	return Meta.generate({
		title: home.title,
		description: home.description,
		baseURL: baseURL,
		path: home.path,
		image: home.image,
	});
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<Flex
			suppressHydrationWarning
			as="html"
			lang="en"
			fillWidth
			className={classNames(
				fonts.heading.variable,
				fonts.body.variable,
				fonts.label.variable,
				fonts.code.variable
			)}
		>
			<head>
				<script id="theme-init" />
			</head>
			<Providers>
				<Column
					as="body"
					background="page"
					fillWidth
					style={{ minHeight: '100vh' }}
					margin="0"
					padding="0"
					horizontal="center"
				>
					<div className="absolute h-[100%] w-full">
						<LightRays count={8} blur={30} speed={22} intensity={0.5} />
					</div>
					<Flex fillWidth minHeight="16" s={{ hide: true }} />
					<Header />
					<Flex zIndex={0} fillWidth padding="l" horizontal="center" flex={1}>
						<Flex horizontal="center" fillWidth minHeight="0">
							<RouteGuard>{children}</RouteGuard>
						</Flex>
					</Flex>
					<Footer />
				</Column>
			</Providers>
		</Flex>
	);
}
