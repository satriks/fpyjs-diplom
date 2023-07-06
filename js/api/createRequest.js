

/**
 * Основная функция для совершения запросов по Yandex API.
 * */
const createRequest = (options = {}) => {
    let urlParam = '?'
    if (options.data) {
        for (let param in options.data) {
            
            urlParam += param + '=' + options.data[param] + '&'
        }
        urlParam = urlParam.substring(0 , urlParam.length - 1)
    }
    const head = new Headers(options.headers);
    (async () =>{
    let response = await fetch(Yandex.HOST + options.url + urlParam, {
        method: options.method,
        headers: head, 
        })
    let result;
    if (response.status < 204) {
        try {
            result = await response.json()
        } catch (error) {
            console.log(error);
            result = null
        }
        return options.callback(result)
    }
    else if (response.status == 204){ return options.callback(null)}
    else {
        console.log(response)
        alert('Техгическая ошибка, попробуйте пойже')
    }

    })()

};
