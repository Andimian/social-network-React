import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    headers: {"API-KEY": '5eeada43-9109-4af8-bf29-68976dcce322'},
    baseURL: `https://social-network.samuraijs.com/api/1.0/`

});


export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 5) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            });
    },
    folow(id) {
        return instance.post(`follow/${id}`)
    },
    unFolow(id) {
        return instance.delete(`follow/${id}`)
    },
    getProfile(userId) {
        return profileAPI.getProfile(userId);
    }
};


//Работа с профилем
export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`);
    },

    //в профиле статуса нет, статус надо запрашивтаь отдельно
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`);
    },
    //при обновлении передаётся объект
    updateStatus(text) {
        return instance.put(`profile/status`, {status: text})

    },
    savePhoto (photoFile) {
        const formdata = new FormData();
        formdata.append("image", photoFile);
        return instance.put(`profile/photo`, formdata, {headers: {"Content-Type": "multipart/form-data"}});
    },
    saveProfile (profile) {
        return instance.put(`profile`, profile);
    }
};


export const authAPI = {
    giveMe() {
        return instance.get(`auth/me`);
    },
    login (email, password, rememberMe = false) {
        return instance.post(`auth/login`, {email, password, rememberMe});
    },
    logout () {
        return instance.delete(`auth/login`);
    },

};

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`);
    }
};