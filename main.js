const form=document.querySelector(".bookmarkForm")
const siteName=document.querySelector("#siteNameInput")
const siteUrl=document.querySelector("#siteUrlInput")
const bookmarksList=document.querySelector("#bookmarksList")
let bookmarks=[]

document.addEventListener("DOMContentLoaded",()=>{
    if(localStorage.getItem("bookmarks")) bookmarks=JSON.parse(localStorage.getItem("bookmarks"))
    updateUI()
})

form.addEventListener('submit',(event)=>{
    event.preventDefault()
    const bookmark={
        id:Date.now(),
        siteName:siteName.value ,
        siteUrl:siteUrl.value
    }
    addBookmark(bookmark)
    console.log(bookmarks)
})

const addBookmark=(bookmark)=>{
    bookmarks.push(bookmark)
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks))
    updateUI()
}

const updateUI=()=>{
    if(!bookmarks){
        bookmarksList.innerHTML=`<p>You have no bookmarks</p>`
        return
    }

    bookmarksList.innerHTML='' //clears bookmarkslist
    bookmarks.forEach(bookmark=>{
        bookmarksList.innerHTML+=`
        <li>
        <p>${bookmark.siteName}</p>
        <a href="">${bookmark.siteUrl}</a>
        <div class="actionButtons">
            <button onclick="editBookmark(${bookmark.id})">Edit</button>
            <button onclick="deleteBookmark(${bookmark.id})">Delete</button>
        </div>
        </li>
        `
    })
}

const deleteBookmark=(id)=>{
    bookmarks=bookmarks.filter(bookmark=>bookmark.id!==id)
    updateUI()
}

const editBookmark=(id)=>{
    window.location.href=`/edit.html?id=${id}`
}