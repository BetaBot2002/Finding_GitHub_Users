// document.querySelector(".main-container").style.display = "none";
const getResultFromUrL = async () => {
    const username = document.getElementById("Search_Key");
    const name = document.getElementById("Full-name");
    const followings = document.getElementById("followings");
    const followers = document.getElementById("followers");
    const repository = document.getElementById("repository");
    const github_username = document.getElementById("github-username");
    const Content = document.getElementById("content");
    const linkUser=document.querySelector('.linkUser')
    // console.log(username.value);
    try {
        let GitHubAPI = `https://api.github.com/users/${username.value}`;
        let result = await fetch(GitHubAPI);
        data = await result.json();
        // console.log(data.avatar_url);
        document.querySelector("#Profile-img").src = `${data.avatar_url}`;
        if (data.name != null) {
            name.innerText = `${data.name}`;
        }else{
            name.innerText = " ";
        }
         
        linkUser.href=`${data.html_url}`;
        if (data.location != null) {
            // console.log("Enterred");
            const country = document.getElementById("country");
            document.getElementById("localdot").style.display = "inline-block";
            country.innerText = `${data.location}`;
        } else {
            document.getElementById("localdot").style.display = "none";
            country.innerText = "";
        }
        if (data.login != null) {
            github_username.innerText = `@${data.login}`;
        }
        followings.innerText = `${data.following}`;
        followers.innerText = `${data.followers}`;
        repository.innerText = `${data.public_repos}`;
        if (data.bio != null) {
            Content.innerText = `"${data.bio}"`;
        } else {
            Content.innerText = ``;
        }
        
        document.getElementById("repos").innerHTML = `<div id="repos"></div>`;
        getRepos(username.value);
        // console.log(data)
    } catch (err) {
        console.error(err);
    }
};

const createReposCard = (repos) => {
    const reposEl = document.getElementById('repos');
    repos
        .slice(0, 5)
        .forEach(repo => {
            const repoEl = document.createElement('a')
            repoEl.classList.add('repo')
            repoEl.href = repo.html_url
            repoEl.target = '_blank'
            repoEl.innerText = repo.name

            reposEl.appendChild(repoEl)
        })
    // setTimeout(function () {
    //     reposEl.style.display = "";
    // }, 1000);
    document.querySelector(".main-container").style.display = "block";
}

const getRepos = async (username) => {
    try {
        const Data = await fetch('https://api.github.com/users/' + username + '/repos?sort=created');
        let data = await Data.json();
        // console.log(data);
        // document.getElementById('repos').style.display = "none";
        createReposCard(data);
    } catch (error) {
        createErrCard('Cannot Find repositories');
    }
}

const createErrCard = (msg) => {
    const ErrorReport = document.getElementById('repos')
    ErrorReport.innerHTML = `
    <div class="repos">
    <h1>${msg}</h1>
    </div>
    `;
}

// let Search_Key = document.getElementById("Search_Key");
// Search_Key.addEventListener('keypress', (e) => {
//     console.log(e);
// });

document.addEventListener('keydown', function (event) {
    // console.log(event);
    if (event.keyCode == 13) {
        getResultFromUrL();
    }
})
