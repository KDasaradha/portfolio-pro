/**
 * Represents a GitHub repository.
 */
export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null; // Allow null description
  html_url: string;
  language: string | null; // Allow null language
  stargazers_count: number;
  fork: boolean; // To filter out forks if needed
}

/**
 * Asynchronously retrieves a list of public GitHub repositories for a given username.
 * Filters out forked repositories.
 *
 * @param username The GitHub username.
 * @returns A promise that resolves to an array of GitHubRepo objects.
 * @throws Throws an error if the GitHub API request fails.
 */
export async function getGitHubRepos(username: string): Promise<GitHubRepo[]> {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Use environment variable for token
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    };
    if (GITHUB_TOKEN) {
      headers['Authorization'] = `token ${GITHUB_TOKEN}`;
    }

    const apiUrl = `https://api.github.com/users/${username}/repos?type=owner&sort=updated&per_page=100`; // Fetch more repos, sort by update

    try {
      const response = await fetch(apiUrl, { headers, next: { revalidate: 3600 } }); // Revalidate cache every hour

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({})); // Try to parse error, default to empty object
        console.error(`GitHub API Error (${response.status}): ${errorData.message || response.statusText}`);
        throw new Error(`Failed to fetch GitHub repositories for ${username}. Status: ${response.status}`);
      }

      const repos: GitHubRepo[] = await response.json();

      // Filter out forked repositories and return relevant fields
      return repos
        .filter(repo => !repo.fork)
        .map(({ id, name, description, html_url, language, stargazers_count, fork }) => ({
            id,
            name,
            description,
            html_url,
            language,
            stargazers_count,
            fork
        }));

    } catch (error) {
      console.error(`Error fetching GitHub repos for ${username}:`, error);
      // Return an empty array or re-throw, depending on desired behavior
      // For the AI flow, returning empty might be better than failing entirely
      // throw error; // Re-throw if you want the caller to handle it explicitly
      return []; // Return empty array on error
    }
}


/**
 * Represents GitHub user statistics.
 */
export interface GitHubUserStats {
  public_repos: number;
  followers: number;
  following: number;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
}

/**
 * Asynchronously retrieves GitHub user statistics for a given username.
 *
 * @param username The GitHub username.
 * @returns A promise that resolves to a GitHubUserStats object.
 * @throws Throws an error if the GitHub API request fails.
 */
export async function getGitHubUserStats(username: string): Promise<GitHubUserStats> {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const headers: HeadersInit = {
        'Accept': 'application/vnd.github.v3+json',
    };
    if (GITHUB_TOKEN) {
        headers['Authorization'] = `token ${GITHUB_TOKEN}`;
    }

    const apiUrl = `https://api.github.com/users/${username}`;

    try {
        const response = await fetch(apiUrl, { headers, next: { revalidate: 3600 } }); // Revalidate cache every hour

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error(`GitHub API Error (${response.status}): ${errorData.message || response.statusText}`);
            throw new Error(`Failed to fetch GitHub user stats for ${username}. Status: ${response.status}`);
        }

        const userData = await response.json();

        return {
            public_repos: userData.public_repos || 0,
            followers: userData.followers || 0,
            following: userData.following || 0,
            name: userData.name,
            bio: userData.bio,
            avatar_url: userData.avatar_url,
            html_url: userData.html_url,
        };
    } catch (error) {
        console.error(`Error fetching GitHub user stats for ${username}:`, error);
        // Return default stats or re-throw
        // throw error;
        return { // Return default/empty stats on error
            public_repos: 0,
            followers: 0,
            following: 0,
            name: null,
            bio: null,
            avatar_url: '',
            html_url: `https://github.com/${username}` // Default link
        };
    }
}
