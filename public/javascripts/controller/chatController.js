app.controller('chatController', ['$scope', 'chatFactory', 'userFactory', ($scope, chatFactory, userFactory) => {
    /**
     * initialization
     */
    function init(){
        userFactory.getUser().then(user => {
            $scope.user = user;
        });
    }
    init();
    /**
     * Angular variables
     */
    $scope.onlineList = [];
    $scope.roomList = [];
    $scope.activeTab = 1;
    $scope.chatClicked = false;
    $scope.loadingMessages = false;
    $scope.roomId = '';
    $scope.chatName = '';
    $scope.chatMessage = '';
    $scope.messages = [];

    $scope.user = {};

    /**
     * Socket event handling
     */
    const socket = io.connect("http://localhost:3000");
    socket.on('onlineList', (users) => {
        $scope.onlineList = users;
        $scope.$apply();
    });

    /**
     * Room event hangling
     */
    socket.on('roomList', rooms => {
        $scope.roomList = rooms;
        $scope.$apply();
    });

    $scope.newMessage = () => {
        if($scope.message.trim() !== ''){
            socket.emit('newMessage', {
                message: $scope.message,
                roomId: $scope.roomId
            });

            $scope.messages[$scope.roomId].push({
                userid: $scope.user._id,
                username: $scope.user.name,
                usersurname: $scope.user.surname,
                message: $scope.message
            });

            $scope.message = '';
        }
    };

    $scope.switchRoom = room => {
        $scope.chatName = room.name;
        $scope.roomId = room.id;

        $scope.chatClicked = true;

        if(!$scope.messages.hasOwnProperty(room.id)){
            $scope.loadingMessages = true;

            chatFactory.getMessages(room.id).then(data => {
                $scope.messages[room.id] = data;
                $scope.loadingMessages = false;
            });
        }

    };

    $scope.newRoom = () => {
        //let randomName = Math.random().toString(36).substring(7);
        let roomName = window.prompt("Enter room name");
        if(roomName !== '' && roomName !== null){
            socket.emit('newRoom', roomName);
        }
    };

    $scope.changeTab = tab => {
        $scope.activeTab = tab;
    };

}]);