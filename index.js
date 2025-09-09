async function getRepos(username) {
    const response = fetch(`https://api.github.com/users/${username}/repos`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
} 