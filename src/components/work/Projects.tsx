import { ProjectCard } from '@/components';
import { getPosts } from '@/utils/utils';
import { Column } from '@once-ui-system/core';

interface ProjectsProps {
	range?: [number] | [number, number];
	exclude?: string[];
}

export function Projects({ range, exclude }: ProjectsProps) {
	let allProjects = getPosts(['src', 'app', 'work', 'projects']);

	if (exclude && exclude.length > 0) {
		allProjects = allProjects.filter((post) => !exclude.includes(post.slug));
	}

	const sortedProjects = allProjects.sort((a, b) => {
		return (
			new Date(b.metadata.publishedAt).getTime() -
			new Date(a.metadata.publishedAt).getTime()
		);
	});

	const displayedProjects = range
		? range.length === 1
			? sortedProjects.slice(0, range[0])
			: sortedProjects.slice(range[0] - 1, range[1])
		: sortedProjects;

	if (displayedProjects.length === 0) {
		return (
			<Column fillWidth gap="xl" marginBottom="40" paddingX="l">
				<p>No related projects found.</p>
			</Column>
		);
	}

	return (
		<Column fillWidth gap="xl" marginBottom="40" paddingX="l">
			{displayedProjects.map((post, index) => (
				<ProjectCard
					priority={index < 2}
					key={post.slug}
					href={`/work/${post.slug}`}
					images={post.metadata.images || []}
					title={post.metadata.title || ''}
					description={post.metadata.summary || ''}
					content={post.content || ''}
					avatars={
						post.metadata.team?.map((member) => ({ src: member.avatar })) || []
					}
					link={post.metadata.link || ''}
				/>
			))}
		</Column>
	);
}
