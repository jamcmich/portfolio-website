import React, { useState } from 'react';

import { images } from '../../constants';
import { AppWrap, MotionWrap } from '../../wrapper';
import { client } from '../../client';
import './Footer.scss';

const Footer = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	});
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);
	const [loading, setLoading] = useState(false);

	const { username, email, message } = formData;

	const handleChangeInput = (e) => {
		const { name, value } = e.target;

		let updateFormData = { ...formData, [name]: value };
		setFormData(updateFormData);
	};

	const handleSubmit = () => {
		setLoading(true);

		const contact = {
			_type: 'contact',
			name: formData.username,
			email: formData.email,
			message: formData.message,
		};

		client
			.create(contact)
			.then(() => {
				setLoading(false);
				setIsFormSubmitted(true);
			})
			.catch((err) => console.log(err));
	};

	return (
		<React.Fragment>
			<h2 className='head-text'>Come chat with me!</h2>

			<div className='app__footer-cards'>
				<div className='app__footer-card '>
					<img src={images.email} alt='email' />
					<a
						href='mailto:jacobmcmichael@gmail.com'
						className='p-text'
					>
						jacobmcmichael@gmail.com
					</a>
				</div>
				<div className='app__footer-card'>
					<img src={images.mobile} alt='phone' />
					<a href='tel:+1 (951) 760-3366' className='p-text'>
						+1 (951) 760-3366
					</a>
				</div>
			</div>

			{!isFormSubmitted ? (
				<div className='app__footer-form app__flex'>
					<div className='app__flex'>
						<input
							className='p-text'
							type='name'
							placeholder='Name'
							name='name'
							value={username}
							onChange={handleChangeInput}
						/>
					</div>
					<div className='app__flex'>
						<input
							className='p-text'
							type='email'
							placeholder='Email'
							name='email'
							value={email}
							onChange={handleChangeInput}
						/>
					</div>
					<div>
						<textarea
							className='p-text'
							placeholder='Message'
							value={message}
							name='message'
							onChange={handleChangeInput}
						/>
					</div>
					<button
						type='button'
						className='p-text'
						onClick={handleSubmit}
					>
						{!loading ? 'Send Message' : 'Sending...'}
					</button>
				</div>
			) : (
				<div>
					<h3 className='head-text'>
						Thank you for getting in touch!
					</h3>
				</div>
			)}
		</React.Fragment>
	);
};

export default AppWrap(
	MotionWrap(Footer, 'app__footer'),
	'contact',
	'app__whitebg'
);
