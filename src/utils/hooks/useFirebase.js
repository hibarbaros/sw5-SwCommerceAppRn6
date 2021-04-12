import {useQuery} from 'react-query';
import {getReferenceFromFirebase} from '../actions/firebaseactions';

const getCollectionByCollectinName = async (collection, doc) => {
  const data = await getReferenceFromFirebase(collection, doc);
  return data;
};

export function useCollectionByCollectinName(collection, doc) {
  return useQuery(['firebaseCollection', collection, doc], () =>
    getCollectionByCollectinName(collection, doc),
  );
}
