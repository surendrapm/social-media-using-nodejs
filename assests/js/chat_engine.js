class ChatEngine{
    constructor(chatBoxId,userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;


        this.socket = io.connect('http://localhost:5000');

        if(this.userEmail){
            this.connectionHnadler();
        }
    }

    connectionHnadler(){
        this.socket.on('connect',function(){
            console.log('connection establishment using sockets...!')
        })
    } 

}
