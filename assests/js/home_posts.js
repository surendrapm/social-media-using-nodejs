//method to submit the form data for a new post using AJAX
function showNotyNotification(text, type = 'success', timeout = 3000) {
    new Noty({
        type: type,
        text: text,
        timeout: timeout
    }).show();
}

{
    let createPost = function(){
let newPostForm = $('#new-post-form');

newPostForm.submit(function(e){
    e.preventDefault();

    $.ajax({
        type:'post',
        url:'/posts/create',
        data:newPostForm.serialize(),
        success:function(data){
            let newPost=newPostDom(data.data.post);
            $('#post-list-container>ul').prepend(newPost)
            showNotyNotification('Post Published', 'success', 3000);
            deletePost($('.delete-post-button',newPost))
            new PostComments(data.data.post._id);
            // CHANGE :: enable the functionality of the toggle like button on the new post
            new ToggleLike($(' .toggle-like-button', newPost))       

        }, 


    
        error:function(error){
            console.log(error.responseText);
            showNotyNotification('Error creating post', 'error', 3000);
        }
        

    })
})

}

//method to create post in dom

let newPostDom = function(post){
    return $(`<li id="post- ${post._id }">
    <p>     
        
            
            <small>
                <a class="delete-post-button" href="/posts/destroy/${post._id }">X</a>
            </small>
           

        ${ post.content }
    <br>
     <small>
        ${post.user.name}
     </small>

     <br>
     <small>
         
             <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                 0 Likes
             </a>
         
     </small>


    </p>
    <div class="post-comments">
       
             <form id="post-${ post._id }-comments-form" action="/comments/create" method="POST">
                <input type="text" name="content" placeholder="Type here to add comment..." required>
                <input type="hidden" name="post" value="${post._id}"> 
                <input type="submit" value="Add comment">
             </form>


            <div class="post-comments-list">
                <ul id="post-comments-<${post._id}">
                   
                </ul>
            </div>
    </div>
</li>`)
}



//method to delete a post from DOM

let deletePost = function(deleteLink){
    $(deleteLink).click(function(e){
        e.preventDefault();
        $.ajax({
            type:'get',
            url:$(deleteLink).prop('href'),
            success:function(data){
                $(`#post-${data.data.post._id}`).remove();
                showNotyNotification('Post deleted successfully!','success',3000);
            },error:function(error){
                console.log(error,responseText)
            }
        })
    })
}

    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#posts-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }





createPost()
convertPostsToAjax();

}

//comments operations using AJAX








