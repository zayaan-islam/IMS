import http from "../http-common";

class IdeaDataService {
  getAll() {
    return http.get("/ideas");
  }

  create(data) {
    return http.post("/ideas", data);
  }

  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }

  }


export default new IdeaDataService();