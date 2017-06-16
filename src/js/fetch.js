import 'whatwg-fetch';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

const fetchJSON = function(dataSrc) {
  fetch(dataSrc)
  .then(checkStatus)
  .then(parseJSON)
  .then(function(data) {
    console.log(data.length); // 3
    console.dir(data);
    for (var i in data) {
      console.log(data[i].commit.message + " " + data[i].commit.committer.date +
        " " + data[i].author.login +
        " " + data[i].sha); 
      // {{ sha.slice(0, 7) }}
      // added prism activate on grid/list toggle 2017-06-14T21:31:20Z
    }
  }).catch(function(error) {
    console.log('request failed', error);
  });
};

export {fetchJSON};

