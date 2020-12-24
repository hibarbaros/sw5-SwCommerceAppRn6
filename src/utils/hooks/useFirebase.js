import {useQuery} from 'react-query';
import {getReferenceFromFirebase} from '../actions/firebaseactions';

const getCollectionByCollectinName = async (collection) => {
  const data = await getReferenceFromFirebase(collection);
  return data;
};

export function useCollectionByCollectinName(collection) {
  return useQuery(['firebaseCollection', collection], () =>
    getCollectionByCollectinName(collection),
  );
}
