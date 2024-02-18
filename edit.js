const form=document.querySelector(".bookmarkForm")
const siteName=document.querySelector("#siteNameInput")
const siteUrl=document.querySelector("#siteUrlInput")
let bookmarks=[]
let urlParams=new URLSearchParams(window.location.search)

document.addEventListener("DOMContentLoaded",()=>{
    bookmarks=JSON.parse(localStorage.getItem("bookmarks"))
    let targetBookmark=bookmarks.find(bookmark=>bookmark.id===parseInt(urlParams.get("id")))
    siteName.value=targetBookmark.siteName
    siteUrl.value=targetBookmark.siteUrl
})

form.addEventListener('submit',(event)=>{
    event.preventDefault()
   
    //Using Array.forEach()
    
    /*
    
    let updatedBookmarks=[]
    bookmarks.forEach(bookmark=>{
        if(bookmark.id===parseInt(urlParams.get("id"))){
            let updatedBookmark=bookmark
            updatedBookmark.siteName=siteName.value
            updatedBookmark.siteUrl=siteUrl.value
            updatedBookmarks.push(updatedBookmark)
            return
        }
        updatedBookmarks.push(bookmark)
    })
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks))

    */
    //The more efficient solution using Array.map()

    bookmarks=bookmarks.map(bookmark=>{
        if(bookmark.id===parseInt(urlParams.get("id"))){
            return {...bookmark,siteName:siteName.value,siteUrl:siteUrl.value} //here we used a spread operator (...) to modify the contents of the bookmark before returning it
        }
        return bookmark
    })

    localStorage.setItem("bookmarks",JSON.stringify(bookmarks))
    window.location.href="/"
})