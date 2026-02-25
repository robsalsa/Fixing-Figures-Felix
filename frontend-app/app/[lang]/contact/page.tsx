'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/pages/Navigation';
import Footer from '@/components/pages/Footer';
import contactTranslations from '@/lib/translations/contact.json';

type ContactPageProps = {
	params: Promise<{ lang: string }>;
};

export default function ContactPage({ params }: ContactPageProps) {
	const { lang } = use(params);
	const t = contactTranslations[lang as keyof typeof contactTranslations] || contactTranslations.en;
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
							<h2>{t.emailUsTitle}</h2>
							<p>
								{t.emailUsDescription}
							</p>
							<br />
							<p>{t.emailUsNote}</p>
							</div>
						</div>
						<div className="rightContainer">
							<div className="rightInnerContainer">
								{!showSuccess ? (
									<form id="contact-form" onSubmit={handleSubmit} className="contactForm">
										<h2 className="lgView">Contact Us</h2>
										<h2 className="smView">{t.contactLargeView}</h2>
										<h2 className="smView">{t.contactSmallView}</h2>
										<p>{t.requiredNote}</p>
										<input
											type="text"
											name="name"
											id="name"
											placeholder={t.namePlaceholder}
											required
											value={formData.name}
											onChange={handleInputChange}
											className="formInput"
										/>
										<input
											type="email"
											name="email"
											id="email"
											placeholder={t.emailPlaceholder}
											required
											value={formData.email}
											onChange={handleInputChange}
											className="formInput"
										/>
										<input
											type="text"
											name="subject"
											id="subject"
											placeholder={t.subjectPlaceholder}
											value={formData.subject}
											onChange={handleInputChange}
											className="formInput"
										/>
										<textarea
											rows={4}
											name="message"
											id="message"
											placeholder={t.messagePlaceholder}
											required
											value={formData.message}
											onChange={handleInputChange}
											className="formTextarea"
										></textarea>
										<button type="submit">{t.submitButton}</button>
									</form>
								) : (
									<div className="successMessage show">
										<div className="successContent">
											<h3>✓ {t.successTitle}</h3>
											<p>{t.successMessage}</p>
											<button onClick={closeSuccessMessage} className="closeBtn">
												{t.closeButton}
												on
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