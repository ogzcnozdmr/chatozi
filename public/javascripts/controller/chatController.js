app.controller('chatController', ['$scope', 'chatFactory', ($scope, chatFactory) => {
    /**
     * Angular variables
     */
    $scope.onlineList = [];
    $scope.roomList = [];
    $scope.activeTab = 1;
    $scope.chatClicked = false;
    $scope.roomId = '';
    $scope.chatName = '';
    $scope.chatMessage = '';
    $scope.messages = [];

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
        socket.emit('newMessage', {
           message: $scope.message,
           roomId: $scope.roomId
        });
        $scope.message = '';
    };

    $scope.switchRoom = room => {
        $scope.chatName = room.name;
        $scope.roomId = room.id;
        $scope.chatClicked = true;
        chatFactory.getMessages(room.id).then(data => {
           $scope.messages[room.id] = data;
        });
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