import http from "../http-common";

class IdeaDataService {
  getAll() {
    return http.get("/ideas");
  }

  create(data) {
    return http.post("/ideas", data);
  }


  }


export default new IdeaDataService();