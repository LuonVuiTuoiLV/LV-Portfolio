'use client';

import { mailchimp, newsletter, person } from '@/resources';
import emailjs from '@emailjs/browser';
import {
	Background,
	Button,
	Column,
	Heading,
	Input,
	opacity,
	Row,
	SpacingToken,
	Text,
} from '@once-ui-system/core';
import { useEffect, useRef, useState } from 'react';

export const Mailchimp: React.FC<React.ComponentProps<typeof Column>> = ({
	...flex
}) => {
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	const statusRef = useRef<HTMLParagraphElement>(null);
	const [emailjsReady, setEmailjsReady] = useState(false);

	useEffect(() => {
		try {
			emailjs.init('t-Zwtm-FnPm6N6n_I');
			setEmailjsReady(true);
		} catch (err) {
			console.error('EmailJS init error:', err);
		}
	}, []);

	if (newsletter.display === false) return null;

	const validateEmail = (value: string): boolean => {
		if (!value) return true;
		return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
	};

	const handleBlur = () => {
		if (!email) return;
		const ok = validateEmail(email);
		setError(ok ? '' : 'Please enter a valid email address.');
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!validateEmail(email)) {
			setError('Please enter a valid email address.');
			return;
		}

		if (!emailjsReady) {
			setError('Service not ready. Please try again later.');
			return;
		}

		setLoading(true);
		setError('');

		try {
			await emailjs.send('service_dxg64eb', 'template_64s95z8', {
				to_email: person.email,
				subscriber_email: email,
				subscriber_name: email.split('@')[0],
				timestamp: new Date().toLocaleString(),
			});

			await emailjs.send('service_dxg64eb', 'template_z58ipal', {
				to_email: email,
				newsletter_title: "Vu's Newsletter",
			});

			setSuccess(true);
			setEmail('');
			if (statusRef.current) {
				statusRef.current.textContent =
					'Successfully subscribed! Check your email.';
			}
			setTimeout(() => setSuccess(false), 4000);
		} catch (err: any) {
			const errorMsg = err?.text || err?.message || 'Unknown error';
			setError(`Failed: ${errorMsg}`);
			console.error('EmailJS error:', err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Column
			overflow="hidden"
			fillWidth
			padding="xl"
			radius="l"
			marginBottom="m"
			horizontal="center"
			align="center"
			background="surface"
			border="neutral-alpha-weak"
			{...flex}
		>
			<Background
				top="0"
				position="absolute"
				mask={{
					x: mailchimp.effects.mask.x,
					y: mailchimp.effects.mask.y,
					radius: mailchimp.effects.mask.radius,
					cursor: mailchimp.effects.mask.cursor,
				}}
				gradient={{
					display: mailchimp.effects.gradient.display,
					opacity: mailchimp.effects.gradient.opacity as opacity,
					x: mailchimp.effects.gradient.x,
					y: mailchimp.effects.gradient.y,
					width: mailchimp.effects.gradient.width,
					height: mailchimp.effects.gradient.height,
					tilt: mailchimp.effects.gradient.tilt,
					colorStart: mailchimp.effects.gradient.colorStart,
					colorEnd: mailchimp.effects.gradient.colorEnd,
				}}
				dots={{
					display: mailchimp.effects.dots.display,
					opacity: mailchimp.effects.dots.opacity as opacity,
					size: mailchimp.effects.dots.size as SpacingToken,
					color: mailchimp.effects.dots.color,
				}}
				grid={{
					display: mailchimp.effects.grid.display,
					opacity: mailchimp.effects.grid.opacity as opacity,
					color: mailchimp.effects.grid.color,
					width: mailchimp.effects.grid.width,
					height: mailchimp.effects.grid.height,
				}}
				lines={{
					display: mailchimp.effects.lines.display,
					opacity: mailchimp.effects.lines.opacity as opacity,
					size: mailchimp.effects.lines.size as SpacingToken,
					thickness: mailchimp.effects.lines.thickness,
					angle: mailchimp.effects.lines.angle,
					color: mailchimp.effects.lines.color,
				}}
			/>

			<Column maxWidth="xs" horizontal="center">
				<Heading marginBottom="s" variant="display-strong-xs">
					{newsletter.title}
				</Heading>
				<Text
					wrap="balance"
					marginBottom="l"
					variant="body-default-l"
					onBackground="neutral-weak"
				>
					{newsletter.description}
				</Text>
			</Column>

			<form
				style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
				onSubmit={handleSubmit}
				noValidate
			>
				<Row fillWidth maxWidth={24} s={{ direction: 'column' }} gap="8">
					<Input
						id="email-input"
						name="email"
						type="email"
						placeholder="Email"
						required
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
							if (error) setError('');
						}}
						onBlur={handleBlur}
						errorMessage={error}
						disabled={loading}
					/>

					<p ref={statusRef} aria-live="polite" className="sr-only"></p>

					<div className="clear">
						<Row height="48" vertical="center">
							<Button
								type="submit"
								size="m"
								fillWidth
								disabled={loading || success || !emailjsReady}
							>
								{loading
									? 'Subscribing...'
									: success
									? 'Subscribed!'
									: 'Subscribe'}
							</Button>
						</Row>
					</div>
				</Row>
			</form>
		</Column>
	);
};
