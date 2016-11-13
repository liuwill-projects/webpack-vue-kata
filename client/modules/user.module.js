import * as querystring from 'querystring'
import Vue from 'vue'

export let userModule = {
    login: function(queryParam,next){
        // var urlParams = [];//new URLSearchParams();
        // urlParams.push("title=" + title)

        var resource = Vue.$resource('/api/user/{/id}');
        // Lambda写法
        resource.get(queryParam).then((response) => {
            // 响应成功回调
            // get status
            response.status;

            // get status text
            response.statusText;

            // get 'Expires' header
            response.headers.get('Expires');

            // set data on vm
            this.$set('someData', response.body);
        }, (response) => {
            // 响应错误回调
        });

        /*fetch('/api/user/', {
            method: 'POST',credentials: 'include',
            headers: { // headers: fetch事实标准中可以通过Header相关api进行设置
                'Content-Type': 'application/x-www-form-urlencoded' // default: 'application/json'
            },
            body: querystring.stringify(queryParam)
        }).then(function (res) {
            return res.json()
        }).then(function (jsonData) {
            next(jsonData)
        }).catch(function(ex) {
            console.log('parsing failed', ex)
        })*/
    },
    fetchUser:function(queryParam,callback){
        var url = '/api/user/login'
        var queryParam ={
            access_token: accessToken
        }

        var realQueryParam = {}
        Object.keys(queryParam).forEach(key => {
            let value = queryParam[key]

            realQueryParam[key] = value
        })

        Vue.$http.post("/api/user/login", queryParam)
        .then((response) => {
            // 响应成功回调
            // get status
            response.status;

            // get status text
            response.statusText;

            // get 'Expires' header
            response.headers.get('Expires');

            // set data on vm
            this.$set('someData', response.body);
        }, (response) => {
            // 响应错误回调
        });

        // fetch(url + "?" + querystring.stringify(realQueryParam), {
        //     method: 'GET',credentials: 'include'
        // }).then(function (res) {
        //     return res.json()
        // }).then(function (json) {
        //     callback(json)
        // }).catch(function(ex) {
        //     console.log('parsing failed', ex)
        // })
    }
}