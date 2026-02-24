'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/pages/Navigation';
import Footer from '@/components/pages/Footer';

export default function ContactPage({ params }: { params: { lang: string } }) {
	const lang = params?.lang ?? 'en';
	const [showSuccess, setShowSuccess] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		message: ''
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Create mailto link with form data
		const mailtoLink = `mailto:felixfigurepm@gmail.com?subject=${encodeURIComponent(
			formData.subject || 'Contact Form Submission'
		)}&body=${encodeURIComponent(
			`Name: ${formData.name}\n` +
			`Email: ${formData.email}\n` +
			`Subject: ${formData.subject}\n\n` +
			`Message:\n${formData.message}`
		)}`;

		// Open email client
		window.location.href = mailtoLink;

		// Show success message
		setShowSuccess(true);

		// Reset form
		setFormData({
			name: '',
			email: '',
			subject: '',
			message: ''
		});

		// Hide success message after 3 seconds
		setTimeout(() => {
			setShowSuccess(false);
		}, 3000);
	};

	const closeSuccessMessage = () => {
		setShowSuccess(false);
	};

	return (
		<>
			<Navigation lang={lang} currentPage="contact" />
			<div className="contactWrapper">
				<div className="contactContainer">
					<div className="formContainer">
						<div className="leftContainer">
							<div className="leftInnerContainer">
								<h2>Email Us</h2>
								<p>
									If you have any questions, wish to have your content added/removed, or something else. Please
									do not hesitate to email me.
								</p>
								<br />
								<p>Feel free to email me but please allow some time for me to respond.</p>
							</div>
						</div>
						<div className="rightContainer">
							<div className="rightInnerContainer">
								{!showSuccess ? (
									<form id="contact-form" onSubmit={handleSubmit} className="contactForm">
										<h2 className="lgView">Contact</h2>
										<h2 className="smView">Let&apos;s Chat</h2>
										<p>* Required</p>
										<input
											type="text"
											name="name"
											id="name"
											placeholder="Name *"
											required
											value={formData.name}
											onChange={handleInputChange}
											className="formInput"
										/>
										<input
											type="email"
											name="email"
											id="email"
											placeholder="Email *"
											required
											value={formData.email}
											onChange={handleInputChange}
											className="formInput"
										/>
										<input
											type="text"
											name="subject"
											id="subject"
											placeholder="Subject"
											value={formData.subject}
											onChange={handleInputChange}
											className="formInput"
										/>
										<textarea
											rows={4}
											name="message"
											id="message"
											placeholder="Message"
											required
											value={formData.message}
											onChange={handleInputChange}
											className="formTextarea"
										></textarea>
										<button type="submit">Submit</button>
									</form>
								) : (
									<div className="successMessage show">
										<div className="successContent">
											<h3>✓ Message Sent!</h3>
											<p>Thank you for reaching out. Your message has been sent successfully.</p>
											<button onClick={closeSuccessMessage} className="closeBtn">
												Close
											</button>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>

			<Footer lang={lang} />
		</>
	);
}