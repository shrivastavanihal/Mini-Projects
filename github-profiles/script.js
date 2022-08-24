const API_URL = "https://api.github.com/users/";

let form = document.getElementById("form");
let search = document.getElementById("search");
let main = document.getElementById("main");

function getUser(username) {
  return axios
    .get(API_URL + username)
    .then(res => createCard(res))
    .catch(err => console.log(err));
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
            <li>${followers}<strong>Followers</strong></li>
            <li>${following}<strong>Following</strong></li>
            <li>${public_repos} <strong>Repos</strong></li>
          </ul>

          <div id="repos">
            <a href="#" class="repos">Repo 1</a>
            <a href="#" class="repos">Repo 2</a>
            <a href="#" class="repos">Repo 3</a>
          </div>
        </div>
      </div>
`;

  main.innerHTML = cardHTML;
}

form.addEventListener("submit", e => {
  e.preventDefault();

  const user = search.value;
  getUser(user);
});
