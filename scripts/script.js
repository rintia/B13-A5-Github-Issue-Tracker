const loadIssue = () =>{
    url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
    fetch(url)
    .then(res => res.json())
    .then(data => displayIssues(data.data))
}

const displayIssues =(issues)=>{
    const issueContainer = document.getElementById('issue-container');
    issueContainer.innerHTML ='';

    issues.forEach(issue => {
        const issueCard = document.createElement('div');
        issueCard.innerHTML =`
        <div class="py-4 rounded-lg space-y-2 h-full shadow-sm bg-base-100">
        <h2 class="px-4 text-2xl font-semibold">${issue.title}</h2>
        <p class="px-4">${issue.description}</p>
        <div class="flex gap-1 px-4">
            <div class="badge border-red-400 badge-soft badge-error">Bug</div>
            <div class="badge border-yellow-500 badge-soft badge-warning">Help Wanted</div>
        </div>
        <hr class="my-4 text-gray-500 w-full">
            <p class="px-4 text-gray-400">${issue.author}</p>
            <p class="px-4 text-gray-400">${Date(issue.createdAt)} </p>
    </div>
        `
    issueContainer.append(issueCard)
    });
}

loadIssue()