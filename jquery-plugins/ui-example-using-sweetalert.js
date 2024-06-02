const tblBlog = 'Tbl_Blog';
let  _blogId='';
runBlog();
function runBlog() {
    //createBlog('title', 'author', 'content');
    readBlog();
    //editBlog('442ef7ca-a8e7-40d8-b316-a39e1bb920ce');
    //editBlog('0');
    //  const id=prompt("Enter Id");
    //  deleteBlog(id);
    // const id = prompt("Enter Id");
    // const aut = prompt("Enater Auhtor name");
    // const tt = prompt("Enater title");
    // const ct = prompt("Enater content");
    // updateBlog(id, tt, aut, ct);
}
function readBlog() {
    $('#tbDataTable').html('');
    let lstBlog = getBlog();
    let htmlRow = '';
    for (let i = 0; i < lstBlog.length; i++) {
        const element = lstBlog[i];
        // console.log(element.Title);
        // console.log(element.Author);
        // console.log(element.Content);
        htmlRow += `
            <tr>
            <td>
                <button type="button" class="btn btn-warning" onclick="editBlog('${element.Id}')">Edit</button>
                <button type="button" class="btn btn-danger" onclick="deleteBlog('${element.Id}')">Delete</button>
            </td>
            <th scope="row">${i + 1}</th>
            <td>${element.Title}</td>
            <td>${element.Author}</td>
            <td>${element.Content}</td>
            </tr>`
    }
    console.log(htmlRow);
    $('#tbDataTable').html(htmlRow);
}
function editBlog(id) {
    let lstBlog = getBlog();
    let lst = lstBlog.filter(x => x.Id === id);
    if (lst.length === 0) {
        console.log("No data found");
        return;
    }
    let item = lst[0];
    console.log(item);
    $('#title').val(item.Title);
    $('#author').val(item.Author);
    $('#content').val(item.Content);
    _blogId=item.Id;

}
function createBlog(title, author, content) {
    let lstBlog = getBlog();
    const blog = {
        Id: uuidv4(),
        Title: title,
        Author: author,
        Content: content
    }
    lstBlog.push(blog);
    setLocalStorage(lstBlog);

}
function updateBlog(id, title, author, content) {
    let lstBlog = getBlog();
    let lst = lstBlog.filter(x => x.Id === id);
    if (lst === "") {
        console.log("No data found");
        return;
    }
    let index = lstBlog.findIndex(x => x.Id === id);
    lstBlog[index] = {
        Id: id,
        Author: author,
        Title: title,
        Content: content
    }
    setLocalStorage(lstBlog);

}
function deleteBlog(id) {
    Swal.fire({
        title: "Confirm",
        text: "Are you sure wamt to delete?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes"
      }).then((result) => {
        if (result.isConfirmed) {
            let lstBlog = getBlog();
            let lst = lstBlog.filter(x => x.Id == id);
            if (lst === "") {//lst.length===0
                console.log("No data found");
                return;
            }
            lstBlog = lstBlog.filter(x => x.Id !== id);
            setLocalStorage(lstBlog);
            successMessage("Delete successful!");
            readBlog();
        }
      });
    // let result=confirm('Are you sure wamt to delete');
    // if(!result) return;

    //     let lstBlog = getBlog();
    //     let lst = lstBlog.filter(x => x.Id == id);
    //     if (lst === "") {//lst.length===0
    //         console.log("No data found");
    //         return;
    //     }
    //     lstBlog = lstBlog.filter(x => x.Id !== id);
    //     setLocalStorage(lstBlog);
    //     readBlog();
    }
    

function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
}
function getBlog() {
    let blogStr = localStorage.getItem(tblBlog);
    let lstBlogs = [];
    if (blogStr != null) {
        lstBlogs = JSON.parse(blogStr);
    }
    return lstBlogs;
}
function setLocalStorage(blog) {
    let jsonStr = JSON.stringify(blog);
    localStorage.setItem(tblBlog, jsonStr)
}


$('#btnsave').click(function () {
    const title = $('#title').val();
    const author = $('#author').val();
    const content = $('#content').val();
    if(_blogId===''){
        createBlog(title, author, content);
        successMessage("Saving Successul");
       
    }else{
        updateBlog(_blogId,title,author,content);
        successMessage("Update successful!")
         _blogId='';
    }
   
    $('#title').val('');
    $('#author').val('');
    $('#content').val('');

    $('#title').focus();
    readBlog();
})
function successMessage(message){
    Swal.fire({
        title: "Success?",
        text: message,
        icon: "success"
        });
}

