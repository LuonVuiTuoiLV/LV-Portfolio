import { Mailchimp } from '@/components';
import { Posts } from '@/components/blog/Posts';
import { AnimatedGradientText } from '@/components/ui';
import { Projects } from '@/components/work/Projects';
import { cn } from '@/lib/utils';
import { about, baseURL, home, person, routes } from '@/resources';
import {
	Avatar,
	Badge,
	Column,
	Heading,
	Line,
	Meta,
	RevealFx,
	Row,
	Schema,
	Text,
} from '@once-ui-system/core';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export async function generateMetadata() {
	return Meta.generate({
		title: home.title,
		description: home.description,
		baseURL: baseURL,
		path: home.path,
		image: home.image,
	});
}

export default function Home() {
	return (
		<Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
			<Schema
				as="webPage"
				baseURL={baseURL}
				path={home.path}
				title={home.title}
				description={home.description}
				image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
				author={{
					name: person.name,
					url: `${baseURL}${about.path}`,
					image: `${baseURL}${person.avatar}`,
				}}
			/>
			<Column fillWidth horizontal="center" gap="m">
				<Column maxWidth="s" horizontal="center" align="center">
					{home.featured.display && (
						<RevealFx
							fillWidth
							horizontal="center"
							paddingTop="16"
							paddingBottom="32"
							paddingLeft="12"
						>
							<Badge
								background="brand-alpha-weak"
								paddingX="12"
								paddingY="4"
								onBackground="neutral-strong"
								textVariant="label-default-s"
								arrow={false}
								href={home.featured.href}
							>
								<Row paddingY="2">{home.featured.title}</Row>
							</Badge>
						</RevealFx>
					)}
					<RevealFx
						translateY="4"
						fillWidth
						horizontal="center"
						paddingBottom="16"
					>
						<Heading wrap="balance" variant="display-strong-l">
							{home.headline}
						</Heading>
					</RevealFx>
					<RevealFx
						translateY="8"
						delay={0.2}
						fillWidth
						horizontal="center"
						paddingBottom="32"
					>
						<Text
							wrap="balance"
							onBackground="neutral-weak"
							variant="heading-default-xl"
						>
							{home.subline}
						</Text>
					</RevealFx>
					<RevealFx
						paddingTop="12"
						delay={0.4}
						horizontal="center"
						paddingLeft="12"
					>
						<Link
							href="/about"
							className="group Button_button__s9JD_ Button_secondary__9o2M1 Button_m__I_0ip rounded-[20px] text-decoration-none button cursor-interactive fit-width justify-center relative h-full w-full"
						>
							<span
								className={cn(
									'animate-gradient absolute inset-0 block h-full w-full rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]'
								)}
								style={{
									WebkitMask:
										'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
									WebkitMaskComposite: 'destination-out',
									mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
									maskComposite: 'subtract',
									WebkitClipPath: 'padding-box',
								}}
							/>
							{about.avatar.display && (
								<Avatar
									src={person.avatar}
									marginRight="8"
									style={{ marginLeft: '-0.5rem' }}
									size="m"
								/>
							)}
							<AnimatedGradientText className="text-sm font-medium">
								{about.title}
							</AnimatedGradientText>
							<ChevronRight className="ml-1 size-4 stroke-neutral-400 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
						</Link>
					</RevealFx>
				</Column>
			</Column>
			<RevealFx translateY="16" delay={0.6}>
				<Projects range={[1, 1]} />
			</RevealFx>
			{routes['/blog'] && (
				<Column fillWidth gap="24" marginBottom="l">
					<Row fillWidth paddingRight="64">
						<Line maxWidth={48} />
					</Row>
					<Row fillWidth gap="24" marginTop="40" s={{ direction: 'column' }}>
						<Row flex={1} paddingLeft="l" paddingTop="24">
							<Heading as="h2" variant="display-strong-xs" wrap="balance">
								Latest from the blog
							</Heading>
						</Row>
						<Row flex={3} paddingX="20">
							<Posts range={[1, 2]} columns="2" />
						</Row>
					</Row>
					<Row fillWidth paddingLeft="64" horizontal="end">
						<Line maxWidth={48} />
					</Row>
				</Column>
			)}
			<Projects range={[2]} />
			<Mailchimp />
		</Column>
	);
}
