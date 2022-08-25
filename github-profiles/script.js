const API_URL = "https://api.github.com/users/";

let form = document.getElementById("form");
let search = document.getElementById("search");
let main = document.getElementById("main");

function getUser(username) {
  return axios
    .get(API_URL + username)
    .then(res => createCard(res))
    .then(getRepos(username))
    .catch(err => {
      if (err.response.status == 404) {
        createErrorCard("User not exist");
      }
    });
}

function createErrorCard(message) {
  let errorHTML = `
    <div class="card">
        <h1>${message}</h1>
    </div>
    `;

  main.innerHTML = errorHTML;
}

function createCard(user) {
  let {
    avatar_url,
    login,
    followers,
    following,
    repos_url,
    html_url,
    bio,
    public_repos,
  } = user.data;
  const cardHTML = `<div class="card">
        <div>
          <img
            src="${avatar_url}"
            alt="user image"
            class="avatar"
          />
        </div>

        <div class="user-info">
          <h2>${login}</h2>
          <p>
            ${bio}
          </p>
          <ul>
            <li>${followers} <strong>Followers</strong></li>
            <li>${following} <strong>Following</strong></li>
            <li>${public_repos} <strong>Repos</strong></li>
          </ul>

          <div id="repos">
           
          </div>
        </div>
      </div>
`;
  main.innerHTML = cardHTML;
}

function getRepos(username) {
  return axios
    .get(API_URL + username + "/repos")
    .then(repos => addReposToCard(repos.data))
    .catch(_ => createErrorCard("Problem in fetching repos"));
}

function addReposToCard(repos) {
  const reposEl = document.getElementById("repos");
  repos.slice(0, 8).forEach(repo => {
    const repoEl = document.createElement("a");
    repoEl.classList.add("repo");
    repoEl.href = repo.html_url;
    repoEl.target = "_blank";
    repoEl.innerText = repo.name;
    reposEl.appendChild(repoEl);
  });
}

form.addEventListener("submit", e => {
  e.preventDefault();

  const user = search.value;
  getUser(user);
});
