var movieLinks = document.querySelectorAll('a');
var movies = document.querySelectorAll('section');

movieLinks.forEach(function (movieLink, index) {
    movieLink.addEventListener('mouseover', function () {
        movies[index].classList.add('is-visible');
    });
});

movieLinks.forEach(function (movieLink) {
    movieLink.addEventListener('mouseout', function () {
        movies.forEach(function (movie) {
            movie.classList.remove('is-visible');
        });
    });
});


/* ROUTING AND PAGE TRANSITIONS */

var html = document.querySelector('html');
var cache = {};

document.addEventListener('click', function (e) {
    var el = e.target;

    while (el && !el.href) {
        el = el.parentNode;
    }

    if (el) {
        e.preventDefault();
        history.pushState(null, null, el.href);
        changePage();

        return;
    }
});

window.addEventListener('popstate', changePage);

function loadPage(url) {
    if (cache[url]) {
        return new Promise(function (resolve) {
            resolve(cache[url]);
        });
    }

    return fetch(url, {
        method: 'GET'
    }).then(function (response) {
        cache[url] = response.text();
        return cache[url];
    });
}

function changePage() {
    var url = window.location.href;

    loadPage(url).then(function (responseText) {
        var response = document.createElement('html');
        response.innerHTML = responseText;

        var newHead = document.createElement('head');
        newHead = response.querySelector('head');

        var newBody = document.createElement('body');
        newBody = response.querySelector('body');

        var oldHead = document.querySelector('head');
        var oldBody = document.querySelector('body');

        html.appendChild(newHead);
        html.appendChild(newBody);

        oldHead.remove();
        oldBody.remove();

        // Reload JavaScript
        //var scriptSrc = newBody.querySelector('script').src;
        //newBody.querySelector('script').remove();
        //var newScript = document.createElement('script');
        //newScript.src = scriptSrc;
        //newBody.appendChild(newScript);
    });
}
