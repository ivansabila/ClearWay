const uploadButton = document.querySelector(".upload")

uploadButton.onchange = () => {
    let reader = new FileReader();
    reader.readAsDataURL(uploadButton.files[0])
    console.log("🚀 ~ uploadButton.files[0]:", uploadButton.files[0])
}
