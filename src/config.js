
export const baseUrl = 'https://api.pethos.app/';
export const SECRET_KEY = 'sadas@!$@#%!^#!GSDGETWT@#OI%J@#%!*#)^U#)^U!@)U';
// api url
//user
export const authUser='api/v1/user/authUser';
export const getUser='api/v1/user/getUser/';
export const deleteUser='api/v1/user/deleteUser/';
export const updateUser='api/v1/user/updateUser/';
export const getToken='api/v1/user/getToken/';
export const changeMobileNumber='api/v1/user/changeMobileNumber/';
//upload & delete file
export const upload='api/v1/user/upload';
export const deleteFile='api/v1/user/deleteFile';
//slider
export const getAllSlider='api/v1/user/getAllSlider';
//faq
export const getAllFaq='api/v1/user/getAllFaq';
//ContactUs
export const registerContactUs='api/v1/user/registerContactUs';
//Subscription
export const registerSubscription='api/v1/user/registerSubscription';
//news
export const getAllNews='api/v1/user/getAllNews';
export const getNews='api/v1/user/getNews/';
export const getLatestNews='api/v1/user/getLatestNews';
//property
export const registerProperty='api/v1/user/registerProperty';
export const updateProperty='api/v1/user/updateProperty/';
export const deleteProperty='api/v1/user/deleteProperty/';
export const getAllProperty='api/v1/user/getAllProperty';
export const getProperty='api/v1/user/getProperty/';
export const newestProperty='api/v1/user/newestProperty';
//propertyType & SubpropertyType
export const getAllPropertyType='api/v1/user/getAllPropertyType';
export const getAllSubPropertyType='api/v1/user/getAllSubPropertyType';
//request visit
export const registerRequestVisit='api/v1/user/registerRequestVisit';
export const updateRequestVisit='api/v1/user/updateRequestVisit/';
export const deleteRequestVisit='api/v1/user/deleteRequestVisit/';
export const getAllRequestVisitByUser='api/v1/user/getAllRequestVisitByUser/';
export const getRequestVisit='api/v1/user/getRequestVisit/';
//request property
export const getRequestProperty='api/v1/user/getRequestProperty/';
export const getAllRequestPropertyByUser='api/v1/user/getAllRequestPropertyByUser/';
export const deleteRequestProperty='api/v1/user/deleteRequestProperty/';
export const updateRequestProperty='api/v1/user/updateRequestProperty/';
export const registerRequestProperty='api/v1/user/registerRequestProperty';
/*
getTokenSms() {
    let data = {
        UserApiKey: 'f2a1c337366e0cd3ddffc337',
        SecretKey: 'it66)%#teBC!@*&'
    };
    return this.axios.post('https://RestfulSms.com/api/Token', data);
}

sendSms(data, token) {
    const headers = {
        'content-type': 'application/json',
        'x-sms-ir-secure-token': token
    }
    return this.axios.post('https://RestfulSms.com/api/UltraFastSend', data, { 'headers': headers });
}
*/