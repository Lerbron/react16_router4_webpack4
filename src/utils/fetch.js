
const baseUrl = 'https://cnodejs.org';

const headers = {
	'Content-Type': 'application/json',
	'Access-Control-Allow-Methods': 'GET, POST, PUT',
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Headers': 'X-Requested-With'
};

export const get = function (url, body, resType = 'json') {
	let URL = baseUrl + url;
	return Promise.resolve(function () {
		return fetch(URL, {method: 'get'}).then(res => res[resType]())
	}())
};

export const post = (url, body, resType = 'json') => {
	return Promise.resolve(function () {
		return fetch(URL, {method: 'post', headers, body: JSON.stringify(body)})
	}())
};