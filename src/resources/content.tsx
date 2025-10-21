import {
	About,
	Blog,
	Gallery,
	Home,
	Newsletter,
	Person,
	Social,
	Work,
} from '@/types';
import { Line, Row, Text } from '@once-ui-system/core';

const person: Person = {
	firstName: 'Nguyen Long',
	lastName: 'Vu',
	name: `Nguyen Long Vu`,
	role: 'Frontend Developer',
	avatar: '/images/avatar.jpg',
	email: 'nguyenlongvux1@gmail.com',
	location: 'Asia/Ho_Chi_Minh', // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
	languages: ['VietNam', 'English'], // optional: Leave the array empty if you don't want to display languages
};

const newsletter: Newsletter = {
	display: true,
	title: <>Subscribe to {person.lastName}'s Newsletter</>,
	description: <>My weekly newsletter about creativity and engineering</>,
};

const social: Social = [
	// Links are automatically displayed.
	// Import new icons in /once-ui/icons.ts
	{
		name: 'GitHub',
		icon: 'github',
		link: 'https://github.com/LuonVuiTuoiLV',
	},
	{
		name: 'LinkedIn',
		icon: 'linkedin',
		link: 'https://www.linkedin.com/in/luonvuituoilv/',
	},
	{
		name: 'Email',
		icon: 'email',
		link: `mailto:${person.email}`,
	},
];

const home: Home = {
	path: '/',
	image: '/images/og/home.jpg',
	label: 'Home',
	title: `${person.name}'s Portfolio`,
	description: `Portfolio website showcasing my work as a ${person.role}`,
	headline: <>Bringing ideas to life with code and creativity</>,
	featured: {
		display: true,
		title: (
			<Row gap="12" vertical="center">
				<strong className="ml-4">Portfolio Template</strong>{' '}
				<Line background="brand-alpha-strong" vert height="20" />
				<Text marginRight="4" onBackground="brand-medium">
					Featured work
				</Text>
			</Row>
		),
		href: '/work/building-once-ui-a-customizable-design-system',
	},
	subline: (
		<>
			I love bridging the gap between design and technology
			<br /> bringing pixel-perfect ideas to the web.
		</>
	),
};

const about: About = {
	path: '/about',
	label: 'About',
	title: `About – ${person.name}`,
	description: `Meet ${person.name}, ${person.role} from ${person.location}`,
	tableOfContent: {
		display: true,
		subItems: false,
	},
	avatar: {
		display: true,
	},
	calendar: {
		display: true,
		link: 'https://cal.com/vu-nguyen-long-atyofi/quick-chat',
	},
	intro: {
		display: true,
		title: 'Introduction',
		description: (
			<>
				I’m a Frontend Developer with a solid foundation in JavaScript and web
				technologies. I’m eager to contribute to real-world projects, improve my
				technical skills, and deliver clean, user-friendly interfaces that
				enhance user experience.
			</>
		),
	},
	work: {
		display: true,
		title: 'Work Experience',
		experiences: [
			{
				company: 'PRATEK',
				timeframe: '02/2025 - Present',
				role: 'Fresher-Frontend',
				achievements: [
					<>
						Contributed to the development of multiple internal and
						client-facing web applications, building and maintaining responsive
						interfaces using ReactJS and Ant Design.
					</>,
					<>
						Implemented UI components and functional modules in collaboration
						with backend teams to ensure seamless API integration and
						performance optimization.
					</>,
					<>
						Participated in the design and development of several pages from
						scratch, improving user experience and interface consistency across
						projects.
					</>,
				],
				images: [
					{
						src: '/images/company/logo1.jpeg',
						alt: 'PRATEK',
						width: 16,
						height: 9,
					},
				],
			},
		],
	},
	studies: {
		display: true,
		title: 'Studies',
		institutions: [
			{
				name: 'University of SaiGon',
				description: (
					<>
						Information Technology Engineer passionate about frontend
						development and user experience.
					</>
				),
			},
			{
				name: 'Build the Future',
				description: <>Studied online marketing and personal branding.</>,
			},
		],
	},
	technical: {
		display: true,
		title: 'Technical skills',
		skills: [
			{
				title: 'Figma',
				description: (
					<>Able to prototype in Figma with Once UI with unnatural speed.</>
				),
				tags: [
					{
						name: 'Figma',
						icon: 'figma',
					},
				],
				// optional: leave the array empty if you don't want to display images
				images: [
					{
						src: '/images/projects/project-01/cover-02.jpg',
						alt: 'Project image',
						width: 16,
						height: 9,
					},
					{
						src: '/images/projects/project-01/cover-03.jpg',
						alt: 'Project image',
						width: 16,
						height: 9,
					},
				],
			},
			{
				title: 'Next.js',
				description: (
					<>Building next gen apps with Next.js + Tailwind UI + Mongoose.</>
				),
				tags: [
					{
						name: 'JavaScript',
						icon: 'javascript',
					},
					{
						name: 'Next.js',
						icon: 'nextjs',
					},
					{
						name: 'Mongoose',
						icon: 'mongoose',
					},
					{
						name: 'Tailwind',
						icon: 'tailwind',
					},
				],
				images: [
					{
						src: '/images/projects/project-01/cover-04.jpg',
						alt: 'Project image',
						width: 16,
						height: 9,
					},
				],
			},
		],
	},
};

const blog: Blog = {
	path: '/blog',
	label: 'Blog',
	title: 'Writing about design and tech...',
	description: `Read what ${person.name} has been up to recently`,
	// Create new blog posts by adding a new .mdx file to app/blog/posts
	// All posts will be listed on the /blog route
};

const work: Work = {
	path: '/work',
	label: 'Work',
	title: `Projects – ${person.name}`,
	description: `Design and dev projects by ${person.name}`,
	// Create new project pages by adding a new .mdx file to app/blog/posts
	// All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
	path: '/gallery',
	label: 'Gallery',
	title: `Photo gallery – ${person.name}`,
	description: `A photo collection by ${person.name}`,
	// Images by https://lorant.one
	// These are placeholder images, replace with your own
	images: [
		{
			src: '/images/gallery/horizontal-1.jpg',
			alt: 'image',
			orientation: 'horizontal',
		},
		{
			src: '/images/gallery/vertical-4.jpg',
			alt: 'image',
			orientation: 'vertical',
		},
		{
			src: '/images/gallery/horizontal-3.jpg',
			alt: 'image',
			orientation: 'horizontal',
		},
		{
			src: '/images/gallery/vertical-1.jpg',
			alt: 'image',
			orientation: 'vertical',
		},
		{
			src: '/images/gallery/vertical-2.jpg',
			alt: 'image',
			orientation: 'vertical',
		},
		{
			src: '/images/gallery/horizontal-2.jpg',
			alt: 'image',
			orientation: 'horizontal',
		},
		{
			src: '/images/gallery/horizontal-4.jpg',
			alt: 'image',
			orientation: 'horizontal',
		},
		{
			src: '/images/gallery/vertical-3.jpg',
			alt: 'image',
			orientation: 'vertical',
		},
	],
};

export { about, blog, gallery, home, newsletter, person, social, work };
