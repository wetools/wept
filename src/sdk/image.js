
export default function (src) {
  let img = document.createElement('img')
  img.src = src
  if (img.complete) return Promise.resolve(imgDimension(img))
  return new Promise((resolve, reject) => {
    img.onload = function () {
      resolve(imgDimension(img))
    }
    img.onerror = function (e) {
      reject(e)
    }
  })
}

function imgDimension(image) {
  if (image.naturalWidth) {
    return {
      height: image.naturalHeight,
      width: image.naturalWidth
    }
  } else {
    let i = new Image()
    i.src = image.currentSrc || image.src;
    return {
      height: i.height,
      width: i.width
    }
  }
}
