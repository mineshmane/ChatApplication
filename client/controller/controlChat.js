

chatApp.controller('controlChat', function ($scope, SocketService, $state, chatService) {
    console.log(" chat controller in");

    $scope.message = '';
    $scope.allMessageArr = [];
    $scope.currUserName = localStorage.getItem('userName');
    $scope.currUser = localStorage.getItem('userId');
    $scope.token = localStorage.getItem('token')

    var token = $scope.token
    //console.log("token return $copen login ",token);
    if (token === null) {//if the tocken is null then go to login page
        $state.go('login');
    }
    try {
        SocketService.on('newMessageSingle', (message) => {
            //listening to the evnts
            console.log("in Socket serice on function message== ", message);
            
            if (localStorage.getItem('userId') == message.senderId || (localStorage.getItem('userId') == message.receiverId && localStorage.getItem('ruserId') == message.senderId)) {
                if ($scope.allMessageArr === undefined) {
                    $scope.allMessageArr = message;//assighning message to variable
                } else {
                    console.log(" array",$scope.message);
                    
                    $scope.allMessageArr.push(message);
                    console.log("arr", $scope.allMessageArr);

                }
            }
        })
    }
    catch (err) {
        console.log("error in finding message")
    }
    $scope.allUser = function () {
        console.log("get all users token inside " + token);
        chatService.allUser($scope, token);
    }
    $scope.allUser();
    $scope.person = function (userData) {//select person from list
        console.log(" userdata person ",userData);
        
        $scope.allMessageArr = '';

        localStorage.setItem('rusername', userData.firstname);//getting data from localstorage
        localStorage.setItem('ruserId', userData._id);
        $scope.receiverUserName = localStorage.getItem('rusername');
        $scope.getUserMessage();
    }
    //get all message
    $scope.getUserMessage = function () {
        console.log(" user msg called");
        chatService.getUserMessage($scope,token);
    }

    try {
        $scope.sendmessage = function () {//send message function
      
            
            var msg = {
                'senderId': localStorage.getItem('userId'),

                'receiverId': localStorage.getItem('ruserId'),

                'message': $scope.message
            };
            SocketService.emit('createMessage', msg);//emitting the message to the browser
           $scope.message = '';

        }
    }
    catch (err) {
        //handle the exception 
        console.log("error in sending message to the reciever")
    }

    try {
        $scope.logout = function () {
            localStorage.clear();
            $state.go('login')//return back to login page//change  /login
        }
    }
    catch (err) {
        //handle the exception
        console.log("error in logging out")
    }
});