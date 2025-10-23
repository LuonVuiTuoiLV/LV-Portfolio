'use client';

import { BlurFade } from '@/components/ui/blur-fade';
import { gallery } from '@/resources';
import { MasonryGrid, Media } from '@once-ui-system/core';

export default function GalleryView() {
	return (
		<MasonryGrid columns={2} s={{ columns: 1 }}>
			{gallery.images.map((image, index) => (
				<BlurFade
					key={index}
					delay={0.25 + index * 0.05}
					inView
					offset={6}
					direction="up"
				>
					<Media
						enlarge
						priority={index < 10}
						sizes="(max-width: 560px) 100vw, 50vw"
						radius="m"
						aspectRatio={
							image.orientation === 'horizontal' ? '16 / 9' : '3 / 4'
						}
						src={image.src}
						alt={image.alt}
					/>
				</BlurFade>
			))}
		</MasonryGrid>
	);
}
