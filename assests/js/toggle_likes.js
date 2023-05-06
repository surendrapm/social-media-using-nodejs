// change :: create a class to toggle likes when a link is cliked, using AJAX
class ToggleLike{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleLike();
    }

    toggleLike(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self = this;
            console.log($(self).attr('href'))
            //this is a new way of writing ajax which you mit , it looks like the same as promises
            $.ajax({
                type:'POST',
                url: $(self).attr('href'),
            })
            .done(function(data){
                let likesCount = parseInt($(self).attr('data-likes'));
                console.log(likesCount);
                if(data.data.deleted == true){
                    likesCount -=1
                }else{
                    likesCount +=1
                }

            $(self).attr('data-likes',likesCount);
            $(self).html(`${likesCount}Likes`);

            })
            .fail(function(errdata){
                console.log('error in completing the request')
            })
        })
    }


}