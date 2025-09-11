async function getRepos(username) {
    const response = await fetch(`https://api.github.com/users/${username}/repos`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })

    const data = await response.json()
    for (const item of data) {
        console.log(item.name)
    } 
}

getRepos("luismede")