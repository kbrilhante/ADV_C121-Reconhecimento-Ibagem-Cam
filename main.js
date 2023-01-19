var canvas, video, classifier;
var previousResult = '';

const W = 300;
const H = 300;

function preload() {}

function setup() {
    canvas = createCanvas(W, H);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    classifier = ml5.imageClassifier('MobileNet', modelLoaded);
}

function draw() {
    image(video, 0, 0, W, H);
    classifier.classify(video, gotResult);
}

function modelLoaded() {
    console.log('Model Loaded');
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results)
        const result = results[0].label;
        const confidence = results[0].confidence;
        if (result != previousResult && confidence > 0.5) {
            previousResult = result;
            const synth = speechSynthesis;
            const speechData = 'O objeto detectado é ' + result;
            const utterThis = new SpeechSynthesisUtterance(speechData);
            synth.speak(utterThis);

            document.getElementById("resultadoObj").textContent = result;
            document.getElementById("resultadoAcc").textContent = Math.fround(confidence)
        }
    }
}