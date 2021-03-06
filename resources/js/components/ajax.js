import Promise from 'es6-promise';

const ajax = (url, methodType, type = 'json') => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(methodType, url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    let response = xhr.responseText;
                    if (type === 'json') {
                        let responseJSON = JSON.parse(response);
                        resolve(responseJSON);
                    } else {
                        resolve(response);
                    }
                } else {
                    reject(xhr.status);
                }
            }
        };
    });
};

export default ajax;
