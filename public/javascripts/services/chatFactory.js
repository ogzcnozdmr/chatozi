app.factory('chatFactory', ['$http', 'env', ($http, env) => {
    const getMessages = roomId => {
        return $http({
            url: env.SERVICE_URL + '/messages/list',
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