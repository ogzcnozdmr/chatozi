app.factory('userFactory', ['$http', 'env', ($http, env) => {
    const getUser = () => {
        return $http({
            url: env.SERVICE_URL + '/getUser',
            medhod: 'GET'
        }).then(response => {
            return response.data;
        }, (err) => {
            console.err(err);
        });
    };
    return {
        getUser
    };
}]);