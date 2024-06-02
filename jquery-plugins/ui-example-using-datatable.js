const tblBlog = 'Tbl_Blog';
let _blogId = '';
runBlog();
function generatorData(rowCount){
    for (let i = 0; i < 100; i++) {
        let no = i + 1;
        createBlog('title' + no, 'author' + no, `content${no}`);
    
    }
}

function runBlog() {
    //createBlog('title', 'author', 'content');
    readBlog();

    // editBlog('442ef7ca-a8e7-40d8-b316-a39e1bb920ce');
    // editBlog('0');
    // //const id=prompt("Enter Id");
    // deleteBlog(id);
    // const id = prompt("Enter Id");
    // const aut = prompt("Enater Auhtor name");
    // const tt = prompt("Enater title");
    // const ct = prompt("Enater content");

    // updateBlog(id, tt, aut, ct);
}
function readBlog() {
    // Destroy the DataTable instance
//$('#dtable').DataTable().destroy();

if ( $.fn.DataTable.isDataTable('#dtable') ) {
    $('#dtable').DataTable().destroy();
  }
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
     //let table = new DataTable('#dtable'); own creating datable code
     new DataTable('#dtable');
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
    _blogId = item.Id;

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
    readBlog();

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
    readBlog();

}
function deleteBlog(id) {
    Notiflix.Confirm.show(
        'Confirm',
        'Are you sure want to delete?',
        'Yes',
        'No',
        function okCb() {
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
        },
        function cancelCb() {

        },
    );


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
    if (_blogId === '') {
        Notiflix.Loading.circle();
        setTimeout(() => {
            createBlog(title, author, content);
            Notiflix.Loading.remove();
            successMessage("Saving Successul");
            readBlog();
        }, 3000);
    }
    else {
        Notiflix.Loading.circle();
        setTimeout(() => {
            updateBlog(_blogId, title, author, content);
            Notiflix.Loading.remove();
            successMessage("Update successful!");
            readBlog();
            _blogId = '';
        }, 3000);
    }

    $('#title').val('');
    $('#author').val('');
    $('#content').val('');

    $('#title').focus();

})
function successMessage(message) {
    Notiflix.Notify.success(message);
}

