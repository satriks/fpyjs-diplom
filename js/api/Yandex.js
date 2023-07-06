/**
 * Класс Yandex
 * Используется для управления облаком.
 * Имеет свойство HOST
 * */
class Yandex {
  static HOST = 'https://cloud-api.yandex.net/v1/disk';

  /**
   * Метод формирования и сохранения токена для Yandex API
   */
  static getHeader() {
    return {
      'Authorization': `OAuth ${this.getToken()}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }
  static getToken(){
    let token = localStorage.getItem('tokenYA');
    if (!token ){
      token = prompt('Введите токен Yandex Disk')
      localStorage.setItem('tokenYA', token)
    }
    return token
  }

  /**
   * Метод загрузки файла в облако
   */
  static uploadFile(path, url, callback){
    url = url.replace(/&/g, '%26' )
    url = url.replace(/=/g, '%3D' )
    createRequest({
      method: 'POST',
      url:'/resources/upload',
      data: {path , url},
      headers: this.getHeader(),
      callback: callback 
    })
  }

  /**
   * Метод удаления файла из облака
   */
  static removeFile(path, callback){
    createRequest({
      method: 'DELETE',
      url:'/resources',
      data: {path},
      headers: this.getHeader(),
      callback: callback 
    })
  }

  /**
   * Метод получения всех загруженных файлов в облаке
   */
  static getUploadedFiles(callback){
    createRequest({
      method: 'GET',
      url:'/resources/files',
      headers: this.getHeader(),
      callback: callback 
    })
  }

  /**
   * Метод скачивания файлов
   */
  static downloadFileByUrl(url){
    let link = document.createElement('a');
    link.href = url;
    link.click(); 
  }
}
