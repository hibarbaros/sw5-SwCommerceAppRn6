import {useFocusEffect} from '@react-navigation/native';

export const useRefetchOnFocus = (refetch) => {
	useFocusEffect(() => {
		refetch();
	});
};
