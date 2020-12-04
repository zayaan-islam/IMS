import http from "../http-common";

class IdeaDataService {
  getAll() {
    return http.get("/ideas");
  }

  create(data) {
    return http.post("/ideas", data);
  }

  findByTitle(title) {
    return http.get(`/ideas?title=${title}`);
  }

  get(id) {
    return http.get(`/ideas/${id}`);
  }

  }


export default new IdeaDataService();