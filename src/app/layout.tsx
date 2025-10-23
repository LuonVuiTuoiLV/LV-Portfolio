import { Footer, Header, Providers, RouteGuard } from '@/components';
import { LightRays } from '@/components/ui';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import { baseURL, fonts, home } from '@/resources';
import '@/resources/custom.css';
import { Column, Flex, Meta } from '@once-ui-system/core';
import '@once-ui-system/core/css/styles.css';
import '@once-ui-system/core/css/tokens.css';
import { Analytics } from '@vercel/analytics/next';
import classNames from 'classnames';
import './globals.css';

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
					<ScrollProgress />
					<div className="absolute h-[100%] w-full">
						<LightRays count={12} blur={30} speed={8} intensity={0.8} />
					</div>
					<Flex fillWidth minHeight="16" s={{ hide: true }} />
					<Header />
					<Flex zIndex={0} fillWidth padding="l" horizontal="center" flex={1}>
						<Flex horizontal="center" fillWidth minHeight="0">
							<RouteGuard>
								{children}
								<Analytics />
							</RouteGuard>
						</Flex>
					</Flex>
					<Footer />
				</Column>
			</Providers>
		</Flex>
	);
}
