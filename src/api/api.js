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
        return instance.get(`profile/${userId}`);
    }
}

export const authAPI = {
    giveMe() {
        return instance.get(`auth/me`);
    }
}
