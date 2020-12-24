import Api from '../api';
import storageHelper from '../../utils/storagehelper';

//TODO: normalize edilecek

export const customerRegister = async (values) => {
	const check = await customerCheck(values);
	if (!check) {
		return false;
	}
	const {
		email,
		password,
		firstname,
		lastname,
		salutation,
		newsletter,
		billingfirstname,
		billinglastname,
		billingsalutation,
		billingstreet,
		billingcity,
		billingstate,
		billingzipcode,
		billingcountry,
		shippingfirstname,
		shippinglastname,
		shippingsalutation,
		shippingstreet,
		shippingcity,
		shippingstate,
		shippingzipcode,
		shippingcountry,
		doubleOptinRegister,
		sendOptinMail,
	} = values;
	const billing = {
		firstname: billingfirstname,
		lastname: billinglastname,
		salutation: billingsalutation,
		street: billingstreet,
		state: billingstate,
		zipcode: billingzipcode,
		city: billingcity,
		country: billingcountry,
	};
	let shipping;
	if (!values.isShipping) {
		shipping = billing;
	} else {
		shipping = {
			firstname: shippingfirstname,
			lastname: shippinglastname,
			salutation: shippingsalutation,
			street: shippingstreet,
			state: shippingstate,
			zipcode: shippingzipcode,
			city: shippingcity,
			country: shippingcountry,
		};
	}
	const data = {
		email,
		password,
		firstname,
		lastname,
		salutation,
		newsletter,
		billing,
		shipping,
		doubleOptinRegister,
		sendOptinMail,
	};

	const formData = JSON.stringify({
		...data,
	});
	const response = await Api.post('/ConnectorCustomers', formData);
	return response;
};

export async function customerEdit(data) {
	const {customerId, values} = data;
	const formData = JSON.stringify({
		firstname: values.firstname,
		lastname: values.lastname,
		salutation: values.salutation,
		email: values.email,
	});
	const response = await Api.put(
		`/ConnectorCustomers/${customerId}`,
		formData
	);
	if (response.data.id > 0) {
		return true;
	} else {
		return false;
	}
}

export async function passwordEdit(data) {
	const {hashPassword} = data;

	const formData = JSON.stringify({
		firstname: 'test',
		hashPassword: hashPassword,
	});
	console.log(
		'🚀 ~ file: useractions.js ~ line 103 ~ passwordEdit ~ data',
		formData
	);
	const response = await Api.put(`/ConnectorCustomers/${data.id}`, formData);

	if (response.data.id > 0) {
		return true;
	} else {
		return false;
	}
}

export const customerCheck = async (values) => {
	const response = await Api.get(
		`/ConnectorCustomers?filter[email]=${values.email}`
	);
	return response.total === 0 ? values : false;
};

export async function checkUserForLogin(values) {
	const {email} = values;
	const response = await Api.get(
		`/ConnectorCustomers?filter[email]=${email}`
	);
	return response.data.length > 0 ? response.data[0] : false;
}

export const customerData = async (customerId) => {
	const user = await Api.get(`/ConnectorCustomers/${customerId}`);
	return user.data;
};

export async function setUserStorage(userID) {
	storageHelper._set('user', userID);
}

export function customerLogout() {
	storageHelper._remove('user');
}
