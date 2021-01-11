app.factory('chatFactory', ['$http', ($http) => {
    const getMessages = roomId => {
        return $http({
            url: 'http://localhost:3000/messages/list',
            medhod: 'GET',
            params: {
                roomId
            }
        }).then(response => {
            return response.data;
        }, (err) => {
            console.err(err);
        });
    };
    return {
        getMessages
    };
}]);