import { Service } from './service';

class GithubService extends Service {
    getRepositories(username) {
        return this.$axios.$get(`/users/${username}/repos`);
    }

    createFork() {
        return this.$axios.$post(`/repos/khylias/enquete-dev/forks`);
    }

    updateForkOnMainRepo(username) {
        return this.$axios.$post(`/repos/${username}/enquete-dev/merge-upstream`, {
            branch: 'master'
        })
    }

    async createBranche(username) {
        const refs = await this.$axios.$get(`/repos/${username}/enquete-dev/git/refs`);
        return this.$axios.$post(`/repos/${username}/enquete-dev/git/refs`, {
            ref: 'refs/heads/test',
            sha: refs.find(({ ref }) => ref === 'refs/heads/master').object.sha
        });
    }
}
export default new GithubService();