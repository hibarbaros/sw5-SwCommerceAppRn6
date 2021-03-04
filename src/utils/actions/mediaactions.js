import Api from '../api';

export async function mediaDetail(mediaId) {
  if (mediaId) {
    const response = await Api.get(`/media/${mediaId}`);
    if (response.data) {
      return response.data;
    } else {
      return null;
    }
  } else {
    return null;
  }
}
