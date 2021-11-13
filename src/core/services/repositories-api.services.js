import http from './http-commongithub'

class RepositoriesApiServices{
    get_repositories_by_username(username){
        return http.get(`/users/${username}/repos`);
    }
}
export default new RepositoriesApiServices();