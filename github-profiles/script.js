const API_URL = "https://api.github.com/users/";

function getUser(username) {
  return axios
    .get(API_URL + username)
    .then(res => console.log(res))
    .catch(err => console.log(err));
}

getUser("shrivastavanihal");
