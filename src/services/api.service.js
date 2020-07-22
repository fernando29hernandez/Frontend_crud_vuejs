import http from "../http.conf";

class RegistroDataService {
  getAll() {
    return http.get("/");
  }

  create(data) {
    return http.post("/", data);
  }

  update(id, data) {
    return http.put(`/${id}`, data);
  }

  delete(id) {
    return http.delete(`/${id}`);
  }
}

export default new RegistroDataService();