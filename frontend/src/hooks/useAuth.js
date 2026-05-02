import { useSelector, useDispatch } from 'react-redux';
import { 
  selectUser, 
  selectToken, 
  selectIsAuthenticated, 
  selectRole,
  logout as logoutAction
} from '@/store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/utils/constants';

/**
 * Custom hook to abstract Redux auth state and actions.
 */
export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const role = useSelector(selectRole);

  const logout = () => {
    dispatch(logoutAction());
    navigate(ROUTES.LOGIN);
  };

  return {
    user,
    token,
    isAuthenticated,
    role,
    logout,
    isAdmin: role === 'admin',
    isMentor: role === 'mentor',
    isStudent: role === 'student',
  };
};

export default useAuth;
