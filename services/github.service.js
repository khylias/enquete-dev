import { Service } from './service';

class GithubService extends Service {
    getAccessToken(code) {
        return this.$axios.$post('https://github.com/login/oauth/access_token', {}, {
            params: {
                client_id: process.env.NUXT_ENV_API_GITHUB_CLIENT,
                client_secret: process.env.NUXT_ENV_API_GITHUB_SECRET,
                code,
            }
        })
    }

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