
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("github-form")
  const userList = document.getElementById("user-list")
  const repoList = document.getElementById("repos-list")

  form.addEventListener("submit", (e) => {
    e.preventDefault()
    let userToSearch = e.target.firstElementChild.value
    fetch(`https://api.github.com/search/users?q=${userToSearch}`, {
      headers: {"Accept": "application/vnd.github.v3+json"}
    })
    .then(resp => resp.json())
    .then(data => {
      let users = data.items
      users.forEach(user => {
        let li = document.createElement("li")
        li.setAttribute("data-id",user.id)
        li.innerHTML += `
          <h4> ${user.login} <h4>
          <img src="${user.avatar_url}" />
          <a href="${user.url}"> ${user.url} </a>
        `
        userList.append(li)
      })
    })
  })

  userList.addEventListener("click", (e) => {
    if(e.target.tagName === "H4"){
      let targetId = e.target.parentElement.dataset.id
      fetch(`https://api.github.com/users/${e.target.innerText}/repos`, {
        headers: {"Accept": "application/vnd.github.v3+json"}
      })
      .then(resp => resp.json())
      .then(repos => {
        debugger
        repos.forEach(repo => {
          let li = document.createElement("li")
          li.setAttribute("data-repo-id",repo.id)
          li.innerHTML += `
            <div> Repo Name: ${repo.name} </div>
            <a href="${repo.url}"> ${repo.url} </a>
          `
          repoList.append(li)
        })
      })
    }
  })

})
