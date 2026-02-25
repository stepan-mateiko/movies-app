import type React from 'react';

export declare interface Movie {
	id: number;
	title: string;
	vote_average: number;
	release_date: string;
	poster_path: string;
	overview: string;
	genres: string[];
	runtime: number;
	tagline?: string;
	vote_count?: number;
	budget?: number;
	revenue?: number;
}

export declare interface User {
  name: string;
  email: string;
  role: 'user' | 'admin';
  token: string;
  isAuth: boolean;
  error: null | string;
}

export declare interface RegistrationData {
	name: string;
	email: string;
	password: string;
	role: 'user' | 'admin';
}

export declare interface PrivateRouteProps {
	children: React.ReactNode;
}

export declare interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	variant?: 'primary' | 'secondary' | 'danger';
	fullWidth?: boolean;
	className?: string;
}

export declare interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	placeholderText: string;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
	labelText: string;
	value: string;
	id?: string;
	name?: string;
}

export declare interface ModalProps {
	children: React.ReactNode;
	onClose?: () => void;
}

export declare interface LoaderProps {
	message?: string;
}

export declare interface ErrorProps {
	message?: string;
}

export declare interface MovieTileProps {
	id: number;
	title: string;
	release_date: string;
	poster_path: string;
	genres: string[];
	onDelete?: () => void;
}

export declare interface MoviesState {
	list: Movie[];
	loading: boolean;
	error: null | string;
}

export declare interface MovieFormData {
	id?: number;
	title: string;
	poster_path: string;
	genres: string[];
	overview: string;
	release_date: string;
	vote_average: number;
	runtime: number;
}

export declare interface PanelProps {
	movies: Movie[];
}

export declare interface UserFormProps {
	mode: 'login' | 'registration';
}

export declare interface UserFormData {
	name?: string;
	email: string;
	password: string;
}

