
let data = null;

const escapeString = (string) => { 
const tagsToReplace = { 
'&': '&amp;', 
'<': '&lt;', 
'>': '&gt;' 
}; 

return string.replace(/[&<>]/g, function(tag) { 
return tagsToReplace[tag] || tag; 
}); 
} 

const createMainNewsItem = (item) => { 
return ` 
<article class="main-article"> 
<div class="main-article__image-container"> 
<img class="article-img main-article__image" src="${encodeURI(item.image)}" alt="Фото новости"> 
</div> 
<div class="main-article__content"> 
<span class="article-category">${escapeString(data.categories.find(({ id }) => item.category_id === id).name)}</span> 
<h2 class="main-article__title">${escapeString(item.title)}</h2> 
<p class="main-article__text">${escapeString(item.description)}</p> 
<span class="article-source main-article__caption">${escapeString(data.sources.find(({ id }) => item.source_id === id).name)}</span> 
</div> 
</article> 
`; 
} 

const createSmallNewsItem = (item) => { 
return ` 
<article class="small-article"> 
<h2 class="small-articlle__title">${escapeString(item.title)}</h2> 
<span class="article-date">${escapeString(new Date(item.date).toLocaleDateString('ru-RU', { month: 'long', day: 'numeric' }))}</span> 
<span class="article-source">${escapeString(data.sources.find(({ id }) => item.source_id === id).name)}</span> 
</article> 
`; 
} 




const renderNews = (categoryId) => {
  fetch('http://frontend.karpovcourses.net/api/v2/ru/news/' + (categoryId ? categoryId : ''))
    .then(response => response.json())
    .then((responseData) => {
    data = responseData;

    const mainNews = data.items.slice(0, 6); 
const mainNewsContainer = document.querySelector('.articles__big-column'); 

mainNews.forEach((item) => { 
const template = document.createElement('template'); 
template.innerHTML = createMainNewsItem(item); 
mainNewsContainer.appendChild(template.content); 
}) 

const smallNews = data.items.slice(3, 12); 
const smallNewsContainer = document.querySelector('.articles__small-column'); 

smallNews.forEach((item) => { 
const template = document.createElement('template'); 
template.innerHTML = createSmallNewsItem(item); 
smallNewsContainer.appendChild(template.content); 
})  
    })
}