window.onload = main;

function main() {
	
	console.log("main");
    init();
    initLoupe();
    initCadre();
    afficher();
	loupe();
}

///////////////////////////////////////////////////////
/*Fonctions servant aux initialisations des differents canvas*/
function init(){
    canvas = document.getElementById('canvas');
    if(!canvas)
    {
        console.log("Le canvas n'a pas chargé.");
        return;
    }

    ctx = canvas.getContext('2d');
    if(!ctx){
        console.log("Le contexte n'a pas chargé");
        return;
    }
    canvas.width  = 800;
    canvas.height = 600;
}

function initLoupe(){
    canvasLoupe = document.getElementById('canvasLoupe');
    if(!canvasLoupe)
    {
        console.log("Le canvas de la loupe n'a pas chargé.");
        return;
    }

    ctxLoupe = canvasLoupe.getContext('2d');
    if(!ctxLoupe){
        console.log("Le contexte de la loupe n'a pas chargé");
        return;
    }
}

function initCadre(){
    canvasCadre = document.getElementById('cadre');
    if(!canvasCadre)
    {
        console.log("Le canvas du cadre n'a pas chargé.");
        return;
    }

    ctxCadre = canvasCadre.getContext('2d');
    if(!ctxCadre){
        console.log("Le contexte du cadre n'a pas chargé");
        return;
    }
}
///////////////////////////////////////////////////////


///////////////////////////////////////////////////////
/*Fonction servant a afficher l'image dans le canvas principal*/
function afficher(){
    var img = new Image();
    img.addEventListener("load", function() {
        ctx.drawImage(img,0,0,canvas.width,canvas.height);
    }, false);
    img.src = "media/pic.jpg";
}
///////////////////////////////////////////////////////


///////////////////////////////////////////////////////
/*Fonction gerant la loupe, le cadre, la gestion de l'affichage du pointeur*/
function loupe(){
    document.body.addEventListener("mousemove", function(event){
        if(event.x <800 && event.y < 600){  //Dimension du canvas principal
            ctxLoupe.clearRect(0,0,2000,2000);  //On nettoye a chaque fois,
            ctxCadre.clearRect(0,0,2000,2000);  //que cela soit la loupe ou le cadre (sinon on aurait une trainé).
            
            /*La ligne d'en dessous sert a dessiner cet effet de loupe.
            Il faut preciser le canvas source de l'image original.
            Les mouseEvents donnent les coordonnées du pointeur de la souris lorsqu'il se déplace.
            On soustrait 50 et 25 pour placer le curseur au milieu du zoom.
            Ensuite on joue sur les valeurs tout en restant proportionnel, ici avec 20 et 400, on fait un zoom x2, 400 et 800 aurait fait x4.*/
            ctxLoupe.drawImage(canvas, event.x- 50, event.y -25, 100, 200, 0, 0, 200, 400);

            /*Lesdeux lignes suivante servent a repositionner la loupe en fonction de l'emplacement du pointeur*/
            canvasLoupe.style.top = event.y - 180/2 + "px"
            canvasLoupe.style.left = event.x - 200/2 +"px"

            canvasCadre.style.cursor= "none"; //On enlève le pointeur de la souris lorqu'on passe sur l'image

            /*On Dessine un cadre lorsque le pointeur est dans l'image, assez loin des bords*/
            if(event.x <750 && event.y < 535){
                ctxCadre.beginPath();
                ctxCadre.lineWidth="6";
                ctxCadre.strokeStyle= "#00C807";
                ctxCadre.rect(event.x- 100, event.y -90,200,180); 
                ctxCadre.stroke();
            }
        }

        /*En sortant de l'image, on nettoye tout, on remet le curseur, et on sort de la fonction*/
        else{
            ctxLoupe.clearRect(0,0,2000,2000);
            ctxCadre.clearRect(0,0,2000,2000);
            canvasCadre.style.cursor= "auto";
            return;
        }
    });
}
///////////////////////////////////////////////////////