/**
 * Класс ImageViewer
 * Используется для взаимодействием блоком изображений
 * */
class ImageViewer {
  constructor( element ) {
    this.element = element
    this.previewBlock = this.element.querySelector(".image");
    this.imageList = this.element.querySelector(".images-list .grid .row");
    this.registerEvents()
  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по изображению меняет класс активности у изображения
   * 2. Двойной клик по изображению отображает изображаения в блоке предпросмотра
   * 3. Клик по кнопке выделения всех изображений проверяет у всех ли изображений есть класс активности?
   * Добавляет или удаляет класс активности у всех изображений
   * 4. Клик по кнопке "Посмотреть загруженные файлы" открывает всплывающее окно просмотра загруженных файлов
   * 5. Клик по кнопке "Отправить на диск" открывает всплывающее окно для загрузки файлов
   */
  registerEvents(){
    // Одинарный клик
    this.imageList.addEventListener('click', (event) => {if (event.target.tagName.toLowerCase() === "img") {
      event.target.classList.toggle("selected")
      this.checkButtonText()
    }})
    // Двойной клик
    this.imageList.addEventListener('dblclick', (event) => {if (event.target.tagName.toLowerCase() === "img"){this.previewBlock.src = event.target.src}})

    // Выюрать все
    document.querySelector('.select-all').addEventListener('click', () => {

      const arrImg = Array.from(this.imageList.querySelectorAll('img'))
      if ( ImageViewer.anySelected(arrImg))
        arrImg.forEach(element => {element.classList.remove('selected')})
      else {  
        arrImg.forEach(element => {element.classList.add('selected')})
      }
      this.checkButtonText()

      
    
    })

    // Посмотреть загруженные файлы
    document.querySelector('.show-uploaded-files').addEventListener('click', () => {
      const modal = App.getModal('filePreviewer')
      document.querySelector(".uploaded-previewer-modal .content").innerHTML = '<i class="asterisk loading icon massive"></i>';
      modal.open();
      Yandex.getUploadedFiles(callback => {modal.showImages(callback)})
    })

    // Отправить на диск
    document.querySelector('.send').addEventListener('click', () => {
      const modal = App.getModal('fileUploader');
      const allImgSrc = Array.from(this.imageList.querySelectorAll(".selected")).map(el => el.src);
      modal.open()
      modal.showImages(allImgSrc)

    })
  }
      

  /**
   * Очищает отрисованные изображения
   */
  clear() {
    this.imageList.innerHTML = ''

  }

  /**
   * Отрисовывает изображения.
  */
  drawImages(images) {
    if (images.length > 0) {
      document.querySelector('.select-all').classList.remove('disabled')
    } else {
      document.querySelector('.select-all').classList.add('disabled')
    }

    images.forEach( image => {

      let pict = document.createElement('div')
      pict.classList.add('four', 'wide', 'column', 'ui', 'medium', 'image-wrapper');
      pict.innerHTML = `<img src="${image.url}" />`;
      document.querySelector(".images-list .grid .row").appendChild(pict)
      // this.imageList.appendChild(pict);
    })

  }

  /**
   * Контроллирует кнопки выделения всех изображений и отправки изображений на диск
   */
  checkButtonText(){
    const allImage = Array.from(this.imageList.querySelectorAll('img'))
    const allBtn = document.querySelector('.select-all')
    const sendBtn = document.querySelector('.send')
    allBtn.innerText = ImageViewer.allSelected(allImage) ? 'Снять выделение' : 'Выбрать всё'
    allBtn.innerText = ImageViewer.anySelected(allImage) ? 'Снять выделение' : 'Выбрать всё'
    ImageViewer.anySelected(allImage) ? sendBtn.classList.remove('disabled') : sendBtn.classList.add('disabled')
  }

  static anySelected(element) {
    for (let index = 0; index < element.length; index++) {
        if (element[index].classList.contains('selected')) {return true};
    }
    return false;
  }

  static allSelected(element) {
    for (let index = 0; index < element.length; index++) {
        if (!element[index].classList.contains('selected')) {return false};
    }
    return true;
  }

}