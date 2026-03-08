const loadIssue = () =>{
    url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
    fetch(url)
    .then(res => res.json())
    .then(data => displayIssues(data.data))
}

const loadSingleIssue = async(id)=>{
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
    const res = await fetch(url)
    const json = await res.json()
    const issue = json.data;

    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML =`
              <h2 class="text-2xl font-bold">${issue.title}</h2>
                    <div class="flex gap-4 text-sm">
                        <div class="badge badge-success mr-4">${issue.status}</div>
                        <ul class="list-disc flex gap-6">
                            <li>Opened by ${issue.assignee}</li>
                            <li>${new Date(issue.updatedAt).toISOString().split('T')[0]}</li>
                        </ul>
                    </div>
                    ${createBadges(issue.labels)}
                    <p>${issue.description}</p>
                    <div class="bg-base-200 p-4 flex justify-between">
                        <div>
                            <h4 class="text-gray-700">Asignee:</h4>
                            <p class="font-semibold">${issue.assignee}</p>
                        </div>
                        <div>
                            <h4 class="text-gray-700">Priority:</h4>
                            <div class="badge border-yellow-500 badge-soft badge-warning">${issue.priority}</div>
                        </div>
                    </div>
    `

   document.getElementById('issue_details').showModal()

}



const createBadges = (arr) =>{
    const badge = arr.map(el => `<div class="badge border-yellow-500 badge-soft badge-warning">${el}</div>`);
    return badge.join(' ')
}

const displayIssues =(issues)=>{
    const issueContainer = document.getElementById('issue-container');
    issueContainer.innerHTML ='';

    issues.forEach(issue => {
        const issueCard = document.createElement('div');
        issueCard.innerHTML =`
        <div onclick="loadSingleIssue(${issue.id})" class="py-4 hover:cursor-pointer rounded-lg space-y-2 h-full shadow-sm bg-base-100">
        <div class='flex justify-between px-4'>
        <div>${issue.status == 'open' ? `<img src='./assets/Open-Status.png'/>` : `<img src="./assets/Closed- Status .png" alt="">` }</div>
        
        <div class="badge border-yellow-500 badge-soft badge-warning">${issue.priority}</div>
        </div>
        <h2 class="px-4 text-2xl font-semibold">${issue.title}</h2>
        <p class="px-4">${issue.description}</p>
        <div class="flex gap-1 px-4">
            ${createBadges(issue.labels)}
        </div>
        <hr class="my-4 text-gray-500 w-full">
          
          <div>
            <p class="px-4 text-gray-400">${issue.author}</p>
            <p class="px-4 text-gray-400">${new Date(issue.createdAt).toISOString().split('T')[0]} </p>
            </div>
          
    </div>
        `
    if(issue.status == 'open'){
        issueCard.classList.add('green-border')
    }
    else{
        issueCard.classList.add('purple-border')
    }
    issueContainer.append(issueCard)
    });
}

loadIssue();

const searchIssues =()=>{
    const searchInput = document.getElementById('search-issue').value;
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchInput}`)
    .then(res=> res.json())
    .then(search => displayIssues(search.data))
}

const loadCategory=(id)=>{
    const btnSelected = document.getElementById(id).innerText;
    const issueNumber = document.getElementById('issue-number')
    

     url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
    fetch(url)
    .then(res => res.json())
    .then(data =>{
        const allIssues = data.data;

        if(btnSelected === 'All'){
            issueNumber.innerText= allIssues.length;
            displayIssues(allIssues)
        }
        else if(btnSelected === 'Open'){
          const openIssues =  allIssues.filter(issue => issue.status == 'open')
          issueNumber.innerText = openIssues.length
          displayIssues(openIssues)
        }
        else if(btnSelected === 'Closed'){
          const closedIssues =  allIssues.filter(issue => issue.status == 'closed')
          issueNumber.innerText = closedIssues.length;
          displayIssues(closedIssues)
        }
    })
    
}