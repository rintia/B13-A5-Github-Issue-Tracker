const loadIssue = () =>{
    url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
    fetch(url)
    .then(res => res.json())
    .then(data => displayIssues(data.data))
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
        <div class="py-4 rounded-lg space-y-2 h-full shadow-sm bg-base-100">
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
    issueContainer.append(issueCard)
    });
}

loadIssue()