angular.module('Elifoot').factory('Feeds', ['$http', function($http) {
  return {
    parseFeed : function() {
        return $http({
          url: 'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fwww.zerozero.pt%2Frss%2Fnoticias.php&api_key=nofxxwl7ye6chupoqfwqnjn5r7hrcsutldxywxae&order_by=pubDate&order_dir=desc&count=15',
          method: 'GET',
          dataType: 'json',
          callback: 'JSON_CALLBACK',
          data: {
              rss_url: 'http://www.zerozero.pt/rss/noticias.php',
              api_key: '0000000000000000000000000000000000000000', // put your api key here
              count: 1
            }
        });
    }
  };
}]);
