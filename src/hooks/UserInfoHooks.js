import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as userInfoActions from '../store/actions/userInfo';

export function useGetUserInfo() {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.authenticator.userId);
    const token = useSelector(state => state.authenticator.token);
    const fetchedUserInfo = useSelector(state => state.app.userInfo);

    useEffect(() => {
        dispatch(userInfoActions.getUserInfo(userId));
    }, []);

    return fetchedUserInfo;
}
