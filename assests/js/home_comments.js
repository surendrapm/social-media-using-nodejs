//method to submit the form data for a commnets using AJAX
//method to submit the form data for a new post using AJAX
function showNotyNotification(text, type = 'success', timeout = 3000) {
    new Noty({
        type: type,
        text: text,
        timeout: timeout
    }).show();
}


 class PostComments{
   
    constructor(postId){
        this.postId=postId;
        this.postContainer = $(`#post-${postId}`) 
        this.postCommentForm  = $(`#post-${postId}-comments-form`);

        this.createComment(postId);

        let self = this;

        //call for existing copmmnets

        $('.delete-comment-button',this.postContainer).each(function(){
            self.deleteComment($(this));
        });
    } 
    
createComment(postId){
    let pself =this;
    this.newCommentForm.submit(function(e){
        e.preventDefault();
        let self = this;


        $.ajax({
            type:'post',
            url:'/comments/create',
            data:$(self).serialize(),
            success:function(data){
                let newComment = pself.newCommentDom(data.data.comment);
                $(`#post-comments-${postId}`).prepend(newComment)
                pself.deleteComment($('.delete-comment-button',newComment));
                showNotyNotification('comment published!', 'success', 3000);
                 // CHANGE :: enable the functionality of the toggle like button on the new comment
                 new ToggleLike($(' .toggle-like-button', newComment));
            },
            
            error:function(error){
                console.log(error.responseText)
            }
           })


    })
}





//method to create comments in DOM

 newCommentDom(comment){
    return $(`<li id="comment-${ comment._id }">
    <p>
        
        <small>
            <a class="delete-comment-button" href="/comments/destroy/${comment._id}">X</a>
        </small>
        
        ${comment.content}
        <br>
        <small>
            ${comment.user.name}
        </small>
        <small>
                            
        <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${comment._id}&type=Comment">
            0 Likes
        </a>
    
    </small>
    </p>    

</li>`);
}


deleteComment(deleteLink){
    $(deleteLink).click(function(e){
        e.preventDefault();

        $.ajax({
            type:'get',
            url:$(deleteLink).prop('href'),
            success:function(data){
                $(`#comment-${data.data.comment_id}`).remove();
                showNotyNotification('comment Deleted', 'success', 3000);

            },
            error:function(error){
                console.log(error.responseText);
            }
        });
    });
}



 }