/**
 * Класс FileUploaderModal
 * Используется как всплывающее окно для загрузки изображений
 */
class FileUploaderModal extends BaseModal {
  constructor( element ) {
    super(element);
    this.uploaderWindow = document.querySelector(".file-uploader-modal");
    this.contenContainer = this.domElement.querySelector(".content");
    this.closeButton = this.domElement.querySelector(".close");
    this.sendAllButton = this.domElement.querySelector(".send-all");
    this.registerEvents()
  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по крестику на всплывающем окне, закрывает его
   * 2. Клик по кнопке "Закрыть" на всплывающем окне, закрывает его
   * 3. Клик по кнопке "Отправить все файлы" на всплывающем окне, вызывает метод sendAllImages
   * 4. Клик по кнопке загрузке по контроллерам изображения: 
   * убирает ошибку, если клик был по полю вода
   * отправляет одно изображение, если клик был по кнопке отправки
   */
  registerEvents(){
    this.uploaderWindow.querySelector('.x').addEventListener('click', () => {this.close();})
    this.closeButton.addEventListener('click',() => {this.close()});
    this.sendAllButton.addEventListener('click', this.sendAllImages.bind(this));
    this.contenContainer.addEventListener('click', (event) => {

      if (event.target === this.contenContainer.querySelector('input')) {
        if (this.contenContainer.classList.contains("error")) {
          this.contenContainer.classList.remove("error");
        }
      }

      if (event.target.classList.contains("button") || event.target.classList.contains("upload")) {
        this.sendImage(event.target.closest(".image-preview-container"))
      }
    })


  }

  /**
   * Отображает все полученные изображения в теле всплывающего окна
   */
  showImages(images) {
    let imagesList = []
    images.reverse()
    images.forEach(el => {imagesList.push(this.getImageHTML(el))});
    this.contenContainer.innerHTML = imagesList.join('');
  }

  /**
   * Формирует HTML разметку с изображением, полем ввода для имени файла и кнопкной загрузки
   */
  getImageHTML(item) {
    return `<div class="image-preview-container">
                <img src='${item}' />
                <div class="ui action input">
                    <input type="text" placeholder="Путь к файлу">
                    <button class="ui button"><i class="upload icon"></i></button>
                </div>
            </div>`;
  }

  /**
   * Отправляет все изображения в облако
   */
  sendAllImages() {
    Array.from(this.contenContainer.querySelectorAll(".image-preview-container")).forEach(el => this.sendImage(el))
  }

  /**
   * Валидирует изображение и отправляет его на сервер
   */
  sendImage(imageContainer) {
    const path = imageContainer.querySelector('input').value.trim()
    const url = imageContainer.querySelector('img').src
    if (path){

      imageContainer.querySelector(".input").classList.add("disabled");
      Yandex.uploadFile(path, url, () => {
        imageContainer.remove();
        if (this.contenContainer.children.length < 1) {this.close()}
      })
    
    } else {imageContainer.querySelector('.input').classList.add('error') }

  } 
}