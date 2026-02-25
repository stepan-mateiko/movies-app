import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input } from '@/common';
import { useAppDispatch } from '@/store/hooks';
import { loginUserThunk } from '@/store/thunks';
import { createUser } from '@/services';
import { UserFormData, UserFormProps } from '@/types';
import { TEXT } from '@/constants/text-constants';
import { buildUserFormErrors } from '@/handlers/handlers';
import styles from './styles.module.scss';

export const UserForm: React.FC<UserFormProps> = ({ mode }) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [formData, setFormData] = useState<UserFormData>({
		name: '',
		email: '',
		password: '',
	});
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	const handleChange = (field: keyof UserFormData, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		setErrors((prev) => ({ ...prev, [field]: '' }));
	};

	const handleReset = () => {
		setFormData({ name: '', email: '', password: '' });
		setErrors({});
	};

	const validateFields = () => {
		const newErrors = buildUserFormErrors(mode, formData);
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!validateFields()) return;

		try {
			if (mode === 'login') {
				await dispatch(loginUserThunk({ email: formData.email!, password: formData.password! })).unwrap();
				navigate('/movies');
			} else {
				await createUser({ name: formData.name!, email: formData.email!, password: formData.password! });
				navigate('/login');
			}
		} catch (err: any) {
			alert(err.message || 'Something went wrong');
		}
	};

	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<h2>{mode === 'login' ? TEXT.USER_FORM.LOGIN : TEXT.USER_FORM.REGISTRATION}</h2>

			{mode === 'registration' && (
				<div className={styles.field}>
					<Input
						labelText={TEXT.USER_FORM.LABEL_NAME}
						placeholderText={TEXT.USER_FORM.PLACEHOLDER_NAME}
						value={formData.name || ''}
						onChange={(e) => handleChange('name', e.target.value)}
					/>
					{errors.name && <p className={styles.error}>{errors.name}</p>}
				</div>
			)}

			<div className={styles.field}>
				<Input
					labelText={TEXT.USER_FORM.LABEL_EMAIL}
					placeholderText={TEXT.USER_FORM.PLACEHOLDER_EMAIL}
					value={formData.email}
					onChange={(e) => handleChange('email', e.target.value)}
				/>
				{errors.email && <p className={styles.error}>{errors.email}</p>}
			</div>

			<div className={styles.field}>
				<Input
					labelText={TEXT.USER_FORM.LABEL_PASSWORD}
					type='password'
					placeholderText={
						mode === 'login' ? TEXT.USER_FORM.PLACEHOLDER_PASSWORD_LOGIN : TEXT.USER_FORM.PLACEHOLDER_PASSWORD_REG
					}
					value={formData.password}
					onChange={(e) => handleChange('password', e.target.value)}
				/>
				{errors.password && <p className={styles.error}>{errors.password}</p>}
			</div>

			<div className={styles.link}>
				{mode === 'login' ? (
					<p>
						{TEXT.USER_FORM.LINK_NO_ACCOUNT} <Link to='/registration'>{TEXT.USER_FORM.LINK_TO_REGISTRATION}</Link>
					</p>
				) : (
					<p>
						{TEXT.USER_FORM.LINK_ALREADY_REGISTERED} <Link to='/login'>{TEXT.USER_FORM.LINK_TO_LOGIN}</Link>
					</p>
				)}
			</div>

			<div className={styles.buttons}>
				<Button type='button' onClick={handleReset}>
					{TEXT.USER_FORM.BUTTON_RESET}
				</Button>
				<Button type='submit'>{mode === 'login' ? TEXT.USER_FORM.BUTTON_LOGIN : TEXT.USER_FORM.BUTTON_REGISTER}</Button>
			</div>
		</form>
	);
};
