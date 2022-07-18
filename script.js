
const apiGit = async () => {

    const url = 'https://api.github.com/users'
    const appId = '183022'
    const clientId = 'Iv1.214b2e374ce4989f'
    const user = document.querySelector('.input').value

    const client = await fetch(`${url}/${user}?client_id=${clientId}&app_id=${appId}`)
    const clientRepos = await fetch(`${url}/${user}/repos?per_page=4&sort=created%20asc`)


    const response = await client.json()
    const responseRepos = await clientRepos.json()


    
    if(response.message !== undefined && responseRepos.message !== undefined) return

    return {response, responseRepos}

}

const loadGitDOM = (loadGit) => {

    document.querySelector('.perfil').innerHTML = '';

    if(loadGit.location === null || loadGit.bio === null){
        loadGit.location = ''
        loadGit.bio = ''
    }
    const div = document.createElement('div');
    div.setAttribute('class', 'container_perfil')
    div.innerHTML = `
        <div class="perfilImg">
            <img src="${loadGit.avatar_url}" alt="">
        </div>
        <div class="perfilLista">
            <p>${loadGit.login}</p>
            <span>I'm from <strong>${loadGit.location}</strong> </span>
            <span>${loadGit.bio}</span>
            <span>${loadGit.followers} followers ${loadGit.following} following</span>
            <a href="${loadGit.html_url}" target="_blank">View in github</a>
        </div>
    `
    document.querySelector('.perfil').appendChild(div)
}

const LoadReposDOM = (loadGit) => {

    document.querySelector('.repositorio').innerHTML = '';

    const div = loadGit.reduce((ac, loadRepo) =>  {
        const data = new Date(loadRepo.created_at)
        
        if(loadRepo.description === null){
            loadRepo.description = 'sem descriçao especiicada'
        } 

        if(loadRepo.language === null){
            loadRepo.language = 'sem linguagem especiicada'
        } 

        ac += `
        <div class="repositorioContainer">
            <p class="repositorioTitulo">${loadRepo.name}</p>
            <span class="repositorioInfo">${loadRepo.description}</span>
            <span class="repositorioLinguagem">${loadRepo.language}</span>
            <span class="repositorioData">${data.toLocaleDateString()}</span>
        </div>
        `
        return ac
    }, '')
    
    document.querySelector('.repositorio').innerHTML = div
}   

const searchGit = async () => {
    const loadGit = await apiGit()
    
    if(loadGit){
        loadGitDOM(loadGit.response)
        LoadReposDOM(loadGit.responseRepos)
        document.querySelector('.nada').classList.add('active')

    } else {
        document.querySelector('.semUsuario').classList.add('active')
    }
}

document.addEventListener('keypress', ({code}) => {
    if(code === 'Enter'){
        searchGit()
    } else {
        return false
    }
})



