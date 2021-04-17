// function switch_lr(obj, target, initPos, callback, skip) {
//     let go = initPos;
//     console.log(target);
//     // console.log((initPos + step) * 100 + '%');
//     obj.timer = setInterval(function () {
//         go += step;
//         let stepResult = Math.ceil(go*10)/10;
//         // alert(stepResult);
//         if (stepResult == target) {
            
//             clearInterval(obj.timer);
//             if(skip == true) {
//                 // alert(1);
//                 obj.style.left = "0%";
//                 alert(obj.style.left)
//                 skip == false;
//             }
//             callback&&callback();
//         }
//         obj.style.left = stepResult * 100 + '%';
//         // console.log(obj.style.left);
//         // console.log(obj.style.left);
//     }, 20);
// }

function switch_lr(obj, target, callback) {
    obj.timer = setInterval(function () {
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            callback&&callback();
        }
        obj.style.left = obj.offsetLeft + step + 'px';
        // alert(obj.style.left);
    }, 20);
}