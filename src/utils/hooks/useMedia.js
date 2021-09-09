import { useQuery } from 'react-query';
import { mediaDetail } from '../actions/mediaactions';

const getMediaByMediaId = async (mediaId) => {
  const data = await mediaDetail(mediaId);
  return data;
};

export function useMediaByMediaId(mediaId) {
  return useQuery(['productMedia', mediaId], () => getMediaByMediaId(mediaId));
}
