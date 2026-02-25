import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { USER_ROLE, ROUTE_PATHS } from '@/constants/constants';
import { PrivateRouteProps } from '@/types';

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
	const role = useAppSelector((state) => state.user.role);

	if (role !== USER_ROLE.ADMIN) {
		return <Navigate to={ROUTE_PATHS.MOVIES} replace />;
	}

	return <>{children}</>;
};
