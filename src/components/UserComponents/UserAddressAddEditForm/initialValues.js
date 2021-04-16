export const initialValues = {
  firstname: (userAddress) => (userAddress ? userAddress.firstname : ''),
  lastname: (userAddress) => (userAddress ? userAddress.lastname : ''),
  salutation: (userAddress) => (userAddress ? userAddress.salutation : ''),
  street: (userAddress) => (userAddress ? userAddress.street : ''),
  zipcode: (userAddress) => (userAddress ? userAddress.zipcode : ''),
  city: (userAddress) => (userAddress ? userAddress.city : ''),
  state: (userAddress) => (userAddress ? userAddress.state : ''),
  country: (countryId) => (countryId ? parseFloat(countryId) : 0),
};
