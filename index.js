var isOpen = false
var isImage = false;
var isForm = false;
var isButton = false;

function openSideBar() {
    document.getElementById('menu').style.display = "none";
    document.getElementById('components').style.display = "block"
}

function closeSideBar() {
    const menu = document.getElementById('menu')
    document.getElementById('components').style.display = "none";
    menu.style.display = "block"
    menu.addEventListener('click', () => {
        menu.style.display = "none"
        document.getElementById('components').style.display = "block"
    })

    document.querySelector('body').insertBefore(menu,document.querySelector('body').firstChild)

}

function dragStart(e) {
  e.dataTransfer.setData("text", e.target.id);
}

function dropHandler (e) {
    e.preventDefault();
    console.log(e)
    const id = e.dataTransfer.getData("text");
    const ele = document.getElementById(id)
    // ele.style.width = "fit-content"
    ele.style.position = "absolute"
    ele.style.top = e.clientY +'px';
    ele.style.left = e.clientX +'px';
}

function dragOverHandler(ev) {
    ev.preventDefault()
}

function textForm() {
    if(isOpen) {
        return;
    }

    const div = document.createElement('div');
    const sizeDiv = document.createElement('div')
    const sizeInp = document.createElement('input');
    const sizeSpan = document.createElement('div')
    const colorDiv = document.createElement('div');
    const colorInp = document.createElement('input');
    const colorSpan = document.createElement('div');
    const textDiv = document.createElement('div');
    const textInp = document.createElement('input');
    const textSpan = document.createElement('div');
    const buttonElement = document.createElement('button');
    const closeIcon = document.createElement('div');

    closeIcon.innerHTML = "&#10006;"
    closeIcon.style.float = "right"
    closeIcon.style.display = "inline-block"
    closeIcon.style.cursor = "pointer"
    closeIcon.addEventListener('click',() => {
        closeIcon.parentNode.parentNode.removeChild(closeIcon.parentNode);
        isOpen = !isOpen
    })

    buttonElement.innerHTML = "create"
    buttonElement.id = "textCreate"
    buttonElement.addEventListener('click', () => {
        const text = document.getElementById('textInput').value;
        const size = document.getElementById('sizeInput').value;
        const color = document.getElementById('colorInput').value;
        const sideBarDiv = document.createElement('div');
        const sideBarSpan = document.createElement('span');
        const sideBarEditIcon = document.createElement('div');
        const sideBarClose = document.createElement('div');
        const Icons = document.createElement('div');
        
        sideBarSpan.innerHTML = text;
        sideBarEditIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:1vw"><path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" /></svg>'
        sideBarClose.innerHTML = "&#10006;"
        sideBarDiv.appendChild(sideBarSpan);
        Icons.appendChild(sideBarEditIcon);
        Icons.appendChild(sideBarClose);
        Icons.style.display = "flex";
        Icons.style.alignItems = "center"
        Icons.style.gap = ".5vw"
        sideBarDiv.appendChild(Icons)
        sideBarDiv.className = "sideBarText"
        
        
        const div = document.createElement('div');
        div.id = "output"+Date.now();
        div.draggable = true
        div.innerHTML = text;
        div.style.fontSize = size;
        div.style.color = color;
        div.setAttribute("ondragstart" , "dragStart(event)")
        
        sideBarClose.addEventListener('click', () => {
            document.getElementById(div.id).parentNode.removeChild(document.getElementById(div.id))
            sideBarClose.parentNode.parentNode.parentNode.removeChild(sideBarClose.parentNode.parentNode)
        })
        sideBarEditIcon.addEventListener('click' , () => {
            sideBarSpan.innerHTML = ''
            const textinpfield = document.createElement('input')
            const coloreditfield = document.createElement('input')
            const sizeinpfield = document.createElement('input');
            const btn = document.createElement('button')
            btn.innerHTML = "edit"
            btn.className = "editButtons"

            sideBarSpan.appendChild(textinpfield);
            sideBarSpan.appendChild(coloreditfield);
            sideBarSpan.appendChild(sizeinpfield);
            sideBarSpan.appendChild(btn);

            coloreditfield.defaultValue = color
            textinpfield.defaultValue = text
            sizeinpfield.defaultValue = size;
            Icons.style.display = "none"
            
            btn.addEventListener('click', () => {
                sideBarSpan.innerHTML = textinpfield.value;
                div.innerHTML = textinpfield.value
                div.style.fontSize = sizeinpfield.value + 'px';
                div.style.color = coloreditfield.value;
                
                Icons.style.display = "flex"
            });

        })
        
        document.getElementById('textOutput').appendChild(sideBarDiv);
        
        document.getElementById('canvas').appendChild(div);
        buttonElement.parentNode.parentNode.removeChild(buttonElement.parentNode)
        isOpen = !isOpen;
    })

    textSpan.innerHTML = "Text : ";
    textInp.placeholder = "Text you want to insert"
    textInp.id = "textInput"
    textDiv.style.marginTop = "3vh"
    textDiv.appendChild(textSpan);
    textDiv.appendChild(textInp);

    colorSpan.innerHTML = "Color :";
    colorInp.placeholder = "#000000"
    colorInp.id = "colorInput"
    colorDiv.appendChild(colorSpan)
    colorDiv.appendChild(colorInp)

    sizeSpan.innerHTML = "Size :";
    sizeInp.defaultValue = 12;
    sizeInp.id = "sizeInput"
    sizeDiv.appendChild(sizeSpan);
    sizeDiv.appendChild(sizeInp);

    div.appendChild(closeIcon)
    div.appendChild(textDiv)
    div.appendChild(colorDiv)
    div.appendChild(sizeDiv);
    div.appendChild(buttonElement)
    // div.style.height = "22%"
    div.id = "textform"

    document.getElementById('textfield').appendChild(div);
    isOpen = !isOpen;
}

function imageForm() {
    if(isImage) {
        return;
    }
    isImage = true
    const div = document.createElement('div')
    const urlDiv = document.createElement('div');
    const heightDiv = document.createElement('div');
    const widthDiv = document.createElement('div');
    
    const closeIcon = document.createElement('div');
    closeIcon.innerHTML = "&#10006;"
    closeIcon.style.width = "fit-content"
    closeIcon.style.float = "right"
    closeIcon.style.cursor = "pointer"
    closeIcon.addEventListener('click',() => {
        closeIcon.parentNode.parentNode.removeChild(closeIcon.parentNode);
        isImage = false
    })

    const imageSpan = document.createElement('span');
    const imageInp = document.createElement('input');
    const heightSpan = document.createElement('span');
    const imageHeight = document.createElement('input');
    const widthSpan = document.createElement('span');
    const imageWidth = document.createElement('input');
    const btn = document.createElement('button');
    
    btn.innerHTML = "create"
    btn.className = "btn"
    btn.addEventListener('click', () => {
        isImage = false
        const imgEle = document.createElement('img');
        imgEle.src = imageInp.value;
        imgEle.alt = "invalid src"
        imgEle.style.height = imageHeight.value + 'px';
        imgEle.style.width = imageWidth.value + 'px';
        imgEle.draggable = true;
        imgEle.setAttribute("ondragstart" , "dragStart(event)")
        imgEle.id = "image" + Date.now();

        const imgOutput = document.createElement('div');
        const imgOutputSpan = document.createElement('span');
        const imgOutputIcons = document.createElement('div');
        const imgOutputCloseIcon = document.createElement('div');
        const imgOutputEditIcon = document.createElement('div');
        
        imgOutputCloseIcon.innerHTML = "&#10006;";
        imgOutputCloseIcon.addEventListener('click' , () => {
            document.getElementById(imgEle.id).parentNode.removeChild(imgEle)
            imgOutputCloseIcon.parentNode.parentNode.parentNode.removeChild(imgOutputCloseIcon.parentNode.parentNode);
            isImage = false
        })
        imgOutputEditIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:1vw"><path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" /></svg>'
        imgOutputEditIcon.addEventListener('click' , () => {
            imgOutput.innerHTML = ''
            const editUrl = document.createElement('input');
            const editHeight = document.createElement('input');
            const editWidth = document.createElement('input');
            const editbtn = document.createElement('button');
            const editDiv = document.createElement('div');

            editbtn.innerHTML = "edit"
            btn.className = "editButtons"

            editUrl.defaultValue = imgEle.src
            editHeight.defaultValue = imgEle.height
            editWidth.defaultValue = imgEle.width
            
            editDiv.appendChild(editUrl)
            editDiv.appendChild(editHeight)
            editDiv.appendChild(editWidth)

            imgOutput.style.display = "block"

            editbtn.className = "editButton"

            editbtn.addEventListener('click' , () => {
                imgEle.src = editUrl.value
                imgEle.style.height = editHeight.value + 'px';
                imgEle.style.width = editWidth.value + 'px';
    
                imgOutput.innerHTML = ''
                imgOutput.style.display = "flex"

                imgOutput.appendChild(imgOutputSpan)
                imgOutput.appendChild(imgOutputIcons)

            })


            imgOutput.appendChild(editDiv);
            imgOutput.appendChild(editbtn);
            imgOutputIcons.style.display = "flex"

        });
        
        
        imgOutputSpan.innerHTML = imgEle.id;
        imgOutputIcons.appendChild(imgOutputEditIcon);
        imgOutputIcons.appendChild(imgOutputCloseIcon);
        
        imgOutputIcons.style.display = "flex";
        imgOutputIcons.style.alignItems = "center";
        imgOutputIcons.style.gap = ".3vw"
        
        imgOutput.appendChild(imgOutputSpan);
        imgOutput.appendChild(imgOutputIcons);
        
        imgOutput.className = "imageSideBarDiv"
        
        document.getElementById('imageOutputs').appendChild(imgOutput)

        document.getElementById('canvas').appendChild(imgEle);

        btn.parentNode.parentNode.removeChild(btn.parentNode)
    })

    imageSpan.innerHTML = "Image Url :";
    heightSpan.innerHTML = "Height :";
    widthSpan.innerHTML = "Width :";

    widthDiv.appendChild(widthSpan)
    widthDiv.appendChild(imageWidth)
    imageWidth.placeholder = "in (px)"

    heightDiv.appendChild(heightSpan);
    heightDiv.appendChild(imageHeight)
    imageHeight.placeholder = "in (px)"

    urlDiv.style.marginTop = "3vh"
    urlDiv.appendChild(imageSpan);
    urlDiv.appendChild(imageInp);
    
    div.appendChild(closeIcon)
    div.appendChild(urlDiv)
    div.appendChild(heightDiv)
    div.appendChild(widthDiv)
    div.appendChild(btn);

    // div.style.height = "22%"
    div.style.marginBottom = "2vh"
    div.id = "imageform1"

    document.getElementById('imageForm').appendChild(div)
}

function videoForm() {
    if(isForm) {
        return;
    }
    isForm = true
    const div = document.createElement('div')
    const urlDiv = document.createElement('div');
    const heightDiv = document.createElement('div');
    const widthDiv = document.createElement('div');
    
    const closeIcon = document.createElement('div');
    closeIcon.innerHTML = "&#10006;"
    closeIcon.style.float = "right"
    closeIcon.style.cursor = "pointer"
    closeIcon.addEventListener('click',() => {
        closeIcon.parentNode.parentNode.removeChild(closeIcon.parentNode);
        isForm = false
    })
    
    const videoSpan = document.createElement('span');
    const videoInp = document.createElement('input');
    const heightSpan = document.createElement('span');
    const videoHeight = document.createElement('input');
    const widthSpan = document.createElement('span');
    const videoWidth = document.createElement('input');
    const btn = document.createElement('button');
    
    btn.innerHTML = "create"
    btn.className = "btn"
    btn.addEventListener('click', () => {
        isForm = false
        const videoEle = document.createElement('video');
        videoEle.src = videoInp.value;
        videoEle.controls = true;
        videoEle.alt = "invalid src"
        videoEle.style.height = videoHeight.value + 'px';
        videoEle.style.width = videoWidth.value + 'px';
        videoEle.draggable = true;
        videoEle.setAttribute("ondragstart" , "dragStart(event)")
        videoEle.id = "video" + Date.now();
        
        const videoOutput = document.createElement('div');
        const videoOutputSpan = document.createElement('span');
        const videoOutputIcons = document.createElement('div');
        const videoOutputCloseIcon = document.createElement('div');
        const videoOutputEditIcon = document.createElement('div');
        
        videoOutputCloseIcon.innerHTML = "&#10006;";
        videoOutputCloseIcon.addEventListener('click' , () => {
            document.getElementById(videoEle.id).parentNode.removeChild(videoEle)
            videoOutputCloseIcon.parentNode.parentNode.parentNode.removeChild(videoOutputCloseIcon.parentNode.parentNode);
            isForm = false
        })
        videoOutputEditIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:1vw"><path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" /></svg>'
        videoOutputEditIcon.addEventListener('click' , () => {
            videoOutput.innerHTML = ''
            const editUrl = document.createElement('input');
            const editHeight = document.createElement('input');
            const editWidth = document.createElement('input');
            const editbtn = document.createElement('button');
            const editDiv = document.createElement('div');
            
            editbtn.innerHTML = "edit"
            btn.className = "editButtons"
            
            editUrl.defaultValue = videoEle.src
            editHeight.defaultValue = videoEle.height
            editWidth.defaultValue = videoEle.width
            
            editDiv.appendChild(editUrl)
            editDiv.appendChild(editHeight)
            editDiv.appendChild(editWidth)
            
            videoOutput.style.display = "block"
            
            editbtn.className = "editButton"
            
            videoOutputIcons.style.display = "none"
            editbtn.addEventListener('click' , () => {
                videoEle.src = editUrl.value
                videoEle.style.height = editHeight.value + 'px';
                videoEle.style.width = editWidth.value + 'px';
                
                videoOutput.innerHTML = ''
                videoOutput.style.display = "flex"
                
                videoOutput.appendChild(videoOutputSpan)
                videoOutput.appendChild(videoOutputIcons)
                
            })
            
            
            videoOutput.appendChild(editDiv);
            videoOutput.appendChild(editbtn);
            
            videoOutputIcons.style.display = "flex"
            
        });
        
        
        videoOutputSpan.innerHTML = videoEle.id;
        videoOutputIcons.appendChild(videoOutputEditIcon);
        videoOutputIcons.appendChild(videoOutputCloseIcon);
        
        videoOutputIcons.style.display = "flex";
        videoOutputIcons.style.alignItems = "center";
        videoOutputIcons.style.gap = ".3vw"
        
        videoOutput.appendChild(videoOutputSpan);
        videoOutput.appendChild(videoOutputIcons);
        
        videoOutput.className = "imageSideBarDiv"
        document.getElementById('videoOutputs').appendChild(videoOutput)
        
        document.getElementById('canvas').appendChild(videoEle);
        
        btn.parentNode.parentNode.removeChild(btn.parentNode)
    })
    console.log(div.firstChild)
        div.id = "videoform1"
    
    
    videoSpan.innerHTML = "video Url :";
    heightSpan.innerHTML = "Height :";
    widthSpan.innerHTML = "Width :";
    
    widthDiv.appendChild(widthSpan)
    widthDiv.appendChild(videoWidth)
    videoWidth.placeholder = "in (px)"
    
    heightDiv.appendChild(heightSpan);
    heightDiv.appendChild(videoHeight)
    videoHeight.placeholder = "in (px)"
    
    urlDiv.style.marginTop = "3vh"
    urlDiv.appendChild(videoSpan);
    urlDiv.appendChild(videoInp);
    
    div.appendChild(closeIcon)
    div.appendChild(urlDiv)
    div.appendChild(heightDiv)
    div.appendChild(widthDiv)
    div.appendChild(btn);
    
    // div.style.height = "22%"
    
    document.getElementById('videoForm').appendChild(div)
}

function buttonForm() {
    if(isButton) {
        return;
    }
    
    const div = document.createElement('div');
    const bgDiv = document.createElement('div')
    const bgInp = document.createElement('input');
    const bgSpan = document.createElement('span')
    const colorDiv = document.createElement('div');
    const colorInp = document.createElement('input');
    const colorSpan = document.createElement('span');
    const textDiv = document.createElement('div');
    const textInp = document.createElement('input');
    const textSpan = document.createElement('span');
    const buttonElement = document.createElement('button');
    const closeIcon = document.createElement('div');
    
    closeIcon.innerHTML = "&#10006;"
    closeIcon.style.float = "right"
    closeIcon.style.display = "block"
    closeIcon.style.cursor = "pointer"
    closeIcon.addEventListener('click',() => {
        closeIcon.parentNode.parentNode.removeChild(closeIcon.parentNode);
        isButton = !isButton
    })
    
    buttonElement.innerHTML = "create"
    buttonElement.id = "textCreate"
    buttonElement.addEventListener('click', () => {
        const text = document.getElementById('textInput').value;
        const size = document.getElementById('bgInput').value;
        const color = document.getElementById('colorInput').value;
        const sideBarDiv = document.createElement('div');
        const sideBarSpan = document.createElement('span');
        const sideBarEditIcon = document.createElement('div');
        const sideBarClose = document.createElement('div');
        const Icons = document.createElement('div');
        
        sideBarSpan.innerHTML = text;
        sideBarEditIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:1vw"><path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" /></svg>'
        sideBarClose.innerHTML = "&#10006;"
        sideBarDiv.appendChild(sideBarSpan);
        Icons.appendChild(sideBarEditIcon);
        Icons.appendChild(sideBarClose);
        Icons.style.display = "flex";
        Icons.style.alignItems = "center"
        Icons.style.gap = ".5vw"
        sideBarDiv.appendChild(Icons)
        sideBarDiv.className = "sideBarText"
        
        
        const div = document.createElement('button');
        div.id = "output"+Date.now();
        div.draggable = true
        div.innerHTML = text;
        div.style.backgroundColor = size;
        div.style.color = color;
        div.setAttribute("ondragstart" , "dragStart(event)")
        
        sideBarClose.addEventListener('click', () => {
            document.getElementById(div.id).parentNode.removeChild(document.getElementById(div.id))
            sideBarClose.parentNode.parentNode.parentNode.removeChild(sideBarClose.parentNode.parentNode)
        })
        sideBarEditIcon.addEventListener('click' , () => {
            sideBarSpan.innerHTML = ''
            const textinpfield = document.createElement('input')
            const coloreditfield = document.createElement('input')
            const bginpfield = document.createElement('input');
            const btn = document.createElement('button')
            btn.innerHTML = "edit"
            btn.className = "editButtons"
            
            sideBarSpan.appendChild(textinpfield);
            sideBarSpan.appendChild(coloreditfield);
            sideBarSpan.appendChild(bginpfield);
            sideBarSpan.appendChild(btn);
            
            textinpfield.defaultValue = text;
            coloreditfield.defaultValue = color;
            bginpfield.defaultValue = size;
            Icons.style.display = "none"
            
            btn.addEventListener('click', () => {
                sideBarSpan.innerHTML = textinpfield.value;
                div.innerHTML = textinpfield.value
                div.style.backgroundColor = bginpfield.value;
                div.style.color = coloreditfield.value;
                sideBarDiv.appendChild(sideBarSpan);
                sideBarDiv.appendChild(Icons)
                Icons.style.display = "block"
            });
            
        })
        
        document.getElementById('btnOutput').appendChild(sideBarDiv);
        
        document.getElementById('canvas').appendChild(div);
        buttonElement.parentNode.parentNode.removeChild(buttonElement.parentNode)
        isButton = !isButton;
    })
    
    textSpan.innerHTML = "Text : ";
    textInp.placeholder = "Text on button"
    textInp.id = "textInput"
    textDiv.style.marginTop = "3vh"
    textDiv.appendChild(textSpan);
    textDiv.appendChild(textInp);
    
    colorSpan.innerHTML = "Color :";
    colorInp.placeholder = "#000000"
    colorInp.id = "colorInput"
    colorDiv.appendChild(colorSpan)
    colorDiv.appendChild(colorInp)
    
    bgSpan.innerHTML = "Background :";
    bgInp.placeholder = "#000000";
    bgInp.id = "bgInput"
    bgDiv.appendChild(bgSpan);
    bgDiv.appendChild(bgInp);
    
    div.appendChild(closeIcon)
    closeIcon.style.marginBottom = "4vh"
    div.appendChild(textDiv)
    div.appendChild(colorDiv)
    div.appendChild(bgDiv);
    div.appendChild(buttonElement)
    div.style.height = "22%"
        div.id = "btnform"
    
    
    document.getElementById('btnfield').appendChild(div);
    isButton = !isButton;
}