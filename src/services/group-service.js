import http from "../http-common";

class GroupDataService {
    getGroup(_id) {
        return http.get(`/group/viewGroup/${_id}`);
    }
}

export default new GroupDataService();